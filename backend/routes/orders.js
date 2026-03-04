const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const {
  createOrder,
  getOrderById,
  getMyOrders,
  getOrders,
  updateOrder,
  getOrderStats
} = require('../controllers/orderController');

// Import cart controller for cart routes
const {
  getCart,
  addToCart,
  updateCart,
  removeFromCart,
  clearCart
} = require('../controllers/cartController');

// Order routes
// Public/Protected routes
router.post('/', protect, createOrder);
router.get('/my-orders', protect, getMyOrders);
router.get('/:id', protect, getOrderById);

// Admin routes
router.get('/', protect, admin, getOrders);
router.put('/:id', protect, admin, updateOrder);
router.get('/admin/stats', protect, admin, getOrderStats);

// Cart routes
router.get('/cart', protect, getCart);
router.post('/cart', protect, addToCart);
router.put('/cart', protect, updateCart);
router.delete('/cart/:productId', protect, removeFromCart);
router.delete('/cart', protect, clearCart);

module.exports = router;

