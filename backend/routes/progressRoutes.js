const express = require('express');
const router = express.Router();
const {
  updateLegacyUserProgress,
  updateProgress
} = require('../controllers/progressController');
const { protect } = require('../middleware/authMiddleware');

// Legacy unauthenticated route (Keeping React UI unbroken for now)
router.post('/user-progress', updateLegacyUserProgress);

// New Authenticated route for proper user progress tracking
router.post('/:roadmapId/step/:stepId', protect, updateProgress);

module.exports = router;
