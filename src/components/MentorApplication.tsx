import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { ArrowLeft, CheckCircle, Upload } from 'lucide-react';

interface MentorApplicationProps {
  onBack: () => void;
}

export function MentorApplication({ onBack }: MentorApplicationProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Info
    fullName: '',
    email: '',
    phone: '',
    location: '',
    pronouns: '',
    
    // Professional Info
    currentRole: '',
    company: '',
    experience: '',
    industry: '',
    expertise: [] as string[],
    
    // Mentoring Info
    motivation: '',
    menteeTypes: [] as string[],
    availability: '',
    preferredFormat: '',
    sessionRate: '',
    
    // Additional Info
    bio: '',
    achievements: '',
    linkedin: '',
    portfolio: '',
    
    // Agreements
    terms: false,
    backgroundCheck: false,
    references: false
  });

  const totalSteps = 4;

  const expertiseOptions = [
    "Software Development", "Data Science", "Product Management", "Digital Marketing",
    "UI/UX Design", "Business Development", "Entrepreneurship", "Sales",
    "Finance", "HR", "Operations", "Consulting"
  ];

  const menteeTypeOptions = [
    "College Students", "Fresh Graduates", "Career Changers", "Working Professionals",
    "Entrepreneurs", "International Students"
  ];

  const handleExpertiseChange = (expertise: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        expertise: [...prev.expertise, expertise]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        expertise: prev.expertise.filter(item => item !== expertise)
      }));
    }
  };

  const handleMenteeTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        menteeTypes: [...prev.menteeTypes, type]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        menteeTypes: prev.menteeTypes.filter(item => item !== type)
      }));
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center justify-center p-4 rounded-full mb-4" style={{backgroundColor: '#46FFB420'}}>
          <CheckCircle className="h-16 w-16" style={{color: '#46FFB4'}} />
        </div>
        <h2 className="text-3xl font-bold" style={{color: '#0A1F44'}}>Application Submitted!</h2>
        <p className="text-lg text-gray-600">
          Thank you for applying to become a mentor. We'll review your application and get back to you within 3-5 business days.
        </p>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-semibold mb-4" style={{color: '#0A1F44'}}>What's Next?</h3>
          <div className="space-y-3 text-left">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded-full text-white flex items-center justify-center text-sm" style={{backgroundColor: '#4DA6FF'}}>1</div>
              <span className="text-sm">Application review (2-3 days)</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded-full text-white flex items-center justify-center text-sm" style={{backgroundColor: '#4DA6FF'}}>2</div>
              <span className="text-sm">Video interview scheduling</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded-full text-white flex items-center justify-center text-sm" style={{backgroundColor: '#4DA6FF'}}>3</div>
              <span className="text-sm">Mentor onboarding and training</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded-full text-white flex items-center justify-center text-sm" style={{backgroundColor: '#46FFB4'}}>4</div>
              <span className="text-sm">Start mentoring!</span>
            </div>
          </div>
        </div>
        <Button onClick={onBack} style={{backgroundColor: '#4DA6FF', color: 'white'}}>
          Back to Mentorship
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="outline" onClick={onBack} style={{borderColor: '#4DA6FF', color: '#4DA6FF'}}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h2 className="text-2xl font-bold" style={{color: '#0A1F44'}}>Mentor Application</h2>
          <p className="text-gray-600">Step {currentStep} of {totalSteps}</p>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-2">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div key={i} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                i + 1 <= currentStep ? 'text-white' : 'text-gray-400 border-2 border-gray-300'
              }`} style={i + 1 <= currentStep ? {backgroundColor: '#4DA6FF'} : {}}>
                {i + 1}
              </div>
              {i < totalSteps - 1 && (
                <div className={`w-12 h-1 mx-2 ${i + 1 < currentStep ? '' : 'bg-gray-200'}`} 
                     style={i + 1 < currentStep ? {backgroundColor: '#4DA6FF'} : {}}></div>
              )}
            </div>
          ))}
        </div>
        <div className="text-sm text-gray-600">
          {currentStep === 1 && "Personal & Contact Information"}
          {currentStep === 2 && "Professional Background"}
          {currentStep === 3 && "Mentoring Preferences"}
          {currentStep === 4 && "Additional Information & Agreements"}
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          {/* Step 1: Personal Info */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold" style={{color: '#0A1F44'}}>Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData(prev => ({...prev, fullName: e.target.value}))}
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <Label htmlFor="pronouns">Pronouns</Label>
                  <Select value={formData.pronouns} onValueChange={(value) => setFormData(prev => ({...prev, pronouns: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select pronouns" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="he-him">He/Him</SelectItem>
                      <SelectItem value="she-her">She/Her</SelectItem>
                      <SelectItem value="they-them">They/Them</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({...prev, phone: e.target.value}))}
                    placeholder="+92 300 1234567"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="location">Current Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({...prev, location: e.target.value}))}
                  placeholder="City, State"
                />
              </div>
            </div>
          )}

          {/* Step 2: Professional Info */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold" style={{color: '#0A1F44'}}>Professional Background</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="currentRole">Current Role *</Label>
                  <Input
                    id="currentRole"
                    value={formData.currentRole}
                    onChange={(e) => setFormData(prev => ({...prev, currentRole: e.target.value}))}
                    placeholder="e.g., Senior Software Engineer"
                  />
                </div>
                <div>
                  <Label htmlFor="company">Current Company *</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({...prev, company: e.target.value}))}
                    placeholder="e.g., Daraz, Jazz, Careem, etc."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="experience">Years of Experience *</Label>
                  <Select value={formData.experience} onValueChange={(value) => setFormData(prev => ({...prev, experience: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3-5">3-5 years</SelectItem>
                      <SelectItem value="5-8">5-8 years</SelectItem>
                      <SelectItem value="8-12">8-12 years</SelectItem>
                      <SelectItem value="12+">12+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="industry">Industry *</Label>
                  <Select value={formData.industry} onValueChange={(value) => setFormData(prev => ({...prev, industry: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Areas of Expertise * (Select all that apply)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {expertiseOptions.map((expertise) => (
                    <div key={expertise} className="flex items-center space-x-2">
                      <Checkbox
                        id={expertise}
                        checked={formData.expertise.includes(expertise)}
                        onCheckedChange={(checked) => handleExpertiseChange(expertise, checked as boolean)}
                      />
                      <Label htmlFor={expertise} className="text-sm">{expertise}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Mentoring Preferences */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold" style={{color: '#0A1F44'}}>Mentoring Preferences</h3>
              
              <div>
                <Label htmlFor="motivation">Why do you want to become a mentor? *</Label>
                <Textarea
                  id="motivation"
                  value={formData.motivation}
                  onChange={(e) => setFormData(prev => ({...prev, motivation: e.target.value}))}
                  placeholder="Share your motivation for mentoring..."
                  rows={3}
                />
              </div>

              <div>
                <Label>What type of mentees would you like to work with? * (Select all that apply)</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {menteeTypeOptions.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={type}
                        checked={formData.menteeTypes.includes(type)}
                        onCheckedChange={(checked) => handleMenteeTypeChange(type, checked as boolean)}
                      />
                      <Label htmlFor={type} className="text-sm">{type}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="availability">Availability *</Label>
                  <Select value={formData.availability} onValueChange={(value) => setFormData(prev => ({...prev, availability: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekday-evenings">Weekday Evenings</SelectItem>
                      <SelectItem value="weekends">Weekends</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                      <SelectItem value="weekday-mornings">Weekday Mornings</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="preferredFormat">Preferred Session Format *</Label>
                  <Select value={formData.preferredFormat} onValueChange={(value) => setFormData(prev => ({...prev, preferredFormat: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video-call">Video Call</SelectItem>
                      <SelectItem value="phone-call">Phone Call</SelectItem>
                      <SelectItem value="in-person">In-Person (if local)</SelectItem>
                      <SelectItem value="messaging">Text/Messaging</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="sessionRate">Preferred Session Rate (per hour) *</Label>
                <Select value={formData.sessionRate} onValueChange={(value) => setFormData(prev => ({...prev, sessionRate: value}))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select rate" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2000-4000">PKR 2,000 - PKR 4,000</SelectItem>
                    <SelectItem value="4000-6000">PKR 4,000 - PKR 6,000</SelectItem>
                    <SelectItem value="6000-10000">PKR 6,000 - PKR 10,000</SelectItem>
                    <SelectItem value="10000+">PKR 10,000+</SelectItem>
                    <SelectItem value="pro-bono">Pro Bono (Free)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Step 4: Additional Info & Agreements */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold" style={{color: '#0A1F44'}}>Additional Information</h3>
              
              <div>
                <Label htmlFor="bio">Professional Bio *</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({...prev, bio: e.target.value}))}
                  placeholder="Write a brief professional bio that will be shown to mentees..."
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="achievements">Key Achievements</Label>
                <Textarea
                  id="achievements"
                  value={formData.achievements}
                  onChange={(e) => setFormData(prev => ({...prev, achievements: e.target.value}))}
                  placeholder="List your key professional achievements, awards, certifications..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="linkedin">LinkedIn Profile *</Label>
                  <Input
                    id="linkedin"
                    value={formData.linkedin}
                    onChange={(e) => setFormData(prev => ({...prev, linkedin: e.target.value}))}
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
                <div>
                  <Label htmlFor="portfolio">Portfolio/Website</Label>
                  <Input
                    id="portfolio"
                    value={formData.portfolio}
                    onChange={(e) => setFormData(prev => ({...prev, portfolio: e.target.value}))}
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </div>

              <div className="border-t pt-4 space-y-4">
                <h4 className="font-semibold" style={{color: '#0A1F44'}}>Agreements & Verification</h4>
                
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.terms}
                      onCheckedChange={(checked) => setFormData(prev => ({...prev, terms: checked as boolean}))}
                    />
                    <Label htmlFor="terms" className="text-sm leading-5">
                      I agree to the Terms of Service and Mentor Code of Conduct
                    </Label>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="backgroundCheck"
                      checked={formData.backgroundCheck}
                      onCheckedChange={(checked) => setFormData(prev => ({...prev, backgroundCheck: checked as boolean}))}
                    />
                    <Label htmlFor="backgroundCheck" className="text-sm leading-5">
                      I consent to a background check and identity verification
                    </Label>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="references"
                      checked={formData.references}
                      onCheckedChange={(checked) => setFormData(prev => ({...prev, references: checked as boolean}))}
                    />
                    <Label htmlFor="references" className="text-sm leading-5">
                      I can provide professional references upon request
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-4 border-t">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              style={{borderColor: '#4DA6FF', color: '#4DA6FF'}}
            >
              Previous
            </Button>
            
            {currentStep < totalSteps ? (
              <Button onClick={handleNext} style={{backgroundColor: '#4DA6FF', color: 'white'}}>
                Next Step
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit}
                disabled={!formData.terms || !formData.backgroundCheck || !formData.references}
                style={{backgroundColor: '#46FFB4', color: 'white'}}
              >
                Submit Application
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}