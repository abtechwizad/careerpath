import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentSection from './CommentSection';
import './Dashboard.css';

const Dashboard = () => {
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRoadmaps();
  }, []);

  // Fetch from the Express backend
  const fetchRoadmaps = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/roadmaps', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setRoadmaps(response.data);
      setLoading(false);
    } catch (err) {
      setError('Connection Error: Failed to fetch roadmaps. Please verify that the Express backend is running on port 5000.');
      setLoading(false);
      console.error(err);
    }
  };

  // Mark step as complete
  const markAsComplete = async (roadmapId, stepId) => {
    try {
      const token = localStorage.getItem('token');
      
      // Optimistically update the local state for immediate UI feedback
      const updatedRoadmaps = roadmaps.map((roadmap) => {
        if (roadmap.id === roadmapId) {
          const updatedSteps = roadmap.steps.map((step) => 
            step.id === stepId ? { ...step, completed: true } : step
          );
          return { ...roadmap, steps: updatedSteps };
        }
        return roadmap;
      });
      setRoadmaps(updatedRoadmaps);

      // Send the actual update to the backend using the new progress route
      await axios.post('http://localhost:5000/api/progress/user-progress', {
        roadmapId,
        stepId
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
    } catch (err) {
      console.error('Error updating progress:', err);
      // Revert if API fails
      fetchRoadmaps();
      alert('Failed to update progress on the server.');
    }
  };

  // Calculate Progress percentage
  const getProgress = (steps) => {
    if (!steps || steps.length === 0) return 0;
    const completedList = steps.filter(s => s.completed);
    return Math.round((completedList.length / steps.length) * 100);
  };

  if (loading) return (
    <div className="dashboard-state-container">
      <div className="spinner"></div>
      <p>Initializing Career Paths...</p>
    </div>
  );
  
  if (error) return (
    <div className="dashboard-state-container dashboard-error">
      <div className="error-icon">⚠️</div>
      <p>{error}</p>
    </div>
  );

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Career Matrix</h1>
        <p className="dashboard-subtitle">Select your trajectory. Track your progress. Master your future.</p>
      </div>
      
      <div className="roadmaps-grid">
        {roadmaps.map((roadmap) => {
          const progress = getProgress(roadmap.steps);
          
          return (
            <div key={roadmap.id} className="roadmap-card">
              <div className="roadmap-card-header">
                <h2 className="roadmap-card-title">{roadmap.title}</h2>
              </div>
              <p className="roadmap-card-desc">{roadmap.description}</p>
              
              <div className="progress-section">
                <div className="progress-header">
                  <span className="progress-label">Journey Progress</span>
                  <span className="progress-value">{progress}%</span>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
                </div>
              </div>
              
              <div className="steps-container">
                <h3 className="steps-title">
                  Milestones
                </h3>
                <ul className="steps-list">
                  {roadmap.steps.map((step, index) => (
                    <li key={step.id} className={`step-item ${step.completed ? 'completed' : ''}`}>
                      <div className="step-content-wrapper">
                        <div className="step-number-container">
                          {step.completed ? (
                            <span className="step-icon checkmark">✓</span>
                          ) : (
                            <span className="step-icon number">{index + 1}</span>
                          )}
                        </div>
                        <span className="step-info">{step.title}</span>
                      </div>
                      
                      {!step.completed ? (
                        <button 
                          className="btn-complete"
                          onClick={() => markAsComplete(roadmap.id, step.id)}
                        >
                          Complete
                        </button>
                      ) : (
                        <span className="badge-completed">Done</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Roadmap Specific Comments */}
              <div className="roadmap-comments-section">
                <CommentSection roadmapId={roadmap._id || roadmap.id} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
