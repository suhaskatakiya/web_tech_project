/**
 * Review & Customer Inquiry Controller
 * Manages customer feedback, star ratings, and custom cake inquiries.
 */

const mongoose = require('mongoose');
const Review = require('../models/Review');
const fallbackStore = require('../config/fallbackStore');

// @desc    Get all reviews
// @route   GET /api/reviews
// @access  Public
const getReviews = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const reviews = await Review.find().sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        count: reviews.length,
        data: reviews
      });
    }

    res.status(200).json({
      success: true,
      count: fallbackStore.reviews.length,
      data: fallbackStore.reviews
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add a new customer review
// @route   POST /api/reviews
// @access  Public
const addReview = async (req, res, next) => {
  try {
    const { name, rating, comment, itemReviewed } = req.body;

    if (!name || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: 'Please provide your name, star rating (1-5), and review comment'
      });
    }

    const reviewData = {
      name,
      rating: Number(rating),
      comment,
      itemReviewed: itemReviewed || 'Artisan Bakery Experience'
    };

    if (mongoose.connection.readyState === 1) {
      const newReview = await Review.create(reviewData);
      return res.status(201).json({
        success: true,
        message: 'Thank you for your review!',
        data: newReview
      });
    }

    const created = {
      ...reviewData,
      _id: 'rev_' + (fallbackStore.reviews.length + 1),
      date: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString()
    };
    fallbackStore.reviews.unshift(created);

    res.status(201).json({
      success: true,
      message: 'Thank you for your review!',
      data: created
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Submit a Custom Cake Special Order
// @route   POST /api/custom-cakes
// @access  Public
const handleCustomCakeInquiry = async (req, res, next) => {
  try {
    const {
      flavor,
      weight,
      tiers,
      frosting,
      eggless,
      messageOnCake,
      dateNeeded,
      customerName,
      customerPhone
    } = req.body;

    if (!customerName || !customerPhone || !flavor || !dateNeeded) {
      return res.status(400).json({
        success: false,
        message: 'Please provide customer name, phone, flavor, and delivery date'
      });
    }

    // Calculate approximate price for custom cake
    const baseRate = 30; // base price
    const weightMultiplier = parseFloat(weight) || 1;
    const tierMultiplier = tiers === '2 Tiers' ? 1.6 : tiers === '3 Tiers' ? 2.2 : 1.0;
    const egglessCharge = eggless ? 2.0 : 0;
    const estimatedPrice = (baseRate * weightMultiplier * tierMultiplier + egglessCharge).toFixed(2);

    const quoteId = 'CAKE-' + Math.floor(1000 + Math.random() * 9000);

    res.status(201).json({
      success: true,
      message: 'Custom cake inquiry received! Our master pastry chef will call to confirm within 2 hours.',
      quote: {
        quoteId,
        customerName,
        customerPhone,
        flavor,
        weight: `${weight} kg`,
        tiers: tiers || 'Single Tier',
        frosting: frosting || 'Swiss Meringue Buttercream',
        eggless: Boolean(eggless),
        messageOnCake: messageOnCake || 'None',
        dateNeeded,
        estimatedPrice: `$${estimatedPrice}`
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getReviews,
  addReview,
  handleCustomCakeInquiry
};
