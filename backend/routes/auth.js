const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Meditation = require('../models/Meditation');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');
const multer = require('multer');
const crypto = require('crypto');

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '..', 'assets', 'images', 'custom');
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Generate unique filename with timestamp and random hash
    const uniqueSuffix = Date.now() + '-' + crypto.randomBytes(6).toString('hex');
    const extension = path.extname(file.originalname);
    cb(null, 'meditation-' + uniqueSuffix + extension);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    // Only allow image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// Function to extract audio duration using ffprobe
const getAudioDuration = async (filePath) => {
  return new Promise((resolve, reject) => {
    const ffprobePath = path.join(path.dirname(process.env.FFMPEG_PATH || 'C:\\ffmpeg\\ffmpeg-7.1.1-essentials_build\\bin\\ffmpeg.exe'), 'ffprobe.exe');
    
    const ffprobe = spawn(ffprobePath, [
      '-v', 'quiet',
      '-print_format', 'json',
      '-show_format',
      '-show_streams',
      filePath
    ]);

    let output = '';
    let error = '';

    ffprobe.stdout.on('data', (data) => {
      output += data.toString();
    });

    ffprobe.stderr.on('data', (data) => {
      error += data.toString();
    });

    ffprobe.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`FFprobe failed with code ${code}: ${error}`));
        return;
      }

      try {
        const metadata = JSON.parse(output);
        const duration = parseFloat(metadata.format.duration);
        resolve(duration);
      } catch (parseError) {
        reject(new Error(`Failed to parse ffprobe output: ${parseError.message}`));
      }
    });
  });
};

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
    
    // Initialize credits for new user
    await user.initializeCredits();
    
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        username: user.username,
        credits: user.credits,
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
        credits: user.credits,
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

// Upload custom image for meditation
router.post('/meditation/:meditationId/upload-image', upload.single('image'), async (req, res) => {
  try {
    const { meditationId } = req.params;
    
    if (!req.file) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }
    
    // Find the meditation
    const meditation = await Meditation.findById(meditationId);
    if (!meditation) {
      return res.status(404).json({ error: 'Meditation not found' });
    }
    
    // Delete old custom image if exists
    if (meditation.customImage && meditation.customImage.filename) {
      const oldImagePath = path.join(__dirname, '..', 'assets', 'images', 'custom', meditation.customImage.filename);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }
    
    // Save new image info
    meditation.customImage = {
      filename: req.file.filename,
      originalName: req.file.originalname,
      uploadedAt: new Date()
    };
    
    await meditation.save();
    
    res.json({
      message: 'Image uploaded successfully',
      imageUrl: `/assets/images/custom/${req.file.filename}`,
      filename: req.file.filename
    });
    
  } catch (error) {
    console.error('Error uploading image:', error);
    // Clean up uploaded file on error
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// Delete custom image for meditation
router.delete('/meditation/:meditationId/custom-image', async (req, res) => {
  try {
    const { meditationId } = req.params;
    
    const meditation = await Meditation.findById(meditationId);
    if (!meditation) {
      return res.status(404).json({ error: 'Meditation not found' });
    }
    
    if (meditation.customImage && meditation.customImage.filename) {
      // Delete the image file
      const imagePath = path.join(__dirname, '..', 'assets', 'images', 'custom', meditation.customImage.filename);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
      
      // Remove from database
      meditation.customImage = undefined;
      await meditation.save();
      
      res.json({ message: 'Custom image deleted successfully' });
    } else {
      res.status(404).json({ error: 'No custom image found' });
    }
    
  } catch (error) {
    console.error('Error deleting custom image:', error);
    res.status(500).json({ error: 'Failed to delete custom image' });
  }
});

// Update existing audio files with duration
router.post('/update-audio-durations', async (req, res) => {
  try {
    console.log('Starting audio duration update process...');
    
    // Get all meditations with audio files
    const meditations = await Meditation.find({
      'audioFiles.0': { $exists: true }
    });
    
    let updatedCount = 0;
    let errorCount = 0;
    
    for (const meditation of meditations) {
      let meditationUpdated = false;
      
      for (let i = 0; i < meditation.audioFiles.length; i++) {
        const audioFile = meditation.audioFiles[i];
        
        // Skip if duration already exists
        if (audioFile.duration) {
          continue;
        }
        
        // Construct path to audio file
        const audioPath = path.join(__dirname, '..', 'assets', 'meditations', audioFile.filename);
        
        // Check if file exists
        if (!fs.existsSync(audioPath)) {
          console.warn(`Audio file not found: ${audioPath}`);
          errorCount++;
          continue;
        }
        
        try {
          // Extract duration
          const duration = await getAudioDuration(audioPath);
          
          // Update the audio file with duration
          meditation.audioFiles[i].duration = duration;
          meditationUpdated = true;
          
          console.log(`Updated ${audioFile.filename} with duration: ${duration}s`);
          updatedCount++;
        } catch (durationError) {
          console.error(`Failed to extract duration from ${audioFile.filename}:`, durationError.message);
          errorCount++;
        }
      }
      
      // Save meditation if any audio files were updated
      if (meditationUpdated) {
        await meditation.save();
      }
    }
    
    console.log(`Audio duration update completed. Updated: ${updatedCount}, Errors: ${errorCount}`);
    
    res.json({
      message: 'Audio duration update completed',
      updatedCount,
      errorCount,
      totalProcessed: updatedCount + errorCount
    });
    
  } catch (error) {
    console.error('Error updating audio durations:', error);
    res.status(500).json({ error: 'Failed to update audio durations' });
  }
});

// Credit Management Routes

// Get user credits and stats
router.get('/user/:id/credits', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({
      credits: user.credits,
      totalCreditsEarned: user.totalCreditsEarned,
      totalCreditsSpent: user.totalCreditsSpent
    });
  } catch (error) {
    console.error('Error fetching user credits:', error);
    res.status(500).json({ error: 'Failed to fetch credits' });
  }
});

// Get credit transaction history
router.get('/user/:id/credit-history', async (req, res) => {
  try {
    const { limit = 20, offset = 0 } = req.query;
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Sort transactions by newest first and apply pagination
    const transactions = user.creditTransactions
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(parseInt(offset), parseInt(offset) + parseInt(limit));
    
    res.json({
      transactions,
      total: user.creditTransactions.length
    });
  } catch (error) {
    console.error('Error fetching credit history:', error);
    res.status(500).json({ error: 'Failed to fetch credit history' });
  }
});

// Spend credits (internal route for meditation generation/sharing)
router.post('/user/:id/credits/spend', async (req, res) => {
  try {
    const { amount, type, description, relatedId } = req.body;
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    if (!user.hasEnoughCredits(amount)) {
      return res.status(400).json({ 
        error: 'Insufficient credits',
        currentCredits: user.credits,
        required: amount
      });
    }
    
    await user.spendCredits(amount, type, description, relatedId);
    
    res.json({
      success: true,
      creditsRemaining: user.credits,
      transaction: {
        type,
        amount: -amount,
        description,
        relatedId
      }
    });
  } catch (error) {
    console.error('Error spending credits:', error);
    if (error.message === 'Insufficient credits') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Failed to spend credits' });
  }
});

// Add credits (for future payment integration)
router.post('/user/:id/credits/add', async (req, res) => {
  try {
    const { amount, type = 'purchase', description, relatedId } = req.body;
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    if (amount <= 0) {
      return res.status(400).json({ error: 'Amount must be positive' });
    }
    
    await user.addCredits(amount, type, description, relatedId);
    
    res.json({
      success: true,
      creditsTotal: user.credits,
      transaction: {
        type,
        amount,
        description,
        relatedId
      }
    });
  } catch (error) {
    console.error('Error adding credits:', error);
    res.status(500).json({ error: 'Failed to add credits' });
  }
});

module.exports = router;