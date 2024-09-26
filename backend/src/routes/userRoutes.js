const express = require('express');
const {
  getUserProfile,
  updateUserProfile
} = require('../controllers/userController');
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

// Protected routes (accessible only to logged-in users)
router.get('/profile', protect, getUserProfile);             // Get user profile (only for logged-in users)
router.put('/profile', protect, updateUserProfile);          // Update user profile

module.exports = router;
