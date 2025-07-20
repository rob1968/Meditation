const mongoose = require('mongoose');

const MeditationSchema = new mongoose.Schema({
  // Original text and metadata
  originalText: {
    type: String,
    required: true
  },
  
  // Edited text (draft functionality)
  editedText: {
    type: String,
    default: null
  },
  isDraft: {
    type: Boolean,
    default: false
  },
  draftSavedAt: {
    type: Date,
    default: null
  },
  originalLanguage: {
    type: String,
    required: true
  },
  meditationType: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  textHash: {
    type: String,
    required: true,
    unique: true
  },
  
  // User who created this meditation
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Optional for backward compatibility
  },
  
  // Translations in different languages
  translations: {
    type: Map,
    of: String,
    default: {}
  },
  
  // Generated audio files
  audioFiles: [{
    language: String,
    filename: String,
    voiceId: String,
    background: String,
    duration: {
      type: Number, // Duration in seconds
      default: null
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Custom image
  customImage: {
    filename: String,
    originalName: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  },
  
  // Text version history
  textHistory: [{
    text: String,
    version: Number,
    editedAt: {
      type: Date,
      default: Date.now
    },
    editedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  
  // Metadata
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
MeditationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create compound index for better performance
MeditationSchema.index({ textHash: 1, originalLanguage: 1 });
MeditationSchema.index({ meditationType: 1, duration: 1 });

module.exports = mongoose.model('Meditation', MeditationSchema);