const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import your User model
const jwt = require('jsonwebtoken');

// Hardcoded JWT Secret
const jwtSecret = "MySecretisSecretjwt"; // You can replace this with your actual secret key

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract Bearer token
  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized: Token missing' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret); // Verify token
    req.user = decoded.user; // Attach decoded user info to the request
    next();
  } catch (error) {
    console.error('Invalid Token:', error);
    res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
  }
};

// **Existing Login and Signup Routes**
router.post(
  "/CreateUser",
  async (req, res) => {
    // Your existing CreateUser logic
  }
);

router.post(
  "/loginUser",
  async (req, res) => {
    // Your existing loginUser logic
  }
);

// **Fetch User Profile**
router.get('/profile', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token
    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized: Token not found' });
    }
  
    try {
      const decoded = jwt.verify(token, 'MySecretisSecretjwt'); // Verify token
      const user = await User.findById(decoded.user.id).select('-password'); // Exclude password
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      res.json({ success: true, profile: user });
    } catch (error) {
      console.error('Error in /profile route:', error.message);
      res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
    }
  });
  

module.exports = router;
