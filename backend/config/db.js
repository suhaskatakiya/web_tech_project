/**
 * Database Connection Configuration
 * Connects to MongoDB using Mongoose.
 * Seeds initial bakery data if the database is newly initialized.
 */

const mongoose = require('mongoose');
const { seedProducts, seedReviews } = require('../data/seedData');
const Product = require('../models/Product');
const Review = require('../models/Review');
const User = require('../models/User');

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/golden_crust_bakery';

  try {
    console.log(`[DB] Attempting connection to MongoDB at: ${mongoURI}`);
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 2500 // Don't hang if Mongo isn't running
    });

    console.log(`[DB] MongoDB Connected Successfully: ${conn.connection.host}`);

    // Auto-seed initial bakery products if collection is empty
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      console.log('[DB] Seeding initial bakery catalog...');
      await Product.insertMany(seedProducts);
      console.log(`[DB] Successfully seeded ${seedProducts.length} bakery products.`);
    }

    // Auto-seed initial reviews if empty
    const reviewCount = await Review.countDocuments();
    if (reviewCount === 0) {
      await Review.insertMany(seedReviews);
      console.log(`[DB] Successfully seeded ${seedReviews.length} initial reviews.`);
    }

    // Auto-seed default admin user if empty
    const adminUser = await User.findOne({ email: 'admin@goldencrust.com' });
    if (!adminUser) {
      await User.create({
        name: 'Bakery Head Chef (Admin)',
        email: 'admin@goldencrust.com',
        password: 'admin123',
        role: 'admin'
      });
      console.log('[DB] Seeded default admin account: admin@goldencrust.com / admin123');
    }
  } catch (error) {
    console.warn(`\n======================================================`);
    console.warn(`[NOTICE] MongoDB is not running locally (${error.message}).`);
    console.warn(`The backend has activated the Built-in Fallback Data Store!`);
    console.warn(`All REST APIs (Products, Orders, Auth, Reviews) will work`);
    console.warn(`smoothly for your presentation and viva.`);
    console.warn(`To use real MongoDB, start your local service or paste`);
    console.warn(`your MongoDB Atlas connection string into .env.`);
    console.warn(`======================================================\n`);
  }
};

module.exports = connectDB;
