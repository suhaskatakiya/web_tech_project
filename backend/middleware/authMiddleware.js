/**
 * Authentication Middleware
 * Validates JSON Web Tokens (JWT) sent in the HTTP Authorization header.
 * Secures private routes such as order history and admin management.
 */

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { users } = require('../config/fallbackStore');
const mongoose = require('mongoose');

// Verify token and attach user to request object
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Decode token using our JWT secret
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'golden_crust_super_secret_jwt_key_2026'
      );

      // Check if MongoDB is connected
      if (mongoose.connection.readyState === 1) {
        req.user = await User.findById(decoded.id).select('-password');
      } else {
        // Fallback user lookup
        req.user = users.find(u => u._id === decoded.id || u.email === decoded.email);
      }

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'User no longer exists. Authorization denied.'
        });
      }

      return next();
    } catch (error) {
      console.error('[Auth Middleware] Invalid token:', error.message);
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token. Please log in again.'
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No authorization token provided. Access denied.'
    });
  }
};

// Restrict route to admin role only
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Forbidden: Admin access required for this action'
    });
  }
};

module.exports = { protect, adminOnly };
