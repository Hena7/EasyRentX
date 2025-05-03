const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = (roles = []) => {
  return async (req, res, next) => {
    try {
      // Get token from header
      const token = req.header('Authorization')?.replace('Bearer ', '');

      // Check if no token
      if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Get user from database
      const user = await User.findById(decoded.userId).select('-password');
      
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      // Check if role is required and user has required role
      if (roles.length && !roles.includes(user.role)) {
        return res.status(403).json({ message: 'Unauthorized access' });
      }

      // Add user info to request
      req.user = user;
      next();
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token has expired' });
      }
      res.status(401).json({ message: 'Token is not valid' });
    }
  };
};