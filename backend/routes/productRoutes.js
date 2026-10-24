/**
 * Product Routes
 * Maps REST API endpoints to productController methods.
 */

const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct
} = require('../controllers/productController');

// GET /api/products - Get all bakery items (with category/search filtering)
// POST /api/products - Create a new bakery item
router.route('/')
  .get(getProducts)
  .post(createProduct);

// GET /api/products/:id - Get single bakery item by id
// DELETE /api/products/:id - Delete item
router.route('/:id')
  .get(getProductById)
  .delete(deleteProduct);

module.exports = router;
