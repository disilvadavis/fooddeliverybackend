import Restaurant from '../models/Restaurant.js';
import User from '../models/User.js';
import Product from '../models/Product.js';

// Add a new restaurant
export const addRestaurant = async (req, res) => {
  const { name, location, products } = req.body;

  try {
    const restaurant = new Restaurant({
      name,
      location,
      owner: req.user._id,
      products,
    });

    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all restaurants
export const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find()
      .populate('owner', 'name email')
      .populate('products', 'name price');
    res.json(restaurants);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get restaurant by ID
export const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id)
      .populate('owner', 'name email')
      .populate('products', 'name price');

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    res.json(restaurant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
