const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const SharedMeditation = require('../models/SharedMeditation');
const User = require('../models/User');
const Notification = require('../models/Notification');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../..', 'assets');
    
    if (file.fieldname === 'audio') {
      const audioDir = path.join(uploadDir, 'audio', 'shared');
      // Create directory if it doesn't exist
      try {
        require('fs').mkdirSync(audioDir, { recursive: true });
      } catch (err) {
        console.log('Audio dir already exists or error:', err.message);
      }
      cb(null, audioDir);
    } else if (file.fieldname === 'image') {
      const imageDir = path.join(uploadDir, 'images', 'shared');
      // Create directory if it doesn't exist
      try {
        require('fs').mkdirSync(imageDir, { recursive: true });
      } catch (err) {
        console.log('Image dir already exists or error:', err.message);
      }
      cb(null, imageDir);
    } else {
      cb(new Error('Invalid field name'), null);
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extension);
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit
  },
  fileFilter: function (req, file, cb) {
    if (file.fieldname === 'audio') {
      if (file.mimetype.startsWith('audio/')) {
        cb(null, true);
      } else {
        cb(new Error('Only audio files are allowed'), false);
      }
    } else if (file.fieldname === 'image') {
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('Only image files are allowed'), false);
      }
    } else {
      cb(new Error('Invalid field name'), false);
    }
  }
});

// Get all shared meditations (public, approved)
router.get('/shared-meditations', async (req, res) => {
  try {
    const { 
      type, 
      language, 
      search, 
      sortBy = 'createdAt', 
      sortOrder = 'desc',
      page = 1,
      limit = 20,
      featured = false
    } = req.query;

    const query = {
      isPublic: true,
      status: 'approved'
    };

    // Add filters
    if (type && type !== 'all') {
      query.meditationType = type;
    }
    
    if (language && language !== 'all') {
      query.language = language;
    }
    
    if (featured === 'true') {
      query.isFeatured = true;
      query.featuredUntil = { $gte: new Date() };
    }

    // Add search
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { 'author.username': { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const meditations = await SharedMeditation.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit))
      .populate('author.userId', 'username')
      .lean();

    // Add virtual fields
    const processedMeditations = meditations.map(meditation => ({
      ...meditation,
      likeCount: meditation.likes ? meditation.likes.length : 0,
      downloadCount: meditation.downloads ? meditation.downloads.length : 0,
      ratingCount: meditation.ratings ? meditation.ratings.length : 0
    }));

    const total = await SharedMeditation.countDocuments(query);

    res.json({
      success: true,
      meditations: processedMeditations,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching shared meditations:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch shared meditations' });
  }
});

// Get meditation by ID
router.get('/meditation/:id', async (req, res) => {
  try {
    const meditation = await SharedMeditation.findById(req.params.id)
      .populate('author.userId', 'username');

    if (!meditation) {
      return res.status(404).json({ success: false, error: 'Meditation not found' });
    }

    // Increment view count
    meditation.views += 1;
    await meditation.save();

    res.json({
      success: true,
      meditation: {
        ...meditation.toObject(),
        likeCount: meditation.likeCount,
        downloadCount: meditation.downloadCount,
        ratingCount: meditation.ratingCount
      }
    });
  } catch (error) {
    console.error('Error fetching meditation:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch meditation' });
  }
});

// Share a new meditation
router.post('/share', upload.fields([
  { name: 'audio', maxCount: 1 },
  { name: 'image', maxCount: 1 }
]), async (req, res) => {
  try {
    const {
      title,
      description,
      text,
      meditationType,
      language,
      duration,
      tags,
      isPremium = false,
      price = 0,
      currency = 'USD'
    } = req.body;

    // Validate required fields
    if (!title || !description || !text || !meditationType || !language || !duration) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields' 
      });
    }

    // Check if user has enough credits (1 credit per share)
    if (req.body.userId) {
      const user = await User.findById(req.body.userId);
      if (!user) {
        return res.status(404).json({ 
          success: false, 
          error: 'User not found' 
        });
      }
      
      if (!user.hasEnoughCredits(1)) {
        return res.status(400).json({ 
          success: false,
          error: 'Insufficient credits. You need 1 credit to share a meditation.',
          currentCredits: user.credits,
          required: 1
        });
      }
    }

    // Check if audio file was uploaded
    if (!req.files || !req.files.audio || req.files.audio.length === 0) {
      console.log('No audio file in request. Files:', req.files);
      return res.status(400).json({ 
        success: false, 
        error: 'Audio file is required' 
      });
    }

    const audioFile = req.files.audio[0];
    const imageFile = req.files.image ? req.files.image[0] : null;
    
    console.log('Audio file received:', {
      filename: audioFile.filename,
      originalname: audioFile.originalname,
      size: audioFile.size,
      path: audioFile.path
    });

    // Get user info
    const user = await User.findById(req.body.userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    // Parse tags
    const parsedTags = tags ? (Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim())) : [];

    // Create shared meditation
    const sharedMeditation = new SharedMeditation({
      title,
      description,
      text,
      meditationType,
      language,
      duration: parseInt(duration),
      audioFile: {
        filename: audioFile.filename,
        originalName: audioFile.originalname,
        size: audioFile.size
      },
      customImage: imageFile ? {
        filename: imageFile.filename,
        originalName: imageFile.originalname,
        size: imageFile.size,
        uploadDate: new Date()
      } : undefined,
      author: {
        userId: user._id,
        username: user.username
      },
      tags: parsedTags,
      isPremium: isPremium === 'true',
      price: parseFloat(price),
      currency
    });

    await sharedMeditation.save();

    // Deduct credits after successful sharing
    if (req.body.userId) {
      try {
        const user = await User.findById(req.body.userId);
        if (user) {
          await user.spendCredits(1, 'sharing', `Shared meditation: ${title}`, sharedMeditation._id.toString());
          console.log(`Deducted 1 credit from user ${req.body.userId} for sharing meditation. Remaining credits: ${user.credits}`);
        }
      } catch (creditError) {
        console.error('Error deducting credits for sharing:', creditError);
        // Don't fail the request if credit deduction fails, just log it
      }
    }

    res.json({
      success: true,
      meditation: sharedMeditation,
      message: 'Meditation shared successfully and is pending approval'
    });
  } catch (error) {
    console.error('Error sharing meditation:', error);
    res.status(500).json({ success: false, error: 'Failed to share meditation' });
  }
});

// Like/unlike meditation
router.post('/meditation/:id/like', async (req, res) => {
  try {
    const { userId } = req.body;
    const meditation = await SharedMeditation.findById(req.params.id);

    if (!meditation) {
      return res.status(404).json({ success: false, error: 'Meditation not found' });
    }

    const isLiked = meditation.isLikedBy(userId);

    if (isLiked) {
      await meditation.removeLike(userId);
    } else {
      await meditation.addLike(userId);
    }

    res.json({
      success: true,
      isLiked: !isLiked,
      likeCount: meditation.likeCount
    });
  } catch (error) {
    console.error('Error toggling like:', error);
    res.status(500).json({ success: false, error: 'Failed to toggle like' });
  }
});

// Download meditation
router.post('/meditation/:id/download', async (req, res) => {
  try {
    const { userId } = req.body;
    const meditation = await SharedMeditation.findById(req.params.id);

    if (!meditation) {
      return res.status(404).json({ success: false, error: 'Meditation not found' });
    }

    // Add download record
    await meditation.addDownload(userId);

    // Return audio file path for download
    const audioPath = path.join(__dirname, '../..', 'assets', 'audio', 'shared', meditation.audioFile.filename);
    
    res.download(audioPath, `${meditation.title}.mp3`, (err) => {
      if (err) {
        console.error('Error downloading file:', err);
        res.status(500).json({ success: false, error: 'Failed to download file' });
      }
    });
  } catch (error) {
    console.error('Error downloading meditation:', error);
    res.status(500).json({ success: false, error: 'Failed to download meditation' });
  }
});

// Rate meditation
router.post('/meditation/:id/rate', async (req, res) => {
  try {
    const { userId, rating, comment } = req.body;
    const meditation = await SharedMeditation.findById(req.params.id);

    if (!meditation) {
      return res.status(404).json({ success: false, error: 'Meditation not found' });
    }

    // Remove existing rating from this user
    meditation.ratings = meditation.ratings.filter(r => r.userId.toString() !== userId.toString());

    // Add new rating
    meditation.ratings.push({
      userId,
      rating: parseInt(rating),
      comment
    });

    // Update average rating
    await meditation.updateAverageRating();

    res.json({
      success: true,
      averageRating: meditation.averageRating,
      ratingCount: meditation.ratingCount
    });
  } catch (error) {
    console.error('Error rating meditation:', error);
    res.status(500).json({ success: false, error: 'Failed to rate meditation' });
  }
});

// Get user's shared meditations
router.get('/user/:userId/meditations', async (req, res) => {
  try {
    const meditations = await SharedMeditation.find({ 'author.userId': req.params.userId })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      meditations: meditations.map(meditation => ({
        ...meditation.toObject(),
        likeCount: meditation.likeCount,
        downloadCount: meditation.downloadCount,
        ratingCount: meditation.ratingCount
      }))
    });
  } catch (error) {
    console.error('Error fetching user meditations:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch user meditations' });
  }
});

// Delete shared meditation (only by owner)
router.delete('/meditation/:id', async (req, res) => {
  try {
    const { userId } = req.body;
    const meditation = await SharedMeditation.findById(req.params.id);

    if (!meditation) {
      return res.status(404).json({ success: false, error: 'Meditation not found' });
    }

    // Check if user is the owner
    if (meditation.author.userId.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, error: 'Not authorized to delete this meditation' });
    }

    // Delete associated files
    try {
      const audioPath = path.join(__dirname, '../..', 'assets', 'audio', 'shared', meditation.audioFile.filename);
      await fs.unlink(audioPath);
    } catch (err) {
      console.warn('Could not delete audio file:', err.message);
    }

    if (meditation.customImage) {
      try {
        const imagePath = path.join(__dirname, '../..', 'assets', 'images', 'shared', meditation.customImage.filename);
        await fs.unlink(imagePath);
      } catch (err) {
        console.warn('Could not delete image file:', err.message);
      }
    }

    await SharedMeditation.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Meditation deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting meditation:', error);
    res.status(500).json({ success: false, error: 'Failed to delete meditation' });
  }
});

// Get meditation statistics
router.get('/stats', async (req, res) => {
  try {
    const totalMeditations = await SharedMeditation.countDocuments({ isPublic: true, status: 'approved' });
    const totalUsers = await SharedMeditation.distinct('author.userId').length;
    
    const typeStats = await SharedMeditation.aggregate([
      { $match: { isPublic: true, status: 'approved' } },
      { $group: { _id: '$meditationType', count: { $sum: 1 } } }
    ]);

    const languageStats = await SharedMeditation.aggregate([
      { $match: { isPublic: true, status: 'approved' } },
      { $group: { _id: '$language', count: { $sum: 1 } } }
    ]);

    res.json({
      success: true,
      stats: {
        totalMeditations,
        totalUsers,
        typeDistribution: typeStats,
        languageDistribution: languageStats
      }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch statistics' });
  }
});

// Admin Routes
// Get all meditations for moderation (admin only)
router.get('/admin/meditations', async (req, res) => {
  try {
    const { adminUserId } = req.query;
    
    // Check if user is admin (rob)
    const adminUser = await User.findById(adminUserId);
    if (!adminUser || adminUser.username !== 'rob') {
      return res.status(403).json({ success: false, error: 'Unauthorized' });
    }

    const meditations = await SharedMeditation.find({})
      .sort({ createdAt: -1 })
      .populate('author.userId', 'username')
      .lean();

    // Add virtual fields
    const processedMeditations = meditations.map(meditation => ({
      ...meditation,
      likeCount: meditation.likes ? meditation.likes.length : 0,
      downloadCount: meditation.downloads ? meditation.downloads.length : 0,
      ratingCount: meditation.ratings ? meditation.ratings.length : 0
    }));

    res.json({
      success: true,
      meditations: processedMeditations
    });
  } catch (error) {
    console.error('Error fetching meditations for admin:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch meditations' });
  }
});

// Approve meditation (admin only)
router.patch('/admin/meditation/:id/approve', async (req, res) => {
  try {
    const { adminUserId, moderationNotes } = req.body;
    
    // Check if user is admin (rob)
    const adminUser = await User.findById(adminUserId);
    if (!adminUser || adminUser.username !== 'rob') {
      return res.status(403).json({ success: false, error: 'Unauthorized' });
    }

    const meditation = await SharedMeditation.findById(req.params.id);
    if (!meditation) {
      return res.status(404).json({ success: false, error: 'Meditation not found' });
    }

    meditation.status = 'approved';
    meditation.moderationNotes = moderationNotes || 'Approved by admin';
    await meditation.save();

    // Create notification for the user
    const notification = new Notification({
      userId: meditation.author.userId,
      meditationId: meditation._id,
      type: 'approved',
      title: '✅ Meditation Approved!',
      message: `Your meditation "${meditation.title}" has been approved and is now live in the community.`,
      moderationNotes: moderationNotes || 'Approved by admin'
    });
    
    await notification.save();

    res.json({
      success: true,
      meditation
    });
  } catch (error) {
    console.error('Error approving meditation:', error);
    res.status(500).json({ success: false, error: 'Failed to approve meditation' });
  }
});

// Reject meditation (admin only)
router.patch('/admin/meditation/:id/reject', async (req, res) => {
  try {
    const { adminUserId, moderationNotes } = req.body;
    
    // Check if user is admin (rob)
    const adminUser = await User.findById(adminUserId);
    if (!adminUser || adminUser.username !== 'rob') {
      return res.status(403).json({ success: false, error: 'Unauthorized' });
    }

    const meditation = await SharedMeditation.findById(req.params.id);
    if (!meditation) {
      return res.status(404).json({ success: false, error: 'Meditation not found' });
    }

    meditation.status = 'rejected';
    meditation.moderationNotes = moderationNotes;
    await meditation.save();

    // Create notification for the user
    const notification = new Notification({
      userId: meditation.author.userId,
      meditationId: meditation._id,
      type: 'rejected',
      title: '❌ Meditation Rejected',
      message: `Your meditation "${meditation.title}" was not approved for the community.`,
      moderationNotes: moderationNotes
    });
    
    await notification.save();

    res.json({
      success: true,
      meditation
    });
  } catch (error) {
    console.error('Error rejecting meditation:', error);
    res.status(500).json({ success: false, error: 'Failed to reject meditation' });
  }
});

// Debug route to check shared audio files
router.get('/debug/audio/:filename', async (req, res) => {
  try {
    const audioPath = path.join(__dirname, '../..', 'assets', 'audio', 'shared', req.params.filename);
    const exists = require('fs').existsSync(audioPath);
    
    res.json({
      filename: req.params.filename,
      path: audioPath,
      exists: exists,
      directory: path.join(__dirname, '../..', 'assets', 'audio', 'shared')
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;