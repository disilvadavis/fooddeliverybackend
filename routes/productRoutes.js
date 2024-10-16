import express from 'express';
import { getProducts, addProduct } from '../controllers/productController.js';
import { protect, authorize } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', getProducts);
router.post('/', protect, authorize('seller'), addProduct);

export default router;
