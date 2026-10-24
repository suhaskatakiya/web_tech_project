/**
 * Order Routes
 * Endpoints for placing orders, fetching orders list, and updating status.
 */

const express = require('express');
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus
} = require('../controllers/orderController');

// POST /api/orders - Place a new bakery order
// GET /api/orders - Get list of all orders
router.route('/')
  .post(createOrder)
  .get(getAllOrders);

// GET /api/orders/:id - Get specific order details
router.route('/:id')
  .get(getOrderById);

// PATCH /api/orders/:id/status - Update baking/delivery status
router.route('/:id/status')
  .patch(updateOrderStatus);

module.exports = router;
