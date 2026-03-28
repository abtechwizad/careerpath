const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  roadmapId: { 
    type: Number, 
    required: true 
  },
  stepId: { 
    type: Number, 
    required: true 
  }, // Defines which step this resource belongs to
  
  title: { 
    type: String, 
    required: true 
  },
  type: { 
    type: String, 
    enum: ['video', 'article', 'course', 'documentation'], 
    required: true 
  },
  url: { 
    type: String, 
    required: true 
  },
  // Optional flag to highlight important resources
  isPremium: { 
    type: Boolean, 
    default: false 
  }
}, { timestamps: true });

module.exports = mongoose.model('Resource', resourceSchema);
