import { configDotenv } from 'dotenv';
import jwt from 'jsonwebtoken';

// Load environemnt variables
configDotenv();

// user login
export const userLogin = async (req,res) => {
    try {
        const { email, password } = req.body

        if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) return res.status(400).json({
            message: 'Invalid Email Or Password'
        })

        const token = jwt.sign({email}, process.env.JWT_SECRET)

        res.status(200).json({
            message: "Login Succesfull",
            success: true,
            token
        })

    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            success: false
        })
    }
}