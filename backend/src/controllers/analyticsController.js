const Course = require('../models/courseModel');
const Grade = require('../models/Grade');

// Get average grade for a course
exports.getCourseAverageGrade = async (req, res) => {
  try {
    const result = await Grade.aggregate([
      { $match: { course: req.params.courseId } },
      { $group: { _id: '$course', averageGrade: { $avg: '$grade' } } },
    ]);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get total number of students enrolled in a course
exports.getCourseEnrollmentCount = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);

    if (!course) return res.status(404).json({ message: 'Course not found' });

    const enrolledCount = course.enrolledStudents.length;

    res.status(200).json({ enrolledCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
