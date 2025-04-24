const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// Validation middleware
const registerValidation = [
  check('username', 'Username is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
];

const loginValidation = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
];

const profileUpdateValidation = [
  check('firstName', 'First name must be a string').optional().isString(),
  check('lastName', 'Last name must be a string').optional().isString(),
  check('phoneNumber', 'Phone number must be a string').optional().isString(),
  check('address', 'Address must be a string').optional().isString()
];

// Routes
router.post('/register', registerValidation, userController.register);
router.post('/login', loginValidation, userController.login);
router.get('/profile', auth, userController.getProfile);
router.put('/profile', auth, profileUpdateValidation, userController.updateProfile);

module.exports = router;