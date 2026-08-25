import userModel from '../models/user.model.js';
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

    const newUser = await userModel.create({
        username: username,
        email: email,
        password: hashedPassword
    });
    res.status(201).json({message: 'User created successfully', user: newUser});

    const token = jwt.sign({
        id: newUser._id,
        username: newUser.username,
        email: newUser.email
    }, process.env.JWT_SECRET, {expiresIn: '1h'});

    res.status(201).json({
        message: 'User created successfully',
        user: newUser,
        token: token
    })
}