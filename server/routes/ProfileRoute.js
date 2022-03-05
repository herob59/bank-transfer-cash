import express from 'express';
const router = express.Router();
import MyProfile from '../controllers/ProfileController.js';
import privateRoute from '../middlewares/verifyToken.js';

router.get('/profile', privateRoute.authUser , MyProfile.me);

export default router;