import imagekit from "../config/imagekit.js";
import BlogModel from "../models/blog.model.js";
import fs from 'fs';
import CommentModel from "../models/comment.model.js";
import main from "../config/gemini.js";

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

        const blogs = await BlogModel.findOne({ title })

        if(blogs) return res.status(400).json({
            message: `${title} already exists`,
            success: false
        })

        const uploadBlogs = await BlogModel.create({
            title,
            subTitle,
            description,
            category,
            image: optimizedImageUrl,
            isPublished
        });


        res.status(201).json({
            message: 'Blog Uploaded Successfully',
            success: true,
            blogs: uploadBlogs
        });

    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            success: false
        });
    }
};

// get all uploaded blogs
export const getAllBlogs = async (req,res) => {
    try {
        const blogs = await BlogModel.find({ isPublished: true })

        if(!blogs) return res.status(400).json({
            message: 'No Blogs Found',
            success: false
        })

        res.status(200).json({
            message: 'All the Blogs Found',
            success: true,
            blogs
        })
        
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            success: false
        });
    }
}

// get individual blog data by Id
export const getBlogById = async (req,res) => {
    try {

        const { blogId } = req.params;

        if(!blogId) return res.status(400).json({
            message: 'Blog Id Not Found',
            success: false
        })

        const getblogs = await BlogModel.findById(blogId)

        if(!getblogs) return res.status(400).json({
            message: "Blog Not Found",
            success: false
        })

        res.status(200).json({
            message: 'Blog Info Found',
            success: true,
            getblogs
        })
        
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            success: false
        });
    }
}

// delete any blog with the blogId
export const deleteBlogById = async (req,res) => {
    try {
        const { blogId } = req.params;

        if(!blogId) return res.status(400).json({
            message: 'Blog Id Not Found',
            success: false
        })

        const deleteBlog = await BlogModel.findByIdAndDelete(blogId)

        // delete all comments on this blogs
        await CommentModel.deleteMany({blog: blogId})

        if(!deleteBlog) return res.status(400).json({
            message: 'Error Deleting Blog',
            success: false
        })

        res.status(200).json({
            message: 'Blog Deleted SuccessFully',
            success: true
        })
        
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            success: false
        });
    }
}

// to publish or unpublish a blog
export const publishBlog = async (req,res) => {
    try {
        const { blogId } = req.params;

        if(!blogId) return res.status(400).json({
            message: 'Blog Id Not Found',
            success: false
        })

        const blog = await BlogModel.findById(blogId)

        if(!blog) return res.status(400).json({
            message: 'Error Deleting Blog',
            success: false
        })

        blog.isPublished = !blog.isPublished;

        await blog.save()
        res.status(200).json({
            message: 'Blog Publihsed SuccessFully',
            success: true,
            blog
        })
        
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            success: false
        });
    }
}

// add comments to the blog posted
export const addComment = async (req,res) => {
    try {
        const { blog, name, content } = req.body
        
        const comment = await CommentModel.create({
            blog,
            name,
            content
        })

        if(!comment) return res.status(400).json({
            message: "Error Posting Comment",
            success: false
        })

        res.status(201).json({
            message: "Comment Added For Review",
            success: true
        })
        
    } catch (error) {
         res.status(500).json({
            message: 'Internal Server Error',
            success: false
        });
    }
}

// get comments for blog
export const getComments = async (req, res) => {
    try {
        const { blogId } = req.body;

        const comments = await CommentModel.find({
            blog: blogId,
            isApproved: true
        }).sort({ createdAt: -1 });

        if (comments.length === 0) {
            return res.status(404).json({
                message: "No Comments Found",
                success: false
            });
        }

        res.status(200).json({
            message: "Comments Found",
            success: true,
            comments
        });

    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            success: false
        });
    }
};

// generate blog summary with AI
export const generateContentWithAI = async (req,res) => {
    try {
        const { prompt } = req.body;

        const content = await main(prompt + 'Generate a blog content for this topic in single text format')

        res.status(200).json({
            success: true,
            content
        })

    } catch (error) {
         res.status(500).json({
            message: 'Internal Server Error',
            success: false
        });
    }
}