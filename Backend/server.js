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

// Import routes
const itemRoutes = require('./routes/items');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to EasyRentX API' });
});

// Use routes
app.use('/api/items', itemRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes); // Mount auth routes to match frontend API endpoints

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
const MAX_PORT_ATTEMPTS = 10;

const startServer = async (initialPort) => {
  let currentPort = initialPort;
  
  for (let attempt = 0; attempt < MAX_PORT_ATTEMPTS; attempt++) {
    try {
      await new Promise((resolve, reject) => {
        const server = app.listen(currentPort, () => {
          console.log(`Server is running on port ${currentPort}`);
          resolve();
        }).on('error', (err) => {
          if (err.code === 'EADDRINUSE') {
            console.log(`Port ${currentPort} is in use, trying port ${currentPort + 1}`);
            currentPort++;
            reject(err);
          } else {
            reject(err);
          }
        });
      });
      // If we get here, the server started successfully
      break;
    } catch (err) {
      if (attempt === MAX_PORT_ATTEMPTS - 1) {
        console.error('Could not find an available port after multiple attempts');
        process.exit(1);
      }
      // Continue to next iteration if it's a port in use error
      if (err.code !== 'EADDRINUSE') {
        console.error('Error starting server:', err);
        process.exit(1);
      }
    }
  }
};

startServer(PORT);