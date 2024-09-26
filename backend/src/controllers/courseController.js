const Course = require('../models/courseModel');

// Admin creates a course
exports.createCourse = async (req, res) => {
  const { title, description, assignedTeacher, startDate, endDate } = req.body;

  try {
    const course = await Course.create({
      title,
      description,
      assignedTeacher,
      startDate,
      endDate,
    });

    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all courses (for Admins/Teachers/Students)
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('assignedTeacher', 'name email');
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update course (for Admin and Teacher)
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete course (Admin only)
exports.deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Course deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
