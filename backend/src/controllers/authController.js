const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Register a new user (Admin, Teacher, Student)
exports.register = async (req, res) => {
  const { name, email, password, role,username } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ name, email, password, role,username });

    const token = generateToken(user._id);

    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Login user
exports.login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const token = generateToken(user._id);
  
      // Include user information and role in the response
      res.json({
        token,
        user: {
          id: user._id,
          email: user.email,
          role: user.role // Include the user role
        }
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
