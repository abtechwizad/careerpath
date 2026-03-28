import React, { useState } from "react";
import "./AdminPanel.css"; // we’ll move CSS separately

export default function AdminPanel() {
  // Mentors state
  const [mentors, setMentors] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [mentorForm, setMentorForm] = useState({
    name: "",
    expertise: "",
    experience: "",
    rating: "",
    media: "",
  });

  // Stories state
  const [stories, setStories] = useState([]);
  const [storyForm, setStoryForm] = useState({
    title: "",
    media: "",
  });

  // Handle mentor input change
  const handleMentorChange = (e) => {
    setMentorForm({ ...mentorForm, [e.target.id]: e.target.value });
  };

  // Handle story input change
  const handleStoryChange = (e) => {
    setStoryForm({ ...storyForm, [e.target.id]: e.target.value });
  };

  // Add or Update Mentor
  const handleMentorSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updated = [...mentors];
      updated[editingIndex] = mentorForm;
      setMentors(updated);
      setEditingIndex(null);
    } else {
      setMentors([...mentors, mentorForm]);
    }
    setMentorForm({ name: "", expertise: "", experience: "", rating: "", media: "" });
  };

  // Edit mentor
  const editMentor = (index) => {
    setMentorForm(mentors[index]);
    setEditingIndex(index);
  };

  // Delete mentor
  const deleteMentor = (index) => {
    setMentors(mentors.filter((_, i) => i !== index));
  };

  // Add Story
  const handleStorySubmit = (e) => {
    e.preventDefault();
    setStories([...stories, storyForm]);
    setStoryForm({ title: "", media: "" });
  };

  // Delete story
  const deleteStory = (index) => {
    setStories(stories.filter((_, i) => i !== index));
  };

  return (
    <div>
      <header className="header">
        <h1>📘 Career Passport - Admin Panel</h1>
      </header>

      <div className="container">
        {/* Mentor Section */}
        <h2>Manage Mentors</h2>
        <form onSubmit={handleMentorSubmit}>
          <input
            type="text"
            id="name"
            value={mentorForm.name}
            onChange={handleMentorChange}
            placeholder="Mentor Name"
            required
          />
          <input
            type="text"
            id="expertise"
            value={mentorForm.expertise}
            onChange={handleMentorChange}
            placeholder="Expertise (e.g. AI/ML)"
            required
          />
          <input
            type="number"
            id="experience"
            value={mentorForm.experience}
            onChange={handleMentorChange}
            placeholder="Experience (Years)"
            required
          />
          <input
            type="number"
            id="rating"
            value={mentorForm.rating}
            onChange={handleMentorChange}
            placeholder="Rating (1-5)"
            min="1"
            max="5"
            required
          />
          <input
            type="url"
            id="media"
            value={mentorForm.media}
            onChange={handleMentorChange}
            placeholder="Media URL (Image/Video)"
          />
          <button type="submit" className="btn-primary">
            {editingIndex !== null ? "Update Mentor" : "+ Add Mentor"}
          </button>
        </form>

        <ul className="list">
          {mentors.map((mentor, index) => (
            <li className="list-item" key={index}>
              <div className="mentor-info">
                <strong>{mentor.name}</strong> - {mentor.expertise}
                <br />
                Experience: {mentor.experience} years | Rating: {mentor.rating}/5
                <br />
                {mentor.media &&
                  (mentor.media.endsWith(".mp4") ? (
                    <video src={mentor.media} controls />
                  ) : (
                    <img src={mentor.media} alt="" />
                  ))}
              </div>
              <div className="actions">
                <button className="btn-warning" onClick={() => editMentor(index)}>
                  Edit
                </button>
                <button className="btn-danger" onClick={() => deleteMentor(index)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="container">
        {/* Success Stories Section */}
        <h2>Success Stories</h2>
        <form onSubmit={handleStorySubmit}>
          <input
            type="text"
            id="title"
            value={storyForm.title}
            onChange={handleStoryChange}
            placeholder="Story Title"
            required
          />
          <input
            type="url"
            id="media"
            value={storyForm.media}
            onChange={handleStoryChange}
            placeholder="Media URL (Image/Video)"
          />
          <button type="submit" className="btn-primary">
            + Add Story
          </button>
        </form>

        <ul className="list">
          {stories.map((story, index) => (
            <li className="list-item" key={index}>
              <div className="story-info">
                <strong>{story.title}</strong>
                <br />
                {story.media &&
                  (story.media.endsWith(".mp4") ? (
                    <video src={story.media} controls />
                  ) : (
                    <img src={story.media} alt="" />
                  ))}
              </div>
              <div className="actions">
                <button className="btn-danger" onClick={() => deleteStory(index)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
