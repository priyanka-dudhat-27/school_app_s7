// /src/controllers/courseController.js
const Course = require('../models/courseModel');
const User = require('../models/userModel');

// Create a new course
exports.createCourse = async (req, res) => {
    const { title, description, assignedTeacher, startDate, endDate } = req.body;
  
    try {
      // First, find the teacher by name or email or however you're identifying them
      const teacher = await User.findOne({ name: assignedTeacher }); // or { email: assignedTeacher }
  
      if (!teacher) {
        return res.status(400).json({ message: 'Teacher not found' });
      }
  
      // Now create the course using the teacher's ObjectId
      const course = await Course.create({
        title,
        description,
        assignedTeacher: teacher._id, // Assign the teacher's ObjectId
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
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete course (Admin only)
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json({ message: 'Course deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
