import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';

configDotenv();

export const authenticateUser = (req,res,next) => {
    try {
       const token = req.headers.authorization
       jwt.verify(token, process.env.JWT_SECRET)
       next();
    } catch (error) {
        res.status(400).json({
            message: 'User Not Authenticated',
            success: false
        })
    }
}