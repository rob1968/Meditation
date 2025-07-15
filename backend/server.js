
const fs = require('fs');
const path = require('path');
const morgan = require('morgan'); // For HTTP request logging

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const meditationRoute = require('./routes/meditation');
const app = express();

// Create a write stream (in append mode) for logging
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// Setup the logger
app.use(morgan('combined', { stream: accessLogStream }));

app.use(cors());
app.use(express.json());
app.use('/api/meditation', meditationRoute);

// Add a route for fetching voices
app.use('/api/voices', meditationRoute);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log("❌ MongoDB connection error:", err));

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Centralized error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled server error:", err.stack);
  res.status(500).json({ error: 'An unexpected server error occurred. Please check server logs.' });
});
