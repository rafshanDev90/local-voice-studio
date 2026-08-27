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
            {email: email}        ]
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
    //res.status(201).json({message: 'User created successfully', user: user});
    
    const refreshToken = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET, 
      {
        expiresIn: '7d'
     })
    
    const refreshTokenhash = crypto.createHash('sha256').update(refreshToken).digest('hex');

    const session = await sessionModel.create({
        user: user._id,
        refreshToken: refreshTokenhash,
        ip: req.ip,
        userAgent: req.headers['user-agent'],
    })
    const accessToken = jwt.sign({
        id: user._id,
        sessionId: session._id,
    }, process.env.JWT_SECRET, 
      {
        expiresIn: '18m'
     })
    
    
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(201).json({
        message: 'User created successfully',
        user:{
            username: user.username,
            email: user.email,

        },
        accessToken
    })
}

export async function getMe(req, res){
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({message: 'No token provided'});
    }
}

export async function refreshToken(req, res) {
    // 1. Get the refresh token from cookies
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token missing' });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const accessToken = jwt.sign({ 
        id: decoded.id }, 
        process.env.JWT_SECRET, 
        { expiresIn: '18m' });

    const newrefreshToken = jwt.sign({ 
        id: decoded.id }, 
        process.env.JWT_SECRET, 
        { expiresIn: '7d' });
    
    res.cookie('refreshToken', newrefreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(200).json({ 
        message: 'Token refreshed successfully',
        accessToken
     });


}

export async function logout(req, res){
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token missing' });
    }
    
    const refreshTokenhash = crypto.createHash('sha256').update(refreshToken).digest('hex');
    const session = await sessionModel.findOne({
        refreshToken: refreshTokenhash,
        revoked: false
    })
    if (!session) {
        return res.status(401).json({ message: 'Invalid refresh token' });
    }

    session.revoked = true;
    await session.save();

    res.clearCookie('refreshToken');
    res.status(200).json({ message: 'Logged out successfully' });

}