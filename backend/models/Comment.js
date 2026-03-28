const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  roadmapId: { 
    type: Number, 
    required: true 
  },
  // Optional: If the comment is specifically related to one step in the roadmap
  stepId: { 
    type: Number 
  }, 
  content: { 
    type: String, 
    required: true 
  },
  // Allows users to like/upvote a comment (StackOverflow style)
  upvotes: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }], 
  // Supports threaded replies. null means it's a top-level comment
  parentId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Comment', 
    default: null 
  }
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);
