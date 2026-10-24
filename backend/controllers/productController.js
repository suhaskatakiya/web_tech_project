/**
 * Product Controller
 * Handles business logic for fetching, creating, and managing bakery catalog items.
 */

const mongoose = require('mongoose');
const Product = require('../models/Product');
const fallbackStore = require('../config/fallbackStore');

// @desc    Get all bakery products with optional filtering and search
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res, next) => {
  try {
    const { category, search, dietary, sort } = req.query;

    if (mongoose.connection.readyState === 1) {
      // Build dynamic MongoDB query object
      let query = {};

      if (category && category !== 'All') {
        query.category = category;
      }

      if (dietary && dietary !== 'All') {
        query.dietary = dietary;
      }

      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ];
      }

      let queryExec = Product.find(query);

      // Handle sorting
      if (sort === 'price-low') {
        queryExec = queryExec.sort({ price: 1 });
      } else if (sort === 'price-high') {
        queryExec = queryExec.sort({ price: -1 });
      } else if (sort === 'rating') {
        queryExec = queryExec.sort({ rating: -1 });
      } else {
        queryExec = queryExec.sort({ createdAt: -1 });
      }

      const products = await queryExec;
      return res.status(200).json({
        success: true,
        count: products.length,
        data: products
      });
    }

    // Fallback store query handling
    let items = [...fallbackStore.products];

    if (category && category !== 'All') {
      items = items.filter(item => item.category.toLowerCase() === category.toLowerCase());
    }

    if (dietary && dietary !== 'All') {
      items = items.filter(item => item.dietary.toLowerCase() === dietary.toLowerCase());
    }

    if (search) {
      const term = search.toLowerCase();
      items = items.filter(
        item => item.name.toLowerCase().includes(term) || item.description.toLowerCase().includes(term)
      );
    }

    if (sort === 'price-low') {
      items.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
      items.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      items.sort((a, b) => b.rating - a.rating);
    }

    res.status(200).json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1) {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ success: false, message: 'Bakery item not found' });
      }
      return res.status(200).json({ success: true, data: product });
    }

    const item = fallbackStore.products.find(p => p._id.toString() === id.toString());
    if (!item) {
      return res.status(404).json({ success: false, message: 'Bakery item not found' });
    }

    res.status(200).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new bakery item
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      category,
      price,
      originalPrice,
      description,
      image,
      dietary,
      isEggless,
      isBestseller,
      ingredients,
      allergens,
      calories
    } = req.body;

    if (!name || !category || !price || !description) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, category, price, and description'
      });
    }

    const productData = {
      name,
      category,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : Number(price),
      description,
      image: image || 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600',
      dietary: dietary || (isEggless ? 'Eggless' : 'Regular'),
      isEggless: Boolean(isEggless),
      isBestseller: Boolean(isBestseller),
      ingredients: Array.isArray(ingredients) ? ingredients : (ingredients || '').split(',').map(s => s.trim()).filter(Boolean),
      allergens: Array.isArray(allergens) ? allergens : (allergens || '').split(',').map(s => s.trim()).filter(Boolean),
      calories: calories || '250 kcal',
      inStock: true
    };

    if (mongoose.connection.readyState === 1) {
      const newProduct = await Product.create(productData);
      return res.status(201).json({ success: true, data: newProduct });
    }

    const created = {
      ...productData,
      _id: 'prod_' + (fallbackStore.products.length + 1),
      rating: 5.0,
      reviewsCount: 1,
      createdAt: new Date().toISOString()
    };
    fallbackStore.products.unshift(created);

    res.status(201).json({ success: true, data: created });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1) {
      const deleted = await Product.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Item not found' });
      }
      return res.status(200).json({ success: true, message: 'Item deleted successfully' });
    }

    const index = fallbackStore.products.findIndex(p => p._id.toString() === id.toString());
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    fallbackStore.products.splice(index, 1);

    res.status(200).json({ success: true, message: 'Item deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct
};
