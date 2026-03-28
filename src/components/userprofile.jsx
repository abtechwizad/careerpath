import { useState, useEffect } from "react";
import "../styles/UserProfile.css"; 
import { CertificateGenerator } from "./CertificateGenerator";
import { Award, Eye, Calendar, ShieldCheck } from "lucide-react";

export default function UserProfile() {
  const savedUser = JSON.parse(localStorage.getItem('user') || '{}');
  
  const [profile, setProfile] = useState({
    name: savedUser.name || "Ali Khan",
    email: savedUser.email || "",
    title: savedUser.role === 'admin' ? "Administrator" : "Career Aspirant",
    image: "https://via.placeholder.com/250",
    experience: [
      { company: "XYZ Ltd", role: "Frontend Developer", duration: "2021 - 2023" },
    ],
    education: "BS Computer Science - LUMS",
    skills: ["React", "Node.js", "TailwindCSS"],
  });

  const [certificates, setCertificates] = useState([]);
  const [selectedCert, setSelectedCert] = useState(null);

  useEffect(() => {
    const savedCerts = JSON.parse(localStorage.getItem('certificates') || '[]');
    setCertificates(savedCerts);
  }, []);

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(profile);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Skills CRUD
  const handleSkillChange = (index, value) => {
    const newSkills = [...formData.skills];
    newSkills[index] = value;
    setFormData({ ...formData, skills: newSkills });
  };
  const addSkill = () => setFormData({ ...formData, skills: [...formData.skills, ""] });
  const deleteSkill = (index) =>
    setFormData({ ...formData, skills: formData.skills.filter((_, i) => i !== index) });

  // Experience CRUD
  const handleExperienceChange = (index, field, value) => {
    const newExp = [...formData.experience];
    newExp[index][field] = value;
    setFormData({ ...formData, experience: newExp });
  };
  const addExperience = () =>
    setFormData({
      ...formData,
      experience: [...formData.experience, { company: "", role: "", duration: "" }],
    });
  const deleteExperience = (index) =>
    setFormData({
      ...formData,
      experience: formData.experience.filter((_, i) => i !== index),
    });

  const saveProfile = () => {
    setProfile(formData);
    setEditing(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        {/* Header */}
        <div className="profile-header">
          <img src={profile.image} alt="User" className="profile-img" />
          <h2>{profile.name}</h2>
          <p>{profile.title}</p>
        </div>

        {/* View Mode */}
        {!editing ? (
          <div className="profile-view">
            <div>
              <h3>
                <i className="fas fa-briefcase"></i> Experience
              </h3>
              <ul>
                {profile.experience.map((exp, i) => (
                  <li key={i}>
                    <strong>{exp.role}</strong> @ {exp.company} <br />
                    <span>{exp.duration}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3>
                <i className="fas fa-graduation-cap"></i> Education
              </h3>
              <p>{profile.education}</p>
            </div>

            <div>
              <h3>
                <i className="fas fa-code"></i> Skills
              </h3>
              <div className="skills">
                {profile.skills.map((skill, i) => (
                  <span key={i} className="skill">{skill}</span>
                ))}
              </div>
            </div>

            {/* Certifications Section */}
            <div className="mt-8">
              <h3>
                <Award className="inline-block mr-2 h-5 w-5 text-emerald-600" /> My Certifications
              </h3>
              {certificates.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 mt-4">
                  {certificates.map((cert) => (
                    <div key={cert.id} className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-100 rounded-xl hover:shadow-md transition-shadow">
                      <div className="flex items-center space-x-3">
                        <div className="bg-emerald-100 p-2 rounded-lg">
                          <ShieldCheck className="h-6 w-6 text-emerald-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-emerald-900 text-sm md:text-base">{cert.name}</h4>
                          <div className="flex items-center text-xs text-emerald-700">
                            <Calendar className="h-3 w-3 mr-1" />
                            {cert.date} • <span className="ml-1 font-semibold">{cert.resultType}</span>
                          </div>
                        </div>
                      </div>
                      <button 
                        className="p-2 bg-white text-emerald-600 rounded-full hover:bg-emerald-600 hover:text-white transition-colors shadow-sm"
                        onClick={() => setSelectedCert(cert)}
                        title="View Certificate"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                  <Award className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">No certifications earned yet. Complete an assessment to get started!</p>
                </div>
              )}
            </div>

            <button className="btn edit-btn mt-6" onClick={() => { setFormData(profile); setEditing(true); }}>
              <i className="fas fa-edit"></i> Edit Profile
            </button>

            {/* Certificate Modal Overlay */}
            {selectedCert && (
              <CertificateGenerator
                userName={profile.name}
                testName={selectedCert.name}
                date={selectedCert.date}
                resultType={selectedCert.resultType}
                onClose={() => setSelectedCert(null)}
              />
            )}
          </div>
        ) : (
          <div className="profile-edit">
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Job Title" />

            {/* Experience */}
            <h3><i className="fas fa-briefcase"></i> Experience</h3>
            {formData.experience.map((exp, i) => (
              <div key={i} className="edit-box">
                <input type="text" value={exp.company} onChange={(e) => handleExperienceChange(i, "company", e.target.value)} placeholder="Company" />
                <input type="text" value={exp.role} onChange={(e) => handleExperienceChange(i, "role", e.target.value)} placeholder="Role" />
                <input type="text" value={exp.duration} onChange={(e) => handleExperienceChange(i, "duration", e.target.value)} placeholder="Duration" />
                <button className="btn delete-btn" onClick={() => deleteExperience(i)}>
                  <i className="fas fa-trash"></i> Delete
                </button>
              </div>
            ))}
            <button className="btn add-btn" onClick={addExperience}>
              <i className="fas fa-plus"></i> Add Experience
            </button>

            {/* Education */}
            <input type="text" name="education" value={formData.education} onChange={handleChange} placeholder="Education" />

            {/* Skills */}
            <h3><i className="fas fa-code"></i> Skills</h3>
            {formData.skills.map((skill, i) => (
              <div key={i} className="edit-skill">
                <input type="text" value={skill} onChange={(e) => handleSkillChange(i, e.target.value)} placeholder="Skill" />
                <button className="btn delete-btn" onClick={() => deleteSkill(i)}>
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            ))}
            <button className="btn add-btn" onClick={addSkill}>
              <i className="fas fa-plus"></i> Add Skill
            </button>

            {/* Buttons */}
            <div className="btn-group">
              <button className="btn save-btn" onClick={saveProfile}>
                <i className="fas fa-save"></i> Save
              </button>
              <button className="btn cancel-btn" onClick={() => setEditing(false)}>
                <i className="fas fa-times"></i> Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
