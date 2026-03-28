const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  roadmapId: { 
    type: Number, 
    required: true 
  },
  
  rating: { 
    type: Number, 
    required: true, 
    min: 1, 
    max: 5 
  }, // e.g., 4 out of 5 stars
  
  comment: { 
    type: String,
    trim: true,
    maxlength: 500
  } // Detailed text feedback from the user
}, { timestamps: true });

// Prevent a user from reviewing the same roadmap multiple times
reviewSchema.index({ userId: 1, roadmapId: 1 }, { unique: true });

module.exports = mongoose.model('Review', reviewSchema);
