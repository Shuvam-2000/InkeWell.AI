import { configDotenv } from 'dotenv';
import jwt from 'jsonwebtoken';
import BlogModel from '../models/blog.model.js';
import CommentModel from '../models/comment.model.js';

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

// fetch all created blogs
export const getAllBlogCreated = async (req,res) => {
    try {
        const blogs = await BlogModel.find({}).sort({ createdAt: -1 })
        if(!blogs) return res.status(400).json({
            message: 'Blogs Not Found',
            success: false
        })

        res.status(200).json({
            message: 'Here are the blogs',
            success: true,
            blogs
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            success: false
        })
    }
}

// fetch all comments
export const getAllComments = async (req, res) => {
    try {

        const comments = await CommentModel.find({})
        .populate("blog")
        .sort({ createdAt: -1 });

        if (!comments || comments.length === 0) {
        return res.status(404).json({
            message: "No Comments Found",
            success: false,
        });
        }

        res.status(200).json({
        message: "Here are the Comments",
        success: true,
        comments,
        });
    } catch (error) {
        res.status(500).json({
        message: "Internal Server Error",
        success: false,
        });
    }
};

// fetch dashboard data(blogs, comments, drafts)
export const getDashboard = async  (req,res) => {
    try {
        // fetch recent blogs
        const recentBlog = await BlogModel.find({})
        .sort({createdAt: -1}).limit(5)

        if(!recentBlog) return res.status(400).json({
            message: 'Recent Blog Data Not Avaliable',
            success: false
        })

        // fetch total no fo blogs
        const blogs = await BlogModel.countDocuments()

        if(!blogs) return res.status(400).json({
            message: 'Blogs Data Not Avaliable',
            success: false
        })

        // fetch total no of comments
        const comments = await CommentModel.countDocuments()

        if(!comments) return res.status(400).json({
            message: 'Comments Data Not Avaliable',
            success: false
        })

        // fetch total no of Draft Blogs
        const draftBlogs = await BlogModel.countDocuments({ isPublished: false })

        if(!draftBlogs) return res.status(400).json({
            message: 'DraftBlog Data Not Avaliable',
            success: false
        })

        // storing the data 
        const dashBoardData = {
            recentBlog,
            blogs,
            comments,
            draftBlogs
        }

        res.status(200).json({
            message: "All Data recieved",
            success: true,
            dashBoardData
        })
        
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            success: false
        })
    }
}

// function approve comment on any blog
export const approveCommentById = async (req,res) => {
    try {
        const { id } = req.body;

        if(!id) return res.status(400).json({
            message: 'Id not Found',
            success: false
        })

        const approveComment = await CommentModel.findByIdAndUpdate(id, {isApproved: true})

        if(!approveComment) return res.status(400).json({
            message: "Error Approving Comment",
            success: false
        })

        res.status(200).json({
            message: "Comment Approved Succesfully",
            success: true
        })
        
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            success: false
        })
    }
}

// function to delete comment on any blog
export const deleteCommentById = async (req,res) => {
    try {
        const { id } = req.body;

        if(!id) return res.status(400).json({
            message: 'Id not Found',
            success: false
        })

        const deleteComment = await CommentModel.findByIdAndDelete(id)

        if(!deleteComment) return res.status(400).json({
            message: "Error Deleting Comment",
            success: false
        })

        res.status(200).json({
            message: "Comment Deleted Succesfully",
            success: true
        })
        
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            success: false
        })
    }
}