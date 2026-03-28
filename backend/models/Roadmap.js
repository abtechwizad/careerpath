const mongoose = require('mongoose');

// Step sub-schema
const stepSchema = new mongoose.Schema({
  // Using an explicit numeric ID if we want to match our mock data,
  // but MongoDB automatically adds _id. We can keep a custom stepId.
  stepId: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});

// Roadmap schema
const roadmapSchema = new mongoose.Schema({
  roadmapId: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  steps: [stepSchema]
}, { timestamps: true });

const Roadmap = mongoose.model('Roadmap', roadmapSchema);

module.exports = Roadmap;
