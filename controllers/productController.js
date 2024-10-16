import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
  const products = await Product.find().populate('seller', 'name email');
  res.json(products);
};

export const addProduct = async (req, res) => {
  const { name, price, description } = req.body;
  try {
    const product = new Product({
      name,
      price,
      description,
      seller: req.user._id
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
