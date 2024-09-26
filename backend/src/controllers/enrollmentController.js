const Course = require('../models/courseModel');

// Admin enrolls student in a course
exports.enrollStudent = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const studentId = req.body.studentId;
    course.enrolledStudents.push(studentId);
    await course.save();

    res.status(200).json({ message: 'Student enrolled successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin removes student from course
exports.removeStudent = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const studentId = req.body.studentId;
    course.enrolledStudents = course.enrolledStudents.filter(
      (id) => id.toString() !== studentId
    );
    await course.save();

    res.status(200).json({ message: 'Student removed successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get enrollment status (Students only)
exports.getEnrollmentStatus = async (req, res) => {
  try {
    const courses = await Course.find({ enrolledStudents: req.user._id });
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
