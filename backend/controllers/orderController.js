/**
 * Order Controller
 * Handles order placement, calculation of bills and discounts,
 * fetching order history, and updating order status.
 */

const mongoose = require('mongoose');
const Order = require('../models/Order');
const fallbackStore = require('../config/fallbackStore');

// @desc    Create a new order from checkout cart
// @route   POST /api/orders
// @access  Public (Guest or Logged In)
const createOrder = async (req, res, next) => {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      deliveryAddress,
      items,
      paymentMethod,
      specialInstructions,
      couponCode
    } = req.body;

    // Validation
    if (!customerName || !customerEmail || !customerPhone || !deliveryAddress?.street) {
      return res.status(400).json({
        success: false,
        message: 'Please provide customer name, email, phone, and delivery address'
      });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty. Please add items to place an order.'
      });
    }

    // Calculate Subtotal from items
    const subtotal = items.reduce((sum, item) => sum + (Number(item.price) * Number(item.quantity)), 0);

    // Apply Coupon discount if valid
    let discount = 0;
    if (couponCode && couponCode.toUpperCase() === 'SWEET10') {
      discount = Number((subtotal * 0.10).toFixed(2)); // 10% discount
    } else if (couponCode && couponCode.toUpperCase() === 'FIRST5') {
      discount = 5.00;
    }

    const deliveryFee = subtotal > 35 ? 0 : 3.50; // Free delivery over $35
    const totalAmount = Number((subtotal - discount + deliveryFee).toFixed(2));

    const orderPayload = {
      orderId: 'GCB-' + Math.floor(100000 + Math.random() * 900000),
      customerName,
      customerEmail,
      customerPhone,
      deliveryAddress: {
        street: deliveryAddress.street,
        city: deliveryAddress.city || 'Downtown',
        postalCode: deliveryAddress.postalCode || '560001'
      },
      items,
      subtotal: Number(subtotal.toFixed(2)),
      discount,
      deliveryFee,
      totalAmount,
      paymentMethod: paymentMethod || 'COD',
      specialInstructions: specialInstructions || 'Fresh baked delivery',
      status: 'Pending',
      estimatedDelivery: '35 - 50 mins'
    };

    if (mongoose.connection.readyState === 1) {
      const createdOrder = await Order.create(orderPayload);
      return res.status(201).json({
        success: true,
        message: 'Order placed successfully!',
        data: createdOrder
      });
    }

    // Fallback store handling
    const createdFallbackOrder = {
      ...orderPayload,
      _id: 'ord_' + (fallbackStore.orders.length + 1),
      createdAt: new Date().toISOString()
    };
    fallbackStore.orders.unshift(createdFallbackOrder);

    res.status(201).json({
      success: true,
      message: 'Order placed successfully!',
      data: createdFallbackOrder
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all orders (for admin order management)
// @route   GET /api/orders
// @access  Public/Admin
const getAllOrders = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const orders = await Order.find().sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        count: orders.length,
        data: orders
      });
    }

    res.status(200).json({
      success: true,
      count: fallbackStore.orders.length,
      data: fallbackStore.orders
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single order details by ID or orderId
// @route   GET /api/orders/:id
// @access  Public
const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1) {
      let order = await Order.findById(id).catch(() => null);
      if (!order) {
        order = await Order.findOne({ orderId: id });
      }

      if (!order) {
        return res.status(404).json({ success: false, message: 'Order not found' });
      }
      return res.status(200).json({ success: true, data: order });
    }

    const order = fallbackStore.orders.find(o => o._id === id || o.orderId === id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

// @desc    Update order preparation/delivery status
// @route   PATCH /api/orders/:id/status
// @access  Public/Admin
const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['Pending', 'Baking', 'Out for Delivery', 'Delivered', 'Cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    if (mongoose.connection.readyState === 1) {
      let updated = await Order.findByIdAndUpdate(id, { status }, { new: true });
      if (!updated) {
        updated = await Order.findOneAndUpdate({ orderId: id }, { status }, { new: true });
      }

      if (!updated) {
        return res.status(404).json({ success: false, message: 'Order not found' });
      }

      return res.status(200).json({ success: true, data: updated });
    }

    const order = fallbackStore.orders.find(o => o._id === id || o.orderId === id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    order.status = status;
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus
};
