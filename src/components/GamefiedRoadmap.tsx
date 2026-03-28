import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import {
  Trophy,
  Star,
  Lock,
  CheckCircle,
  Target,
  BookOpen,
  Users,
  Crown,
  Zap,
  Award,
  Map,
  Rocket,
  Play,
  Clock,
  User,
  Brain,
  Heart,
  Lightbulb,
  Shield,
  Settings
} from 'lucide-react';

// Personality-based roadmap configurations
const personalizedRoadmaps = {
  Helper: {
    title: "Empathetic Helper Path",
    description: "Focus on people-centered careers with social impact",
    primaryColor: "#86efac",
    secondaryColor: "#dcfce7",
    paths: ["social-worker", "teacher", "counselor", "healthcare-professional"]
  },
  Analyst: {
    title: "Strategic Analyst Path",
    description: "Data-driven and analytical career progression",
    primaryColor: "#6ee7b7",
    secondaryColor: "#a7f3d0",
    paths: ["data-scientist", "software-engineer", "business-analyst", "cybersecurity"]
  },
  Creator: {
    title: "Innovative Creator Path",
    description: "Creative and design-focused career journey",
    primaryColor: "#a7d7c4",
    secondaryColor: "#f0fdf4",
    paths: ["ui-ux-designer", "digital-marketing", "content-creator", "product-designer"]
  },
  Leader: {
    title: "Natural Leader Path",
    description: "Leadership and management focused progression",
    primaryColor: "#2d5a4a",
    secondaryColor: "#86efac",
    paths: ["product-manager", "entrepreneur", "team-lead", "business-development"]
  },
  Explorer: {
    title: "Versatile Explorer Path",
    description: "Adaptable multi-disciplinary career path",
    primaryColor: "#319879",
    secondaryColor: "#bbf7d0",
    paths: ["business-analyst", "product-manager", "digital-marketing", "operations-manager"]
  }
};

const careerPaths = {
  "software-engineer": {
    title: "Software Engineering",
    icon: "💻",
    description: "Build applications and systems that power the digital world",
    industryContext: "Pakistan's largest tech sector with 4.5M+ professionals. Companies like TCS and startups like TecMasterSD, TechMasterSD are actively hiring.",
    salaryRange: "20,000 - 400,000/month",
    demandLevel: "Very High",
    personalityFit: ["Analyst", "Explorer"],
    levels: [
      {
        id: 1,
        title: "Programming Foundations",
        description: "Master programming basics and fundamental concepts",
        skills: ["HTML/CSS", "JavaScript", "Git", "Problem Solving"],
        milestones: ["First Hello World", "Personal Portfolio", "Version Control Mastery"],
        xp: 500,
        unlocked: true,
        completed: true,
        duration: "4-6 weeks",
        projects: ["Personal Portfolio Website", "Calculator App", "Todo List Application"],
        resources: ["Interactive coding tutorials", "Video lectures", "Coding challenges", "Peer code reviews"]
      },
      {
        id: 2,
        title: "Frontend Development",
        description: "Build interactive user interfaces with modern frameworks",
        skills: ["React", "State Management", "API Integration", "Responsive Design"],
        milestones: ["Interactive Web App", "Framework Certification", "Deploy to Production"],
        xp: 750,
        unlocked: true,
        completed: true,
        duration: "6-8 weeks",
        projects: ["E-commerce Website", "Social Media Dashboard", "Real-time Chat App"],
        resources: ["React documentation", "Component libraries", "API tutorials", "Deployment guides"]
      },
      {
        id: 3,
        title: "Full Stack Development",
        description: "Master both frontend and backend technologies",
        skills: ["Node.js", "Databases", "Authentication", "Cloud Deployment"],
        milestones: ["REST API Creation", "Database Design", "Security Implementation"],
        xp: 1000,
        unlocked: true,
        completed: false,
        duration: "8-10 weeks",
        projects: ["Full Stack Web Application", "RESTful API Service", "Database-driven Website"],
        resources: ["Backend frameworks", "Database tutorials", "Security best practices", "Cloud platforms"]
      },
      {
        id: 4,
        title: "Advanced Engineering",
        description: "System design and scalable architecture",
        skills: ["System Design", "Microservices", "Performance Optimization", "Testing"],
        milestones: ["Scalable System", "Code Review Excellence", "Team Leadership"],
        xp: 1250,
        unlocked: true,
        completed: false,
        duration: "10-12 weeks",
        projects: ["Microservices Architecture", "High-Performance System", "Automated Testing Suite"],
        resources: ["System design courses", "Architecture patterns", "Performance tools", "Testing frameworks"]
      },
      {
        id: 5,
        title: "Senior Leadership",
        description: "Technical leadership and strategic decision making",
        skills: ["Architecture", "Team Management", "Strategic Planning", "Mentoring"],
        milestones: ["System Architect", "Technical Director", "Industry Recognition"],
        xp: 1500,
        unlocked: true,
        completed: false,
        duration: "12-16 weeks",
        projects: ["Technical Strategy Document", "Team Mentorship Program", "Open Source Contribution"],
        resources: ["Leadership training", "Architecture workshops", "Mentoring guides", "Industry conferences"]
      }
    ]
  },
  "data-scientist": {
    title: "Data Science",
    icon: "📊",
    description: "Extract insights from data to drive business decisions",
    industryContext: "Fast-growing field in Pakistan with companies like Daraz, HBL, and Jazz heavily investing in data science capabilities.",
    salaryRange: "PKR 50k - 500k /month",
    demandLevel: "High",
    personalityFit: ["Analyst"],
    levels: [
      {
        id: 1,
        title: "Data Foundations",
        description: "Learn statistics, mathematics and Python programming",
        skills: ["Statistics", "Python", "Pandas", "Data Analysis"],
        milestones: ["Statistical Analysis", "Python Mastery", "Data Manipulation"],
        xp: 500,
        unlocked: true,
        completed: false,
        duration: "6-8 weeks",
        projects: ["Data Analysis Report", "Python Data Scripts", "Statistical Dashboard"],
        resources: ["Python tutorials", "Statistics courses", "Pandas documentation", "Data visualization tools"]
      },
      {
        id: 2,
        title: "Machine Learning",
        description: "Build predictive models and algorithms",
        skills: ["ML Algorithms", "scikit-learn", "Model Evaluation", "Feature Engineering"],
        milestones: ["Classification Model", "Regression Analysis", "Model Deployment"],
        xp: 750,
        unlocked: true,
        completed: false,
        duration: "8-10 weeks",
        projects: ["Predictive Model", "Customer Segmentation", "Recommendation System"],
        resources: ["ML algorithms", "Model training", "Feature engineering", "Model evaluation"]
      },
      {
        id: 3,
        title: "Advanced Analytics",
        description: "Deep learning and advanced statistical methods",
        skills: ["Deep Learning", "Neural Networks", "Time Series", "A/B Testing"],
        milestones: ["Neural Network", "Predictive System", "Business Impact"],
        xp: 1000,
        unlocked: true,
        completed: false,
        duration: "10-12 weeks",
        projects: ["Deep Learning Model", "Time Series Forecasting", "A/B Test Analysis"],
        resources: ["TensorFlow/PyTorch", "Neural networks", "Time series analysis", "Experimental design"]
      },
      {
        id: 4,
        title: "AI Specialist",
        description: "Advanced AI and machine learning research",
        skills: ["AI Research", "Advanced ML", "Model Optimization", "Data Strategy"],
        milestones: ["AI Implementation", "Research Publication", "Industry Recognition"],
        xp: 1300,
        unlocked: true,
        completed: false,
        duration: "12-16 weeks",
        projects: ["AI Research Project", "Advanced ML Pipeline", "Data Strategy Framework"],
        resources: ["Research papers", "Advanced algorithms", "Model optimization", "AI ethics"]
      }
    ]
  },
  "ui-ux-designer": {
    title: "UI/UX Design",
    icon: "🎨",
    description: "Create beautiful and intuitive user experiences",
    industryContext: "Growing design industry in Pakistan with increased focus on user experience. Companies like Foodpanda, Careem value great design.",
    salaryRange: "PKR 40k - 300k /month",
    demandLevel: "High",
    personalityFit: ["Creator"],
    levels: [
      {
        id: 1,
        title: "Design Foundations",
        description: "Learn design principles and tools",
        skills: ["Figma", "Design Principles", "Typography", "Color Theory"],
        milestones: ["First Design", "Tool Mastery", "Design System"],
        xp: 400,
        unlocked: true,
        completed: false,
        duration: "4-6 weeks",
        projects: ["Mobile App Design", "Website Redesign", "Logo Design"],
        resources: ["Figma tutorials", "Design principles", "Typography guides", "Color theory"]
      },
      {
        id: 2,
        title: "User Research",
        description: "Understand users through research and testing",
        skills: ["User Research", "Usability Testing", "Personas", "Journey Mapping"],
        milestones: ["User Study", "Testing Protocol", "Research Insights"],
        xp: 600,
        unlocked: true,
        completed: false,
        duration: "6-8 weeks",
        projects: ["User Research Study", "Usability Test Report", "User Journey Map"],
        resources: ["Research methods", "Testing tools", "Interview techniques", "Analytics platforms"]
      },
      {
        id: 3,
        title: "Advanced Design",
        description: "Complex interactions and design systems",
        skills: ["Interaction Design", "Prototyping", "Design Systems", "Accessibility"],
        milestones: ["Interactive Prototype", "Design System", "Accessibility Audit"],
        xp: 800,
        unlocked: true,
        completed: false,
        duration: "8-10 weeks",
        projects: ["Interactive Prototype", "Component Library", "Accessibility Guidelines"],
        resources: ["Prototyping tools", "Design systems", "Accessibility standards", "Animation principles"]
      },
      {
        id: 4,
        title: "Design Leadership",
        description: "Lead design teams and strategy",
        skills: ["Design Strategy", "Team Leadership", "Design Operations", "Business Impact"],
        milestones: ["Design Team Lead", "Strategy Implementation", "Design Excellence"],
        xp: 1000,
        unlocked: true,
        completed: false,
        duration: "10-12 weeks",
        projects: ["Design Strategy Plan", "Team Process Optimization", "Business Impact Measurement"],
        resources: ["Leadership training", "Design operations", "Strategy frameworks", "Team management"]
      }
    ]
  },
  "digital-marketing": {
    title: "Digital Marketing",
    icon: "📱",
    description: "Drive growth through digital channels and data-driven strategies",
    industryContext: "Rapidly growing sector in Pakistan with digital-first startups and traditional businesses going online. High demand across all industries.",
    salaryRange: "PKR 30k - 250k /month",
    demandLevel: "Very High",
    personalityFit: ["Creator", "Explorer"],
    levels: [
      {
        id: 1,
        title: "Marketing Basics",
        description: "Fundamentals of digital marketing and analytics",
        skills: ["Google Analytics", "SEO Basics", "Content Marketing", "Social Media"],
        milestones: ["Campaign Launch", "Analytics Setup", "Content Strategy"],
        xp: 400,
        unlocked: true,
        completed: false,
        duration: "4-6 weeks",
        projects: ["Social Media Campaign", "SEO Content Plan", "Analytics Dashboard"],
        resources: ["Google Analytics", "SEO tools", "Content platforms", "Social media guides"]
      },
      {
        id: 2,
        title: "Paid Advertising",
        description: "Master paid advertising platforms and optimization",
        skills: ["Google Ads", "Facebook Ads", "Conversion Optimization", "ROI Analysis"],
        milestones: ["Ad Campaign", "Conversion Funnel", "ROI Improvement"],
        xp: 600,
        unlocked: true,
        completed: false,
        duration: "6-8 weeks",
        projects: ["Google Ads Campaign", "Facebook Marketing", "Landing Page Optimization"],
        resources: ["Google Ads training", "Facebook Blueprint", "Conversion tools", "Analytics platforms"]
      },
      {
        id: 3,
        title: "Growth Marketing",
        description: "Advanced growth strategies and automation",
        skills: ["Growth Hacking", "Marketing Automation", "A/B Testing", "Analytics"],
        milestones: ["Growth System", "Automation Setup", "Scale Achievement"],
        xp: 800,
        unlocked: true,
        completed: false,
        duration: "8-10 weeks",
        projects: ["Growth Marketing Strategy", "Automation Workflow", "A/B Test Framework"],
        resources: ["Growth tools", "Automation platforms", "Testing frameworks", "Advanced analytics"]
      },
      {
        id: 4,
        title: "Marketing Leadership",
        description: "Strategic marketing leadership and team management",
        skills: ["Marketing Strategy", "Team Leadership", "Budget Management", "Brand Building"],
        milestones: ["Marketing Director", "Brand Strategy", "Team Building"],
        xp: 1100,
        unlocked: true,
        completed: false,
        duration: "10-12 weeks",
        projects: ["Marketing Strategy Document", "Brand Development Plan", "Team Performance System"],
        resources: ["Strategy frameworks", "Leadership training", "Budget management", "Brand building"]
      }
    ]
  },
  "product-manager": {
    title: "Product Management",
    icon: "🚀",
    description: "Drive product strategy and coordinate cross-functional teams",
    industryContext: "High-demand role in Pakistan's tech ecosystem. Companies like Daraz, JazzCash, and Bykea are actively hiring product managers.",
    salaryRange: "PKR 80k - 600k /month",
    demandLevel: "Very High",
    personalityFit: ["Leader", "Explorer"],
    levels: [
      {
        id: 1,
        title: "Product Basics",
        description: "Understanding product development lifecycle",
        skills: ["User Research", "Market Analysis", "Requirements", "Roadmapping"],
        milestones: ["Market Research", "Feature Spec", "Product Roadmap"],
        xp: 500,
        unlocked: true,
        completed: false,
        duration: "6-8 weeks",
        projects: ["Product Requirements Document", "Market Analysis Report", "Product Roadmap"],
        resources: ["PM frameworks", "User research tools", "Market analysis", "Roadmapping tools"]
      },
      {
        id: 2,
        title: "Analytics & Strategy",
        description: "Data-driven product decisions and strategic thinking",
        skills: ["Product Analytics", "A/B Testing", "KPIs", "Strategy Framework"],
        milestones: ["Metrics Dashboard", "Strategy Document", "Growth Initiative"],
        xp: 750,
        unlocked: true,
        completed: false,
        duration: "8-10 weeks",
        projects: ["Analytics Dashboard", "A/B Test Framework", "Product Strategy"],
        resources: ["Analytics tools", "Testing platforms", "Strategy frameworks", "KPI tracking"]
      },
      {
        id: 3,
        title: "Leadership & Scale",
        description: "Leading product teams and scaling products",
        skills: ["Team Leadership", "Stakeholder Management", "Product Strategy", "Innovation"],
        milestones: ["Team Leadership", "Product Launch", "Market Expansion"],
        xp: 1000,
        unlocked: true,
        completed: false,
        duration: "10-12 weeks",
        projects: ["Product Launch Plan", "Team Coordination System", "Innovation Framework"],
        resources: ["Leadership training", "Launch strategies", "Team management", "Innovation methods"]
      },
      {
        id: 4,
        title: "Senior Product Leadership",
        description: "Strategic product leadership and business impact",
        skills: ["Business Strategy", "Portfolio Management", "P&L Ownership", "Vision Setting"],
        milestones: ["Product Director", "Business Impact", "Strategic Vision"],
        xp: 1400,
        unlocked: true,
        completed: false,
        duration: "12-16 weeks",
        projects: ["Product Portfolio Strategy", "Business Case Development", "Vision & Strategy Document"],
        resources: ["Executive training", "Portfolio management", "Financial modeling", "Strategic planning"]
      }
    ]
  },
  "cybersecurity": {
    title: "Cybersecurity",
    icon: "🔒",
    description: "Protect digital assets and secure systems from threats",
    industryContext: "Critical and growing field in Pakistan with government initiatives and increasing cyber threats. High demand across all sectors.",
    salaryRange: "PKR 60k - 450k /month",
    demandLevel: "Very High",
    personalityFit: ["Analyst"],
    levels: [
      {
        id: 1,
        title: "Security Fundamentals",
        description: "Basic cybersecurity concepts and tools",
        skills: ["Network Security", "Ethical Hacking", "Risk Assessment", "Security Tools"],
        milestones: ["Security Audit", "Vulnerability Scan", "Risk Report"],
        xp: 600,
        unlocked: true,
        completed: false,
        duration: "6-8 weeks",
        projects: ["Network Security Assessment", "Vulnerability Report", "Security Policy Document"],
        resources: ["Security frameworks", "Ethical hacking tools", "Risk assessment", "Security standards"]
      },
      {
        id: 2,
        title: "Advanced Security",
        description: "Penetration testing and incident response",
        skills: ["Penetration Testing", "Incident Response", "Digital Forensics", "Compliance"],
        milestones: ["Pen Test Report", "Incident Handling", "Security Framework"],
        xp: 850,
        unlocked: true,
        completed: false,
        duration: "8-10 weeks",
        projects: ["Penetration Testing Report", "Incident Response Plan", "Compliance Audit"],
        resources: ["Pen testing tools", "Forensics software", "Incident response", "Compliance frameworks"]
      },
      {
        id: 3,
        title: "Security Architecture",
        description: "Design secure systems and lead security initiatives",
        skills: ["Security Architecture", "Cloud Security", "Threat Intelligence", "Leadership"],
        milestones: ["Security Design", "Threat Analysis", "Security Program"],
        xp: 1100,
        unlocked: true,
        completed: false,
        duration: "10-12 weeks",
        projects: ["Security Architecture Design", "Threat Intelligence System", "Security Program Management"],
        resources: ["Architecture patterns", "Cloud security", "Threat intelligence", "Program management"]
      }
    ]
  },
  "business-analyst": {
    title: "Business Analytics",
    icon: "📈",
    description: "Transform business data into actionable insights",
    industryContext: "Growing demand in Pakistan across all industries as companies become more data-driven. Essential role in digital transformation.",
    salaryRange: "PKR 40k - 350k /month",
    demandLevel: "High",
    personalityFit: ["Analyst", "Explorer"],
    levels: [
      {
        id: 1,
        title: "Analytics Foundation",
        description: "Business intelligence and data visualization",
        skills: ["Excel Advanced", "Power BI", "SQL", "Business Intelligence"],
        milestones: ["Dashboard Creation", "Data Analysis", "Business Report"],
        xp: 450,
        unlocked: true,
        completed: false,
        duration: "5-7 weeks",
        projects: ["Business Dashboard", "Data Analysis Report", "KPI Tracking System"],
        resources: ["Excel training", "Power BI tutorials", "SQL courses", "BI platforms"]
      },
      {
        id: 2,
        title: "Advanced Analytics",
        description: "Predictive analytics and statistical modeling",
        skills: ["Statistical Analysis", "Predictive Modeling", "R/Python", "Data Mining"],
        milestones: ["Predictive Model", "Statistical Report", "Process Optimization"],
        xp: 700,
        unlocked: true,
        completed: false,
        duration: "7-9 weeks",
        projects: ["Predictive Analytics Model", "Statistical Analysis Report", "Business Process Optimization"],
        resources: ["Statistical software", "Modeling techniques", "Data mining tools", "Process analysis"]
      },
      {
        id: 3,
        title: "Strategic Analytics",
        description: "Drive business strategy through advanced analytics",
        skills: ["Strategic Analysis", "Business Strategy", "Advanced Modeling", "Consulting"],
        milestones: ["Strategy Recommendation", "Business Impact", "Analytics Leadership"],
        xp: 950,
        unlocked: true,
        completed: false,
        duration: "9-11 weeks",
        projects: ["Strategic Analytics Framework", "Business Strategy Report", "Analytics Center of Excellence"],
        resources: ["Strategy frameworks", "Advanced analytics", "Consulting skills", "Leadership training"]
      }
    ]
  }
};

const achievements = [
  { id: 1, title: "First Steps", description: "Complete your first milestone", icon: "🌟", unlocked: true },
  { id: 2, title: "Level Up", description: "Reach level 2 in any career path", icon: "⬆️", unlocked: true },
  { id: 3, title: "Multi-Skilled", description: "Start learning 3 different career paths", icon: "🎯", unlocked: true },
  { id: 4, title: "Skill Master", description: "Master 15 different skills", icon: "🏆", unlocked: false },
  { id: 5, title: "Mentor Ready", description: "Complete 3 levels in any career path", icon: "🤝", unlocked: false },
  { id: 6, title: "Expert", description: "Complete an entire career path", icon: "👑", unlocked: false },
  { id: 7, title: "Career Changer", description: "Switch and progress in different career paths", icon: "🔄", unlocked: false },
  { id: 8, title: "Community Leader", description: "Help 10 other users on their journey", icon: "👥", unlocked: false },
];

// Mock user personality type (in a real app, this would come from assessment results)
const getUserPersonalityType = () => {
  return localStorage.getItem('userPersonalityType') || 'Explorer';
};

export function GamefiedRoadmap() {
  const [selectedPath, setSelectedPath] = useState("software-engineer");
  const [activeTab, setActiveTab] = useState("roadmap");
  const [roadmapMode, setRoadmapMode] = useState<'all' | 'personalized'>('all');
  const [userXP, setUserXP] = useState(1250);
  const [userLevel, setUserLevel] = useState(3);
  const [showCareerPathModal, setShowCareerPathModal] = useState(false);
  const [showLevelModal, setShowLevelModal] = useState(false);
  const [selectedCareerPath, setSelectedCareerPath] = useState<typeof careerPaths[keyof typeof careerPaths] | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<typeof careerPaths[keyof typeof careerPaths]['levels'][0] | null>(null);
  const [userPersonalityType, setUserPersonalityType] = useState<string>('');

  useEffect(() => {
    const personality = getUserPersonalityType();
    setUserPersonalityType(personality);
  }, []);

  const handleStartLevel = (level: typeof careerPaths[keyof typeof careerPaths]['levels'][0], pathKey: string) => {
    setSelectedLevel(level);
    setShowLevelModal(true);
  };

  const handleSelectCareerPath = (pathKey: string) => {
    setSelectedPath(pathKey);
    const pathData = careerPaths[pathKey as keyof typeof careerPaths];
    setSelectedCareerPath(pathData);
    setShowCareerPathModal(true);
  };

  const handleStartLearning = () => {
    if (selectedLevel) {
      setUserXP(prev => prev + Math.floor(selectedLevel.xp * 0.1));

      const newTotalXP = userXP + Math.floor(selectedLevel.xp * 0.1);
      if (newTotalXP > 2000 && userLevel < 4) {
        setUserLevel(4);
      } else if (newTotalXP > 1500 && userLevel < 3) {
        setUserLevel(3);
      }

      setShowLevelModal(false);
      setSelectedLevel(null);

      alert(`🚀 Successfully started ${selectedLevel.title}!\n\nYou've gained ${Math.floor(selectedLevel.xp * 0.1)} XP.\n\nYour learning journey has begun! Check your progress in the dashboard.`);
    }
  };

  const getPersonalizedPaths = () => {
    if (!userPersonalityType || !personalizedRoadmaps[userPersonalityType as keyof typeof personalizedRoadmaps]) {
      return Object.entries(careerPaths);
    }

    const personalizedConfig = personalizedRoadmaps[userPersonalityType as keyof typeof personalizedRoadmaps];
    const personalizedEntries = personalizedConfig.paths
      .map(pathKey => [pathKey, careerPaths[pathKey as keyof typeof careerPaths]])
      .filter(([, path]) => path);

    return personalizedEntries as [string, typeof careerPaths[keyof typeof careerPaths]][];
  };

  const getDisplayPaths = () => {
    return roadmapMode === 'personalized' ? getPersonalizedPaths() : Object.entries(careerPaths);
  };

  const currentPath = careerPaths[selectedPath as keyof typeof careerPaths];
  const completedLevels = currentPath?.levels?.filter(level => level.completed).length || 0;
  const totalXP = currentPath?.levels?.reduce((sum, level) => sum + level.xp, 0) || 0;
  const earnedXP = currentPath?.levels?.filter(level => level.completed).reduce((sum, level) => sum + level.xp, 0) || 0;
  const progressPercentage = totalXP > 0 ? (earnedXP / totalXP) * 100 : 0;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Enhanced Header with User Stats */}
      <div className="text-white rounded-lg p-6 backdrop-blur-sm" style={{ background: 'linear-gradient(135deg, #2d5a4a 0%, #86efac 100%)' }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">Career Roadmap</h2>
            <p style={{ color: '#a7f3d0' }}>Your gamified journey to career success ✈️</p>
            {userPersonalityType && (
              <Badge variant="outline" className="mt-2" style={{ borderColor: '#a7f3d0', color: '#a7f3d0' }}>
                <Brain className="h-3 w-3 mr-1" />
                {userPersonalityType} Profile
              </Badge>
            )}
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{userXP}</div>
                <div className="text-sm" style={{ color: '#a7f3d0' }}>Total XP</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold flex items-center">
                  <Crown className="h-6 w-6 mr-1" style={{ color: '#a7f3d0' }} />
                  {userLevel}
                </div>
                <div className="text-sm" style={{ color: '#a7f3d0' }}>Level</div>
              </div>
            </div>
          </div>
        </div>

        {/* Roadmap Mode Toggle */}
        <div className="flex items-center justify-center space-x-4">
          <Button
            variant={roadmapMode === 'all' ? 'secondary' : 'outline'}
            onClick={() => setRoadmapMode('all')}
            style={roadmapMode === 'all' ?
              { backgroundColor: '#a7f3d0', color: '#2d5a4a' } :
              { borderColor: '#a7f3d0', color: '#a7f3d0', backgroundColor: 'transparent' }
            }
          >
            <Map className="h-4 w-4 mr-2" />
            All Career Paths
          </Button>
          <Button
            variant={roadmapMode === 'personalized' ? 'secondary' : 'outline'}
            onClick={() => setRoadmapMode('personalized')}
            style={roadmapMode === 'personalized' ?
              { backgroundColor: '#a7f3d0', color: '#2d5a4a' } :
              { borderColor: '#a7f3d0', color: '#a7f3d0', backgroundColor: 'transparent' }
            }
          >
            <Heart className="h-4 w-4 mr-2" />
            My Personalized Paths
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 backdrop-blur-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
          <TabsTrigger value="roadmap" style={activeTab === 'roadmap' ? { backgroundColor: '#86efac', color: '#2d5a4a' } : { color: '#2d5a4a' }}>Career Roadmap</TabsTrigger>
          <TabsTrigger value="achievements" style={activeTab === 'achievements' ? { backgroundColor: '#86efac', color: '#2d5a4a' } : { color: '#2d5a4a' }}>Achievements</TabsTrigger>
          <TabsTrigger value="leaderboard" style={activeTab === 'leaderboard' ? { backgroundColor: '#86efac', color: '#2d5a4a' } : { color: '#2d5a4a' }}>Community</TabsTrigger>
        </TabsList>

        <TabsContent value="roadmap" className="space-y-6">
          {/* Personalized Roadmap Info */}
          {roadmapMode === 'personalized' && userPersonalityType && personalizedRoadmaps[userPersonalityType as keyof typeof personalizedRoadmaps] && (
            <Card className="backdrop-blur-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
              <CardHeader style={{ backgroundColor: personalizedRoadmaps[userPersonalityType as keyof typeof personalizedRoadmaps].secondaryColor }}>
                <CardTitle className="flex items-center" style={{ color: personalizedRoadmaps[userPersonalityType as keyof typeof personalizedRoadmaps].primaryColor }}>
                  <Lightbulb className="h-5 w-5 mr-2" />
                  {personalizedRoadmaps[userPersonalityType as keyof typeof personalizedRoadmaps].title}
                </CardTitle>
                <CardDescription>
                  {personalizedRoadmaps[userPersonalityType as keyof typeof personalizedRoadmaps].description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Brain className="h-4 w-4" />
                  <span>Curated based on your {userPersonalityType} personality type</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Career Path Selection */}
          <Card className="backdrop-blur-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between" style={{ color: '#2d5a4a' }}>
                <div className="flex items-center">
                  <Map className="h-5 w-5 mr-2" style={{ color: '#86efac' }} />
                  {roadmapMode === 'personalized' ? 'Your Recommended Career Paths' : 'Choose Your Career Path'}
                </div>
                <Badge variant="outline" style={{ borderColor: '#86efac', color: '#2d5a4a' }}>
                  {getDisplayPaths().length} Paths Available
                </Badge>
              </CardTitle>
              <CardDescription>
                {roadmapMode === 'personalized'
                  ? 'Career paths specifically recommended for your personality type and preferences'
                  : 'Select from our comprehensive career paths designed for the Pakistani job market'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {getDisplayPaths().map(([key, path]) => (
                  <Card
                    key={key}
                    className={`cursor-pointer transition-all hover:shadow-lg hover:scale-105 ${selectedPath === key ? 'ring-2 ring-offset-2' : ''
                      }`}
                    style={selectedPath === key ?
                      { backgroundColor: 'rgba(134, 239, 172, 0.2)', borderColor: '#86efac', ringColor: '#86efac' } :
                      { backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                    onClick={() => handleSelectCareerPath(key)}
                  >
                    <CardContent className="pt-4 text-center">
                      <div className="text-4xl mb-2">{path.icon}</div>
                      <h3 className="font-semibold mb-1" style={{ color: '#2d5a4a' }}>{path.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{path.description}</p>
                      <div className="space-y-2">
                        <div className="flex justify-center space-x-2">
                          <Badge variant="outline" style={{ borderColor: '#86efac', color: '#2d5a4a' }}>
                            {path.levels.length} Levels
                          </Badge>
                          {path.personalityFit?.includes(userPersonalityType) && (
                            <Badge variant="secondary" style={{ backgroundColor: '#6ee7b7', color: '#2d5a4a' }}>
                              Perfect Fit
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs text-gray-500">{path.salaryRange}</div>
                        <div className="text-xs">
                          <Badge variant="outline"
                            style={{
                              borderColor: path.demandLevel === 'Very High' ? '#86efac' : '#a7d7c4',
                              color: path.demandLevel === 'Very High' ? '#2d5a4a' : '#64748b'
                            }}>
                            {path.demandLevel} Demand
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Progress Overview */}
          {currentPath && (
            <Card className="backdrop-blur-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center" style={{ color: '#2d5a4a' }}>
                    <Target className="h-5 w-5 mr-2" style={{ color: '#86efac' }} />
                    {currentPath.title} Progress
                  </CardTitle>
                  <Badge variant="secondary" style={{ backgroundColor: '#a7f3d0', color: '#2d5a4a' }}>
                    Level {completedLevels} of {currentPath.levels.length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span style={{ color: '#2d5a4a' }}>Overall Progress</span>
                      <span style={{ color: '#86efac' }}>{Math.round(progressPercentage)}%</span>
                    </div>
                    <Progress value={progressPercentage} className="h-3" />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold" style={{ color: '#86efac' }}>{earnedXP}</div>
                      <div className="text-sm text-gray-600">XP Earned</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold" style={{ color: '#6ee7b7' }}>{completedLevels}</div>
                      <div className="text-sm text-gray-600">Levels Complete</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold" style={{ color: '#a7d7c4' }}>
                        {currentPath.levels.filter(l => l.completed).reduce((sum, l) => sum + l.skills.length, 0)}
                      </div>
                      <div className="text-sm text-gray-600">Skills Mastered</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold" style={{ color: '#2d5a4a' }}>
                        {currentPath.levels.filter(l => l.completed).reduce((sum, l) => sum + l.milestones.length, 0)}
                      </div>
                      <div className="text-sm text-gray-600">Milestones Hit</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Level Details */}
          {currentPath && (
            <div className="space-y-4">
              {currentPath.levels.map((level, index) => (
                <Card key={level.id} className={`relative backdrop-blur-sm transition-all hover:shadow-lg ${level.completed ? 'border-green-300' :
                    level.unlocked ? 'hover:shadow-md' : 'opacity-75'
                  }`}
                  style={level.completed ? { backgroundColor: 'rgba(110, 231, 183, 0.2)' } : { backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all`}
                          style={{
                            backgroundColor: level.completed ? '#6ee7b7' :
                              level.unlocked ? '#86efac' : '#d1fae5',
                            color: level.completed || level.unlocked ? '#2d5a4a' : '#64748b'
                          }}>
                          {level.completed ? <CheckCircle className="h-6 w-6" /> :
                            level.unlocked ? <Star className="h-6 w-6" /> : <Lock className="h-6 w-6" />}
                        </div>
                        <div>
                          <CardTitle className={`${!level.unlocked ? 'text-gray-500' : ''}`} style={level.unlocked ? { color: '#2d5a4a' } : {}}>
                            Level {level.id}: {level.title}
                          </CardTitle>
                          <CardDescription className={`${!level.unlocked ? 'text-gray-400' : ''}`}>
                            {level.description}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={level.completed ? 'default' : 'outline'}
                          style={level.completed ? { backgroundColor: '#a7f3d0', color: '#2d5a4a' } : { borderColor: '#86efac', color: '#2d5a4a' }}>
                          <Zap className="h-3 w-3 mr-1" />
                          {level.xp} XP
                        </Badge>
                        {level.completed && <Badge variant="secondary" style={{ backgroundColor: '#6ee7b7', color: '#2d5a4a' }}>Completed</Badge>}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center" style={{ color: '#2d5a4a' }}>
                          <BookOpen className="h-4 w-4 mr-2" style={{ color: '#86efac' }} />
                          Skills to Master
                        </h4>
                        <div className="space-y-2">
                          {level.skills.map((skill, skillIndex) => (
                            <div key={skillIndex} className="flex items-center space-x-2">
                              {level.completed ?
                                <CheckCircle className="h-4 w-4" style={{ color: '#6ee7b7' }} /> :
                                <div className="h-4 w-4 border-2 rounded-full" style={{ borderColor: '#a7d7c4' }}></div>
                              }
                              <span style={level.completed ? { color: '#2d5a4a' } : { color: '#64748b' }}>{skill}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center" style={{ color: '#2d5a4a' }}>
                          <Trophy className="h-4 w-4 mr-2" style={{ color: '#a7f3d0' }} />
                          Milestones
                        </h4>
                        <div className="space-y-2">
                          {level.milestones.map((milestone, milestoneIndex) => (
                            <div key={milestoneIndex} className="flex items-center space-x-2">
                              {level.completed ?
                                <CheckCircle className="h-4 w-4" style={{ color: '#6ee7b7' }} /> :
                                <div className="h-4 w-4 border-2 rounded-full" style={{ borderColor: '#a7d7c4' }}></div>
                              }
                              <span style={level.completed ? { color: '#2d5a4a' } : { color: '#64748b' }}>{milestone}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    {level.unlocked && !level.completed && (
                      <div className="mt-6 pt-4 border-t" style={{ borderColor: 'rgba(134, 239, 172, 0.3)' }}>
                        <Button
                          className="w-full md:w-auto transition-all hover:scale-105"
                          onClick={() => handleStartLevel(level, selectedPath)}
                          style={{ backgroundColor: '#86efac', color: '#2d5a4a' }}
                        >
                          <Rocket className="h-4 w-4 mr-2" />
                          Start Level {level.id}
                        </Button>
                        <p className="text-sm text-gray-500 mt-2">
                          Click to begin your learning journey for this level
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <Card className="backdrop-blur-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
            <CardHeader>
              <CardTitle className="flex items-center" style={{ color: '#2d5a4a' }}>
                <Award className="h-5 w-5 mr-2" style={{ color: '#a7f3d0' }} />
                Achievements & Badges
              </CardTitle>
              <CardDescription>
                Unlock badges and achievements as you progress through your career journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.map((achievement) => (
                  <Card key={achievement.id} className={`transition-all hover:scale-105 ${achievement.unlocked ? 'border-green-300' : 'bg-gray-50 border-gray-200 opacity-75'
                    }`}
                    style={achievement.unlocked ? { background: 'linear-gradient(135deg, rgba(167, 243, 208, 0.3) 0%, rgba(134, 239, 172, 0.3) 100%)' } : {}}>
                    <CardContent className="pt-4 text-center">
                      <div className={`text-4xl mb-2 ${!achievement.unlocked ? 'grayscale opacity-50' : ''}`}>
                        {achievement.icon}
                      </div>
                      <h3 className={`font-semibold mb-1 ${!achievement.unlocked ? 'text-gray-400' : ''}`} style={achievement.unlocked ? { color: '#2d5a4a' } : {}}>
                        {achievement.title}
                      </h3>
                      <p className={`text-sm ${!achievement.unlocked ? 'text-gray-400' : 'text-gray-600'}`}>
                        {achievement.description}
                      </p>
                      {achievement.unlocked && (
                        <Badge variant="secondary" className="mt-2" style={{ backgroundColor: '#6ee7b7', color: '#2d5a4a' }}>Unlocked</Badge>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6">
          <Card className="backdrop-blur-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
            <CardHeader>
              <CardTitle className="flex items-center" style={{ color: '#2d5a4a' }}>
                <Users className="h-5 w-5 mr-2" style={{ color: '#86efac' }} />
                Community Leaderboard
              </CardTitle>
              <CardDescription>
                {roadmapMode === 'personalized'
                  ? 'See how you rank against other career flight members in Pakistan'
                  : 'See how you rank against other career flight members in Pakistan'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { rank: 1, name: "Ahmed Khan", xp: 15750, level: 8, badge: "🥇", paths: 3, personalityType: "Leader" },
                  { rank: 2, name: "Fatima Zehra", xp: 14200, level: 7, badge: "🥈", paths: 2, personalityType: "Analyst" },
                  { rank: 3, name: "You", xp: userXP, level: userLevel, badge: "🥉", highlight: true, paths: 1, personalityType: userPersonalityType },
                  { rank: 4, name: "Bilal Malik", xp: 11800, level: 6, badge: "", paths: 2, personalityType: "Creator" },
                  { rank: 5, name: "Sana Gul", xp: 10900, level: 5, badge: "", paths: 1, personalityType: "Helper" },
                  { rank: 6, name: "Umar Farooq", xp: 9800, level: 5, badge: "", paths: 1, personalityType: "Explorer" },
                ].map((user) => (
                  <div key={user.rank} className={`flex items-center justify-between p-4 rounded-lg transition-all hover:scale-105 ${user.highlight ? 'border-2' : ''
                    }`}
                    style={user.highlight ? { backgroundColor: 'rgba(134, 239, 172, 0.2)', borderColor: '#86efac' } : { backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                    <div className="flex items-center space-x-4">
                      <div className="font-bold text-xl">
                        {user.badge || `#${user.rank}`}
                      </div>
                      <div>
                        <div className="font-semibold" style={{ color: '#2d5a4a' }}>
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-600 flex items-center space-x-2">
                          <span>Level {user.level} • {user.paths} Path{user.paths > 1 ? 's' : ''}</span>
                          {user.personalityType && (
                            <Badge variant="outline" className="text-xs"
                              style={{ borderColor: '#a7d7c4', color: '#2d5a4a' }}>
                              {user.personalityType}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg" style={{ color: '#6ee7b7' }}>{user.xp.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">XP</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Career Path Details Modal */}
      <Dialog open={showCareerPathModal} onOpenChange={setShowCareerPathModal}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          {selectedCareerPath && (
            <>
              <DialogHeader>
                <div className="flex items-center space-x-3 mb-2">
                  <div className="text-5xl">{selectedCareerPath.icon}</div>
                  <div>
                    <DialogTitle className="text-2xl" style={{ color: '#2d5a4a' }}>{selectedCareerPath.title}</DialogTitle>
                    <DialogDescription className="text-lg">
                      {selectedCareerPath.description}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(134, 239, 172, 0.1)' }}>
                    <div className="text-lg font-bold" style={{ color: '#2d5a4a' }}>{selectedCareerPath.salaryRange}</div>
                    <div className="text-sm text-gray-600">Salary Range</div>
                  </div>
                  <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(110, 231, 183, 0.1)' }}>
                    <div className="text-lg font-bold" style={{ color: '#2d5a4a' }}>{selectedCareerPath.demandLevel}</div>
                    <div className="text-sm text-gray-600">Market Demand</div>
                  </div>
                  <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(167, 243, 208, 0.1)' }}>
                    <div className="text-lg font-bold" style={{ color: '#2d5a4a' }}>{selectedCareerPath.levels.length}</div>
                    <div className="text-sm text-gray-600">Learning Levels</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2" style={{ color: '#2d5a4a' }}>Industry Context in Pakistan</h4>
                  <p className="text-gray-600">{selectedCareerPath.industryContext}</p>
                </div>

                {selectedCareerPath.personalityFit && (
                  <div>
                    <h4 className="font-semibold mb-2" style={{ color: '#2d5a4a' }}>Best Fit For:</h4>
                    <div className="flex space-x-2">
                      {selectedCareerPath.personalityFit.map((personality, index) => (
                        <Badge key={index} variant="outline"
                          style={personality === userPersonalityType ?
                            { backgroundColor: '#6ee7b7', color: '#2d5a4a', borderColor: '#6ee7b7' } :
                            { borderColor: '#a7d7c4', color: '#2d5a4a' }}>
                          {personality === userPersonalityType && <Star className="h-3 w-3 mr-1" />}
                          {personality}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-semibold mb-3" style={{ color: '#2d5a4a' }}>Learning Path Overview</h4>
                  <div className="space-y-3">
                    {selectedCareerPath.levels.map((level, index) => (
                      <div key={level.id} className="flex items-center space-x-3 p-3 rounded-lg" style={{ backgroundColor: 'rgba(167, 215, 196, 0.1)' }}>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#86efac', color: '#2d5a4a' }}>
                          {level.id}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium" style={{ color: '#2d5a4a' }}>{level.title}</div>
                          <div className="text-sm text-gray-600">{level.description}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium" style={{ color: '#86efac' }}>{level.xp} XP</div>
                          <div className="text-xs text-gray-500">{level.duration}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button onClick={() => {
                    setShowCareerPathModal(false);
                    setSelectedCareerPath(null);
                  }} className="flex-1" style={{ backgroundColor: '#86efac', color: '#2d5a4a' }}>
                    Start This Path
                  </Button>
                  <Button variant="outline" onClick={() => {
                    setShowCareerPathModal(false);
                    setSelectedCareerPath(null);
                  }} style={{ borderColor: '#86efac', color: '#2d5a4a' }}>
                    Close
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Level Details Modal */}
      <Dialog open={showLevelModal} onOpenChange={setShowLevelModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedLevel && (
            <>
              <DialogHeader>
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#86efac', color: '#2d5a4a' }}>
                    <Play className="h-6 w-6" />
                  </div>
                  <div>
                    <DialogTitle className="text-2xl" style={{ color: '#2d5a4a' }}>Level {selectedLevel.id}: {selectedLevel.title}</DialogTitle>
                    <DialogDescription className="text-lg">
                      {selectedLevel.description}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(134, 239, 172, 0.1)' }}>
                    <Clock className="h-5 w-5 mx-auto mb-1" style={{ color: '#86efac' }} />
                    <div className="text-sm font-medium" style={{ color: '#2d5a4a' }}>{selectedLevel.duration}</div>
                    <div className="text-xs text-gray-600">Duration</div>
                  </div>
                  <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(110, 231, 183, 0.1)' }}>
                    <Zap className="h-5 w-5 mx-auto mb-1" style={{ color: '#6ee7b7' }} />
                    <div className="text-sm font-medium" style={{ color: '#2d5a4a' }}>{selectedLevel.xp} XP</div>
                    <div className="text-xs text-gray-600">Reward</div>
                  </div>
                  <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(167, 243, 208, 0.1)' }}>
                    <User className="h-5 w-5 mx-auto mb-1" style={{ color: '#a7f3d0' }} />
                    <div className="text-sm font-medium" style={{ color: '#2d5a4a' }}>Beginner</div>
                    <div className="text-xs text-gray-600">Level</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3" style={{ color: '#2d5a4a' }}>Skills You'll Master</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedLevel.skills.map((skill, index) => (
                      <div key={index} className="flex items-center space-x-2 p-2 rounded" style={{ backgroundColor: 'rgba(167, 215, 196, 0.1)' }}>
                        <CheckCircle className="h-4 w-4" style={{ color: '#86efac' }} />
                        <span className="text-sm" style={{ color: '#2d5a4a' }}>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3" style={{ color: '#2d5a4a' }}>Projects You'll Build</h4>
                  <ul className="space-y-2">
                    {selectedLevel.projects.map((project, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#86efac' }}></div>
                        <span className="text-gray-600">{project}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3" style={{ color: '#2d5a4a' }}>Learning Resources</h4>
                  <ul className="space-y-2">
                    {selectedLevel.resources.map((resource, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <BookOpen className="h-4 w-4" style={{ color: '#a7d7c4' }} />
                        <span className="text-gray-600">{resource}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3" style={{ color: '#2d5a4a' }}>Milestones to Achieve</h4>
                  <div className="space-y-2">
                    {selectedLevel.milestones.map((milestone, index) => (
                      <div key={index} className="flex items-center space-x-2 p-2 rounded" style={{ backgroundColor: 'rgba(110, 231, 183, 0.1)' }}>
                        <Trophy className="h-4 w-4" style={{ color: '#6ee7b7' }} />
                        <span className="text-sm" style={{ color: '#2d5a4a' }}>{milestone}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(134, 239, 172, 0.1)' }}>
                  <h5 className="font-medium mb-2" style={{ color: '#2d5a4a' }}>What You'll Get:</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Interactive learning modules with real-world examples</li>
                    <li>• Hands-on projects to build your portfolio</li>
                    <li>• Personalized feedback from industry mentors</li>
                    <li>• Community support and peer collaboration</li>
                    <li>• Certificate of completion for your profile</li>
                  </ul>
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button onClick={handleStartLearning} className="flex-1" style={{ backgroundColor: '#86efac', color: '#2d5a4a' }}>
                    <Rocket className="h-4 w-4 mr-2" />
                    Start Learning Now
                  </Button>
                  <Button variant="outline" onClick={() => {
                    setShowLevelModal(false);
                    setSelectedLevel(null);
                  }} style={{ borderColor: '#86efac', color: '#2d5a4a' }}>
                    Maybe Later
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}