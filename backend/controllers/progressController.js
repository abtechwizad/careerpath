const UserProgress = require('../models/UserProgress');
const Roadmap = require('../models/Roadmap');
const Certificate = require('../models/Certificate');

// @desc    Update user progress on a roadmap
// @route   POST /api/progress/user-progress
// @access  Public (Will transition to Private)
exports.updateLegacyUserProgress = async (req, res) => {
  // Keeping the legacy non-JWT logic temporarily so the React UI doesn't break instantly
  const { roadmapId, stepId } = req.body;
  if (!roadmapId || !stepId) {
    return res.status(400).json({ error: 'Missing roadmapId or stepId' });
  }

  try {
    const roadmap = await Roadmap.findOne({ roadmapId });
    if (!roadmap) return res.status(404).json({ error: 'Roadmap not found.' });

    const step = roadmap.steps.find(s => s.stepId === stepId);
    if (!step) return res.status(404).json({ error: 'Specific step not found.' });

    step.completed = true;
    await roadmap.save(); 
    return res.json({ message: 'Step marked as complete successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Server error updating progress' });
  }
};

// @desc    Update authentic user progress on a roadmap (The correct MVC way)
// @route   POST /api/progress/:roadmapId/step/:stepId
// @access  Private
exports.updateProgress = async (req, res) => {
  try {
    const { roadmapId, stepId } = req.params;
    const userId = req.user.id;

    let progress = await UserProgress.findOne({ userId, roadmapId });

    if (!progress) {
      // Create a new progress tracker for this user and roadmap
      progress = new UserProgress({
        userId,
        roadmapId,
        completedSteps: [parseInt(stepId, 10)]
      });
    } else {
      // Add step to completed list if not already there
      if (!progress.completedSteps.includes(parseInt(stepId, 10))) {
        progress.completedSteps.push(parseInt(stepId, 10));
      }
    }

    // Check if roadmap is fully completed
    const roadmap = await Roadmap.findOne({ roadmapId });
    if (roadmap && progress.completedSteps.length === roadmap.steps.length) {
      progress.isRoadmapCompleted = true;
      progress.completedAt = Date.now();
      
      // Auto-issue Certificate
      const existingCert = await Certificate.findOne({ userId, roadmapId });
      if (!existingCert) {
         await Certificate.create({
           userId,
           roadmapId,
           certificateUrl: `https://mock.cert.url/user/${userId}/roadmap/${roadmapId}`
         });
      }
    }

    await progress.save();
    res.json({ message: 'Progress updated', progress });
    
  } catch (error) {
    res.status(500).json({ error: 'Server error updating progress' });
  }
};
