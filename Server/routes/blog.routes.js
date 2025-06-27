import express from "express";
import {
  addComment,
  deleteBlogById,
  getAllBlogs,
  getBlogById,
  getComments,
  publishBlog,
  uploadBlogs,
} from "../controllers/blog.controller.js";
import upload from "../middlewares/multer.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

// intialize the router
const router = express.Router();

// upload blog route
router.post(
  "/uploadblog",
  upload.single("image"),
  authenticateUser,
  uploadBlogs
);

// get all blogs
router.get("/getblogs", getAllBlogs);

// get blog info by id
router.get("/:blogId", getBlogById);

// delete blog by id
router.delete("/delete/:blogId", authenticateUser, deleteBlogById);

// publish blog
router.patch("/publish/:blogId", authenticateUser, publishBlog);

// add comments
router.post("/addcomment", addComment)

// get comment for the blog
router.post("/getcomment", getComments)

export default router;
