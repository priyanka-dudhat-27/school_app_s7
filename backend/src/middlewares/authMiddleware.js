// /src/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); 

// Middleware to protect routes
exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token with secret key
    req.user = await User.findById(decoded.id); // Find user based on the token payload
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized' });
  }
};

// Middleware to authorize user roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Not authorized to access this route' });
    }
    next(); // User is authorized, proceed
  };
};
