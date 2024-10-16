import Order from '../models/Order.js';
import Restaurant from '../models/Restaurant.js';
import Product from '../models/Product.js';

// Create a new order
export const createOrder = async (req, res) => {
  const { restaurantId, products, totalPrice } = req.body;

  try {
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const order = new Order({
      user: req.user._id,
      restaurant: restaurantId,
      products,
      totalPrice,
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all orders (for admin/sellers)
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('restaurant', 'name')
      .populate('products.product', 'name price');

    res.json(orders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get order details (for user)
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('restaurant', 'name')
      .populate('products.product', 'name price');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
