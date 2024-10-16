import express from 'express';
import { createOrder, getOrders, getOrderById } from '../controllers/orderController.js';
import { protect, authorize } from '../middlewares/auth.js';

const router = express.Router();

router.post('/', protect, authorize('user'), createOrder); // Users place orders
router.get('/', protect, authorize('admin', 'seller'), getOrders); // Admins and sellers view orders
router.get('/:id', protect, getOrderById); // Get single order by ID (for users)

export default router;
