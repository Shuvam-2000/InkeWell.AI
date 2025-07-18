import express from "express";
import {
  approveCommentById,
  deleteCommentById,
  getAllBlogCreated,
  getAllComments,
  getDashboard,
  userLogin,
} from "../controllers/user.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

// initialize router
const router = express.Router();

// login route
router.post("/login", userLogin);

// get all comments in the admin dashboard
router.get("/comments", authenticateUser, getAllComments);

// all blogs created by the admin
router.get("/blogs", authenticateUser, getAllBlogCreated);

// delete comment by admin
router.delete("/deletecomment", authenticateUser, deleteCommentById);

// approve comment by admin
router.patch("/approvecomment", authenticateUser, approveCommentById);

// get admin dashboard data
router.get("/dashboard", authenticateUser, getDashboard);

export default router;
