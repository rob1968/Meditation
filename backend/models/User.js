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
  
  // Credits system
  credits: {
    type: Number,
    default: 10,
    min: 0
  },
  totalCreditsEarned: {
    type: Number,
    default: 10
  },
  totalCreditsSpent: {
    type: Number,
    default: 0
  },
  
  // Credit transaction history
  creditTransactions: [{
    type: {
      type: String,
      enum: ['initial', 'generation', 'sharing', 'purchase', 'bonus'],
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    relatedId: {
      type: String, // Can store meditation ID or transaction ID
      required: false
    }
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

// Credit management methods
UserSchema.methods.spendCredits = function(amount, type, description, relatedId = null) {
  if (this.credits < amount) {
    throw new Error('Insufficient credits');
  }
  
  this.credits -= amount;
  this.totalCreditsSpent += amount;
  
  this.creditTransactions.push({
    type: type,
    amount: -amount,
    description: description,
    relatedId: relatedId
  });
  
  return this.save();
};

UserSchema.methods.addCredits = function(amount, type, description, relatedId = null) {
  this.credits += amount;
  this.totalCreditsEarned += amount;
  
  this.creditTransactions.push({
    type: type,
    amount: amount,
    description: description,
    relatedId: relatedId
  });
  
  return this.save();
};

UserSchema.methods.hasEnoughCredits = function(amount) {
  return this.credits >= amount;
};

// Initialize credits for new users
UserSchema.methods.initializeCredits = function() {
  if (this.creditTransactions.length === 0) {
    this.creditTransactions.push({
      type: 'initial',
      amount: 10,
      description: 'Welcome bonus - 10 free credits'
    });
  }
  return this.save();
};

// Create index for better performance
UserSchema.index({ username: 1 });

module.exports = mongoose.model('User', UserSchema);