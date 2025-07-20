const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');

// Directory for user meditations
const USER_MEDITATIONS_DIR = path.join(__dirname, '..', 'user-meditations');

// Directory for custom images
const IMAGES_DIR = path.join(__dirname, '../../assets/images/custom');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Ensure the directory exists
    if (!require('fs').existsSync(IMAGES_DIR)) {
      require('fs').mkdirSync(IMAGES_DIR, { recursive: true });
    }
    cb(null, IMAGES_DIR);
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
  fileFilter: (req, file, cb) => {
    // Only allow image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// Ensure the directory exists
const ensureDirectoryExists = async () => {
  try {
    await fs.access(USER_MEDITATIONS_DIR);
  } catch {
    await fs.mkdir(USER_MEDITATIONS_DIR, { recursive: true });
  }
};

// Save or update user meditation
router.post('/save', async (req, res) => {
  try {
    const { userId, meditationType, language, text, meditationId } = req.body;
    
    if (!userId || !meditationType || !language || !text) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    await ensureDirectoryExists();

    // Create user directory if it doesn't exist
    const userDir = path.join(USER_MEDITATIONS_DIR, userId);
    try {
      await fs.access(userDir);
    } catch {
      await fs.mkdir(userDir, { recursive: true });
    }

    // Generate or use existing meditation ID
    const id = meditationId || crypto.randomBytes(16).toString('hex');
    
    // Create meditation object
    const meditation = {
      id,
      userId,
      meditationType,
      language,
      text,
      createdAt: meditationId ? undefined : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Remove undefined fields
    Object.keys(meditation).forEach(key => 
      meditation[key] === undefined && delete meditation[key]
    );

    // Save to file
    const filename = `${meditationType}_${language}_${id}.json`;
    const filepath = path.join(userDir, filename);
    
    // If updating, preserve original creation date
    if (meditationId) {
      try {
        const existingData = JSON.parse(await fs.readFile(filepath, 'utf8'));
        meditation.createdAt = existingData.createdAt;
      } catch (error) {
        // File doesn't exist, treat as new
        meditation.createdAt = new Date().toISOString();
      }
    }

    await fs.writeFile(filepath, JSON.stringify(meditation, null, 2));

    res.json({ 
      success: true, 
      meditationId: id,
      message: 'Meditation saved successfully'
    });
  } catch (error) {
    console.error('Error saving user meditation:', error);
    res.status(500).json({ error: 'Failed to save meditation' });
  }
});

// Get all user meditations
router.get('/list/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const userDir = path.join(USER_MEDITATIONS_DIR, userId);
    
    try {
      await fs.access(userDir);
    } catch {
      // User directory doesn't exist, return empty array
      return res.json({ meditations: [] });
    }

    const files = await fs.readdir(userDir);
    const meditations = [];

    for (const file of files) {
      if (file.endsWith('.json')) {
        try {
          const filepath = path.join(userDir, file);
          const data = JSON.parse(await fs.readFile(filepath, 'utf8'));
          meditations.push(data);
        } catch (error) {
          console.error(`Error reading file ${file}:`, error);
        }
      }
    }

    // Sort by updatedAt descending
    meditations.sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );

    res.json({ meditations });
  } catch (error) {
    console.error('Error listing user meditations:', error);
    res.status(500).json({ error: 'Failed to list meditations' });
  }
});

// Get specific meditation
router.get('/:userId/:meditationId', async (req, res) => {
  try {
    const { userId, meditationId } = req.params;
    const userDir = path.join(USER_MEDITATIONS_DIR, userId);
    
    const files = await fs.readdir(userDir);
    
    for (const file of files) {
      if (file.includes(meditationId) && file.endsWith('.json')) {
        const filepath = path.join(userDir, file);
        const data = JSON.parse(await fs.readFile(filepath, 'utf8'));
        return res.json({ meditation: data });
      }
    }

    res.status(404).json({ error: 'Meditation not found' });
  } catch (error) {
    console.error('Error getting user meditation:', error);
    res.status(500).json({ error: 'Failed to get meditation' });
  }
});

// Mark meditation as shared
router.patch('/:userId/:meditationId/share', async (req, res) => {
  try {
    const { userId, meditationId } = req.params;
    const { sharedMeditationId, isShared } = req.body;
    
    if (!userId || !meditationId) {
      return res.status(400).json({ error: 'Missing userId or meditationId' });
    }

    const userDir = path.join(USER_MEDITATIONS_DIR, userId);
    const files = await fs.readdir(userDir);
    
    let targetFile = null;
    for (const file of files) {
      if (file.includes(meditationId) && file.endsWith('.json')) {
        targetFile = file;
        break;
      }
    }

    if (!targetFile) {
      return res.status(404).json({ error: 'Meditation not found' });
    }

    const filePath = path.join(userDir, targetFile);
    const meditation = JSON.parse(await fs.readFile(filePath, 'utf8'));
    
    // Update sharing status
    meditation.isShared = isShared;
    meditation.sharedMeditationId = sharedMeditationId;
    meditation.sharedAt = isShared ? new Date().toISOString() : undefined;
    meditation.updatedAt = new Date().toISOString();

    await fs.writeFile(filePath, JSON.stringify(meditation, null, 2), 'utf8');

    res.json({ success: true, meditation });
  } catch (error) {
    console.error('Error updating sharing status:', error);
    res.status(500).json({ error: 'Failed to update sharing status' });
  }
});

// Delete meditation
router.delete('/:userId/:meditationId', async (req, res) => {
  try {
    const { userId, meditationId } = req.params;
    const userDir = path.join(USER_MEDITATIONS_DIR, userId);
    
    const files = await fs.readdir(userDir);
    
    for (const file of files) {
      if (file.includes(meditationId) && file.endsWith('.json')) {
        const filepath = path.join(userDir, file);
        await fs.unlink(filepath);
        return res.json({ 
          success: true, 
          message: 'Meditation deleted successfully' 
        });
      }
    }

    res.status(404).json({ error: 'Meditation not found' });
  } catch (error) {
    console.error('Error deleting user meditation:', error);
    res.status(500).json({ error: 'Failed to delete meditation' });
  }
});

// Get meditations by type
router.get('/:userId/type/:meditationType', async (req, res) => {
  try {
    const { userId, meditationType } = req.params;
    const { language } = req.query;
    const userDir = path.join(USER_MEDITATIONS_DIR, userId);
    
    try {
      await fs.access(userDir);
    } catch {
      return res.json({ meditations: [] });
    }

    const files = await fs.readdir(userDir);
    const meditations = [];

    for (const file of files) {
      if (file.startsWith(`${meditationType}_`) && file.endsWith('.json')) {
        try {
          const filepath = path.join(userDir, file);
          const data = JSON.parse(await fs.readFile(filepath, 'utf8'));
          
          // Filter by language if specified
          if (!language || data.language === language) {
            meditations.push(data);
          }
        } catch (error) {
          console.error(`Error reading file ${file}:`, error);
        }
      }
    }

    meditations.sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );

    res.json({ meditations });
  } catch (error) {
    console.error('Error getting meditations by type:', error);
    res.status(500).json({ error: 'Failed to get meditations' });
  }
});

// Upload custom image for user meditation
router.post('/meditation/:meditationId/upload-image', upload.single('image'), async (req, res) => {
  try {
    const { meditationId } = req.params;
    const { userId } = req.body; // We'll need to pass userId in the request
    
    if (!req.file) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Find the meditation file
    const userDir = path.join(USER_MEDITATIONS_DIR, userId);
    const files = await fs.readdir(userDir);
    
    let meditationFile = null;
    for (const file of files) {
      if (file.includes(meditationId) && file.endsWith('.json')) {
        meditationFile = file;
        break;
      }
    }
    
    if (!meditationFile) {
      return res.status(404).json({ error: 'Meditation not found' });
    }

    // Read the meditation data
    const filepath = path.join(userDir, meditationFile);
    const meditation = JSON.parse(await fs.readFile(filepath, 'utf8'));
    
    // Delete old custom image if it exists
    if (meditation.customImage && meditation.customImage.filename) {
      try {
        const oldImagePath = path.join(IMAGES_DIR, meditation.customImage.filename);
        await fs.unlink(oldImagePath);
      } catch (error) {
        console.log('Could not delete old image:', error.message);
      }
    }
    
    // Update meditation with new image info
    meditation.customImage = {
      filename: req.file.filename,
      originalName: req.file.originalname,
      uploadedAt: new Date().toISOString()
    };
    meditation.updatedAt = new Date().toISOString();
    
    // Save updated meditation
    await fs.writeFile(filepath, JSON.stringify(meditation, null, 2));
    
    res.json({ 
      success: true, 
      customImage: meditation.customImage,
      message: 'Image uploaded successfully' 
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// Delete custom image for user meditation
router.delete('/meditation/:meditationId/custom-image', async (req, res) => {
  try {
    const { meditationId } = req.params;
    const { userId } = req.query; // Get userId from query params
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Find the meditation file
    const userDir = path.join(USER_MEDITATIONS_DIR, userId);
    const files = await fs.readdir(userDir);
    
    let meditationFile = null;
    for (const file of files) {
      if (file.includes(meditationId) && file.endsWith('.json')) {
        meditationFile = file;
        break;
      }
    }
    
    if (!meditationFile) {
      return res.status(404).json({ error: 'Meditation not found' });
    }

    // Read the meditation data
    const filepath = path.join(userDir, meditationFile);
    const meditation = JSON.parse(await fs.readFile(filepath, 'utf8'));
    
    // Delete the image file
    if (meditation.customImage && meditation.customImage.filename) {
      try {
        const imagePath = path.join(IMAGES_DIR, meditation.customImage.filename);
        await fs.unlink(imagePath);
      } catch (error) {
        console.log('Could not delete image file:', error.message);
      }
      
      // Remove custom image from meditation data
      delete meditation.customImage;
      meditation.updatedAt = new Date().toISOString();
      
      // Save updated meditation
      await fs.writeFile(filepath, JSON.stringify(meditation, null, 2));
    }
    
    res.json({ 
      success: true, 
      message: 'Custom image deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ error: 'Failed to delete image' });
  }
});

module.exports = router;