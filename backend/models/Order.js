/**
 * Order Model
 * Stores placed bakery orders with customer information, cart items,
 * pricing breakdown, delivery instructions, and status.
 */

const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  image: String
});

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      unique: true,
      default: () => 'GCB-' + Math.floor(100000 + Math.random() * 900000)
    },
    customerName: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true
    },
    customerEmail: {
      type: String,
      required: [true, 'Customer email is required'],
      lowercase: true,
      trim: true
    },
    customerPhone: {
      type: String,
      required: [true, 'Contact phone number is required']
    },
    deliveryAddress: {
      street: { type: String, required: true },
      city: { type: String, default: 'Downtown' },
      postalCode: { type: String, default: '560001' }
    },
    items: [orderItemSchema],
    subtotal: {
      type: Number,
      required: true
    },
    discount: {
      type: Number,
      default: 0
    },
    deliveryFee: {
      type: Number,
      default: 3.50
    },
    totalAmount: {
      type: Number,
      required: true
    },
    specialInstructions: {
      type: String,
      default: 'Handle with care. Fresh baked goods.'
    },
    paymentMethod: {
      type: String,
      enum: ['COD', 'Card', 'UPI'],
      default: 'COD'
    },
    isPaid: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      enum: ['Pending', 'Baking', 'Out for Delivery', 'Delivered', 'Cancelled'],
      default: 'Pending'
    },
    estimatedDelivery: {
      type: String,
      default: '45 - 60 minutes'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Order', orderSchema);
