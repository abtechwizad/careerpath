const express = require('express');
const router = express.Router();
const {
  addComment,
  getComments,
  addReview,
  getNotifications
} = require('../controllers/communityController');
const { protect } = require('../middleware/authMiddleware');

router.post('/comments', protect, addComment);
router.get('/comments/:roadmapId', getComments);
router.post('/reviews', protect, addReview);
router.get('/notifications', protect, getNotifications);

module.exports = router;
