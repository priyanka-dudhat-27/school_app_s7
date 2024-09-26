const Grade = require('../models/gradeModel');

// Teacher assigns a grade to student
exports.assignGrade = async (req, res) => {
  const { course, student, grade } = req.body;

  try {
    const existingGrade = await Grade.findOne({ course, student });

    if (existingGrade) {
      existingGrade.grade = grade;
      await existingGrade.save();
      return res.status(200).json({ message: 'Grade updated' });
    }

    const newGrade = await Grade.create({ course, student, grade });
    res.status(201).json(newGrade);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get grades for a student
exports.getStudentGrades = async (req, res) => {
  try {
    const grades = await Grade.find({ student: req.user._id }).populate('course', 'title');
    res.status(200).json(grades);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
