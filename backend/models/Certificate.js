const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  roadmapId: { 
    type: Number, 
    required: true 
  },
  
  // URL to the generated certificate image/pdf
  certificateUrl: { 
    type: String,
    required: true
  },
  
  // Grade or Score if applicable
  grade: {
    type: String,
    default: 'A+'
  },

  issuedAt: { 
    type: Date, 
    default: Date.now 
  }
}, { timestamps: true });

// A user should ideally only have one certificate per roadmap
certificateSchema.index({ userId: 1, roadmapId: 1 }, { unique: true });

module.exports = mongoose.model('Certificate', certificateSchema);
