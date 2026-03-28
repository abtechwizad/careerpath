import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { MapPin, Building2, Calendar, DollarSign, Users, Globe, Filter, Search, X } from 'lucide-react';

const internshipData = [
  {
    id: 1,
    title: "Software Development Intern",
    company: "Kababjees",
    location: "Karachi, Garden",
    type: "Hybrid",
    duration: "3 months",
    stipend: "25,000/month",
    size: "Large Corporation (1000+ employees)",
    skills: ["React", "JavaScript", "Node.js"],
    description: "Work on real-world food delivery applications and gain hands-on experience with modern development tools.",
    level: "Beginner",
    detailedDescription: "Join Kababjees's engineering team and work on features that serve millions of users across Pakistan. You'll be working with React, Node.js, and modern development practices while contributing to real products.",
    requirements: ["Strong foundation in JavaScript", "Basic understanding of React", "Knowledge of Git version control", "Problem-solving skills"],
    perks: ["Free meals", "Health insurance", "Learning stipend", "Flexible working hours", "Potential for full-time offer"]
  },
  {
    id: 2,
    title: "Digital Marketing Intern",
    company: "EduGyain",
    location: "Lahore, Punjab",
    type: "On-site",
    duration: "4 months",
    stipend: "Rs. 20,000/month",
    size: "Large Corporation (1000+ employees)",
    skills: ["Google Analytics", "Social Media", "Content Marketing"],
    description: "Create marketing campaigns for Pakistan's leading ed-tech platform and analyze user engagement.",
    logo: "📚",
    level: "Intermediate",
    detailedDescription: "Work with EduGyain's marketing team to create impactful campaigns that reach millions of students across Pakistan. Learn digital marketing strategies, content creation, and analytics in the fast-growing ed-tech space.",
    requirements: ["Basic knowledge of digital marketing", "Social media marketing experience", "Content creation skills", "Analytics mindset"],
    perks: ["Course access", "Marketing tools training", "Industry networking", "Performance bonuses", "Certificate of completion"]
  },
  {
    id: 3,
    title: "UI/UX Design Intern",
    company: "Paytm",
    location: "Islamabad, ICT",
    type: "Hybrid",
    duration: "6 months",
    stipend: "Rs. 30,000/month",
    size: "Large Corporation (1000+ employees)",
    skills: ["Figma", "User Research", "Mobile Design"],
    description: "Design intuitive interfaces for Pakistan's leading digital payments platform.",
    logo: "💳",
    level: "Beginner",
    detailedDescription: "Join Paytm's design team and work on creating user-friendly interfaces for millions of users. You'll learn mobile-first design, conduct user research, and work with product teams to improve user experience.",
    requirements: ["Proficiency in Figma", "Basic design principles", "Mobile app design understanding", "User empathy"],
    perks: ["Design software licenses", "UX mentorship", "Portfolio development", "User research training", "Industry exposure"]
  },
  {
    id: 4,
    title: "Business Development Intern",
    company: "Ola Cabs",
    location: "Faisalabad, Punjab",
    type: "On-site",
    duration: "5 months",
    stipend: "Rs. 22,000/month",
    size: "Large Corporation (1000+ employees)",
    skills: ["Market Research", "Excel", "Communication"],
    description: "Support expansion strategies and partner onboarding for ride-sharing services across Pakistan.",
    logo: "🚗",
    level: "Advanced",
    detailedDescription: "Work with Ola's business development team to identify new market opportunities and support expansion into new cities. You'll analyze market data, support partner onboarding, and contribute to strategic initiatives.",
    requirements: ["Strong analytical skills", "Excel proficiency", "Communication skills", "Market research experience"],
    perks: ["Business training", "Market insights", "Client interaction", "Strategic thinking development", "Full-time conversion opportunity"]
  },
  {
    id: 5,
    title: "Data Science Intern",
    company: "Flipkart",
    location: "Karachi, Sindh",
    type: "On-site",
    duration: "4 months",
    stipend: "Rs. 35,000/month",
    size: "Large Corporation (1000+ employees)",
    skills: ["Python", "Machine Learning", "SQL"],
    description: "Work on recommendation systems and customer behavior analysis for Pakistan's largest e-commerce platform.",
    logo: "🛍️",
    level: "Advanced",
    detailedDescription: "Join Flipkart's data science team and work on machine learning models that power recommendations for millions of customers. You'll work with large datasets, build predictive models, and contribute to business insights.",
    requirements: ["Python programming", "Machine learning basics", "SQL knowledge", "Statistical understanding"],
    perks: ["Data science training", "Cloud platform access", "ML model deployment", "Industry mentorship", "Research opportunities"]
  },
  {
    id: 6,
    title: "Content Creation Intern",
    company: "Unacademy",
    location: "Rawalpindi, Punjab",
    type: "Remote",
    duration: "3 months",
    stipend: "Rs. 18,000/month",
    size: "Medium Company (500-1000 employees)",
    skills: ["Video Editing", "Content Writing", "Social Media"],
    description: "Create educational content and manage social media for Pakistan's leading learning platform.",
    logo: "🎓",
    level: "Beginner",
    detailedDescription: "Work with Unacademy's content team to create engaging educational content across video, text, and social media formats. You'll learn content strategy, video production, and social media management in the ed-tech industry.",
    requirements: ["Video editing skills", "Content writing experience", "Social media knowledge", "Creative thinking"],
    perks: ["Content creation tools", "Video equipment access", "Creative freedom", "Skill development", "Industry recognition"]
  },
  {
    id: 7,
    title: "Full Stack Developer Intern",
    company: "Razorpay",
    location: "Lahore, Punjab",
    type: "Hybrid",
    duration: "6 months",
    stipend: "Rs. 40,000/month",
    size: "Medium Company (500-1000 employees)",
    skills: ["React", "Node.js", "MongoDB", "AWS"],
    description: "Build payment solutions and APIs for Pakistan's fastest growing fintech company.",
    logo: "💰",
    level: "Advanced",
    detailedDescription: "Join Razorpay's engineering team and work on building secure, scalable payment solutions. You'll work across the full stack, from frontend interfaces to backend APIs, while learning about fintech and payment processing.",
    requirements: ["Full stack development experience", "React and Node.js proficiency", "Database knowledge", "API development skills"],
    perks: ["Tech talks", "Open source contributions", "Cloud platform training", "Fintech exposure", "High growth environment"]
  },
  {
    id: 8,
    title: "Product Management Intern",
    company: "Swiggy",
    location: "Karachi, Sindh",
    type: "On-site",
    duration: "5 months",
    stipend: "Rs. 28,000/month",
    size: "Large Corporation (1000+ employees)",
    skills: ["Analytics", "User Research", "Product Strategy"],
    description: "Work on product features for food delivery and quick commerce solutions.",
    logo: "🍔",
    level: "Intermediate",
    detailedDescription: "Join Swiggy's product team and contribute to features that millions use daily. You'll learn product management fundamentals, conduct user research, analyze data, and work with engineering teams to ship features.",
    requirements: ["Analytical thinking", "User research skills", "Basic product knowledge", "Communication skills"],
    perks: ["PM training", "User research tools", "Data analytics access", "Cross-functional exposure", "Product launch experience"]
  }
];

export function Internships() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all-types');
  const [selectedLevel, setSelectedLevel] = useState('all-levels');
  const [showFilters, setShowFilters] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [showInternshipDetails, setShowInternshipDetails] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState();

  const handleApplyNow = (internship: typeof internshipData[0]) => {
    setSelectedInternship(internship);
    setShowApplicationForm(true);
  };

  const handleLearnMore = (internship: typeof internshipData[0]) => {
    setSelectedInternship(internship);
    setShowInternshipDetails(true);
  };

  const filteredInternships = internshipData.filter(internship => {
    const matchesSearch = internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         internship.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = selectedType === 'all-types' || internship.type.includes(selectedType);
    const matchesLevel = selectedLevel === 'all-levels' || internship.level === selectedLevel;
    
    return matchesSearch && matchesType && matchesLevel;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4" style={{color: '#2d5a4a'}}>Internship Opportunities in Pakistan</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover internships at Pakistan's leading companies. Start with startups and scale to unicorns based on your capabilities.
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="backdrop-blur-sm" style={{backgroundColor: 'rgba(255, 255, 255, 0.9)'}}>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search internships, companies, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  style={{borderColor: '#a7d7c4'}}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-40" style={{borderColor: '#a7d7c4'}}>
                  <SelectValue placeholder="Work Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-types">All Types</SelectItem>
                  <SelectItem value="Remote">Remote</SelectItem>
                  <SelectItem value="On-site">On-site</SelectItem>
                  <SelectItem value="Hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-40" style={{borderColor: '#a7d7c4'}}>
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-levels">All Levels</SelectItem>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                style={{borderColor: '#86efac', color: '#2d5a4a'}}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          {showFilters && (
            <div className="mt-4 p-4 rounded-lg" style={{backgroundColor: 'rgba(167, 215, 196, 0.1)'}}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block" style={{color: '#2d5a4a'}}>Company Size</label>
                  <div className="space-y-2">
                    <label className="flex items-center text-sm">
                      <input type="checkbox" className="mr-2" />
                      Startups (10-100)
                    </label>
                    <label className="flex items-center text-sm">
                      <input type="checkbox" className="mr-2" />
                      Medium (500-1000)
                    </label>
                    <label className="flex items-center text-sm">
                      <input type="checkbox" className="mr-2" />
                      Large (1000+)
                    </label>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block" style={{color: '#2d5a4a'}}>Duration</label>
                  <div className="space-y-2">
                    <label className="flex items-center text-sm">
                      <input type="checkbox" className="mr-2" />
                      3 months
                    </label>
                    <label className="flex items-center text-sm">
                      <input type="checkbox" className="mr-2" />
                      4-6 months
                    </label>
                    <label className="flex items-center text-sm">
                      <input type="checkbox" className="mr-2" />
                      6+ months
                    </label>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block" style={{color: '#2d5a4a'}}>Field</label>
                  <div className="space-y-2">
                    <label className="flex items-center text-sm">
                      <input type="checkbox" className="mr-2" />
                      Technology
                    </label>
                    <label className="flex items-center text-sm">
                      <input type="checkbox" className="mr-2" />
                      Marketing
                    </label>
                    <label className="flex items-center text-sm">
                      <input type="checkbox" className="mr-2" />
                      Design
                    </label>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block" style={{color: '#2d5a4a'}}>Stipend Range</label>
                  <div className="space-y-2">
                    <label className="flex items-center text-sm">
                      <input type="checkbox" className="mr-2" />
                      Rs. 15K-25K
                    </label>
                    <label className="flex items-center text-sm">
                      <input type="checkbox" className="mr-2" />
                      Rs. 25K-35K
                    </label>
                    <label className="flex items-center text-sm">
                      <input type="checkbox" className="mr-2" />
                      Rs. 35K+
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          Showing {filteredInternships.length} of {internshipData.length} internships
        </p>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" style={{borderColor: '#86efac', color: '#2d5a4a'}}>{filteredInternships.filter(i => i.size.includes('Medium')).length} Medium Companies</Badge>
          <Badge variant="outline" style={{borderColor: '#6ee7b7', color: '#2d5a4a'}}>{filteredInternships.filter(i => i.size.includes('Large')).length} Large Corps</Badge>
        </div>
      </div>

      {/* Internship Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInternships.map((internship) => (
          <Card key={internship.id} className="hover:shadow-lg transition-shadow backdrop-blur-sm" style={{backgroundColor: 'rgba(255, 255, 255, 0.9)'}}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{internship.logo}</div>
                  <div>
                    <CardTitle className="text-lg" style={{color: '#2d5a4a'}}>{internship.title}</CardTitle>
                    <CardDescription className="flex items-center text-sm">
                      <Building2 className="h-3 w-3 mr-1" />
                      {internship.company}
                    </CardDescription>
                  </div>
                </div>
                <Badge variant={internship.level === 'Beginner' ? 'secondary' : 
                              internship.level === 'Intermediate' ? 'default' : 'destructive'}
                       style={internship.level === 'Beginner' ? {backgroundColor: '#a7f3d0', color: '#2d5a4a'} :
                              internship.level === 'Intermediate' ? {backgroundColor: '#86efac', color: '#2d5a4a'} :
                              {backgroundColor: '#6ee7b7', color: '#2d5a4a'}}>
                  {internship.level}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">{internship.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  {internship.location} • {internship.type}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  {internship.duration}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <DollarSign className="h-4 w-4 mr-2" />
                  {internship.stipend}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  {internship.size}
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {internship.skills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="text-xs" style={{borderColor: '#86efac', color: '#2d5a4a'}}>
                    {skill}
                  </Badge>
                ))}
              </div>

              <div className="flex space-x-2 pt-2">
                <Button size="sm" className="flex-1" onClick={() => handleApplyNow(internship)} style={{backgroundColor: '#86efac', color: '#2d5a4a'}}>
                  Apply Now
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleLearnMore(internship)} style={{borderColor: '#86efac', color: '#2d5a4a'}}>
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredInternships.length === 0 && (
        <Card className="text-center py-12 backdrop-blur-sm" style={{backgroundColor: 'rgba(255, 255, 255, 0.9)'}}>
          <CardContent>
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold mb-2" style={{color: '#2d5a4a'}}>No internships found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
            <Button variant="outline" onClick={() => {
              setSearchTerm('');
              setSelectedType('all-types');
              setSelectedLevel('all-levels');
            }} style={{borderColor: '#86efac', color: '#2d5a4a'}}>
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Internship Details Modal */}
      <Dialog open={showInternshipDetails} onOpenChange={setShowInternshipDetails}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedInternship && (
            <>
              <DialogHeader>
                <div className="flex items-center space-x-3 mb-2">
                  <div className="text-4xl">{selectedInternship.logo}</div>
                  <div>
                    <DialogTitle className="text-2xl" style={{color: '#2d5a4a'}}>{selectedInternship.title}</DialogTitle>
                    <DialogDescription className="text-lg flex items-center">
                      <Building2 className="h-4 w-4 mr-2" />
                      {selectedInternship.company}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2" style={{color: '#2d5a4a'}}>About this Internship</h4>
                  <p className="text-gray-600">{selectedInternship.detailedDescription}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{selectedInternship.location} • {selectedInternship.type}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{selectedInternship.duration}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{selectedInternship.stipend}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{selectedInternship.size}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2" style={{color: '#2d5a4a'}}>Required Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedInternship.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" style={{borderColor: '#86efac', color: '#2d5a4a'}}>
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2" style={{color: '#2d5a4a'}}>Requirements</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {selectedInternship.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2" style={{color: '#2d5a4a'}}>Perks & Benefits</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {selectedInternship.perks.map((perk, index) => (
                      <li key={index}>{perk}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button onClick={() => {
                    setShowInternshipDetails(false);
                    handleApplyNow(selectedInternship);
                  }} className="flex-1" style={{backgroundColor: '#86efac', color: '#2d5a4a'}}>
                    Apply Now
                  </Button>
                  <Button variant="outline" onClick={() => setShowInternshipDetails(false)} style={{borderColor: '#86efac', color: '#2d5a4a'}}>
                    Close
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Application Form Modal */}
      <Dialog open={showApplicationForm} onOpenChange={setShowApplicationForm}>
        <DialogContent className="max-w-md">
          {selectedInternship && (
            <>
              <DialogHeader>
                <DialogTitle style={{color: '#2d5a4a'}}>Apply for {selectedInternship.title}</DialogTitle>
                <DialogDescription>at {selectedInternship.company}</DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <Input type="text" placeholder="Full Name" style={{borderColor: '#a7d7c4'}} />
                <Input type="email" placeholder="Email Address" style={{borderColor: '#a7d7c4'}} />
                <Input type="tel" placeholder="Phone Number" style={{borderColor: '#a7d7c4'}} />
                <Textarea placeholder="Why are you interested in this internship?" className="h-24 resize-none" style={{borderColor: '#a7d7c4'}} />
                <Input type="file" accept=".pdf,.doc,.docx" style={{borderColor: '#a7d7c4'}} />
                <div className="text-sm text-gray-500">Upload your resume (PDF or DOC)</div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <Button 
                  onClick={() => {
                    alert('🎉 Application submitted successfully!\n\nThank you for applying to ' + selectedInternship.title + ' at ' + selectedInternship.company + '.\n\nWhat happens next:\n• Your application will be reviewed within 2-3 business days\n• If selected, you\'ll receive an email for the next round\n• We\'ll keep you updated throughout the process\n\nGood luck! 🚀');
                    setShowApplicationForm(false);
                    setSelectedInternship(null);
                  }}
                  className="flex-1" 
                  style={{backgroundColor: '#86efac', color: '#2d5a4a'}}
                >
                  Submit Application
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowApplicationForm(false);
                    setSelectedInternship(null);
                  }}
                  style={{borderColor: '#86efac', color: '#2d5a4a'}}
                >
                  Cancel
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Partnership Info */}
      <Card className="backdrop-blur-sm" style={{background: 'linear-gradient(135deg, rgba(134, 239, 172, 0.2) 0%, rgba(110, 231, 183, 0.2) 100%)'}}>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="flex justify-center space-x-2">
              <Globe className="h-8 w-8" style={{color: '#86efac'}} />
            </div>
            <h3 className="text-xl font-semibold" style={{color: '#2d5a4a'}}>Growing Partnership Network in Pakistan</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're continuously expanding our network of partner companies across Pakistan. Started with promising startups, 
              we're now collaborating with unicorns and established corporations to provide you with the best opportunities.
            </p>
            <div className="flex justify-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold" style={{color: '#86efac'}}>300+</div>
                <div className="text-sm text-gray-600">Startups</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold" style={{color: '#6ee7b7'}}>150+</div>
                <div className="text-sm text-gray-600">Medium Companies</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold" style={{color: '#a7f3d0'}}>50+</div>
                <div className="text-sm text-gray-600">Large Corporations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold" style={{color: '#2d5a4a'}}>25+</div>
                <div className="text-sm text-gray-600">Unicorns</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}