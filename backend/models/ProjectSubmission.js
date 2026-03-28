const mongoose = require('mongoose');

const projectSubmissionSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  roadmapId: { 
    type: Number, 
    required: true 
  },
  stepId: { 
    type: Number, 
    required: true 
  }, // The step that required the project
  
  // Project URLs submitted by user
  repoUrl: { 
    type: String, 
    required: true 
  }, // e.g., GitHub link
  liveUrl: { 
    type: String 
  }, // Optional live demo link (Vercel/Netlify)
  
  // Custom message/notes from the student
  notes: { 
    type: String 
  }, 
  
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'], 
    default: 'pending' 
  },
  
  // Admin grading section
  feedback: { 
    type: String 
  }, // Feedback from an admin/mentor
  gradedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  } // The Admin ID who graded it
}, { timestamps: true });

module.exports = mongoose.model('ProjectSubmission', projectSubmissionSchema);
