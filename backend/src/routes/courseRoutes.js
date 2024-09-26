const express = require('express');
const {
  createCourse,
  getCourses,
  updateCourse,
  deleteCourse,
} = require('../controllers/courseController');
const { protect, authorize } = require('../middlewares/authMiddleware');
const router = express.Router();

router
  .route('/')
  .post(protect, authorize('admin'), createCourse)
  .get(protect, getCourses);

router
  .route('/:id')
  .put(protect, authorize('admin', 'teacher'), updateCourse)
  .delete(protect, authorize('admin'), deleteCourse);

module.exports = router;
