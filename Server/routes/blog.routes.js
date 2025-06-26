import express from "express";
import { uploadBlogs } from "../controllers/blog.controller.js";
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

export default router;
