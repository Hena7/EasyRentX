const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/easyrentx';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Import routes (to be created)
const itemRoutes = require('./routes/items');
const userRoutes = require('./routes/users');

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to EasyRentX API' });
});

// Use routes
app.use('/api/items', itemRoutes);
app.use('/api', userRoutes); // Changed to mount user routes at /api to match frontend requests

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});