/**
 * Review Model
 * Stores ratings and feedback left by bakery customers.
 */

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Reviewer name is required'],
      trim: true
    },
    rating: {
      type: Number,
      required: [true, 'Rating (1 to 5) is required'],
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      required: [true, 'Review comment cannot be empty'],
      trim: true
    },
    itemReviewed: {
      type: String,
      default: 'Overall Bakery Experience'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Review', reviewSchema);
