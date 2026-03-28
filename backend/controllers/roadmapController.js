const Roadmap = require('../models/Roadmap');

// @desc    Get all roadmaps
// @route   GET /api/roadmaps
// @access  Public
exports.getRoadmaps = async (req, res) => {
  try {
    const roadmaps = await Roadmap.find();
    
    // Formatting data for the current frontend expectations
    const formattedRoadmaps = roadmaps.map((r) => ({
      id: r.roadmapId,
      title: r.title,
      description: r.description,
      steps: r.steps.map((s) => ({
        id: s.stepId,
        title: s.title,
        completed: s.completed, // Global completed (legacy design fallback)
      })),
    }));
    
    res.json(formattedRoadmaps);
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching roadmaps' });
  }
};

// @desc    Get a single roadmap by roadmapId
// @route   GET /api/roadmaps/:id
// @access  Public
exports.getRoadmapById = async (req, res) => {
  try {
    const roadmapId = parseInt(req.params.id, 10);
    const roadmap = await Roadmap.findOne({ roadmapId });
    
    if (!roadmap) {
      return res.status(404).json({ error: 'Roadmap not found' });
    }
    
    res.json(roadmap);
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching roadmap' });
  }
};

// @desc    Create a new roadmap (Admin only)
// @route   POST /api/roadmaps
// @access  Private/Admin
exports.createRoadmap = async (req, res) => {
  try {
    const { title, description, steps } = req.body;
    
    // Auto-generate a sequential Roadmap ID
    const count = await Roadmap.countDocuments();
    const newRoadmapId = count + 1;
    
    const roadmap = new Roadmap({
      roadmapId: newRoadmapId,
      title,
      description,
      steps: steps || [],
    });
    
    const createdRoadmap = await roadmap.save();
    res.status(201).json(createdRoadmap);
    
  } catch (error) {
    res.status(500).json({ error: 'Server error creating roadmap' });
  }
};
