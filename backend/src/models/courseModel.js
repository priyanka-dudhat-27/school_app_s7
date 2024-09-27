const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  assignedTeacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        // Ensure startDate is earlier than or equal to endDate
        return this.endDate ? value <= this.endDate : true;
      },
      message: 'Start date must be earlier than or equal to the end date.',
    },
  },
  endDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        // Ensure endDate is later than or equal to startDate
        return this.startDate ? value >= this.startDate : true;
      },
      message: 'End date must be later than or equal to the start date.',
    },
  },
  enrolledStudents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

// Optional: Indexing to improve query performance
courseSchema.index({ assignedTeacher: 1 });
courseSchema.index({ startDate: 1 });

// Pre-save hook (optional) to ensure the dates are valid
courseSchema.pre('save', function (next) {
  if (this.startDate && this.endDate && this.startDate > this.endDate) {
    return next(new Error('Start date cannot be after end date.'));
  }
  next();
});

module.exports = mongoose.model('Course', courseSchema);
