import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Star, MessageCircle, Calendar, Award, Users, TrendingUp, Clock, MapPin } from 'lucide-react';
import { MentorApplication } from './MentorApplication';
import { BookSession } from './BookSession';
import { MentorProfile } from './MentorProfile';

const mentors = [
  {
    id: 1,
    name: "Jawad Ali",
    title: "Senior Software Engineer",
    company: "TecMasterSD",
    experience: "2 years",
    expertise: ["React", "Python", "System Design", "Career Growth"],
    rating: 4.9,
    reviews: 52,
    sessions: 140,
    location: "Pakistan, Karachi",
    bio: "Passionate about helping new developers break into tech in  Pakistan. Started from tier-2 city and now working at  Pakistani's largest e-commerce platform.",
    achievements: ["TecMasterSD Senior Engineer", "Tech Lead", "Mentored 60+ developers"],
    availability: "Evenings & Weekends",
    rate: "PKR 2,500/hour",
    avatar: "/api/placeholder/100/100"
  },
  {
    id: 2,
    name: "Maaz",
    title: "Marketing Director",
    company: "IBEX",
    experience: "8 years",
    expertise: ["Digital Marketing", "Growth Strategy", "Team Leadership", "Analytics"],
    rating: 4.8,
    reviews: 38,
    sessions: 110,
    location: "Karachi, Port Qasim",
    bio: "Marketing leader with experience scaling Pakistani startups. Love sharing insights on growth marketing in the Pakistani market.",
    achievements: ["Scaled 4 startups", "Marketing Leader Award", "Built teams of 25+"],
    availability: "Flexible",
    rate: "PKR 3,000/hour",
    avatar: "/api/placeholder/100/100"
  },
  {
    id: 3,
    name: "Razi",
    title: "UX Design Manager",
    company: "Aptech Garden",
    experience: "7 years",
    expertise: ["User Research", "Design Systems", "Mobile UX", "Design Leadership"],
    rating: 5.0,
    reviews: 31,
    sessions: 85,
    location: "Karachi, Garden",
    bio: "Design leader passionate about creating intuitive experiences for Pakistani users. Enjoy helping designers develop their craft.",
    achievements: ["Aptech Garden Design Excellence", "Design Team Lead", "UX Pakistan Speaker"],
    availability: "Weekdays",
    rate: "PKR 3,500/hour",
    avatar: "/api/placeholder/100/100"
  },
  {
    id: 4,
    name: "Laraib Khan",
    title: "Data Science Director",
    company: "Microsoft",
    experience: "9 years",
    expertise: ["Machine Learning", "Data Analytics", "AI Strategy", "Team Building"],
    rating: 4.9,
    reviews: 45,
    sessions: 125,
    location: "Karachi, Sindh",
    bio: "Data science leader with expertise in building ML systems at scale for Pakistani market. Love mentoring aspiring data scientists.",
    achievements: ["Microsoft Professional", "12+ Research Papers"],
    availability: "Weekend mornings",
    rate: "PKR 4,000/hour",
    avatar: "/api/placeholder/100/100"
  },
 
];

const successStories = [
  {
    id: 1,
    mentee: "Ayan",
    mentor: "Jawad Ali",
    story: "Started as a fresher from a Islamia college. Through Jawad Ali's mentorship, I landed my first software engineering role at a unicorn startup within 6 months!",
    outcome: "Software Engineer at Sybrid",
    duration: "6 months",
    avatar: "/api/placeholder/80/80"
  },
  {
    id: 2,
    mentee: "Zaid",
    mentor: "Laraib khan",
    story: "Laraib helped me transition from traditional marketing to digital growth. His insights on the Pakistani market were invaluable.",
    outcome: "Growth Marketing Manager at Aptech",
    duration: "4 months",
    avatar: "/api/placeholder/80/80"
  },
  {
    id: 3,
    mentee: "Khuzaema",
    mentor: "Maaz",
    story: "Maaz's mentorship transformed my design thinking. he helped me understand Pakistani user behavior and build a strong portfolio.",
    outcome: "UX Designer at Lucky Motors",
    duration: "5 months",
    avatar: "/api/placeholder/80/80"
  }
];

export function Mentorship() {
  const [selectedMentor, setSelectedMentor] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("browse");
  const [showApplication, setShowApplication] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [bookingMentor, setBookingMentor] = useState<typeof mentors[0] | null>(null);
  const [profileMentor, setProfileMentor] = useState<typeof mentors[0] | null>(null);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4" style={{color: '#000000'}}>Find Your Mentor in Pakistan</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Connect with successful Pakistan professionals who've built amazing careers. Learn from their experiences and get personalized guidance.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3" style={{backgroundColor: '#f8fafc'}}>
          <TabsTrigger value="browse" style={activeTab === 'browse' ? {backgroundColor: '#267358', color: 'white'} : {}}>Browse Mentors</TabsTrigger>
          <TabsTrigger value="stories" style={activeTab === 'stories' ? {backgroundColor: '#267358', color: 'white'} : {}}>Success Stories</TabsTrigger>
          <TabsTrigger value="become" style={activeTab === 'become' ? {backgroundColor: '#267358', color: 'white'} : {}}>Become a Mentor</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-4 text-center">
                <Users className="h-8 w-8 mx-auto mb-2" style={{color: '#4DA6FF'}} />
                <div className="text-2xl font-bold" style={{color: '#0A1F44'}}>800+</div>
                <div className="text-sm text-gray-600">Active Mentors</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4 text-center">
                <MessageCircle className="h-8 w-8 mx-auto mb-2" style={{color: '#46FFB4'}} />
                <div className="text-2xl font-bold" style={{color: '#0A1F44'}}>4,500+</div>
                <div className="text-sm text-gray-600">Sessions Completed</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4 text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-2" style={{color: '#FFD84D'}} />
                <div className="text-2xl font-bold" style={{color: '#0A1F44'}}>92%</div>
                <div className="text-sm text-gray-600">Career Growth Rate</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4 text-center">
                <Star className="h-8 w-8 mx-auto mb-2" style={{color: '#FFD84D'}} />
                <div className="text-2xl font-bold" style={{color: '#0A1F44'}}>4.9</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </CardContent>
            </Card>
          </div>

          {/* Mentor Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mentors.map((mentor) => (
              <Card key={mentor.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={mentor.avatar} alt={mentor.name} />
                        <AvatarFallback style={{backgroundColor: '#4DA6FF20', color: '#4DA6FF'}}>{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg" style={{color: '#0A1F44'}}>{mentor.name}</CardTitle>
                        <CardDescription className="text-sm">
                          {mentor.title} at {mentor.company}
                        </CardDescription>
                        <div className="flex items-center mt-1">
                          <MapPin className="h-3 w-3 text-gray-400 mr-1" />
                          <span className="text-xs text-gray-500">{mentor.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center mb-1">
                        <Star className="h-4 w-4 fill-current" style={{color: '#FFD84D'}} />
                        <span className="text-sm font-semibold ml-1">{mentor.rating}</span>
                      </div>
                      <div className="text-xs text-gray-500">({mentor.reviews} reviews)</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">{mentor.bio}</p>
                  
                  <div className="flex flex-wrap gap-1">
                    {mentor.expertise.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs" style={{backgroundColor: '#4DA6FF20', color: '#4DA6FF'}}>
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                      <Award className="h-4 w-4 text-gray-400 mr-2" />
                      <span>{mentor.experience} experience</span>
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="h-4 w-4 text-gray-400 mr-2" />
                      <span>{mentor.sessions} sessions</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-400 mr-2" />
                      <span>{mentor.availability}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-semibold" style={{color: '#46FFB4'}}>{mentor.rate}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm" style={{color: '#0A1F44'}}>Key Achievements:</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {mentor.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-1 h-1 rounded-full mr-2" style={{backgroundColor: '#FFD84D'}}></div>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button size="sm" className="flex-1" onClick={() => {
                      setBookingMentor(mentor);
                      setShowBooking(true);
                    }} style={{backgroundColor: '#267358', color: 'white'}}>
                      Book Session
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => {
                      setProfileMentor(mentor);
                      setShowProfile(true);
                    }} style={{borderColor: '#267358', color: '#267358'}}>
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="stories" className="space-y-6">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2" style={{color: '#0A1F44'}}>Success Stories</h3>
            <p className="text-gray-600">See how our mentorship program has transformed careers across Pakistan</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {successStories.map((story) => (
              <Card key={story.id}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={story.avatar} alt={story.mentee} />
                      <AvatarFallback style={{backgroundColor: '#46FFB420', color: '#46FFB4'}}>{story.mentee.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg" style={{color: '#0A1F44'}}>{story.mentee}</CardTitle>
                      <CardDescription>Mentored by {story.mentor}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600 italic">"{story.story}"</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold" style={{color: '#46FFB4'}}>Outcome:</span>
                        <Badge variant="secondary" style={{backgroundColor: '#FFD84D20', color: '#0A1F44'}}>{story.duration}</Badge>
                      </div>
                      <p className="text-sm font-medium" style={{color: '#0A1F44'}}>{story.outcome}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card style={{background: 'linear-gradient(135deg, #46FFB410 0%, #4DA6FF10 100%)'}}>
            <CardContent className="pt-6 text-center">
              <h3 className="text-xl font-semibold mb-2" style={{color: '#0A1F44'}}>Ready to Start Your Success Story?</h3>
              <p className="text-gray-600 mb-4">
                Join thousands of mentees who've accelerated their careers through our mentorship program.
              </p>
              <Button onClick={() => setActiveTab("browse")} style={{backgroundColor: '#4DA6FF', color: 'white'}}>
                Find Your Mentor
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="become" className="space-y-6">
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl" style={{color: '#0A1F44'}}>Become a Mentor</CardTitle>
                <CardDescription>
                  Share your expertise and help shape the next generation of Pakistani professionals
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3" style={{color: '#0A1F44'}}>Why Become a Mentor?</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center">
                        <div className="w-2 h-2 rounded-full mr-3" style={{backgroundColor: '#4DA6FF'}}></div>
                        Give back to the Pakistani tech community
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 rounded-full mr-3" style={{backgroundColor: '#4DA6FF'}}></div>
                        Develop leadership skills
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 rounded-full mr-3" style={{backgroundColor: '#4DA6FF'}}></div>
                        Expand your professional network
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 rounded-full mr-3" style={{backgroundColor: '#4DA6FF'}}></div>
                        Earn supplemental income
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 rounded-full mr-3" style={{backgroundColor: '#4DA6FF'}}></div>
                        Stay current with industry trends
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3" style={{color: '#0A1F44'}}>Requirements</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center">
                        <div className="w-2 h-2 rounded-full mr-3" style={{backgroundColor: '#46FFB4'}}></div>
                        3+ years professional experience in Pakistan
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 rounded-full mr-3" style={{backgroundColor: '#46FFB4'}}></div>
                        Strong communication skills
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 rounded-full mr-3" style={{backgroundColor: '#46FFB4'}}></div>
                        Passion for helping others
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 rounded-full mr-3" style={{backgroundColor: '#46FFB4'}}></div>
                        Available 2-5 hours per week
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 rounded-full mr-3" style={{backgroundColor: '#46FFB4'}}></div>
                        Commitment to mentee success
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold mb-4 text-center" style={{color: '#0A1F44'}}>Mentor Application Process</h3>
                  <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                    <div className="text-center">
                      <div className="w-12 h-12 text-white rounded-full flex items-center justify-center font-bold mb-2 mx-auto" style={{backgroundColor: '#4DA6FF'}}>1</div>
                      <h4 className="font-semibold" style={{color: '#0A1F44'}}>Apply</h4>
                      <p className="text-xs text-gray-600">Submit application</p>
                    </div>
                    <div className="hidden md:block text-gray-300">→</div>
                    <div className="text-center">
                      <div className="w-12 h-12 text-white rounded-full flex items-center justify-center font-bold mb-2 mx-auto" style={{backgroundColor: '#4DA6FF'}}>2</div>
                      <h4 className="font-semibold" style={{color: '#0A1F44'}}>Interview</h4>
                      <p className="text-xs text-gray-600">Video screening call</p>
                    </div>
                    <div className="hidden md:block text-gray-300">→</div>
                    <div className="text-center">
                      <div className="w-12 h-12 text-white rounded-full flex items-center justify-center font-bold mb-2 mx-auto" style={{backgroundColor: '#4DA6FF'}}>3</div>
                      <h4 className="font-semibold" style={{color: '#0A1F44'}}>Training</h4>
                      <p className="text-xs text-gray-600">Mentor onboarding</p>
                    </div>
                    <div className="hidden md:block text-gray-300">→</div>
                    <div className="text-center">
                      <div className="w-12 h-12 text-white rounded-full flex items-center justify-center font-bold mb-2 mx-auto" style={{backgroundColor: '#46FFB4'}}>4</div>
                      <h4 className="font-semibold" style={{color: '#0A1F44'}}>Start</h4>
                      <p className="text-xs text-gray-600">Begin mentoring</p>
                    </div>
                  </div>
                </div>

                <div className="text-center space-y-4">
                  <Button size="lg" onClick={() => setShowApplication(true)} style={{backgroundColor: '#267358', color: 'white'}}>
                    Apply to Become a Mentor
                  </Button>
                  <p className="text-sm text-gray-500">
                    Application takes about 15 minutes to complete
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      {showApplication && (
        <MentorApplication onBack={() => setShowApplication(false)} />
      )}

      {showBooking && bookingMentor && (
        <BookSession 
          mentor={bookingMentor} 
          onClose={() => {
            setShowBooking(false);
            setBookingMentor(null);
          }} 
        />
      )}

      {showProfile && profileMentor && (
        <MentorProfile 
          mentor={profileMentor}
          onClose={() => {
            setShowProfile(false);
            setProfileMentor(null);
          }}
          onBookSession={() => {
            setShowProfile(false);
            setBookingMentor(profileMentor);
            setShowBooking(true);
          }}
        />
      )}
    </div>
  );
}