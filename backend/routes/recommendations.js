const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getRecommendations,
  getRelatedProducts,
  getFrequentlyBoughtTogether,
  getTrendingProducts
} = require('../controllers/recommendationController');

// Protected route - personalized recommendations
router.get('/', protect, getRecommendations);

// Public routes
router.get('/related/:productId', getRelatedProducts);
router.get('/frequently-bought/:productId', getFrequentlyBoughtTogether);
router.get('/trending', getTrendingProducts);

module.exports = router;

