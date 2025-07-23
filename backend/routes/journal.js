const express = require('express');
const router = express.Router();
const JournalEntry = require('../models/JournalEntry');
const User = require('../models/User');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const multer = require('multer');
const FormData = require('form-data');

// Create journals audio directory if it doesn't exist
const journalsDir = path.join(__dirname, '../../assets/audio/journals');
if (!fs.existsSync(journalsDir)) {
  fs.mkdirSync(journalsDir, { recursive: true });
}

// Set up multer for file uploads
const upload = multer({
  dest: path.join(__dirname, '../../temp/'),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit (Google Speech-to-Text sync max)
  },
  fileFilter: (req, file, cb) => {
    // Accept audio files supported by Google Speech-to-Text
    const allowedMimes = [
      'audio/webm',
      'audio/mp4',
      'audio/mpeg',
      'audio/wav',
      'audio/ogg',
      'audio/x-m4a',
      'audio/mp3',
      'audio/flac'
    ];
    
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      console.log('Rejected file type:', file.mimetype);
      cb(new Error('Invalid audio format. Supported formats: WebM, MP4, WAV, MP3, OGG, FLAC'), false);
    }
  }
});

// Get today's journal entry for user
router.get('/user/:userId/today', async (req, res) => {
  try {
    const { userId } = req.params;
    
    console.log('Fetching today\'s journal entry for user:', userId);
    
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000);
    
    const todayEntry = await JournalEntry.findOne({
      userId,
      date: {
        $gte: startOfDay,
        $lt: endOfDay
      }
    }).populate('userId', 'username');
    
    console.log('Today\'s entry found:', !!todayEntry);
    
    res.json({
      success: true,
      entry: todayEntry,
      hasEntry: !!todayEntry
    });
  } catch (error) {
    console.error('Error fetching today\'s journal entry:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch today\'s journal entry' });
  }
});

// Get user's journal entries
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 20, mood, tags, startDate, endDate } = req.query;
    
    console.log('Fetching journal entries for user:', userId);
    
    // Build filter query
    let filter = { userId };
    
    if (mood && mood !== 'all') {
      filter.mood = mood;
    }
    
    if (tags) {
      const tagArray = tags.split(',').map(tag => tag.trim());
      filter.tags = { $in: tagArray };
    }
    
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }
    
    console.log('Filter:', filter);
    
    const entries = await JournalEntry.find(filter)
      .sort({ date: -1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('userId', 'username');
    
    const total = await JournalEntry.countDocuments(filter);
    
    console.log('Found entries:', entries.length);
    
    res.json({
      success: true,
      entries,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching journal entries:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch journal entries' });
  }
});

// Create new journal entry or update existing daily entry
router.post('/create', async (req, res) => {
  try {
    const { userId, title, content, mood, tags, date } = req.body;
    
    if (!userId || !title || !content) {
      return res.status(400).json({ 
        success: false, 
        error: 'User ID, title, and content are required' 
      });
    }
    
    const entryDate = date ? new Date(date) : new Date();
    // Normalize to start of day for consistent comparison
    const normalizedDate = new Date(entryDate.getFullYear(), entryDate.getMonth(), entryDate.getDate());
    
    console.log('Creating/updating journal entry for date:', normalizedDate);
    
    // Check if entry already exists for this date
    const existingEntry = await JournalEntry.findOne({
      userId,
      date: {
        $gte: normalizedDate,
        $lt: new Date(normalizedDate.getTime() + 24 * 60 * 60 * 1000)
      }
    });
    
    if (existingEntry) {
      console.log('Found existing entry for date, updating it');
      
      // Update existing entry - append content
      existingEntry.content = existingEntry.content + '\n\n' + content.trim();
      
      // Update mood if provided
      if (mood && typeof mood === 'string' && mood.trim()) {
        existingEntry.mood = mood.trim();
      }
      
      // Merge tags if provided
      if (tags && Array.isArray(tags) && tags.length > 0) {
        const newTags = tags.map(tag => tag.trim()).filter(tag => tag.length > 0);
        const existingTags = existingEntry.tags || [];
        // Combine and deduplicate tags
        existingEntry.tags = [...new Set([...existingTags, ...newTags])];
      }
      
      await existingEntry.save();
      await existingEntry.populate('userId', 'username');
      
      res.json({
        success: true,
        entry: existingEntry,
        message: 'Journal entry updated successfully',
        wasUpdated: true
      });
    } else {
      // Create new entry
      const entryData = {
        userId,
        title: title.trim(),
        content: content.trim(),
        date: normalizedDate
      };

      // Only add mood if it's provided and valid
      if (mood && typeof mood === 'string' && mood.trim()) {
        entryData.mood = mood.trim();
      }

      // Only add tags if they exist
      if (tags && Array.isArray(tags) && tags.length > 0) {
        entryData.tags = tags.map(tag => tag.trim()).filter(tag => tag.length > 0);
      }

      const newEntry = new JournalEntry(entryData);
      
      await newEntry.save();
      await newEntry.populate('userId', 'username');
      
      res.json({
        success: true,
        entry: newEntry,
        message: 'Journal entry created successfully',
        wasUpdated: false
      });
    }
  } catch (error) {
    console.error('Error creating/updating journal entry:', error);
    res.status(500).json({ success: false, error: 'Failed to create journal entry' });
  }
});

// Update journal entry
router.put('/:entryId', async (req, res) => {
  try {
    const { entryId } = req.params;
    const { userId, title, content, mood, tags } = req.body;
    
    console.log('Updating journal entry:', {
      entryId,
      userId,
      title,
      content: content?.substring(0, 50) + '...',
      mood,
      tags
    });
    
    const entry = await JournalEntry.findById(entryId);
    if (!entry) {
      console.log('Entry not found:', entryId);
      return res.status(404).json({ success: false, error: 'Journal entry not found' });
    }
    
    // Check if user owns this entry
    if (entry.userId.toString() !== userId) {
      console.log('Unauthorized update attempt:', {
        entryUserId: entry.userId.toString(),
        requestUserId: userId
      });
      return res.status(403).json({ success: false, error: 'Not authorized to update this entry' });
    }
    
    console.log('Before update:', {
      title: entry.title,
      content: entry.content.substring(0, 50) + '...',
      mood: entry.mood,
      tags: entry.tags
    });
    
    // Update fields
    if (title !== undefined) entry.title = title.trim();
    if (content !== undefined) entry.content = content.trim();
    
    // Handle mood update carefully
    if (mood !== undefined) {
      if (mood && typeof mood === 'string' && mood.trim()) {
        entry.mood = mood.trim();
      } else {
        entry.mood = undefined; // Remove mood if empty/null
      }
    }
    
    // Handle tags update
    if (tags !== undefined) {
      if (Array.isArray(tags) && tags.length > 0) {
        entry.tags = tags.map(tag => tag.trim()).filter(tag => tag.length > 0);
      } else {
        entry.tags = []; // Empty array if no tags
      }
    }
    
    await entry.save();
    await entry.populate('userId', 'username');
    
    console.log('After update:', {
      title: entry.title,
      content: entry.content.substring(0, 50) + '...',
      mood: entry.mood,
      tags: entry.tags
    });
    
    res.json({
      success: true,
      entry,
      message: 'Journal entry updated successfully'
    });
  } catch (error) {
    console.error('Error updating journal entry:', error);
    res.status(500).json({ success: false, error: 'Failed to update journal entry' });
  }
});

// Delete journal entry
router.delete('/:entryId', async (req, res) => {
  try {
    const { entryId } = req.params;
    const { userId } = req.query;
    
    const entry = await JournalEntry.findById(entryId);
    if (!entry) {
      return res.status(404).json({ success: false, error: 'Journal entry not found' });
    }
    
    // Check if user owns this entry
    if (entry.userId.toString() !== userId) {
      return res.status(403).json({ success: false, error: 'Not authorized to delete this entry' });
    }
    
    // Delete audio file if it exists
    if (entry.audioFile && entry.audioFile.filename) {
      const audioPath = path.join(journalsDir, entry.audioFile.filename);
      if (fs.existsSync(audioPath)) {
        fs.unlinkSync(audioPath);
      }
    }
    
    await JournalEntry.findByIdAndDelete(entryId);
    
    res.json({
      success: true,
      message: 'Journal entry deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting journal entry:', error);
    res.status(500).json({ success: false, error: 'Failed to delete journal entry' });
  }
});

// Generate audio for journal entry using Eleven Labs
router.post('/:entryId/generate-audio', async (req, res) => {
  try {
    const { entryId } = req.params;
    const { userId, voiceId = 'EXAVITQu4vr4xnSDxMaL' } = req.body;
    
    console.log('Generate audio request received:', { entryId, userId, voiceId });
    
    // Check user credits
    const user = await User.findById(userId);
    console.log('User found:', user ? `${user.username} with ${user.credits} credits` : 'null');
    if (!user || user.credits < 1) {
      return res.status(400).json({ 
        success: false, 
        error: 'Insufficient credits. You need 1 credit to generate audio.' 
      });
    }
    
    const entry = await JournalEntry.findById(entryId);
    if (!entry) {
      return res.status(404).json({ success: false, error: 'Journal entry not found' });
    }
    
    // Check if user owns this entry
    if (entry.userId.toString() !== userId) {
      return res.status(403).json({ success: false, error: 'Not authorized to generate audio for this entry' });
    }
    
    // Create journal entry text for TTS
    const journalText = `${entry.title}. ${entry.content}`;
    
    // Generate unique filename
    const timestamp = Date.now();
    const filename = `journal_${timestamp}_${entryId.slice(-8)}.mp3`;
    const outputPath = path.join(journalsDir, filename);
    
    try {
      // Call Eleven Labs API
      const elevenLabsResponse = await axios.post(
        `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
        {
          text: journalText,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.65,
            similarity_boost: 0.2,
            style: 0.2,
            use_speaker_boost: true
          }
        },
        {
          headers: {
            'Accept': 'audio/mpeg',
            'Content-Type': 'application/json',
            'xi-api-key': process.env.ELEVEN_API_KEY
          },
          responseType: 'stream'
        }
      );

      // Save the audio file
      const writeStream = fs.createWriteStream(outputPath);
      elevenLabsResponse.data.pipe(writeStream);
      
      await new Promise((resolve, reject) => {
        writeStream.on('finish', resolve);
        writeStream.on('error', reject);
      });
      
      // Get audio duration (approximate based on text length)
      const estimatedDuration = Math.max(30, Math.floor(journalText.length / 10));
      
      // Update journal entry with audio info
      entry.audioFile = {
        filename,
        duration: estimatedDuration,
        language: 'nl',
        voiceId
      };
      await entry.save();
      
      // Deduct credit from user
      await user.spendCredits(1, 'generation', `Journal voice generation for "${entry.title}"`, entryId);
      
      res.json({
        success: true,
        entry,
        audioFile: entry.audioFile,
        message: 'Journal audio generated successfully'
      });
    } catch (ttsError) {
      console.error('Eleven Labs TTS generation error:', ttsError);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to generate audio. Please check your Eleven Labs API key and try again.' 
      });
    }
  } catch (error) {
    console.error('Error generating journal audio:', error);
    res.status(500).json({ success: false, error: 'Failed to generate journal audio' });
  }
});

// Share journal entry publicly
router.post('/:entryId/share', async (req, res) => {
  try {
    const { entryId } = req.params;
    const { userId } = req.body;
    
    const entry = await JournalEntry.findById(entryId);
    if (!entry) {
      return res.status(404).json({ success: false, error: 'Journal entry not found' });
    }
    
    // Check if user owns this entry
    if (entry.userId.toString() !== userId) {
      return res.status(403).json({ success: false, error: 'Not authorized to share this entry' });
    }
    
    // Update sharing status
    entry.isShared = true;
    entry.privacy = 'public';
    entry.sharedAt = new Date();
    
    await entry.save();
    await entry.populate('userId', 'username');
    
    res.json({
      success: true,
      entry,
      message: 'Journal entry shared successfully'
    });
  } catch (error) {
    console.error('Error sharing journal entry:', error);
    res.status(500).json({ success: false, error: 'Failed to share journal entry' });
  }
});

// Get shared journal entries (community)
router.get('/shared', async (req, res) => {
  try {
    const { page = 1, limit = 20, mood, tags, language } = req.query;
    
    // Build filter for shared entries
    let filter = { isShared: true, privacy: 'public' };
    
    if (mood && mood !== 'all') {
      filter.mood = mood;
    }
    
    if (tags) {
      const tagArray = tags.split(',').map(tag => tag.trim());
      filter.tags = { $in: tagArray };
    }
    
    if (language && language !== 'all') {
      filter['audioFile.language'] = language;
    }
    
    const entries = await JournalEntry.find(filter)
      .sort({ sharedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('userId', 'username')
      .select('-content'); // Don't expose full content in shared view initially
    
    const total = await JournalEntry.countDocuments(filter);
    
    res.json({
      success: true,
      entries,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching shared journal entries:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch shared journal entries' });
  }
});

// Get full shared journal entry (for reading)
router.get('/shared/:entryId', async (req, res) => {
  try {
    const { entryId } = req.params;
    
    const entry = await JournalEntry.findById(entryId)
      .populate('userId', 'username');
    
    if (!entry || !entry.isShared || entry.privacy !== 'public') {
      return res.status(404).json({ success: false, error: 'Shared journal entry not found' });
    }
    
    res.json({
      success: true,
      entry
    });
  } catch (error) {
    console.error('Error fetching shared journal entry:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch shared journal entry' });
  }
});

// Like/unlike journal entry
router.post('/:entryId/like', async (req, res) => {
  try {
    const { entryId } = req.params;
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({ success: false, error: 'User ID required' });
    }
    
    const entry = await JournalEntry.findById(entryId);
    if (!entry || !entry.isShared) {
      return res.status(404).json({ success: false, error: 'Shared journal entry not found' });
    }
    
    const result = await entry.toggleLike(userId);
    
    res.json({
      success: true,
      isLiked: result.isLiked,
      likeCount: result.likeCount
    });
  } catch (error) {
    console.error('Error liking journal entry:', error);
    res.status(500).json({ success: false, error: 'Failed to like journal entry' });
  }
});

// Get journal statistics for user
router.get('/stats/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const totalEntries = await JournalEntry.countDocuments({ userId });
    const sharedEntries = await JournalEntry.countDocuments({ userId, isShared: true });
    const entriesWithAudio = await JournalEntry.countDocuments({ 
      userId, 
      'audioFile.filename': { $exists: true } 
    });
    
    // Get mood distribution
    const moodStats = await JournalEntry.aggregate([
      { $match: { userId: new require('mongoose').Types.ObjectId(userId) } },
      { $group: { _id: '$mood', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    // Get recent activity (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentEntries = await JournalEntry.countDocuments({
      userId,
      createdAt: { $gte: thirtyDaysAgo }
    });
    
    res.json({
      success: true,
      stats: {
        totalEntries,
        sharedEntries,
        entriesWithAudio,
        recentEntries,
        moodStats
      }
    });
  } catch (error) {
    console.error('Error fetching journal stats:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch journal statistics' });
  }
});

// Transcribe audio to text using Google Speech-to-Text
router.post('/transcribe', upload.single('audio'), async (req, res) => {
  try {
    const { language = 'nl-NL' } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No audio file provided' });
    }

    console.log('Transcribing audio file with Google Speech-to-Text:', req.file.path);
    console.log('File details:', {
      size: req.file.size,
      mimetype: req.file.mimetype,
      originalname: req.file.originalname
    });

    // Check file size (max 10MB for Google Speech-to-Text sync)
    if (req.file.size > 10 * 1024 * 1024) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ success: false, error: 'Audio file too large. Maximum size is 10MB.' });
    }

    // Check if file exists and has content
    if (!fs.existsSync(req.file.path) || fs.statSync(req.file.path).size === 0) {
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({ success: false, error: 'Invalid or empty audio file' });
    }

    // Initialize Google Speech client
    const speech = require('@google-cloud/speech');
    let client;
    
    // Use API key if available, otherwise use default credentials
    if (process.env.GOOGLE_CLOUD_API_KEY) {
      client = new speech.SpeechClient({
        apiKey: process.env.GOOGLE_CLOUD_API_KEY
      });
    } else {
      client = new speech.SpeechClient();
    }

    // Read the audio file
    const audioBytes = fs.readFileSync(req.file.path).toString('base64');

    // Configure the request
    const request = {
      audio: {
        content: audioBytes,
      },
      config: {
        encoding: 'WEBM_OPUS', // Default for WebM files
        sampleRateHertz: 48000,
        languageCode: language,
        enableAutomaticPunctuation: true,
        model: 'latest_long', // Better for longer audio
      },
    };

    // Handle different audio formats
    if (req.file.mimetype) {
      if (req.file.mimetype.includes('wav')) {
        request.config.encoding = 'LINEAR16';
        request.config.sampleRateHertz = 44100;
      } else if (req.file.mimetype.includes('mp3') || req.file.mimetype.includes('mpeg')) {
        request.config.encoding = 'MP3';
      } else if (req.file.mimetype.includes('mp4')) {
        request.config.encoding = 'MP3';
      } else if (req.file.mimetype.includes('ogg')) {
        request.config.encoding = 'OGG_OPUS';
      }
    }

    console.log('Calling Google Speech-to-Text API with config:', {
      encoding: request.config.encoding,
      sampleRateHertz: request.config.sampleRateHertz,
      languageCode: request.config.languageCode
    });

    // Perform the speech recognition request
    const [response] = await client.recognize(request);
    
    // Clean up temporary file
    fs.unlinkSync(req.file.path);

    console.log('Google Speech-to-Text response received:', {
      hasResults: !!response.results && response.results.length > 0
    });

    if (response.results && response.results.length > 0) {
      // Combine all transcriptions
      let transcription = '';
      response.results.forEach(result => {
        if (result.alternatives && result.alternatives[0]) {
          transcription += result.alternatives[0].transcript + ' ';
        }
      });

      transcription = transcription.trim();
      
      if (transcription) {
        res.json({
          success: true,
          transcription: transcription
        });
      } else {
        res.status(400).json({ success: false, error: 'No speech detected in audio' });
      }
    } else {
      res.status(400).json({ success: false, error: 'No speech detected in audio' });
    }

  } catch (error) {
    console.error('Error transcribing audio with Google Speech-to-Text:', error);
    
    // Clean up temporary file if it exists
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    let errorMessage = 'Failed to transcribe audio';
    
    if (error.code === 'UNAUTHENTICATED') {
      errorMessage = 'Google Cloud API key not configured or invalid';
    } else if (error.code === 'INVALID_ARGUMENT') {
      errorMessage = 'Invalid audio format or configuration';
    } else if (error.code === 'RESOURCE_EXHAUSTED') {
      errorMessage = 'Google Speech-to-Text quota exceeded';
    } else if (error.message?.includes('not found')) {
      errorMessage = 'Google Speech-to-Text service not available';
    }
    
    res.status(500).json({ success: false, error: errorMessage });
  }
});

// Voice Cloning Endpoints

// Upload voice sample for cloning
router.post('/voice-clone/upload', upload.single('audio'), async (req, res) => {
  try {
    const { userId, voiceName } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No voice file provided' });
    }
    
    if (!userId || !voiceName) {
      return res.status(400).json({ 
        success: false, 
        error: 'User ID and voice name are required' 
      });
    }
    
    // Check user credits (voice cloning costs 2 credits)
    const user = await User.findById(userId);
    if (!user || user.credits < 2) {
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({ 
        success: false, 
        error: 'Insufficient credits. Voice cloning costs 2 credits.' 
      });
    }
    
    console.log('Uploading voice sample to ElevenLabs for cloning:', req.file.path);
    console.log('Voice file details:', {
      size: req.file.size,
      mimetype: req.file.mimetype,
      originalname: req.file.originalname
    });
    console.log('Using ElevenLabs API key:', process.env.ELEVEN_API_KEY ? 'Present' : 'Missing');
    
    try {
      // Create FormData for ElevenLabs API
      const formData = new FormData();
      formData.append('name', voiceName.trim());
      formData.append('files', fs.createReadStream(req.file.path), {
        filename: req.file.originalname || 'voice_sample.mp3',
        contentType: req.file.mimetype || 'audio/mpeg'
      });
      formData.append('description', `Custom voice for ${user.username}`);
      
      // Call ElevenLabs Voice Cloning API
      const cloneResponse = await axios.post(
        'https://api.elevenlabs.io/v1/voices/add',
        formData,
        {
          headers: {
            'Accept': 'application/json',
            'xi-api-key': process.env.ELEVEN_API_KEY,
            ...formData.getHeaders()
          },
          timeout: 60000 // 60 second timeout for voice cloning
        }
      );
      
      const voiceId = cloneResponse.data.voice_id;
      
      if (!voiceId) {
        throw new Error('No voice ID returned from ElevenLabs');
      }
      
      // Save voice to user's custom voices
      await user.addCustomVoice(voiceId, voiceName);
      console.log(`Voice ${voiceId} added to user ${user.username}'s custom voices`);
      
      // Deduct credits
      await user.spendCredits(2, 'generation', `Voice cloning: "${voiceName}"`, voiceId);
      
      // Clean up temporary file
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      
      res.json({
        success: true,
        voiceId: voiceId,
        voiceName: voiceName,
        message: 'Voice cloned successfully'
      });
      
    } catch (elevenLabsError) {
      console.error('ElevenLabs voice cloning error:', elevenLabsError);
      
      // Clean up temporary file
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      
      let errorMessage = 'Failed to clone voice. Please try again.';
      
      if (elevenLabsError.response?.status === 422) {
        errorMessage = 'Voice sample quality is insufficient. Please record a clearer sample.';
      } else if (elevenLabsError.response?.status === 429) {
        errorMessage = 'ElevenLabs API rate limit exceeded. Please try again later.';
      } else if (elevenLabsError.code === 'ECONNABORTED') {
        errorMessage = 'Voice cloning timed out. Please try with a shorter audio sample.';
      }
      
      res.status(500).json({ 
        success: false, 
        error: errorMessage
      });
    }
    
  } catch (error) {
    console.error('Error in voice cloning upload:', error);
    
    // Clean up temporary file
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    res.status(500).json({ success: false, error: 'Failed to process voice cloning request' });
  }
});

// Get user's custom voices
router.get('/voice-clone/list/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    
    const customVoices = user.getCustomVoices();
    console.log(`Found ${customVoices.length} custom voices for user ${user.username}:`, customVoices);
    
    res.json({
      success: true,
      voices: customVoices
    });
    
  } catch (error) {
    console.error('Error fetching custom voices:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch custom voices' });
  }
});

// Delete custom voice
router.delete('/voice-clone/:voiceId', async (req, res) => {
  try {
    const { voiceId } = req.params;
    const { userId } = req.query;
    
    if (!userId) {
      return res.status(400).json({ success: false, error: 'User ID required' });
    }
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    
    // Check if user owns this voice
    const voiceExists = user.customVoices.find(voice => voice.voiceId === voiceId);
    if (!voiceExists) {
      return res.status(404).json({ success: false, error: 'Voice not found' });
    }
    
    try {
      // Delete voice from ElevenLabs
      await axios.delete(`https://api.elevenlabs.io/v1/voices/${voiceId}`, {
        headers: {
          'xi-api-key': process.env.ELEVEN_API_KEY
        }
      });
    } catch (elevenLabsError) {
      console.warn('Failed to delete voice from ElevenLabs (continuing anyway):', elevenLabsError.message);
      // Continue with local deletion even if ElevenLabs deletion fails
    }
    
    // Remove voice from user's custom voices
    await user.removeCustomVoice(voiceId);
    
    res.json({
      success: true,
      message: 'Custom voice deleted successfully'
    });
    
  } catch (error) {
    console.error('Error deleting custom voice:', error);
    res.status(500).json({ success: false, error: 'Failed to delete custom voice' });
  }
});

module.exports = router;