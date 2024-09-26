const express = require('express');
const {
  assignGrade,
  getStudentGrades,
} = require('../controllers/gradeController');
const { protect, authorize } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/assign', protect, authorize('teacher'), assignGrade);
router.get('/student', protect, authorize('student'), getStudentGrades);

module.exports = router;
