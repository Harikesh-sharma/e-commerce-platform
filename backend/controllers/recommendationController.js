const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User');

// Collaborative Filtering Recommendation Engine
// Uses user purchase history and similar products

// @desc    Get personalized recommendations
// @route   GET /api/recommendations
// @access  Private
exports.getRecommendations = async (req, res) => {
  try {
    const userId = req.user._id;
    const limit = parseInt(req.query.limit) || 8;

    // Get user's order history
    const userOrders = await Order.find({ user: userId, status: { $ne: 'cancelled' } })
      .populate('orderItems.product')
      .sort({ createdAt: -1 });

    if (userOrders.length === 0) {
      // Cold start: return popular products
      const popularProducts = await Product.find({ stock: { $gt: 0 } })
        .sort({ rating: -1, numReviews: -1 })
        .limit(limit);
      return res.json(popularProducts);
    }

    // Extract purchased product IDs and categories
    const purchasedProductIds = new Set();
    const purchasedCategories = new Set();
    const purchasedProductData = [];

    userOrders.forEach(order => {
      order.orderItems.forEach(item => {
        if (item.product) {
          purchasedProductIds.add(item.product._id.toString());
          const purchasedCategory = item.product.category;
          if (purchasedCategory) {
            purchasedCategories.add(purchasedCategory);
          }
          purchasedProductData.push(item.product);
        }
      });
    });

    // Find similar products based on categories
    const categoryProducts = await Product.find({
      category: { $in: Array.from(purchasedCategories) },
      _id: { $nin: Array.from(purchasedProductIds) },
      stock: { $gt: 0 }
    }).sort({ rating: -1 });

    // Find products similar to purchased ones (same category + high rating)
    const similarProducts = await Product.find({
      _id: { $nin: Array.from(purchasedProductIds) },
      stock: { $gt: 0 },
      $or: [
        { category: { $in: Array.from(purchasedCategories) } },
        { rating: { $gte: 4 } }
      ]
    })
      .sort({ rating: -1, numReviews: -1 })
      .limit(limit * 2);

    // Score and rank recommendations
    const scoredProducts = similarProducts.map(product => {
      let score = 0;
      
      // Boost score for same category
      if (purchasedCategories.has(product.category)) {
        score += 10;
      }
      
      // Boost score for high rating
      score += product.rating * 2;
      
      // Boost score for more reviews (popularity)
      score += product.numReviews * 0.1;
      
      // Boost for featured products
      if (product.isFeatured) {
        score += 5;
      }

      return { product, score };
    });

    // Sort by score and take top recommendations
    scoredProducts.sort((a, b) => b.score - a.score);
    const recommendations = scoredProducts.slice(0, limit).map(item => item.product);

    res.json(recommendations);
  } catch (error) {
    console.error('Get recommendations error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get related products (for product detail page)
// @route   GET /api/recommendations/related/:productId
// @access  Public
exports.getRelatedProducts = async (req, res) => {
  try {
    const { productId } = req.params;
    const limit = parseInt(req.query.limit) || 4;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Find products in same category, excluding current product
    const relatedProducts = await Product.find({
      _id: { $ne: productId },
      category: product.category,
      stock: { $gt: 0 }
    })
      .sort({ rating: -1 })
      .limit(limit);

    // If not enough products in same category, add from other categories
    if (relatedProducts.length < limit) {
      const additionalProducts = await Product.find({
        _id: { $ne: productId },
        category: { $ne: product.category },
        stock: { $gt: 0 }
      })
        .sort({ rating: -1 })
        .limit(limit - relatedProducts.length);

      relatedProducts.push(...additionalProducts);
    }

    res.json(relatedProducts);
  } catch (error) {
    console.error('Get related products error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get frequently bought together
// @route   GET /api/recommendations/frequently-bought/:productId
// @access  Public
exports.getFrequentlyBoughtTogether = async (req, res) => {
  try {
    const { productId } = req.params;
    const limit = parseInt(req.query.limit) || 3;

    // Find orders containing this product
    const ordersWithProduct = await Order.find({
      'orderItems.product': productId,
      status: { $ne: 'cancelled' }
    })
      .populate('orderItems.product')
      .limit(50);

    // Count co-occurrence of other products
    const productCooccurrence = {};

    ordersWithProduct.forEach(order => {
      order.orderItems.forEach(item => {
        if (item.product && item.product._id.toString() !== productId) {
          const pid = item.product._id.toString();
          productCooccurrence[pid] = (productCooccurrence[pid] || 0) + 1;
        }
      });
    });

    // Sort by frequency and get top products
    const sortedProducts = Object.entries(productCooccurrence)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit);

    if (sortedProducts.length === 0) {
      // Fallback: get products from same category
      const product = await Product.findById(productId);
      if (!product) {
        return res.json([]);
      }
      
      const fallbackProducts = await Product.find({
        _id: { $ne: productId },
        category: product.category,
        stock: { $gt: 0 }
      })
        .sort({ rating: -1 })
        .limit(limit);
      
      return res.json(fallbackProducts);
    }

    // Fetch the actual products
    const productIds = sortedProducts.map(([id]) => id);
    const products = await Product.find({ _id: { $in: productIds } });

    // Maintain the order based on co-occurrence frequency
    const productMap = {};
    products.forEach(p => {
      productMap[p._id.toString()] = p;
    });

    const frequentlyBought = productIds
      .map(id => productMap[id])
      .filter(Boolean);

    res.json(frequentlyBought);
  } catch (error) {
    console.error('Get frequently bought together error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get trending products based on recent orders
// @route   GET /api/recommendations/trending
// @access  Public
exports.getTrendingProducts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 8;

    // Get products from recent orders
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentOrderProducts = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo },
          status: { $ne: 'cancelled' }
        }
      },
      { $unwind: '$orderItems' },
      {
        $group: {
          _id: '$orderItems.product',
          orderCount: { $sum: '$orderItems.quantity' }
        }
      },
      { $sort: { orderCount: -1 } },
      { $limit: limit }
    ]);

    const productIds = recentOrderProducts.map(item => item._id);
    const products = await Product.find({ _id: { $in: productIds } });

    // Maintain the order based on popularity
    const productMap = {};
    products.forEach(p => {
      productMap[p._id.toString()] = p;
    });

    const trending = productIds
      .map(id => productMap[id])
      .filter(Boolean);

    res.json(trending);
  } catch (error) {
    console.error('Get trending products error:', error);
    res.status(500).json({ message: error.message });
  }
};

