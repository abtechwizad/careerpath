const Comment = require('../models/Comment');
const Review = require('../models/Review');
const Notification = require('../models/Notification');

// --- COMMENTS ---
// @desc    Add a comment to a roadmap
// @route   POST /api/community/comments
// @access  Private
exports.addComment = async (req, res) => {
  try {
    const { roadmapId, stepId, content, parentId } = req.body;
    
    if (!content) return res.status(400).json({ error: 'Comment body is required' });

    const comment = await Comment.create({
      userId: req.user._id,
      roadmapId,
      stepId,
      content,
      parentId: parentId || null
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Server error adding comment' });
  }
};

// @desc    Get comments for a roadmap
// @route   GET /api/community/comments/:roadmapId
// @access  Public
exports.getComments = async (req, res) => {
  try {
    const { roadmapId } = req.params;
    const comments = await Comment.find({ roadmapId })
      .populate('userId', 'name avatarUrl')
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching comments' });
  }
};

// --- REVIEWS ---
// @desc    Add a review to a roadmap
// @route   POST /api/community/reviews
// @access  Private
exports.addReview = async (req, res) => {
  try {
    const { roadmapId, rating, comment } = req.body;

    if (!rating) return res.status(400).json({ error: 'Rating is required' });

    // Check if user already reviewed
    const existingReview = await Review.findOne({ userId: req.user._id, roadmapId });
    if (existingReview) {
      return res.status(400).json({ error: 'You have already reviewed this roadmap' });
    }

    const review = await Review.create({
      userId: req.user._id,
      roadmapId,
      rating,
      comment
    });

    res.status(201).json(review);
  } catch (error) {
    if (error.code === 11000) return res.status(400).json({ error: 'Duplicate review' });
    res.status(500).json({ error: 'Server error adding review' });
  }
};

// --- NOTIFICATIONS ---
// @desc    Get user notifications
// @route   GET /api/community/notifications
// @access  Private
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching notifications' });
  }
};
