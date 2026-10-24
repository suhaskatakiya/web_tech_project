/**
 * Fallback In-Memory Bakery Store
 * Used automatically when local MongoDB is not running or offline,
 * ensuring the student can demo all CRUD features (add product, place order,
 * register/login, reviews) without server crashes during viva.
 */

const { seedProducts, seedReviews } = require('../data/seedData');
const bcrypt = require('bcryptjs');

let products = seedProducts.map((p, idx) => ({
  ...p,
  _id: 'prod_' + (idx + 1),
  createdAt: new Date().toISOString()
}));

let reviews = seedReviews.map((r, idx) => ({
  ...r,
  _id: 'rev_' + (idx + 1),
  createdAt: new Date().toISOString()
}));

let orders = [
  {
    _id: 'ord_1',
    orderId: 'GCB-849201',
    customerName: 'Aarav Patel',
    customerEmail: 'aarav@example.com',
    customerPhone: '+91 98765 43210',
    deliveryAddress: { street: '42 Baker Street, Indiranagar', city: 'Bengaluru', postalCode: '560038' },
    items: [
      { name: 'Artisan Belgian Truffle Cake', price: 28.50, quantity: 1, image: seedProducts[0].image },
      { name: 'Classic Sourdough Boule', price: 7.50, quantity: 2, image: seedProducts[1].image }
    ],
    subtotal: 43.50,
    discount: 4.35,
    deliveryFee: 3.50,
    totalAmount: 42.65,
    paymentMethod: 'COD',
    isPaid: false,
    status: 'Baking',
    createdAt: new Date(Date.now() - 35 * 60 * 1000).toISOString()
  }
];

let users = [
  {
    _id: 'usr_admin',
    name: 'Bakery Manager (Admin)',
    email: 'admin@goldencrust.com',
    password: bcrypt.hashSync('admin123', 10),
    role: 'admin'
  },
  {
    _id: 'usr_customer',
    name: 'Sample Customer',
    email: 'customer@goldencrust.com',
    password: bcrypt.hashSync('bakery123', 10),
    role: 'customer'
  }
];

module.exports = {
  products,
  reviews,
  orders,
  users
};
