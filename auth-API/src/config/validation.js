import {z} from 'zod';

const registerSchema = z.object({
    username: z.string().min(5, 'Username must be at least 5 characters long'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export const validateRegister = (req, res, next) => {
    try{
        registerSchema.parse(req.body);
        next();
    } catch (error) {
        res.status(400).json({ error: error.errors });
    }
};