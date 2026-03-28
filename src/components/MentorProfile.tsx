import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Star, MapPin, Clock, Award, MessageCircle, X, Calendar, Users, TrendingUp } from 'lucide-react';

interface Mentor {
  id: number;
  name: string;
  title: string;
  company: string;
  experience: string;
  expertise: string[];
  rating: number;
  reviews: number;
  sessions: number;
  location: string;
  bio: string;
  achievements: string[];
  availability: string;
  rate: string;
  avatar: string;
  pronouns?: string;
  workingState?: string;
  languages?: string[];
  responseTime?: string;
}

interface MentorProfileProps {
  mentor: Mentor;
  onClose: () => void;
  onBookSession: () => void;
}

const expandedMentorData = {
  1: {
    pronouns: "He/Him",
    workingState: "Currently Leading",
    languages: ["English", "Urdu", "Pushto"],
    responseTime: "Within 2 hours",
    specializations: ["Career Transitions", "Technical Leadership", "Interview Preparation"],
    education: "B.Tech Computer Science, IT Madras",
    previousCompanies: ["Amazon", "Microsoft", "Startup (CTO)"],
    menteeSuccessRate: "94%",
    totalMentees: "60+",
    extendedBio: "I started my career as a software engineer at a small startup in Peshawar and worked my way up to become a senior engineer at one of Pakistan's largest e-commerce platforms. I'm passionate about helping others navigate the tech industry, especially those from tier-2 and tier-3 cities. I believe that with the right guidance and determination, anyone can build a successful tech career in Pakistan.",
    testimonials: [
      {
        name: "Zoe",
        role: "Software Engineer at TecMasterSD",
        text: "Jawad's guidance was instrumental in helping me transition from a service company to a product company. his practical advice and interview preparation tips were invaluable."
      },
      {
        name: "Zainab",
        role: "Senior Developer at FoodPanda",
        text: "As someone from a small town, I found jawad's mentorship incredibly encouraging.he helped me build confidence and navigate the tech industry effectively."
      }
    ]
  }
};

export function MentorProfile({ mentor, onClose, onBookSession }: MentorProfileProps) {
  const extendedData = expandedMentorData[mentor.id as keyof typeof expandedMentorData] || {
    pronouns: "They/Them",
    workingState: "Currently Working",
    languages: ["English", "Urdu"],
    responseTime: "Within 4 hours",
    specializations: ["Career Development", "Industry Insights"],
    education: "MBA/B.Tech",
    previousCompanies: ["Various Companies"],
    menteeSuccessRate: "90%",
    totalMentees: "30+",
    extendedBio: mentor.bio,
    testimonials: []
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={mentor.avatar} alt={mentor.name} />
                <AvatarFallback style={{backgroundColor: '#4DA6FF20', color: '#4DA6FF'}}>
                  {mentor.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <CardTitle className="text-2xl" style={{color: '#0A1F44'}}>{mentor.name}</CardTitle>
                  <Badge variant="outline" style={{borderColor: '#46FFB4', color: '#46FFB4'}}>
                    {extendedData.pronouns}
                  </Badge>
                </div>
                <CardDescription className="text-lg mb-2">
                  {mentor.title} at {mentor.company}
                </CardDescription>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {mentor.location}
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 fill-current" style={{color: '#FFD84D'}} />
                    {mentor.rating} ({mentor.reviews} reviews)
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {extendedData.responseTime}
                  </div>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-4 text-center">
                <Award className="h-6 w-6 mx-auto mb-2" style={{color: '#FFD84D'}} />
                <div className="text-lg font-bold" style={{color: '#0A1F44'}}>{mentor.experience}</div>
                <div className="text-sm text-gray-600">Experience</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4 text-center">
                <MessageCircle className="h-6 w-6 mx-auto mb-2" style={{color: '#4DA6FF'}} />
                <div className="text-lg font-bold" style={{color: '#0A1F44'}}>{mentor.sessions}</div>
                <div className="text-sm text-gray-600">Sessions</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4 text-center">
                <Users className="h-6 w-6 mx-auto mb-2" style={{color: '#46FFB4'}} />
                <div className="text-lg font-bold" style={{color: '#0A1F44'}}>{extendedData.totalMentees}</div>
                <div className="text-sm text-gray-600">Mentees</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4 text-center">
                <TrendingUp className="h-6 w-6 mx-auto mb-2" style={{color: '#46FFB4'}} />
                <div className="text-lg font-bold" style={{color: '#0A1F44'}}>{extendedData.menteeSuccessRate}</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </CardContent>
            </Card>
          </div>

          {/* About */}
          <Card>
            <CardHeader>
              <CardTitle style={{color: '#0A1F44'}}>About {mentor.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 leading-relaxed">{extendedData.extendedBio}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2" style={{color: '#0A1F44'}}>Working State</h4>
                  <Badge style={{backgroundColor: '#46FFB420', color: '#0A1F44'}}>
                    {extendedData.workingState}
                  </Badge>
                </div>
                <div>
                  <h4 className="font-semibold mb-2" style={{color: '#0A1F44'}}>Languages</h4>
                  <div className="flex flex-wrap gap-1">
                    {extendedData.languages.map((lang, index) => (
                      <Badge key={index} variant="outline" style={{borderColor: '#4DA6FF', color: '#4DA6FF'}}>
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Background */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle style={{color: '#0A1F44'}}>Expertise & Specializations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2" style={{color: '#0A1F44'}}>Core Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {mentor.expertise.map((skill, index) => (
                      <Badge key={index} style={{backgroundColor: '#4DA6FF20', color: '#4DA6FF'}}>
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2" style={{color: '#0A1F44'}}>Specializations</h4>
                  <div className="flex flex-wrap gap-2">
                    {extendedData.specializations.map((spec, index) => (
                      <Badge key={index} variant="outline" style={{borderColor: '#46FFB4', color: '#46FFB4'}}>
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle style={{color: '#0A1F44'}}>Professional Journey</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2" style={{color: '#0A1F44'}}>Education</h4>
                  <p className="text-sm text-gray-600">{extendedData.education}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2" style={{color: '#0A1F44'}}>Career Path</h4>
                  <div className="space-y-1">
                    {extendedData.previousCompanies.map((company, index) => (
                      <div key={index} className="text-sm text-gray-600">• {company}</div>
                    ))}
                    <div className="text-sm font-medium">• {mentor.company} (Current)</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle style={{color: '#0A1F44'}}>Key Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {mentor.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full" style={{backgroundColor: '#FFD84D'}}></div>
                    <span className="text-sm">{achievement}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Testimonials */}
          {extendedData.testimonials.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle style={{color: '#0A1F44'}}>What Mentees Say</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {extendedData.testimonials.map((testimonial, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm italic text-gray-700 mb-3">"{testimonial.text}"</p>
                      <div className="text-xs">
                        <div className="font-semibold" style={{color: '#0A1F44'}}>{testimonial.name}</div>
                        <div className="text-gray-500">{testimonial.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Availability & Booking */}
          <Card>
            <CardHeader>
              <CardTitle style={{color: '#0A1F44'}}>Availability & Booking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2" style={{color: '#0A1F44'}}>Available Times</h4>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{mentor.availability}</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2" style={{color: '#0A1F44'}}>Session Rate</h4>
                  <div className="text-lg font-bold" style={{color: '#46FFB4'}}>{mentor.rate}</div>
                </div>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <Button onClick={onBookSession} className="flex-1" style={{backgroundColor: '#4DA6FF', color: 'white'}}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Session
                </Button>
                <Button variant="outline" style={{borderColor: '#46FFB4', color: '#46FFB4'}}>
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}