const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  
  title: { 
    type: String, 
    required: true 
  },
  
  message: { 
    type: String, 
    required: true 
  },
  
  // Categorization to handle them differently in the frontend UI
  type: { 
    type: String, 
    enum: ['system', 'achievement', 'project_approved', 'project_rejected', 'comment_reply'], 
    default: 'system' 
  },
  
  // Track visibility
  isRead: { 
    type: Boolean, 
    default: false 
  },
  
  // Optional URL link so clicking the notification redirects the user
  actionLink: { 
    type: String 
  }

}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
