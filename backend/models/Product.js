/**
 * Product Model
 * Defines the MongoDB schema and structure for Bakery items.
 * Uses Mongoose schema validation for data integrity.
 */

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Bakery item name is required'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Cakes', 'Breads', 'Pastries', 'Cookies', 'Savory']
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be a positive number']
    },
    originalPrice: {
      type: Number,
      default: function () {
        return this.price;
      }
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600'
    },
    dietary: {
      type: String,
      enum: ['Regular', 'Eggless', 'Vegan', 'Gluten-Free'],
      default: 'Regular'
    },
    isEggless: {
      type: Boolean,
      default: false
    },
    isBestseller: {
      type: Boolean,
      default: false
    },
    rating: {
      type: Number,
      default: 4.8,
      min: 1,
      max: 5
    },
    reviewsCount: {
      type: Number,
      default: 10
    },
    ingredients: {
      type: [String],
      default: []
    },
    allergens: {
      type: [String],
      default: []
    },
    calories: {
      type: String,
      default: '250 kcal'
    },
    inStock: {
      type: Boolean,
      default: true
    }
  },
  {
    // Automatically creates 'createdAt' and 'updatedAt' fields
    timestamps: true
  }
);

// Export Mongoose Model
module.exports = mongoose.model('Product', productSchema);
