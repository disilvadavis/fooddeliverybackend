import express from 'express';
import { addRestaurant, getRestaurants, getRestaurantById } from '../controllers/restaurantController.js';
import { protect, authorize } from '../middlewares/auth.js';

const router = express.Router();

router.post('/', protect, authorize('seller', 'admin'), addRestaurant); // Sellers or admins can add restaurants
router.get('/', getRestaurants); // All users can view restaurants
router.get('/:id', getRestaurantById); // Get restaurant by ID

export default router;
