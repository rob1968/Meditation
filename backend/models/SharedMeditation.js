const mongoose = require('mongoose');

const sharedMeditationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
  text: {
    type: String,
    required: true,
    maxlength: 5000
  },
  meditationType: {
    type: String,
    required: true,
    enum: ['sleep', 'stress', 'focus', 'anxiety', 'energy', 'mindfulness', 'compassion', 'walking', 'breathing', 'morning']
  },
  language: {
    type: String,
    required: true,
    enum: ['en', 'es', 'fr', 'de', 'nl', 'zh', 'hi', 'ar', 'pt', 'ru', 'ja', 'ko', 'it']
  },
  duration: {
    type: Number,
    required: true,
    min: 1,
    max: 3600 // Max 1 hour
  },
  audioFile: {
    filename: {
      type: String,
      required: true
    },
    originalName: String,
    size: Number,
    uploadDate: {
      type: Date,
      default: Date.now
    }
  },
  customImage: {
    filename: String,
    originalName: String,
    size: Number,
    uploadDate: Date
  },
  author: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    username: {
      type: String,
      required: true
    }
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: 30
  }],
  isPublic: {
    type: Boolean,
    default: true
  },
  isPremium: {
    type: Boolean,
    default: false
  },
  price: {
    type: Number,
    default: 0,
    min: 0
  },
  currency: {
    type: String,
    default: 'USD',
    enum: ['USD', 'EUR', 'GBP', 'CAD', 'AUD']
  },
  likes: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    likedAt: {
      type: Date,
      default: Date.now
    }
  }],
  downloads: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    downloadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  views: {
    type: Number,
    default: 0
  },
  ratings: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      maxlength: 500
    },
    ratedAt: {
      type: Date,
      default: Date.now
    }
  }],
  averageRating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  moderationNotes: String,
  featuredUntil: Date,
  isFeatured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Indexes for efficient querying
sharedMeditationSchema.index({ meditationType: 1, language: 1 });
sharedMeditationSchema.index({ isPublic: 1, status: 1 });
sharedMeditationSchema.index({ 'author.userId': 1 });
sharedMeditationSchema.index({ createdAt: -1 });
sharedMeditationSchema.index({ averageRating: -1 });
sharedMeditationSchema.index({ isFeatured: 1, featuredUntil: 1 });

// Virtual for like count
sharedMeditationSchema.virtual('likeCount').get(function() {
  return this.likes ? this.likes.length : 0;
});

// Virtual for download count
sharedMeditationSchema.virtual('downloadCount').get(function() {
  return this.downloads ? this.downloads.length : 0;
});

// Virtual for rating count
sharedMeditationSchema.virtual('ratingCount').get(function() {
  return this.ratings ? this.ratings.length : 0;
});

// Method to check if user has liked the meditation
sharedMeditationSchema.methods.isLikedBy = function(userId) {
  return this.likes.some(like => like.userId.toString() === userId.toString());
};

// Method to check if user has downloaded the meditation
sharedMeditationSchema.methods.isDownloadedBy = function(userId) {
  return this.downloads.some(download => download.userId.toString() === userId.toString());
};

// Method to add a like
sharedMeditationSchema.methods.addLike = function(userId) {
  if (!this.isLikedBy(userId)) {
    this.likes.push({ userId });
    return this.save();
  }
  return Promise.resolve(this);
};

// Method to remove a like
sharedMeditationSchema.methods.removeLike = function(userId) {
  this.likes = this.likes.filter(like => like.userId.toString() !== userId.toString());
  return this.save();
};

// Method to add a download
sharedMeditationSchema.methods.addDownload = function(userId) {
  if (!this.isDownloadedBy(userId)) {
    this.downloads.push({ userId });
    return this.save();
  }
  return Promise.resolve(this);
};

// Method to update average rating
sharedMeditationSchema.methods.updateAverageRating = function() {
  if (this.ratings.length === 0) {
    this.averageRating = 0;
  } else {
    const sum = this.ratings.reduce((acc, rating) => acc + rating.rating, 0);
    this.averageRating = sum / this.ratings.length;
  }
  return this.save();
};

// Pre-save middleware to update featured status
sharedMeditationSchema.pre('save', function(next) {
  if (this.featuredUntil && this.featuredUntil < new Date()) {
    this.isFeatured = false;
  }
  next();
});

module.exports = mongoose.model('SharedMeditation', sharedMeditationSchema);