import userModel from '../models/user.model.js';
import sessionModel from '../models/session.model.js';

import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


export async function register(req, res){
    const {username, email, password} = req.body;

    const alreadyExists = await userModel.findOne({
        $or: [
            {username: username},
            {email: email}
        ]
    })
    
    if (alreadyExists) {
        return res.status(409).json({message: 'Username or email already exists'});
    }
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

    const user = await userModel.create({
        username: username,
        email: email,
        password: hashedPassword
    });
    //res.status(201).json({message: 'User created successfully', user: user});

    const accessToken = jwt.sign({
        id: user._id,
        username: user.username,
        email: user.email
    }, process.env.JWT_SECRET, {expiresIn: '1h'});
    
    const refreshToken = jwt.sign({
        id: user._id,
        username: user.username,
        email: user.email
    }, process.env.JWT_SECRET, {expiresIn: '7d'});
    
    const refreshTokenhash = crypto.randomBytes(64).toString('hex');
    const session = await sessionModel.create({
        user: user._id,
        refreshToken: refreshTokenhash,
        ip: req.ip,
        userAgent: req.headers['user-agent']

    })

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(201).json({
        message: 'User created successfully',
        user: user,
        accessToken: accessToken
    })
}

export async function getMe(req, res){
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({message: 'No token provided'});
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //console.log(decoded);

    const user = await userModel.findById(decoded.id);

    res.status(200).json({
        message: "User featch successfully",
        user:{
            username: user.username,
            email: user.email
        }
    })

}

export async function refreshToken(req, res){
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({message: 'No refresh token provided'});
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const accessToken = jwt.sign({
        id: decoded.id,
    }, process.env.JWT_SECRET, {expiresIn: '1h'});
    
    const newRefreshToken = jwt.sign({
        id: decoded.id,
    }, process.env.JWT_SECRET, {expiresIn: '7d'});

    res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(200).json({
        message: 'Token refreshed successfully',
        accessToken: accessToken
    })
}