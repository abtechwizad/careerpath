const mongoose = require('mongoose');

const userProgressSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  roadmapId: { 
    type: Number, 
    required: true 
  }, // Reference to the Roadmap
  
  // Track which steps the user has specifically completed
  completedSteps: [{ 
    type: Number 
  }],
  
  isRoadmapCompleted: { 
    type: Boolean, 
    default: false 
  },
  
  startedAt: { 
    type: Date, 
    default: Date.now 
  },
  completedAt: { 
    type: Date 
  }
}, { timestamps: true });

// Ensure a user only has one progress document per roadmap
userProgressSchema.index({ userId: 1, roadmapId: 1 }, { unique: true });

module.exports = mongoose.model('UserProgress', userProgressSchema);
