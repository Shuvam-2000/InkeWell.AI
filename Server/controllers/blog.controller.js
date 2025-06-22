import imagekit from "../config/imagekit.js";
import BlogModel from "../models/blog.model.js";
import fs from 'fs';

export const uploadBlogs = async (req,res) => {
    try {
        const { 
                title, 
                subTitle, 
                description, 
                category, 
                image, 
                isPublihsed } = JSON.parse(req.body.blog);

        const imageFile = req.file;

        // check if all fields are present
        if(!title || 
            !subTitle || 
            !description || 
            !category || 
            !imageFile ) return res.status(400).json({
                message: 'All Fields Are Required',
                success: false
            })

        const fileBuffer = fs.readFileSync(imageFile.path)
       
        // Upload Image to ImageKit
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/blogs'
        })

        // optimize through imagekit URL transformation
        
        
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            success: true
        })
    }
}