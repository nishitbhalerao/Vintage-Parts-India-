const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const connectDB = require('../server/config/db');
const authRoutes = require('../server/routes/authRoutes');
const partRoutes = require('../server/routes/partRoutes');
const adminRoutes = require('../server/routes/adminRoutes');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../server/uploads')));

// Health check route - at root level
app.get('/health', (req, res) => {
  res.json({ message: 'VintageParts India API is running!' });
});

// API Routes
app.use('/auth', authRoutes);
app.use('/parts', partRoutes);
app.use('/admin', adminRoutes);

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Error:', error);
  
  if (error.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ message: 'File size too large. Maximum 5MB allowed.' });
  }
  
  if (error.message === 'Only image files are allowed') {
    return res.status(400).json({ message: 'Only image files are allowed' });
  }
  
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

module.exports = app;
