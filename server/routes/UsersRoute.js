import express from 'express';
const router = express.Router();
import UsersController from '../controllers/AuthController.js';
import privateRoute from '../middlewares/verifyToken.js';

router.post('/register', UsersController.saveUser);
router.post('/login', UsersController.userLogin);
router.get('/users',  privateRoute.authUser , UsersController.getUsers);



export default router;