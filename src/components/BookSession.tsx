import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Calendar, Clock, Video, X, CheckCircle, Star } from 'lucide-react';

interface Mentor {
  id: number;
  name: string;
  title: string;
  company: string;
  rating: number;
  rate: string;
  avatar: string;
  expertise: string[];
}

interface BookSessionProps {
  mentor: Mentor;
  onClose: () => void;
}

export function BookSession({ mentor, onClose }: BookSessionProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isBooked, setIsBooked] = useState(false);
  const [bookingData, setBookingData] = useState({
    sessionType: '',
    date: '',
    time: '',
    duration: '',
    topics: '',
    goals: '',
    experience: '',
    questions: '',
    contactMethod: 'email'
  });

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', 
    '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM'
  ];

  const sessionTypes = [
    { value: 'career-guidance', label: 'Career Guidance', duration: '45 min', price: mentor.rate },
    { value: 'resume-review', label: 'Resume Review', duration: '30 min', price: mentor.rate },
    { value: 'interview-prep', label: 'Interview Preparation', duration: '60 min', price: mentor.rate },
    { value: 'skill-development', label: 'Skill Development', duration: '45 min', price: mentor.rate },
    { value: 'industry-insights', label: 'Industry Insights', duration: '30 min', price: mentor.rate }
  ];

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleBooking = () => {
    setIsBooked(true);
  };

  if (isBooked) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-lg">
          <CardContent className="pt-6 text-center space-y-4">
            <div className="inline-flex items-center justify-center p-4 rounded-full mb-4" style={{backgroundColor: '#46FFB420'}}>
              <CheckCircle className="h-12 w-12" style={{color: '#46FFB4'}} />
            </div>
            <h3 className="text-2xl font-bold" style={{color: '#0A1F44'}}>Session Booked!</h3>
            <p className="text-gray-600">
              Your mentoring session with {mentor.name} has been successfully scheduled.
            </p>
            
            <div className="bg-gray-50 p-4 rounded-lg text-left space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Mentor:</span>
                <span>{mentor.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Session:</span>
                <span>{sessionTypes.find(s => s.value === bookingData.sessionType)?.label}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Date & Time:</span>
                <span>{bookingData.date} at {bookingData.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Duration:</span>
                <span>{sessionTypes.find(s => s.value === bookingData.sessionType)?.duration}</span>
              </div>
            </div>

            <div className="text-sm text-gray-600">
              A confirmation email with meeting details will be sent to you shortly.
            </div>

            <Button onClick={onClose} className="w-full" style={{backgroundColor: '#4DA6FF', color: 'white'}}>
              Done
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={mentor.avatar} alt={mentor.name} />
                <AvatarFallback style={{backgroundColor: '#4DA6FF20', color: '#4DA6FF'}}>
                  {mentor.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle style={{color: '#0A1F44'}}>Book Session with {mentor.name}</CardTitle>
                <CardDescription>
                  {mentor.title} at {mentor.company}
                </CardDescription>
                <div className="flex items-center mt-1">
                  <Star className="h-3 w-3 fill-current mr-1" style={{color: '#FFD84D'}} />
                  <span className="text-xs text-gray-500">{mentor.rating} rating</span>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Progress Steps */}
          <div className="flex items-center space-x-2 mb-6">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step <= currentStep ? 'text-white' : 'text-gray-400 border-2 border-gray-300'
                }`} style={step <= currentStep ? {backgroundColor: '#4DA6FF'} : {}}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-12 h-1 mx-2 ${step < currentStep ? '' : 'bg-gray-200'}`}
                       style={step < currentStep ? {backgroundColor: '#4DA6FF'} : {}}></div>
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Session Type & Date */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold" style={{color: '#0A1F44'}}>Choose Session Type & Date</h3>
              
              <div>
                <Label>Session Type *</Label>
                <div className="grid grid-cols-1 gap-2 mt-2">
                  {sessionTypes.map((session) => (
                    <Card key={session.value} 
                          className={`cursor-pointer transition-all ${
                            bookingData.sessionType === session.value ? 'ring-2' : 'hover:shadow-md'
                          }`}
                          style={bookingData.sessionType === session.value ? {borderColor: '#4DA6FF'} : {}}
                          onClick={() => setBookingData(prev => ({...prev, sessionType: session.value}))}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium" style={{color: '#0A1F44'}}>{session.label}</h4>
                            <p className="text-sm text-gray-600">{session.duration}</p>
                          </div>
                          <Badge style={{backgroundColor: '#46FFB4', color: 'white'}}>{session.price}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Preferred Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={bookingData.date}
                    onChange={(e) => setBookingData(prev => ({...prev, date: e.target.value}))}
                  />
                </div>
                <div>
                  <Label htmlFor="time">Preferred Time *</Label>
                  <Select value={bookingData.time} onValueChange={(value) => setBookingData(prev => ({...prev, time: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>{time}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Session Details */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold" style={{color: '#0A1F44'}}>Session Details</h3>
              
              <div>
                <Label htmlFor="topics">Topics you'd like to discuss *</Label>
                <Textarea
                  id="topics"
                  value={bookingData.topics}
                  onChange={(e) => setBookingData(prev => ({...prev, topics: e.target.value}))}
                  placeholder="What specific topics would you like to cover in this session?"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="goals">Your current goals</Label>
                <Textarea
                  id="goals"
                  value={bookingData.goals}
                  onChange={(e) => setBookingData(prev => ({...prev, goals: e.target.value}))}
                  placeholder="What are your short-term and long-term career goals?"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="experience">Your background & experience</Label>
                <Textarea
                  id="experience"
                  value={bookingData.experience}
                  onChange={(e) => setBookingData(prev => ({...prev, experience: e.target.value}))}
                  placeholder="Tell us about your educational background and work experience..."
                  rows={3}
                />
              </div>
            </div>
          )}

          {/* Step 3: Contact & Final Details */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold" style={{color: '#0A1F44'}}>Final Details</h3>
              
              <div>
                <Label htmlFor="questions">Specific questions for the mentor</Label>
                <Textarea
                  id="questions"
                  value={bookingData.questions}
                  onChange={(e) => setBookingData(prev => ({...prev, questions: e.target.value}))}
                  placeholder="Do you have any specific questions you'd like to ask?"
                  rows={3}
                />
              </div>

              <div>
                <Label>Preferred contact method</Label>
                <Select value={bookingData.contactMethod} onValueChange={(value) => setBookingData(prev => ({...prev, contactMethod: value}))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="phone">Phone</SelectItem>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Session Summary */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3" style={{color: '#0A1F44'}}>Session Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Session Type:</span>
                    <span>{sessionTypes.find(s => s.value === bookingData.sessionType)?.label}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date & Time:</span>
                    <span>{bookingData.date} at {bookingData.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span>{sessionTypes.find(s => s.value === bookingData.sessionType)?.duration}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Total Cost:</span>
                    <span>{mentor.rate}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-4 border-t">
            {currentStep > 1 ? (
              <Button variant="outline" onClick={handlePrevious} style={{borderColor: '#4DA6FF', color: '#4DA6FF'}}>
                Previous
              </Button>
            ) : (
              <div></div>
            )}
            
            {currentStep < 3 ? (
              <Button 
                onClick={handleNext}
                disabled={currentStep === 1 && (!bookingData.sessionType || !bookingData.date || !bookingData.time)}
                style={{backgroundColor: '#4DA6FF', color: 'white'}}
              >
                Next
              </Button>
            ) : (
              <Button 
                onClick={handleBooking}
                style={{backgroundColor: '#46FFB4', color: 'white'}}
              >
                <Video className="h-4 w-4 mr-2" />
                Book Session
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}