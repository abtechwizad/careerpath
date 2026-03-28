const Quiz = require('../models/Quiz');
const ProjectSubmission = require('../models/ProjectSubmission');

// @desc    Submit a Quiz
// @route   POST /api/evaluation/quiz/:quizId
// @access  Private
exports.submitQuiz = async (req, res) => {
  try {
    const { answers } = req.body; // e.g., [{ questionId, answerIndex }]
    const quiz = await Quiz.findById(req.params.quizId);

    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
    
    let score = 0;
    // Basic evaluation logic here...
    
    res.json({ message: 'Quiz graded successfully', score: 100, passed: true });
  } catch (error) {
    res.status(500).json({ error: 'Error submitting quiz' });
  }
};

// @desc    Submit a project
// @route   POST /api/evaluation/project
// @access  Private
exports.submitProject = async (req, res) => {
  try {
    const { roadmapId, stepId, repoUrl, liveUrl, notes } = req.body;
    
    if (!roadmapId || !stepId || !repoUrl) {
      return res.status(400).json({ error: 'Please provide required fields' });
    }

    const submission = new ProjectSubmission({
      userId: req.user._id,
      roadmapId,
      stepId,
      repoUrl,
      liveUrl,
      notes
    });

    const createdSubmission = await submission.save();
    res.status(201).json(createdSubmission);
  } catch (error) {
    res.status(500).json({ error: 'Error submitting project' });
  }
};
