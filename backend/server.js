
const fs = require('fs');
const path = require('path');
const morgan = require('morgan'); // For HTTP request logging

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const meditationRoute = require('./routes/meditation');
const authRoute = require('./routes/auth');
const app = express();

// Create a write stream (in append mode) for logging
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// Setup the logger
app.use(morgan('combined', { stream: accessLogStream }));

app.use(cors());
app.use(express.json());

// Serve static files from assets/meditations
app.use('/assets/meditations', express.static(path.join(__dirname, '../assets/meditations')));
// Serve static files from assets/images
app.use('/assets/images', express.static(path.join(__dirname, '../assets/images')));
app.use('/api/meditation', meditationRoute);
app.use('/api/auth', authRoute);

// Add a route for fetching voices
app.use('/api/voices', meditationRoute);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log("❌ MongoDB connection error:", err));

const PORT = process.env.PORT || 5002;
const HOST = process.env.HOST || '0.0.0.0'; // Listen on all interfaces

app.listen(PORT, HOST, () => {
  console.log(`🚀 Server running on http://${HOST}:${PORT}`);
  console.log(`🌐 Network access: http://192.168.68.111:${PORT}`);
});

// Centralized error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled server error:", err.stack);
  res.status(500).json({ error: 'An unexpected server error occurred. Please check server logs.' });
});
