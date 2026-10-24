/**
 * Review & Cake Inquiry Routes
 */

const express = require('express');
const router = express.Router();
const {
  getReviews,
  addReview,
  handleCustomCakeInquiry
} = require('../controllers/reviewController');

// GET /api/reviews - Get all reviews
// POST /api/reviews - Submit a review
router.route('/')
  .get(getReviews)
  .post(addReview);

// POST /api/custom-cakes - Custom cake quote/inquiry
router.post('/custom-cake', handleCustomCakeInquiry);

module.exports = router;
