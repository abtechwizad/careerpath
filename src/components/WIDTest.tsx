import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { CertificateGenerator } from './CertificateGenerator';
import { CheckCircle, Heart, Target, DollarSign, Clock, Users, Shield, Brain, Lightbulb, Zap, Compass, Star, Download } from 'lucide-react';

// Comprehensive WID (What I Desire) Test Questions
const widQuestions = [
  {
    id: 1,
    category: "Crisis Management",
    icon: Shield,
    question: "Your team is facing a tight deadline and a key member just quit. How do you react?",
    options: [
      "Immediately redistribute tasks and motivate the team to rally together",
      "Analyze the situation to find the most efficient workflow adjustments",
      "Brainstorm creative solutions to deliver with fewer resources",
      "Focus on supporting team morale while finding practical solutions"
    ],
    traits: ["Natural Leader", "Strategic Analyst", "Creative Problem-Solver", "Supportive Collaborator"],
    personalities: ["Leader", "Analyst", "Creator", "Helper"]
  },
  {
    id: 2,
    category: "Decision Making Under Pressure",
    icon: Target,
    question: "You're offered two job opportunities: a safe corporate role with good benefits vs. a risky startup with equity potential. What drives your decision?",
    options: [
      "The startup - I'm willing to take calculated risks for bigger rewards",
      "The corporate role - I prefer stability and predictable growth",
      "Whichever offers more creative freedom and innovation opportunities",
      "The one where I can make the biggest positive impact on others"
    ],
    traits: ["Risk-Taking Entrepreneur", "Security-Focused Planner", "Innovation-Driven Creator", "Purpose-Driven Helper"],
    personalities: ["Entrepreneur", "Specialist", "Creator", "Helper"]
  },
  {
    id: 3,
    category: "Conflict Resolution",
    icon: Users,
    question: "Two team members are in conflict over project direction. As their colleague, you:",
    options: [
      "Take charge and facilitate a structured discussion to resolve it",
      "Research both approaches and present data-driven recommendations",
      "Suggest a creative compromise that incorporates both perspectives",
      "Listen to both sides and help them find emotional common ground"
    ],
    traits: ["Diplomatic Leader", "Evidence-Based Analyst", "Collaborative Innovator", "Empathetic Mediator"],
    personalities: ["Leader", "Analyst", "Creator", "Harmonizer"]
  },
  {
    id: 4,
    category: "Learning and Growth Style",
    icon: Brain,
    question: "You need to master a new technology for work. Your preferred approach is:",
    options: [
      "Lead a study group and learn through teaching others",
      "Deep dive into documentation and technical resources independently",
      "Experiment hands-on and build creative projects to learn",
      "Find a mentor and learn through guided practice and feedback"
    ],
    traits: ["Collaborative Teacher", "Independent Researcher", "Hands-On Experimenter", "Mentorship-Seeking Learner"],
    personalities: ["Mentor", "Specialist", "Explorer", "Collaborator"]
  },
  {
    id: 5,
    category: "Work-Life Integration",
    icon: Heart,
    question: "Your dream career allows you to:",
    options: [
      "Have flexible hours but demanding leadership responsibilities",
      "Work intensively on complex problems with deep focus time",
      "Balance creative projects with personal passion pursuits",
      "Maintain steady hours while making meaningful social impact"
    ],
    traits: ["Flexible Leader", "Deep Focus Specialist", "Creative Balanced", "Impactful Steady"],
    personalities: ["Leader", "Specialist", "Creator", "Helper"]
  },
  {
    id: 6,
    category: "Innovation Approach",
    icon: Lightbulb,
    question: "Your company needs to innovate. You believe the best approach is:",
    options: [
      "Form diverse teams and drive collaborative innovation initiatives",
      "Conduct thorough market research and competitive analysis first",
      "Start experimenting with bold, untested ideas immediately",
      "Focus on innovations that solve real human problems"
    ],
    traits: ["Collaborative Innovator", "Research-Based Strategist", "Bold Experimenter", "Human-Centered Designer"],
    personalities: ["Leader", "Analyst", "Entrepreneur", "Helper"]
  },
  {
    id: 7,
    category: "Success and Recognition",
    icon: Star,
    question: "You'll know you've 'made it' in your career when:",
    options: [
      "You're leading large teams and driving organizational change",
      "You're recognized as a subject matter expert in your field",
      "Your creative work is widely appreciated and influential",
      "Your work has made a measurable positive impact on society"
    ],
    traits: ["Organizational Leader", "Expert Authority", "Creative Influencer", "Social Impact Maker"],
    personalities: ["Leader", "Specialist", "Creator", "Helper"]
  },
  {
    id: 8,
    category: "Financial Motivation",
    icon: DollarSign,
    question: "What salary range would make you feel successful in Pakistan?",
    options: [
      "PKR 300,000+/month - I want to be in the top earning bracket",
      "PKR 70,000 - 200,000/month - Good salary with room for expertise growth",
      "PKR 80,000 - 300,000 - Decent income with creative freedom",
      "PKR 30,000 - 150,000 - Fair compensation for meaningful work"
    ],
    traits: ["High Achiever", "Growth-Focused Professional", "Balance Seeker", "Purpose-Driven Worker"],
    personalities: ["Entrepreneur", "Specialist", "Creator", "Helper"]
  },
  {
    id: 9,
    category: "Career Progression Pace",
    icon: Clock,
    question: "In your ideal career progression, you:",
    options: [
      "Want rapid advancement to leadership positions within 3-5 years",
      "Prefer steady skill building and expertise development over 5-8 years",
      "Seek varied experiences and creative challenges at your own pace",
      "Focus on increasing impact and contribution over time"
    ],
    traits: ["Fast-Track Leader", "Methodical Skill Builder", "Flexible Experience Collector", "Impact-Focused Grower"],
    personalities: ["Leader", "Specialist", "Explorer", "Helper"]
  },
  {
    id: 10,
    category: "Problem-Solving Approach",
    icon: Compass,
    question: "When faced with a complex problem you've never encountered before, you:",
    options: [
      "Break it down into smaller parts and tackle systematically",
      "Research similar problems and learn from others' solutions",
      "Jump in and experiment with different approaches",
      "Seek diverse perspectives from colleagues and experts"
    ],
    traits: ["Systematic Problem-Solver", "Research-Oriented Learner", "Experimental Innovator", "Collaborative Thinker"],
    personalities: ["Analyst", "Specialist", "Explorer", "Collaborator"]
  },
  {
    id: 11,
    category: "Communication Style",
    icon: Users,
    question: "In meetings and discussions, you typically:",
    options: [
      "Take the lead in guiding conversation and decision-making",
      "Provide detailed analysis and evidence-based insights",
      "Contribute creative ideas and alternative perspectives",
      "Ensure everyone's voice is heard and feelings are considered"
    ],
    traits: ["Decisive Communicator", "Analytical Contributor", "Creative Ideator", "Inclusive Facilitator"],
    personalities: ["Leader", "Analyst", "Creator", "Harmonizer"]
  },
  {
    id: 12,
    category: "Workplace Environment Preference",
    icon: Heart,
    question: "You thrive most in a workplace that is:",
    options: [
      "Fast-paced with high-stakes decisions and clear hierarchies",
      "Quiet and focused with deep work opportunities",
      "Dynamic and flexible with room for creativity and experimentation",
      "Collaborative and supportive with strong team relationships"
    ],
    traits: ["High-Energy Leader", "Focused Specialist", "Creative Flexible", "Team-Oriented Collaborator"],
    personalities: ["Leader", "Specialist", "Creator", "Collaborator"]
  }
];

// Enhanced personality profiles with more nuanced types
const personalityProfiles = {
  "Empathetic Collaborator": {
    description: "You excel at building relationships, understanding others' needs, and creating harmonious team environments.",
    strengths: ["Emotional Intelligence", "Team Building", "Conflict Resolution", "Inclusive Leadership"],
    careers: ["HR Specialist", "Team Lead", "Social Worker", "Counselor", "Community Manager"],
    traits: ["Supportive Collaborator", "Empathetic Mediator", "Inclusive Facilitator"],
    colors: { primary: "#86efac", secondary: "#dcfce7" }
  },
  "Strategic Innovator": {
    description: "You combine analytical thinking with creative problem-solving to drive strategic initiatives and innovation.",
    strengths: ["Strategic Planning", "Innovation", "System Thinking", "Change Management"],
    careers: ["Product Manager", "Strategy Consultant", "Innovation Director", "Business Development", "Entrepreneur"],
    traits: ["Research-Based Strategist", "Collaborative Innovator", "Strategic Analyst"],
    colors: { primary: "#6ee7b7", secondary: "#a7f3d0" }
  },
  "Analytical Problem-Solver": {
    description: "You thrive on diving deep into complex problems, analyzing data, and developing evidence-based solutions.",
    strengths: ["Critical Thinking", "Data Analysis", "Research", "Technical Expertise"],
    careers: ["Data Scientist", "Research Scientist", "Business Analyst", "Software Engineer", "Financial Analyst"],
    traits: ["Evidence-Based Analyst", "Independent Researcher", "Systematic Problem-Solver"],
    colors: { primary: "#a7d7c4", secondary: "#f0fdf4" }
  },
  "Visionary Entrepreneur": {
    description: "You're driven by big ideas, comfortable with risk, and excel at turning vision into reality.",
    strengths: ["Vision Setting", "Risk Taking", "Innovation", "Leadership"],
    careers: ["Entrepreneur", "Startup Founder", "Business Development", "Sales Director", "Innovation Lead"],
    traits: ["Risk-Taking Entrepreneur", "Bold Experimenter", "Fast-Track Leader"],
    colors: { primary: "#2d5a4a", secondary: "#86efac" }
  },
  "Supportive Mentor": {
    description: "You find fulfillment in helping others grow, sharing knowledge, and creating positive impact through guidance.",
    strengths: ["Mentoring", "Knowledge Transfer", "Empathy", "Development Focus"],
    careers: ["Teacher", "Training Manager", "Coach", "Mentor", "Learning & Development Specialist"],
    traits: ["Collaborative Teacher", "Mentorship-Seeking Learner", "Purpose-Driven Helper"],
    colors: { primary: "#319879", secondary: "#bbf7d0" }
  },
  "Adaptive Explorer": {
    description: "You thrive on variety, learning new things, and adapting to different challenges and environments.",
    strengths: ["Adaptability", "Learning Agility", "Versatility", "Curiosity"],
    careers: ["Project Manager", "Consultant", "Product Owner", "Operations Manager", "Business Analyst"],
    traits: ["Flexible Experience Collector", "Hands-On Experimenter", "Experimental Innovator"],
    colors: { primary: "#86efac", secondary: "#dcfce7" }
  },
  "Detail-Oriented Specialist": {
    description: "You excel at mastering specific domains, ensuring quality and precision, and building deep expertise.",
    strengths: ["Attention to Detail", "Technical Mastery", "Quality Focus", "Specialization"],
    careers: ["Software Engineer", "Research Scientist", "Quality Analyst", "Technical Writer", "Specialist Consultant"],
    traits: ["Deep Focus Specialist", "Methodical Skill Builder", "Focused Specialist"],
    colors: { primary: "#6ee7b7", secondary: "#a7f3d0" }
  },
  "People-Focused Harmonizer": {
    description: "You naturally create harmony, understand different perspectives, and help teams work together effectively.",
    strengths: ["Interpersonal Skills", "Diplomacy", "Team Harmony", "Communication"],
    careers: ["HR Manager", "Team Coordinator", "Customer Success", "Community Manager", "Organizational Development"],
    traits: ["Diplomatic Leader", "Empathetic Mediator", "Team-Oriented Collaborator"],
    colors: { primary: "#a7d7c4", secondary: "#f0fdf4" }
  }
};

export function WIDTest() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [showPersonalityModal, setShowPersonalityModal] = useState(false);
  const [selectedPersonality, setSelectedPersonality] = useState<string>('');
  const [showCertificate, setShowCertificate] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleDownloadCertificate = (analysis: any) => {
    const params = new URLSearchParams({
      userName: user.name || "Aspirant",
      testName: "WIT Behavioural Assessment",
      date: new Date().toLocaleDateString(),
      resultType: analysis.personality
    });
    window.open(`/certificate?${params.toString()}`, '_blank');
  };

  const totalSteps = widQuestions.length + 1;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const personality = analyzePersonality();
    
    // Save to localStorage for profile display
    const newCertificate = {
      id: Date.now(),
      name: "WIT Behavioural Assessment",
      type: "WIT Test",
      date: new Date().toLocaleDateString(),
      score: "Verified",
      resultType: personality.personality
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

  const analyzePersonality = () => {
    const traitCounts: Record<string, number> = {};
    const personalityCounts: Record<string, number> = {};

    (Object.entries(answers) as [string, string][]).forEach(([questionIndex, answer]) => {
      const question = widQuestions[parseInt(questionIndex)];
      const answerIndex = question.options.indexOf(answer);

      if (answerIndex !== -1) {
        // Count traits
        const trait = question.traits[answerIndex];
        traitCounts[trait] = (traitCounts[trait] || 0) + 1;

        // Count personalities
        const personality = question.personalities[answerIndex];
        personalityCounts[personality] = (personalityCounts[personality] || 0) + 1;
      }
    });

    // Check if we have any personality counts
    const personalityKeys = Object.keys(personalityCounts);
    if (personalityKeys.length === 0) {
      return {
        personality: 'Adaptive Explorer',
        traits: ['Versatile', 'Adaptable'],
        rawCounts: {}
      };
    }

    // Determine dominant personality
    const dominantPersonality = personalityKeys.reduce((a, b) =>
      personalityCounts[a] > personalityCounts[b] ? a : b
    );

    // Map to detailed personality profiles
    const personalityMapping: Record<string, string> = {
      'Helper': 'Empathetic Collaborator',
      'Analyst': 'Analytical Problem-Solver',
      'Creator': 'Strategic Innovator',
      'Leader': 'Visionary Entrepreneur',
      'Entrepreneur': 'Visionary Entrepreneur',
      'Specialist': 'Detail-Oriented Specialist',
      'Explorer': 'Adaptive Explorer',
      'Collaborator': 'Empathetic Collaborator',
      'Mentor': 'Supportive Mentor',
      'Harmonizer': 'People-Focused Harmonizer'
    };

    const detailedPersonality = personalityMapping[dominantPersonality] || 'Adaptive Explorer';

    return {
      personality: detailedPersonality,
      traits: Object.keys(traitCounts).sort((a, b) => traitCounts[b] - traitCounts[a]).slice(0, 5),
      rawCounts: personalityCounts
    };
  };

  const handlePersonalityClick = (personalityKey: string) => {
    setSelectedPersonality(personalityKey);
    setShowPersonalityModal(true);
  };

  if (showResults) {
    const analysis = analyzePersonality();
    const profile = personalityProfiles[analysis.personality as keyof typeof personalityProfiles];

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-4 rounded-full mb-4"
            style={{ backgroundColor: 'rgba(134, 239, 172, 0.3)' }}>
            <CheckCircle className="h-12 w-12" style={{ color: '#86efac' }} />
          </div>
          <h2 className="text-3xl font-bold mb-2" style={{ color: '#2d5a4a' }}>WID Assessment Complete!</h2>
          <p className="text-gray-600">Here's what you desire in your career journey</p>
        </div>

        {/* Personality Result */}
        <Card className="backdrop-blur-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
          <CardHeader style={{ backgroundColor: profile.colors.secondary }}>
            <div className="flex items-center space-x-2">
              <Heart className="h-5 w-5" style={{ color: profile.colors.primary }} />
              <CardTitle style={{ color: profile.colors.primary }}>Your Career Personality</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2" style={{ color: profile.colors.primary }}>
                {analysis.personality}
              </div>
              <p className="text-gray-600 mb-4">{profile.description}</p>
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {profile.strengths.map((strength, index) => (
                  <Badge key={index} variant="outline"
                    style={{ borderColor: profile.colors.primary, color: profile.colors.primary }}>
                    {strength}
                  </Badge>
                ))}
              </div>
              <Button
                onClick={() => handlePersonalityClick(analysis.personality)}
                style={{ backgroundColor: profile.colors.primary, color: 'white' }}
              >
                Learn More About Your Type
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Behavioral Traits */}
        <Card className="backdrop-blur-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
          <CardHeader>
            <CardTitle style={{ color: '#2d5a4a' }}>Your Key Behavioral Traits</CardTitle>
            <CardDescription>Based on your situational responses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {analysis.traits.map((trait, index) => (
                <Badge key={index} variant="secondary"
                  style={{ backgroundColor: '#a7d7c4', color: '#2d5a4a' }}>
                  {trait}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Career Recommendations */}
        <Card className="backdrop-blur-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
          <CardHeader>
            <CardTitle className="flex items-center" style={{ color: '#2d5a4a' }}>
              <Target className="h-5 w-5 mr-2" style={{ color: '#86efac' }} />
              Recommended Career Paths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {profile.careers.map((career, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg"
                  style={{ backgroundColor: 'rgba(134, 239, 172, 0.1)' }}>
                  <span style={{ color: '#2d5a4a' }}>{career}</span>
                  <Badge variant="outline" style={{ borderColor: '#86efac', color: '#86efac' }}>
                    {index < 2 ? 'Perfect Match' : 'Good Fit'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* All Personality Types */}
        <Card className="backdrop-blur-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
          <CardHeader>
            <CardTitle style={{ color: '#2d5a4a' }}>Explore All Personality Types</CardTitle>
            <CardDescription>Click on any type to learn more about different career personalities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(personalityProfiles).map(([key, profile]) => (
                <Card key={key}
                  className={`cursor-pointer transition-all hover:scale-105 ${key === analysis.personality ? 'ring-2' : ''
                    }`}
                  style={key === analysis.personality ?
                    { backgroundColor: profile.colors.secondary, borderColor: profile.colors.primary } :
                    { backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                  onClick={() => handlePersonalityClick(key)}>
                  <CardContent className="pt-4 text-center">
                    <h3 className="font-semibold mb-2" style={{ color: profile.colors.primary }}>
                      {key}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{profile.description}</p>
                    {key === analysis.personality && (
                      <Badge style={{ backgroundColor: profile.colors.primary, color: 'white' }}>
                        Your Type
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 pt-6 mt-6 border-t">
          <Button 
            variant="outline" 
            className="flex-1 border-emerald-600 text-emerald-600 hover:bg-emerald-50"
            onClick={() => handleDownloadCertificate(analysis)}
          >
            <Download className="h-4 w-4 mr-2" />
            Download Certificate
          </Button>
          <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700" onClick={() => {
            setShowResults(false);
            setCurrentStep(0);
            setAnswers({});
          }}>
            Retake WID Test
          </Button>
        </div>


        {/* Personality Detail Modal */}
        <Dialog open={showPersonalityModal} onOpenChange={setShowPersonalityModal}>
          <DialogContent className="max-w-2xl">
            {selectedPersonality && personalityProfiles[selectedPersonality as keyof typeof personalityProfiles] && (
              <>
                <DialogHeader>
                  <DialogTitle style={{ color: personalityProfiles[selectedPersonality as keyof typeof personalityProfiles].colors.primary }}>
                    {selectedPersonality}
                  </DialogTitle>
                  <DialogDescription>
                    {personalityProfiles[selectedPersonality as keyof typeof personalityProfiles].description}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2" style={{ color: '#2d5a4a' }}>Key Strengths:</h4>
                    <div className="flex flex-wrap gap-2">
                      {personalityProfiles[selectedPersonality as keyof typeof personalityProfiles].strengths.map((strength, index) => (
                        <Badge key={index} variant="outline"
                          style={{
                            borderColor: personalityProfiles[selectedPersonality as keyof typeof personalityProfiles].colors.primary,
                            color: personalityProfiles[selectedPersonality as keyof typeof personalityProfiles].colors.primary
                          }}>
                          {strength}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2" style={{ color: '#2d5a4a' }}>Ideal Career Paths:</h4>
                    <ul className="space-y-1">
                      {personalityProfiles[selectedPersonality as keyof typeof personalityProfiles].careers.map((career, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: personalityProfiles[selectedPersonality as keyof typeof personalityProfiles].colors.primary }}></div>
                          <span className="text-gray-600">{career}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold" style={{ color: '#2d5a4a' }}>What I Desire (WID) Test</h2>
          <Badge variant="outline" style={{ borderColor: '#86efac', color: '#2d5a4a' }}>
            Question {currentStep + 1} of {totalSteps}
          </Badge>
        </div>
        <Progress value={progress} className="mb-2" />
        <p className="text-sm text-gray-600">{Math.round(progress)}% Complete</p>
      </div>

      <Card className="backdrop-blur-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
        <CardContent className="pt-6">
          {currentStep < widQuestions.length && (
            <div className="space-y-6">
              {(() => {
                const question = widQuestions[currentStep];
                const Icon = question.icon;
                return (
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(110, 231, 183, 0.1)' }}>
                      <div className="flex items-start space-x-3 mb-3">
                        <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(110, 231, 183, 0.2)' }}>
                          <Icon className="h-5 w-5" style={{ color: '#6ee7b7' }} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg" style={{ color: '#2d5a4a' }}>{question.category}</h4>
                          <p className="text-gray-700 mt-2">{question.question}</p>
                        </div>
                      </div>
                    </div>
                    <RadioGroup
                      value={answers[currentStep] || ""}
                      onValueChange={(value) =>
                        setAnswers(prev => ({ ...prev, [currentStep]: value }))
                      }
                      className="space-y-3"
                    >
                      {question.options.map((option, index) => (
                        <div key={index} className="flex items-start space-x-3 p-4 rounded-lg border hover:shadow-sm cursor-pointer transition-all"
                          style={{ borderColor: 'rgba(110, 231, 183, 0.3)' }}>
                          <RadioGroupItem value={option} id={`option-${index}`} className="mt-1" />
                          <Label htmlFor={`option-${index}`} className="cursor-pointer flex-1">
                            <div className="font-medium" style={{ color: '#2d5a4a' }}>{option}</div>
                            <div className="text-sm text-gray-500 mt-1">
                              Trait: {question.traits[index]}
                            </div>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                );
              })()}
            </div>
          )}

          {/* Final Step */}
          {currentStep === totalSteps - 1 && (
            <div className="text-center space-y-6">
              <div className="p-6 rounded-lg" style={{ backgroundColor: 'rgba(134, 239, 172, 0.1)' }}>
                <div className="inline-flex items-center justify-center p-3 rounded-full mb-4"
                  style={{ backgroundColor: 'rgba(134, 239, 172, 0.2)' }}>
                  <Zap className="h-8 w-8" style={{ color: '#86efac' }} />
                </div>
                <h3 className="text-2xl font-semibold mb-4" style={{ color: '#2d5a4a' }}>Ready to Discover What You Desire?</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  We'll analyze your responses to reveal your unique career personality,
                  behavioral traits, and what truly motivates you in your professional journey.
                  Get personalized insights tailored for the Pakistani job market.
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              style={{ borderColor: '#86efac', color: '#2d5a4a' }}
            >
              Previous
            </Button>
            <Button
              onClick={handleNext}
              style={{ backgroundColor: '#86efac', color: '#2d5a4a' }}
              disabled={currentStep < widQuestions.length && !answers[currentStep]}
            >
              {currentStep === totalSteps - 1 ? "View My Results" : "Next"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}