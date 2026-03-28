const express = require('express');
const router = express.Router();
const {
  submitQuiz,
  submitProject
} = require('../controllers/evaluationController');
const { protect } = require('../middleware/authMiddleware');

router.post('/quiz/:quizId', protect, submitQuiz);
router.post('/project', protect, submitProject);

module.exports = router;
