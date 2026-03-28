const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Route Imports
const authRoutes = require('./routes/authRoutes');
const roadmapRoutes = require('./routes/roadmapRoutes');
const progressRoutes = require('./routes/progressRoutes');
const evaluationRoutes = require('./routes/evaluationRoutes');
const communityRoutes = require('./routes/communityRoutes');

const Roadmap = require('./models/Roadmap'); // Legacy model load just for the seeder


const app = express();
const PORT = 5000;

// Enable CORS for all routes (allows React app on another port to make requests here)
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://abtechsales_db_user:Abtechwizard@abtech.ylr50eg.mongodb.net/career_roadmap')
  .then(() => {
    console.log('✅ MongoDB Connected');
    seedDatabase(); // Seed early if empty
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));
// Function to seed database initially if empty
const seedDatabase = async () => {
  try {
    const count = await Roadmap.countDocuments();
    if (count === 0) {
      console.log('🌱 Seeding initial roadmaps...');
      const initialRoadmaps = [
        {
          roadmapId: 1,
          title: 'Frontend Developer',
          description: 'Learn to build beautiful, responsive user interfaces using HTML, CSS, JavaScript and React.',
          steps: [
            { stepId: 101, title: 'HTML & CSS Basics', completed: false },
            { stepId: 102, title: 'JavaScript Fundamentals', completed: false },
            { stepId: 103, title: 'React.js Mastery', completed: false }
          ]
        },
        {
          roadmapId: 2,
          title: 'Data Scientist',
          description: 'Master data analysis, predictive modeling, machine learning algorithms and Python tools.',
          steps: [
            { stepId: 201, title: 'Python Programming', completed: false },
            { stepId: 202, title: 'Data Manipulation (Pandas/NumPy)', completed: false },
            { stepId: 203, title: 'Machine Learning Models', completed: false }
          ]
        },
        {
          roadmapId: 3,
          title: 'UI/UX Designer',
          description: 'Design beautiful, functional user experiences using Figma and modern design principles.',
          steps: [
            { stepId: 301, title: 'User Research & Personas', completed: false },
            { stepId: 302, title: 'Wireframing & Workflows', completed: false },
            { stepId: 303, title: 'Prototyping in Figma', completed: false }
          ]
        }
      ];
      await Roadmap.insertMany(initialRoadmaps);
      console.log('✅ Database seeded successfully');
    }
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  }
};

// ==========================
// ROUTES
// ==========================
app.use('/api/auth', authRoutes);
app.use('/api/roadmaps', roadmapRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/evaluation', evaluationRoutes);
app.use('/api/community', communityRoutes);

// Custom Error Handler middleware stub (can be expanded later)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke inside the server!' });
});


app.listen(PORT, () => {
  console.log(`✅ Backend server is running on http://localhost:${PORT}`);
  console.log(`➡️  CORS is enabled. React app can safely connect to APIs on this port.`);
});
