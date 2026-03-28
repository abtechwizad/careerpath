const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctOptionIndex: { type: Number, required: true },
  explanation: { type: String } // optional explanation for the answer
});

const quizSchema = new mongoose.Schema({
  roadmapId: { type: Number, required: true },
  stepId: { type: Number, required: true }, // The step this quiz belongs to
  title: { type: String, required: true },
  description: { type: String },
  questions: [questionSchema],
  passingScore: { type: Number, default: 80 } // Percentage required to pass
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema);
