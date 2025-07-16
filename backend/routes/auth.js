const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { username } = req.body;
    
    if (!username || username.trim().length < 3) {
      return res.status(400).json({ error: 'Username must be at least 3 characters long' });
    }
    
    // Check if username already exists
    const existingUser = await User.findOne({ username: username.trim() });
    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists' });
    }
    
    // Create new user
    const user = new User({
      username: username.trim()
    });
    
    await user.save();
    
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        username: user.username,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { username } = req.body;
    
    if (!username || username.trim().length < 3) {
      return res.status(400).json({ error: 'Username must be at least 3 characters long' });
    }
    
    // Find user
    const user = await User.findOne({ username: username.trim() });
    if (!user) {
      return res.status(404).json({ error: 'Username not found' });
    }
    
    // Update last login
    user.lastLogin = new Date();
    await user.save();
    
    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        username: user.username,
        lastLogin: user.lastLogin
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get user's meditation history
router.get('/user/:userId/meditations', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await User.findById(userId).populate({
      path: 'meditations',
      options: { sort: { createdAt: -1 } }
    });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({
      meditations: user.meditations
    });
  } catch (error) {
    console.error('Error fetching user meditations:', error);
    res.status(500).json({ error: 'Failed to fetch meditations' });
  }
});

// Get user statistics
router.get('/user/:userId/stats', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await User.findById(userId).populate('meditations');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const meditations = user.meditations;
    
    // Calculate statistics
    const totalMeditations = meditations.length;
    const totalTime = meditations.reduce((total, meditation) => total + meditation.duration, 0);
    
    // Count unique languages
    const languages = new Set();
    meditations.forEach(meditation => {
      languages.add(meditation.originalLanguage);
      if (meditation.audioFiles) {
        meditation.audioFiles.forEach(audio => {
          languages.add(audio.language);
        });
      }
    });
    
    // Count meditation types
    const meditationTypes = {};
    meditations.forEach(meditation => {
      meditationTypes[meditation.meditationType] = (meditationTypes[meditation.meditationType] || 0) + 1;
    });
    
    // Total audio files generated
    const totalAudioFiles = meditations.reduce((total, meditation) => {
      return total + (meditation.audioFiles ? meditation.audioFiles.length : 0);
    }, 0);
    
    res.json({
      totalMeditations,
      totalTime,
      uniqueLanguages: languages.size,
      totalAudioFiles,
      meditationTypes,
      favoriteType: Object.keys(meditationTypes).reduce((a, b) => 
        meditationTypes[a] > meditationTypes[b] ? a : b, 'sleep'
      )
    });
  } catch (error) {
    console.error('Error fetching user stats:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

module.exports = router;