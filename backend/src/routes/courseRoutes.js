const express = require('express');
const {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require('../controllers/courseController');
const { protect, authorize } = require('../middlewares/authMiddleware');
const router = express.Router();

// Route to get all courses (for all authenticated users)
router.get('/getCourses', protect, getCourses);

// Route to get a specific course by ID (for all authenticated users)
// router.get('/getCourseById/:id', protect, getCourseById);

// Route to create a new course (admin only)
router.post('/createCourse', protect, authorize('admin'), createCourse);

// Route to update an existing course by ID (admin and teacher)
router.put('/updateCourse/:id', protect, authorize('admin', 'teacher'), updateCourse);

// Route to delete a course by ID (admin only)
router.delete('/deleteCourse/:id', protect, authorize('admin'), deleteCourse);

module.exports = router;
