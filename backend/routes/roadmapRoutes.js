const express = require('express');
const router = express.Router();
const {
  getRoadmaps,
  getRoadmapById,
  createRoadmap
} = require('../controllers/roadmapController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(getRoadmaps)
  // Only admins can create new roadmaps
  .post(protect, admin, createRoadmap);

router.route('/:id')
  .get(getRoadmapById);

module.exports = router;
