import express from 'express';
import { userLogin } from '../controllers/user.controller.js';

// initialize router
const router = express.Router();

// login route
router.post('/login', userLogin);

export default router;

