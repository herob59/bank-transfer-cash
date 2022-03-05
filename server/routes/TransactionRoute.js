import express from 'express';
const router = express.Router();
import TransactionController from '../controllers/TransactionController.js';
import privateRoute from '../middlewares/verifyToken.js';

router.post('/transaction', privateRoute.authUser ,TransactionController.send);
router.get('/history', privateRoute.authUser ,TransactionController.GetAllTransactions)

export default router;