import imagekit from "../config/imagekit.js";
import BlogModel from "../models/blog.model.js";
import fs from 'fs';

export const uploadBlogs = async (req, res) => {
    try {
        const {
            title,
            subTitle,
            description,
            category,
            isPublished
        } = JSON.parse(req.body.blog);

        const imageFile = req.file;

        if (!title || !subTitle || !description || !category || !imageFile) {
            return res.status(400).json({
                message: 'All Fields Are Required',
                success: false
            });
        }

        const fileBuffer = fs.readFileSync(imageFile.path);

        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/blogs'
        });

        const optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                { quality: 'auto' },
                { format: 'webp' },
                { width: '1280' }
            ]
        });

        await BlogModel.create({
            title,
            subTitle,
            description,
            category,
            image: optimizedImageUrl,
            isPublished
        });

        res.status(201).json({
            message: 'Blog Uploaded Successfully',
            success: true
        });

    } catch (error) {
        console.error("Upload Error:", error);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false
        });
    }
};
