import { useState } from 'react';
import { CheckCircle, Brain, Target, Briefcase, Heart, Zap, Download } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { CertificateGenerator } from './CertificateGenerator';
import { Button } from './ui/button';

const mcqQuestions = [
  {
    id: 1,
    question: "What energizes you most at work?",
    options: [
      "Helping others solve their problems and achieve their goals",
      "Analyzing complex data and finding meaningful patterns",
      "Creating innovative solutions and bringing new ideas to life",
      "Leading teams and making strategic decisions that drive results"
    ]
  },
  {
    id: 2,
    question: "In a group project, you naturally:",
    options: [
      "Take charge and coordinate everyone's efforts toward success",
      "Focus on research and technical implementation details",
      "Generate creative ideas and brainstorm innovative solutions",
      "Ensure everyone feels heard, included, and valued"
    ]
  },
  {
    id: 3,
    question: "Your ideal work environment is:",
    options: [
      "Collaborative and people-oriented with strong relationships",
      "Quiet and focused with opportunities for deep, analytical work",
      "Dynamic and flexible with room for creativity and experimentation",
      "Structured with clear goals, processes, and growth opportunities"
    ]
  },
  {
    id: 4,
    question: "When facing a challenging problem, you:",
    options: [
      "Seek diverse perspectives and collaborate with team members",
      "Research thoroughly and analyze all possible angles systematically",
      "Think outside the box and explore creative, unconventional solutions",
      "Make decisive actions based on experience and strategic thinking"
    ]
  },
  {
    id: 5,
    question: "What motivates you most professionally?",
    options: [
      "Making a meaningful, positive impact on people's lives and communities",
      "Mastering complex skills and becoming a recognized expert in your field",
      "Expressing creativity and bringing innovative ideas to life",
      "Achieving ambitious goals, driving growth, and gaining recognition"
    ]
  },
  {
    id: 6,
    question: "You prefer to work on tasks that are:",
    options: [
      "People-centered, relationship-building, and socially impactful",
      "Detail-oriented, analytical, and require deep technical expertise",
      "Open-ended, innovative, and allow for creative problem-solving",
      "Goal-driven, strategic, and have clear, measurable outcomes"
    ]
  }
];

const subjectiveQuestions = [
  "Describe a project or achievement that made you feel most proud and fulfilled. What specific aspects of this experience excited you the most?",
  "What activities or types of work make you lose track of time because you're so deeply engaged? What is it about these activities that captivates you?",
  "If you could design your perfect work day from start to finish, what would it include and why? Consider the environment, people, tasks, and outcomes."
];

const personalityProfiles = {
  "Empathetic Collaborator": {
    title: "The Empathetic Collaborator",
    description: "You excel at building meaningful relationships, understanding others' needs, and creating harmonious, inclusive team environments where everyone can thrive.",
    strengths: ["Emotional Intelligence", "Team Building", "Conflict Resolution", "Inclusive Leadership", "Communication"],
    careers: ["HR Business Partner", "Team Lead", "Social Worker", "Counselor", "Community Manager", "Customer Success Manager"],
    colors: { primary: "#86efac", secondary: "#dcfce7" },
    workStyle: "Collaborative and people-focused",
    motivation: "Making positive impact on others"
  },
  "Strategic Innovator": {
    title: "The Strategic Innovator", 
    description: "You combine analytical thinking with creative problem-solving to drive strategic initiatives, innovation, and transformative change in organizations.",
    strengths: ["Strategic Planning", "Innovation", "Systems Thinking", "Change Management", "Creative Problem-Solving"],
    careers: ["Product Manager", "Strategy Consultant", "Innovation Director", "Business Development Manager", "Entrepreneur"],
    colors: { primary: "#6ee7b7", secondary: "#a7f3d0" },
    workStyle: "Strategic and innovation-driven",
    motivation: "Creating transformative solutions"
  },
  "Analytical Problem-Solver": {
    title: "The Analytical Problem-Solver",
    description: "You thrive on diving deep into complex problems, analyzing data systematically, and developing evidence-based solutions with precision and expertise.",
    strengths: ["Critical Thinking", "Data Analysis", "Research", "Technical Expertise", "Attention to Detail"],
    careers: ["Data Scientist", "Research Scientist", "Business Analyst", "Software Engineer", "Financial Analyst", "Cybersecurity Specialist"],
    colors: { primary: "#a7d7c4", secondary: "#f0fdf4" },
    workStyle: "Focused and analytical",
    motivation: "Solving complex challenges"
  },
  "Visionary Entrepreneur": {
    title: "The Visionary Entrepreneur",
    description: "You're driven by big ideas, comfortable with calculated risks, and excel at turning ambitious visions into reality through leadership and innovation.",
    strengths: ["Vision Setting", "Risk Management", "Innovation", "Leadership", "Strategic Execution"],
    careers: ["Entrepreneur", "Startup Founder", "Business Development Director", "Sales Director", "Innovation Lead", "CEO/Executive"],
    colors: { primary: "#2d5a4a", secondary: "#86efac" },
    workStyle: "Dynamic and results-oriented",
    motivation: "Building and scaling ventures"
  },
  "Supportive Mentor": {
    title: "The Supportive Mentor",
    description: "You find deep fulfillment in helping others grow, sharing knowledge generously, and creating positive impact through guidance and development.",
    strengths: ["Mentoring", "Knowledge Transfer", "Empathy", "Development Focus", "Patience"],
    careers: ["Teacher", "Training Manager", "Coach", "Learning & Development Specialist", "Academic Researcher", "Consultant"],
    colors: { primary: "#319879", secondary: "#bbf7d0" },
    workStyle: "Nurturing and development-focused",
    motivation: "Empowering others to succeed"
  },
  "Adaptive Explorer": {
    title: "The Adaptive Explorer",
    description: "You thrive on variety, embrace new challenges, and excel at adapting to different environments while continuously learning and growing.",
    strengths: ["Adaptability", "Learning Agility", "Versatility", "Curiosity", "Resilience"],
    careers: ["Project Manager", "Management Consultant", "Product Owner", "Operations Manager", "Business Analyst", "Program Manager"],
    colors: { primary: "#86efac", secondary: "#dcfce7" },
    workStyle: "Flexible and growth-oriented",
    motivation: "Continuous learning and variety"
  },
  "Detail-Oriented Specialist": {
    title: "The Detail-Oriented Specialist",
    description: "You excel at mastering specific domains, ensuring quality and precision, and building deep expertise that others can rely on for complex challenges.",
    strengths: ["Attention to Detail", "Technical Mastery", "Quality Assurance", "Specialization", "Precision"],
    careers: ["Senior Software Engineer", "Research Scientist", "Quality Assurance Lead", "Technical Writer", "Specialist Consultant", "Subject Matter Expert"],
    colors: { primary: "#6ee7b7", secondary: "#a7f3d0" },
    workStyle: "Focused and precision-oriented",
    motivation: "Achieving technical excellence"
  },
  "People-Focused Harmonizer": {
    title: "The People-Focused Harmonizer",
    description: "You naturally create harmony, understand different perspectives, and help teams work together effectively while maintaining positive relationships.",
    strengths: ["Interpersonal Skills", "Diplomacy", "Team Harmony", "Communication", "Cultural Sensitivity"],
    careers: ["HR Manager", "Team Coordinator", "Customer Success Manager", "Community Manager", "Organizational Development Specialist", "Relationship Manager"],
    colors: { primary: "#a7d7c4", secondary: "#f0fdf4" },
    workStyle: "Relationship-focused and diplomatic",
    motivation: "Creating harmonious environments"
  }
};

export default function AptitudeTest() {
  const [currentStep, setCurrentStep] = useState(0);
  const [mcqAnswers, setMcqAnswers] = useState({});
  const [subjectiveAnswers, setSubjectiveAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showPersonalizedRoadmap, setShowPersonalizedRoadmap] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleDownloadCertificate = (type: string) => {
    const params = new URLSearchParams({
      userName: user.name || "Aspirant",
      testName: "Career Aptitude Certification",
      date: new Date().toLocaleDateString(),
      resultType: type
    });
    window.open(`/certificate?${params.toString()}`, '_blank');
  };

  const totalSteps = mcqQuestions.length + subjectiveQuestions.length + 1;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const personalityType = getPersonalityType();
      
      // Save to localStorage for profile display
      const newCertificate = {
        id: Date.now(),
        name: "Career Aptitude Certification",
        type: "Aptitude Test",
        date: new Date().toLocaleDateString(),
        score: "Passed",
        resultType: personalityType
      };
      const existingCertificates = JSON.parse(localStorage.getItem('certificates') || '[]');
      localStorage.setItem('certificates', JSON.stringify([...existingCertificates, newCertificate]));
      
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // FIXED: Corrected getPersonalityType function
  const getPersonalityType = () => {
    // Check if we have any answers
    if (Object.keys(mcqAnswers).length === 0) {
      return "Adaptive Explorer";
    }

    const answerCounts: Record<number, number> = {};

    // Count answers for each option position (0, 1, 2, 3)
    Object.entries(mcqAnswers).forEach(([questionId, selectedAnswer]) => {
      const qId = parseInt(questionId);
      const question = mcqQuestions.find(q => q.id === qId);
      
      if (question && Array.isArray(question.options) && typeof selectedAnswer === 'string') {
        const optionIndex = question.options.indexOf(selectedAnswer);
        if (optionIndex !== -1) {
          answerCounts[optionIndex] = (answerCounts[optionIndex] || 0) + 1;
        }
      }
    });

    // If no valid answers found, return default
    if (Object.keys(answerCounts).length === 0) {
      return "Adaptive Explorer";
    }

    // Find the option index with the most selections
    const dominantIndex = Object.keys(answerCounts).reduce((maxKey, currentKey) => {
      const maxCount = answerCounts[parseInt(maxKey)] || 0;
      const currentCount = answerCounts[parseInt(currentKey)] || 0;
      return currentCount > maxCount ? currentKey : maxKey;
    });

    // Map option indices to personality types
    const types = [
      "Empathetic Collaborator",    // Option 0: People-focused
      "Analytical Problem-Solver",  // Option 1: Data/Analysis-focused
      "Strategic Innovator",        // Option 2: Creative/Innovation-focused
      "Visionary Entrepreneur"      // Option 3: Leadership/Results-focused
    ];

    return types[parseInt(dominantIndex)] || "Adaptive Explorer";
  };

  const generatePersonalizedRoadmap = () => {
    const personalityType = getPersonalityType();
    const profile = personalityProfiles[personalityType as keyof typeof personalityProfiles];

    return {
      type: personalityType,
      profile: profile,
      recommendedCareers: profile.careers.slice(0, 3),
      learningStyle: personalityType.includes("Analytical") ? "self-paced deep learning" : 
                    personalityType.includes("Collaborator") ? "group-based collaborative" : 
                    personalityType.includes("Innovator") ? "project-based experiential" : 
                    personalityType.includes("Entrepreneur") ? "hands-on practical" : "guided structured",
      careerFocus: profile.motivation,
      nextSteps: [
        `Explore ${profile.careers[0]} opportunities in Pakistani companies`,
        `Develop your ${profile.strengths[0]} and ${profile.strengths[1]} skills`,
        `Connect with professionals in your field through our mentorship program`,
        `Start your personalized learning roadmap based on your ${profile.workStyle} style`
      ]
    };
  };

  if (showPersonalizedRoadmap) {
    const personalizedPath = generatePersonalizedRoadmap();
    
    return (
      <div className="max-w-6xl mx-auto space-y-6 p-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-4 rounded-full mb-4" 
               style={{backgroundColor: personalizedPath.profile.colors.secondary}}>
            <Target className="h-12 w-12" style={{color: personalizedPath.profile.colors.primary}} />
          </div>
          <h2 className="text-3xl font-bold mb-2" style={{color: '#2d5a4a'}}>Your Personalized Career Roadmap</h2>
          <p className="text-lg text-gray-600">Based on your {personalizedPath.profile.title} profile</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Enhanced Personality Profile */}
          <div className="bg-white rounded-lg shadow-lg border">
            <div className="p-6 rounded-t-lg" style={{backgroundColor: personalizedPath.profile.colors.secondary}}>
              <h3 className="text-lg font-semibold" style={{color: personalizedPath.profile.colors.primary}}>
                {personalizedPath.profile.title}
              </h3>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">{personalizedPath.profile.description}</p>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold mb-2" style={{color: '#2d5a4a'}}>Work Style:</h4>
                  <span className="inline-block px-3 py-1 rounded-full text-sm text-white" style={{backgroundColor: personalizedPath.profile.colors.primary}}>
                    {personalizedPath.profile.workStyle}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold mb-2" style={{color: '#2d5a4a'}}>Core Motivation:</h4>
                  <p className="text-sm text-gray-600">{personalizedPath.profile.motivation}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2" style={{color: '#2d5a4a'}}>Key Strengths:</h4>
                  <div className="flex flex-wrap gap-1">
                    {personalizedPath.profile.strengths.slice(0, 3).map((strength, index) => (
                      <span key={index} className="inline-block px-2 py-1 text-xs rounded border"
                            style={{borderColor: personalizedPath.profile.colors.primary, 
                                    color: personalizedPath.profile.colors.primary}}>
                        {strength}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Top Career Matches */}
          <div className="bg-white rounded-lg shadow-lg border">
            <div className="p-6">
              <h3 className="text-lg font-semibold flex items-center mb-4" style={{color: '#2d5a4a'}}>
                <Briefcase className="h-5 w-5 mr-2" />
                Perfect Career Matches
              </h3>
              <div className="space-y-3">
                {personalizedPath.recommendedCareers.map((career, index) => (
                  <div key={index} className="p-3 rounded-lg border transition-colors hover:shadow-sm"
                       style={{borderColor: personalizedPath.profile.colors.primary + '40',
                               backgroundColor: personalizedPath.profile.colors.secondary + '30'}}>
                    <div className="font-medium" style={{color: '#2d5a4a'}}>{career}</div>
                    <div className="text-sm text-gray-600">
                      {index === 0 ? "🎯 Best match for your profile" : 
                       index === 1 ? "⭐ Strong alignment" : "✨ Good potential fit"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Learning Approach */}
          <div className="bg-white rounded-lg shadow-lg border">
            <div className="p-6">
              <h3 className="text-lg font-semibold flex items-center mb-4" style={{color: '#2d5a4a'}}>
                <Brain className="h-5 w-5 mr-2" />
                Your Learning Style
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2" style={{color: '#2d5a4a'}}>Recommended Approach:</h4>
                  <span className="inline-block px-3 py-1 rounded-full text-sm text-white" style={{backgroundColor: personalizedPath.profile.colors.primary}}>
                    {personalizedPath.learningStyle}
                  </span>
                </div>
                <div>
                  <h4 className="font-medium mb-2" style={{color: '#2d5a4a'}}>Focus Area:</h4>
                  <p className="text-sm text-gray-600">{personalizedPath.careerFocus}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Personalized Action Plan */}
        <div className="bg-white rounded-lg shadow-lg border">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2" style={{color: '#2d5a4a'}}>Your Personalized Next Steps</h3>
            <p className="text-gray-600 mb-4">Tailored recommendations based on your personality and career goals</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {personalizedPath.nextSteps.map((step, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 rounded-lg"
                     style={{backgroundColor: personalizedPath.profile.colors.secondary}}>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold"
                       style={{backgroundColor: personalizedPath.profile.colors.primary}}>
                    {index + 1}
                  </div>
                  <p className="text-sm" style={{color: '#2d5a4a'}}>{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center space-x-4">
          <Button onClick={() => handleDownloadCertificate(personalizedPath.type)} 
                  variant="outline"
                  className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
                  style={{borderColor: '#86efac', color: '#2d5a4a'}}>
            <Download className="h-4 w-4 mr-2" />
            Download Certificate
          </Button>
          <button onClick={() => setShowPersonalizedRoadmap(false)} 
                  className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
                  style={{borderColor: '#86efac', color: '#2d5a4a'}}>
            View Full Results
          </button>
          <button onClick={() => {
            setShowResults(false);
            setShowPersonalizedRoadmap(false);
            setCurrentStep(0);
            setMcqAnswers({});
            setSubjectiveAnswers({});
          }} 
          className="px-6 py-2 rounded-lg text-white hover:opacity-90 transition-opacity"
          style={{backgroundColor: '#86efac'}}>
            Explore Career Paths
          </button>
        </div>

      </div>
    );
  }

  if (showResults) {
    const personalityType = getPersonalityType();
    const profile = personalityProfiles[personalityType as keyof typeof personalityProfiles];

    return (
      <div className="max-w-4xl mx-auto space-y-6 p-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-4 rounded-full mb-4 bg-green-100">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <h2 className="text-3xl font-bold mb-2" style={{color: '#2d5a4a'}}>Assessment Complete!</h2>
          <p className="text-gray-600">Here are your personalized career insights</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Enhanced Personality Type Display */}
          <div className="bg-white rounded-lg shadow-lg border">
            <div className="p-6 rounded-t-lg" style={{backgroundColor: profile.colors.secondary}}>
              <div className="flex items-center space-x-2">
                <Brain className="h-5 w-5" style={{color: profile.colors.primary}} />
                <h3 className="text-lg font-semibold" style={{color: profile.colors.primary}}>Your Personality Type</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2" style={{color: profile.colors.primary}}>
                  {personalityType}
                </div>
                <p className="text-gray-600 mb-4">{profile.description}</p>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium" style={{color: '#2d5a4a'}}>Work Style: </span>
                    <span className="text-sm text-gray-600">{profile.workStyle}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium" style={{color: '#2d5a4a'}}>Motivation: </span>
                    <span className="text-sm text-gray-600">{profile.motivation}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Career Suggestions */}
          <div className="bg-white rounded-lg shadow-lg border">
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Target className="h-5 w-5 text-green-500" />
                <h3 className="text-lg font-semibold" style={{color: '#2d5a4a'}}>Recommended Careers</h3>
              </div>
              <div className="space-y-3">
                {profile.careers.slice(0, 5).map((career, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-green-50">
                    <span style={{color: '#2d5a4a'}}>{career}</span>
                    <span className="text-xs px-2 py-1 border rounded" style={{borderColor: '#86efac', color: '#86efac'}}>
                      {index < 2 ? 'Perfect Match' : 'Good Fit'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Strengths Overview */}
        <div className="bg-white rounded-lg shadow-lg border">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2" style={{color: '#2d5a4a'}}>Your Core Strengths</h3>
            <p className="text-gray-600 mb-4">Key abilities that align with your personality type</p>
            <div className="flex flex-wrap gap-2">
              {profile.strengths.map((strength, index) => (
                <span key={index} className="px-3 py-1 rounded text-sm"
                      style={{backgroundColor: profile.colors.secondary, color: profile.colors.primary}}>
                  {strength}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Next Steps */}
        <div className="bg-white rounded-lg shadow-lg border">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2" style={{color: '#2d5a4a'}}>Recommended Next Steps</h3>
            <p className="text-gray-600 mb-4">Personalized action plan for your career journey</p>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 text-white rounded-full flex items-center justify-center text-sm font-bold bg-green-500">1</div>
                <div>
                  <h4 className="font-semibold" style={{color: '#2d5a4a'}}>Take the WID Test</h4>
                  <p className="text-sm text-gray-600">Complete our behavioral assessment to understand what you truly desire in your career</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 text-white rounded-full flex items-center justify-center text-sm font-bold" 
                     style={{backgroundColor: '#6ee7b7'}}>2</div>
                <div>
                  <h4 className="font-semibold" style={{color: '#2d5a4a'}}>Explore Career Paths</h4>
                  <p className="text-sm text-gray-600">Browse our gamified roadmaps for careers that align with your {personalityType} profile</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 text-white rounded-full flex items-center justify-center text-sm font-bold" 
                     style={{backgroundColor: '#a7d7c4'}}>3</div>
                <div>
                  <h4 className="font-semibold" style={{color: '#2d5a4a'}}>Find Relevant Opportunities</h4>
                  <p className="text-sm text-gray-600">Apply for internships and connect with mentors in your field of interest</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center space-x-4">
          <Button onClick={() => handleDownloadCertificate(personalityType)} 
                  variant="outline"
                  className="px-8 py-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  style={{borderColor: '#86efac', color: '#2d5a4a'}}>
            <Download className="h-4 w-4 mr-2" />
            Download Certificate
          </Button>
          <button onClick={() => setShowPersonalizedRoadmap(true)} 
                  className="px-8 py-3 rounded-lg text-white hover:opacity-90 transition-opacity"
                  style={{backgroundColor: '#86efac'}}>
            View Personalized Roadmap
          </button>
          <button onClick={() => {
            setShowResults(false);
            setCurrentStep(0);
            setMcqAnswers({});
            setSubjectiveAnswers({});
          }} 
                  className="px-8 py-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  style={{borderColor: '#86efac', color: '#2d5a4a'}}>
            Retake Assessment
          </button>
        </div>

      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold" style={{color: '#2d5a4a'}}>Career Aptitude Assessment</h2>
          <span className="px-3 py-1 border rounded text-sm" style={{borderColor: '#86efac', color: '#2d5a4a'}}>
            Step {currentStep + 1} of {totalSteps}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
          <div className="h-2 rounded-full bg-green-500" style={{width: `${progress}%`}}></div>
        </div>
        <p className="text-sm text-gray-600">{Math.round(progress)}% Complete</p>
      </div>

      <div className="bg-white rounded-lg shadow-lg border">
        <div className="p-6">
          {/* MCQ Questions */}
          {currentStep < mcqQuestions.length && (
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-2">
                <div className="p-2 rounded-lg bg-green-100">
                  <Brain className="h-5 w-5 text-green-500" />
                </div>
                <h3 className="text-lg font-semibold" style={{color: '#2d5a4a'}}>Personality Assessment</h3>
              </div>
              
              <div className="p-4 rounded-lg mb-6" style={{backgroundColor: 'rgba(134, 239, 172, 0.1)', border: '1px solid rgba(134, 239, 172, 0.2)'}}>
                <p className="text-gray-800 text-lg font-medium">{mcqQuestions[currentStep].question}</p>
              </div>

              <RadioGroup
                value={(mcqAnswers as any)[mcqQuestions[currentStep].id] || ""}
                onValueChange={(value: string) => 
                  setMcqAnswers((prev: any) => ({...prev, [mcqQuestions[currentStep].id]: value}))
                }
                className="space-y-3"
              >
                {mcqQuestions[currentStep].options.map((option, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 rounded-lg border hover:shadow-sm cursor-pointer transition-all"
                       style={{borderColor: 'rgba(134, 239, 172, 0.3)', backgroundColor: mcqAnswers[mcqQuestions[currentStep].id] === option ? 'rgba(134, 239, 172, 0.05)' : 'transparent'}}>
                    <RadioGroupItem value={option} id={`option-${index}`} className="mt-1" />
                    <Label htmlFor={`option-${index}`} className="cursor-pointer flex-1 leading-relaxed font-medium" style={{color: '#2d5a4a'}}>
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {/* Subjective Questions */}
          {currentStep >= mcqQuestions.length && currentStep < mcqQuestions.length + subjectiveQuestions.length && (
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-2">
                <div className="p-2 rounded-lg" style={{backgroundColor: 'rgba(167, 215, 196, 0.3)'}}>
                  <Heart className="h-5 w-5" style={{color: '#a7d7c4'}} />
                </div>
                <h3 className="text-lg font-semibold" style={{color: '#2d5a4a'}}>Reflection Question</h3>
              </div>

              <div className="p-4 rounded-lg mb-4" style={{backgroundColor: 'rgba(167, 215, 196, 0.1)', border: '1px solid rgba(167, 215, 196, 0.2)'}}>
                <p className="text-gray-800 text-lg font-medium">
                  {subjectiveQuestions[currentStep - mcqQuestions.length]}
                </p>
              </div>

              <Textarea
                placeholder="Take your time to reflect and share your thoughts here..."
                value={(subjectiveAnswers as any)[currentStep - mcqQuestions.length] || ""}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => 
                  setSubjectiveAnswers((prev: any) => ({
                    ...prev, 
                    [currentStep - mcqQuestions.length]: e.target.value
                  }))
                }
                rows={6}
                className="w-full p-4 border rounded-lg resize-none focus:ring-2 focus:ring-green-500"
                style={{borderColor: '#a7d7c4'}}
              />
            </div>
          )}

          {/* Final Step */}
          {currentStep === totalSteps - 1 && (
            <div className="text-center space-y-6">
              <div className="p-6 rounded-lg bg-green-50">
                <div className="inline-flex items-center justify-center p-3 rounded-full mb-4 bg-green-100">
                  <Zap className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-semibold mb-4" style={{color: '#2d5a4a'}}>Ready for Your Results?</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  We'll analyze your responses using advanced personality assessment algorithms 
                  to provide personalized career recommendations, identify your core strengths, 
                  and create your custom development roadmap for the Pakistani job market.
                </p>
                <div className="mt-4 p-3 rounded-lg bg-green-100">
                  <p className="text-sm text-gray-600">
                    💡 <strong>Pro tip:</strong> After viewing your results, take our WID Test to get even more personalized insights!
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            <button 
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{borderColor: '#86efac', color: '#2d5a4a'}}
            >
              Previous
            </button>
            <button 
              onClick={handleNext} 
              className="px-6 py-2 rounded-lg text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              style={{backgroundColor: '#86efac'}}
              disabled={
                (currentStep < mcqQuestions.length && !mcqAnswers[mcqQuestions[currentStep]?.id]) ||
                (currentStep >= mcqQuestions.length && currentStep < mcqQuestions.length + subjectiveQuestions.length && 
                 !subjectiveAnswers[currentStep - mcqQuestions.length])
              }
            >
              {currentStep === totalSteps - 1 ? "View Results" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}