const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 20
  },
  
  // User's meditation history
  meditations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Meditation'
  }],
  
  // Metadata
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date,
    default: Date.now
  }
});

// Create index for better performance
UserSchema.index({ username: 1 });

module.exports = mongoose.model('User', UserSchema);