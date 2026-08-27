import userModel from '../models/user.model.js';
import sessionModel from '../models/session.model.js';

import sessionModel from '../models/session.model.js';

import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import dotenv, { config } from 'dotenv';

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
    const user = await userModel.create({
        username: username,
        email: email,
        password: hashedPassword
    });
    //res.status(201).json({message: 'User created successfully', user: user});
    //res.status(201).json({message: 'User created successfully', user: user});

    const refreshtoken = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET, 
      {
        expiresIn: '7d'
     })
     
    const accesstoken = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET, 
      {
        expiresIn: '1h'
     })

    res.status(201).json({
        message: 'User created successfully',
        user:{
            username: user.username,
            email: user.email,

        },
        accesstoken
    })
}

export async function getUser(req, res){
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({message: 'No token provided'});
    }
}