/**
 * Golden Crust Bakery - Main Server Entry Point
 * Technology Stack: Node.js, Express.js, MongoDB (Mongoose), JWT, Bcrypt
 * 
 * Flow:
 * 1. Loads environment variables from .env
 * 2. Connects to MongoDB database (with graceful fallback handling)
 * 3. Configures Express middleware (CORS, JSON body parser)
 * 4. Mounts modular API routers (/api/products, /api/orders, /api/auth, /api/reviews)
 * 5. Handles global 404s and internal exceptions
 * 6. Starts the HTTP listener on PORT 5000
 */

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Import modular routes
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

// Import error handlers
const { notFound, errorHandler } = require('./middleware/errorHandler');

// Step 1: Initialize environment configuration
dotenv.config();

// Step 2: Initialize Express application instance
const app = express();

// Step 3: Connect to MongoDB
connectDB();

// Step 4: Core Middleware Setup
// Enable Cross-Origin Resource Sharing (allows React frontend on port 5173 to call this backend on port 5000)
app.use(cors({
  origin: '*', // Allows access from local Vite dev server
  credentials: true
}));

// Parse incoming HTTP requests with JSON payloads (replaces bodyParser.json())
app.use(express.json());

// Parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Step 5: Base Healthcheck / API Documentation Endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: '🥐 Welcome to the Golden Crust Artisan Bakery REST API!',
    version: '1.0.0',
    endpoints: {
      products: '/api/products',
      orders: '/api/orders',
      authentication: '/api/auth',
      reviews: '/api/reviews'
    }
  });
});

// Step 6: Mount Application Route Handlers
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/reviews', reviewRoutes);

// Step 7: Centralized Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Step 8: Start HTTP Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 Golden Crust Bakery Server running on Port ${PORT}`);
  console.log(`📡 API Base URL: http://localhost:${PORT}`);
  console.log(`🥞 Healthcheck:  http://localhost:${PORT}/`);
  console.log(`🥐 Products:     http://localhost:${PORT}/api/products`);
  console.log(`📦 Orders:       http://localhost:${PORT}/api/orders`);
  console.log(`⭐ Reviews:      http://localhost:${PORT}/api/reviews`);
  console.log(`======================================================\n`);
});
