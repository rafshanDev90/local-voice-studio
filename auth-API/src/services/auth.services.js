import userModel from '../models/user.model.js';
import sessionModel from '../models/session.model.js';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();


export async function register({ username, email, password, ip, userAgent }){
    const alreadyExists = await userModel.findOne({
        $or: [
            {username: username},
            {email: email}        ]
    })
    
    if (alreadyExists) {
        throw new Error('USER_EXISTS');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

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
        ip,
        userAgent,
    })
    const accessToken = jwt.sign({
        id: user._id,
        sessionId: session._id,
    }, process.env.JWT_SECRET, 
      {
        expiresIn: '18m'
     })
    
    
    /*res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    */
    return { user , accessToken, refreshToken };
}
