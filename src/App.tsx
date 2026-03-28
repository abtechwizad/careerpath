import { useState } from 'react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { GraduationCap, Target, Users, MapIcon, BookOpen, Briefcase, Rocket, LayoutDashboard, Bot, Heart } from 'lucide-react';
// import { AptitudeTest } from './components/AptitudeTest';
import AptitudeTest from './components/AptitudeTest'
import { WIDTest } from './components/WIDTest';
import { Internships } from './components/Internships';
import { Mentorship } from './components/Mentorship';
import { GamefiedRoadmap } from './components/GamefiedRoadmap';
import Dashboard from './components/Dashboard';
import UserProfile from './components/userprofile';




export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg,rgb(27, 26, 26) 0%,rgb(162, 142, 142) 30%,rgb(47, 56, 110) 70%,rgb(2, 15, 18) 100%)' }}>
      {/* Header */}
      <header className="shadow-sm border-b" style={{ backgroundColor: '#1d4b3f', borderColor: 'rgb(254, 254, 254)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg" style={{ backgroundColor: '#34d399' }}>
                <Rocket className="h-6 w-6" style={{ color: '#1d4b3f' }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Career Passport</h1>
                <p className="text-sm" style={{ color: '#a7d7c4' }}>Your journey to professional success in Pakistan ✈️</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="hidden sm:flex" style={{ backgroundColor: '#a7d7c4', color: '#1d4b3f' }}>
                <GraduationCap className="h-4 w-4 mr-1" />
                Pakistan's Future
              </Badge>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white hover:bg-[#2d6b5e]"
                onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('user');
                  window.location.href = '/login';
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>






      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-7 mb-8" style={{ backgroundColor: 'rgba(255, 255, 255, 0.68)', backdropFilter: 'blur(10px)' }}>
            <TabsTrigger value="dashboard" className="flex items-center space-x-1" data-state={activeTab === 'dashboard' ? 'active' : 'inactive'} style={activeTab === 'dashboard' ? { backgroundColor: '', color: '#1d4b3f' } : { color: '#1d4b3f' }}>
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="aptitude" className="flex items-center space-x-1" data-state={activeTab === 'aptitude' ? 'active' : 'inactive'} style={activeTab === 'aptitude' ? { backgroundColor: '#34d399', color: '#1d4b3f' } : { color: '#1d4b3f' }}>
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Aptitude</span>
            </TabsTrigger>
            <TabsTrigger value="wid" className="flex items-center space-x-1" data-state={activeTab === 'wid' ? 'active' : 'inactive'} style={activeTab === 'wid' ? { backgroundColor: '#10b981', color: '#1d4b3f' } : { color: '#1d4b3f' }}>
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">WID Test</span>
            </TabsTrigger>
            <TabsTrigger value="internships" className="flex items-center space-x-1" data-state={activeTab === 'internships' ? 'active' : 'inactive'} style={activeTab === 'internships' ? { backgroundColor: '#34d399', color: '#1d4b3f' } : { color: '#1d4b3f' }}>
              <Briefcase className="h-4 w-4" />
              <span className="hidden sm:inline">Internships</span>
            </TabsTrigger>
            <TabsTrigger value="mentorship" className="flex items-center space-x-1" data-state={activeTab === 'mentorship' ? 'active' : 'inactive'} style={activeTab === 'mentorship' ? { backgroundColor: '#34d399', color: '#1d4b3f' } : { color: '#1d4b3f' }}>
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Mentorship</span>
            </TabsTrigger>
            <TabsTrigger value="roadmap" className="flex items-center space-x-1" data-state={activeTab === 'roadmap' ? 'active' : 'inactive'} style={activeTab === 'roadmap' ? { backgroundColor: '#34d399', color: '#1d4b3f' } : { color: '#1d4b3f' }}>
              <MapIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Roadmap</span>
            </TabsTrigger>
            <TabsTrigger value="userprofile" className="flex items-center space-x-1" data-state={activeTab === 'userprofile' ? 'active' : 'inactive'} style={activeTab === 'userprofile' ? { backgroundColor: '#34d399', color: '#1d4b3f' } : { color: '#1d4b3f' }}>
              <MapIcon className="h-4 w-4" />
              <span className="hidden sm:inline">User Profile</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <div className="space-y-8">






              
              {/* Hero Section */}
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center p-4 rounded-full mb-6" style={{ backgroundColor: 'rgb(255, 255, 255)' }}>
                  <GraduationCap className="h-16 w-16" style={{ color: '#1d4b3f' }} />
                </div>
                <h2 className="text-4xl font-bold mb-4" style={{ color: '#1d4b3f' }}>
                  Discover Your Career Path in Pakistan
                </h2>
                <p className="text-xl max-w-2xl mx-auto mb-8" style={{ color: '#1d4b3f' }}>
                  Get personalized guidance through aptitude tests, WID assessments, internships, mentorship, and gamified roadmaps to build your dream career in Pakistan.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button size="lg" onClick={() => setActiveTab('aptitude')} style={{ backgroundColor: '#34d399', color: '#1d4b3f' }}>
                    Start Aptitude Test
                  </Button>
                  <Button size="lg" onClick={() => setActiveTab('wid')} style={{ backgroundColor: '#10b981', color: '#1d4b3f' }}>
                    Take WID Test
                  </Button>

                </div>
              </div>







              {/* Enhanced Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer backdrop-blur-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }} onClick={() => setActiveTab('aptitude')}>
                  <CardHeader className="text-center">
                    <div className="mx-auto p-3 rounded-full w-fit mb-4" style={{ backgroundColor: 'rgba(52, 211, 153, 0.3)' }}>
                      <Target className="h-6 w-6" style={{ color: '#1d4b3f' }} />
                    </div>
                    <CardTitle style={{ color: '#1d4b3f' }}>Aptitude Test</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      Discover your personality type and get career suggestions for Pakistan's job market.
                    </CardDescription>
                    <div className="mt-4 flex justify-center">
                      <Badge variant="outline" style={{ borderColor: '#a7d7c4', color: '#1d4b3f' }}>MCQ + Reflection</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer backdrop-blur-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }} onClick={() => setActiveTab('wid')}>
                  <CardHeader className="text-center">
                    <div className="mx-auto p-3 rounded-full w-fit mb-4" style={{ backgroundColor: 'rgba(16, 185, 129, 0.3)' }}>
                      <Heart className="h-6 w-6" style={{ color: '#1d4b3f' }} />
                    </div>
                    <CardTitle style={{ color: '#1d4b3f' }}>WID Test</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      Understand what you desire through situational behavioral questions.
                    </CardDescription>
                    <div className="mt-4 flex justify-center">
                      <Badge variant="outline" style={{ borderColor: '#10b981', color: '#1d4b3f' }}>Behavioral</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer backdrop-blur-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }} onClick={() => setActiveTab('internships')}>
                  <CardHeader className="text-center">
                    <div className="mx-auto p-3 rounded-full w-fit mb-4" style={{ backgroundColor: 'rgba(167, 215, 196, 0.3)' }}>
                      <Briefcase className="h-6 w-6" style={{ color: '#1d4b3f' }} />
                    </div>
                    <CardTitle style={{ color: '#1d4b3f' }}>Internships</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      Connect with Pakistani companies and startups based on your capabilities.
                    </CardDescription>
                    <div className="mt-4 flex justify-center">
                      <Badge variant="outline" style={{ borderColor: '#a7d7c4', color: '#1d4b3f' }}>800+ Companies</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer backdrop-blur-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }} onClick={() => setActiveTab('mentorship')}>
                  <CardHeader className="text-center">
                    <div className="mx-auto p-3 rounded-full w-fit mb-4" style={{ backgroundColor: 'rgba(16, 185, 129, 0.3)' }}>
                      <Users className="h-6 w-6" style={{ color: '#1d4b3f' }} />
                    </div>
                    <CardTitle style={{ color: '#1d4b3f' }}>Mentorship</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      Learn from successful Pakistani professionals across industries.
                    </CardDescription>
                    <div className="mt-4 flex justify-center">
                      <Badge variant="outline" style={{ borderColor: '#10b981', color: '#1d4b3f' }}>500+ Mentors</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer backdrop-blur-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }} onClick={() => setActiveTab('roadmap')}>
                  <CardHeader className="text-center">
                    <div className="mx-auto p-3 rounded-full w-fit mb-4" style={{ backgroundColor: 'rgba(16, 185, 129, 0.3)' }}>
                      <MapIcon className="h-6 w-6" style={{ color: '#1d4b3f' }} />
                    </div>
                    <CardTitle style={{ color: '#1d4b3f' }}>Roadmap</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      Visualize your career path with interactive milestones for Pakistan.
                    </CardDescription>
                    <div className="mt-4 flex justify-center">
                      <Badge variant="outline" style={{ borderColor: '#34d399', color: '#1d4b3f' }}>XP & Levels</Badge>
                    </div>
                  </CardContent>
                </Card>

                 <Card className="hover:shadow-lg transition-shadow cursor-pointer backdrop-blur-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }} onClick={() => setActiveTab('userprofile')}>
                  <CardHeader className="text-center">
                    <div className="mx-auto p-3 rounded-full w-fit mb-4" style={{ backgroundColor: 'rgba(16, 185, 129, 0.3)'}}>
                      <MapIcon className="h-6 w-6" style={{ color: '#1d4b3f' }} />
                    </div>
                    <CardTitle style={{ color: '#1d4b3f' }}>Your Profile</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      Update your profile and get best apportunities in Pakistan
                    </CardDescription>
                    <div className="mt-4 flex justify-center">
                      <Badge variant="outline" style={{ borderColor: '#34d399', color: '#1d4b3f' }}></Badge>
                    </div>
                  </CardContent>
                </Card>
               </div>









              {/* Enhanced Assessment Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="backdrop-blur-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                  <CardHeader>
                    <CardTitle className="flex items-center" style={{ color: '#1d4b3f' }}>
                      <Target className="h-5 w-5 mr-2" style={{ color: '#34d399' }} />
                      Career Aptitude Assessment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Discover your personality type through MCQ questions and reflective exercises.
                      Get personalized career recommendations for Pakistan's job market.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        <Badge variant="outline" style={{ borderColor: '#34d399', color: '#1d4b3f' }}>6 MCQs</Badge>
                        <Badge variant="outline" style={{ borderColor: '#a7d7c4', color: '#1d4b3f' }}>3 Reflections</Badge>
                      </div>
                      <Button onClick={() => setActiveTab('aptitude')} style={{ backgroundColor: '#34d399', color: '#1d4b3f' }}>
                        Start Test
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="backdrop-blur-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                  <CardHeader>
                    <CardTitle className="flex items-center" style={{ color: '#1d4b3f' }}>
                      <Heart className="h-5 w-5 mr-2" style={{ color: '#10b981' }} />
                      What I Desire (WID) Test
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Understand your career desires through situational behavioral questions.
                      Discover what truly motivates you in Pakistan's professional environment.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        <Badge variant="outline" style={{ borderColor: '#10b981', color: '#1d4b3f' }}>12 Scenarios</Badge>
                        <Badge variant="outline" style={{ borderColor: '#10b981', color: '#1d4b3f' }}>Behavioral</Badge>
                      </div>
                      <Button onClick={() => setActiveTab('wid')} style={{ backgroundColor: '#10b981', color: '#1d4b3f' }}>
                        Take WID Test
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>










              

              {/* Stats Section */}
              <div className="rounded-lg shadow-sm p-8 backdrop-blur-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                <h3 className="text-2xl font-bold text-center mb-8" style={{ color: '#1d4b3f' }}>
                  Empowering Career Success in Pakistan
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 text-center">
                  <div>
                    <div className="text-3xl font-bold mb-2" style={{ color: '#34d399' }}>18K+</div>
                    <div className="text-gray-600">Career Assessments</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-2" style={{ color: '#10b981' }}>9K+</div>
                    <div className="text-gray-600">WID Tests Completed</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-2" style={{ color: '#a7d7c4' }}>800+</div>
                    <div className="text-gray-600">Company Partnerships</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-2" style={{ color: '#1d4b3f' }}>94%</div>
                    <div className="text-gray-600">User Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>











          </TabsContent>

          <TabsContent value="aptitude">
            <AptitudeTest />
          </TabsContent>

          <TabsContent value="wid">
            <WIDTest />
          </TabsContent>

          <TabsContent value="internships">
            <Internships />
          </TabsContent>

          <TabsContent value="mentorship">
            <Mentorship />
          </TabsContent>

          <TabsContent value="roadmap">
            <Dashboard />
          </TabsContent>

          <TabsContent value="userprofile">
            <UserProfile />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}