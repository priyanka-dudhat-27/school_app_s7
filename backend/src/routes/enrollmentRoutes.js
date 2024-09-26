const express = require('express');
const {
  enrollStudent,
  removeStudent,
  getEnrollmentStatus,
} = require('../controllers/enrollmentController');
const { protect, authorize } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/:courseId/enroll', protect, authorize('admin'), enrollStudent);
router.post('/:courseId/remove', protect, authorize('admin'), removeStudent);
router.get('/status', protect, authorize('student'), getEnrollmentStatus);

module.exports = router;
