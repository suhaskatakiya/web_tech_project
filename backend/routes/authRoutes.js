/**
 * Auth Routes
 * Endpoints for user registration, login, and profile access.
 */

const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getProfile
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// POST /api/auth/register - Register new account
router.post('/register', registerUser);

// POST /api/auth/login - User log in
router.post('/login', loginUser);

// GET /api/auth/profile - Get profile of logged in user (Protected)
router.get('/profile', protect, getProfile);

module.exports = router;
