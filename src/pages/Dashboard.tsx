import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Bell, 
  MessageSquare, 
  Users, 
  Calendar, 
  Settings, 
  LogOut, 
  User,
  Search,
  Filter,
  Plus,
  BookOpen,
  Target,
  TrendingUp,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import ProfileSection from "./ProfileSection";

// Mock data for demonstration
const mockAlumni = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    role: "Senior Software Engineer",
    company: "Google",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    skills: ["React", "TypeScript", "AI/ML"],
    matchScore: 95,
    isOnline: true
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "Product Manager",
    company: "Microsoft",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    skills: ["Product Strategy", "User Research", "Agile"],
    matchScore: 87,
    isOnline: false
  },
  {
    id: 3,
    name: "Emily Watson",
    role: "Data Scientist",
    company: "Netflix",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    skills: ["Python", "Machine Learning", "Statistics"],
    matchScore: 92,
    isOnline: true
  }
];

const mockEvents = [
  {
    id: 1,
    title: "Tech Career Fair 2024",
    date: "2024-02-15",
    time: "10:00 AM",
    location: "Main Campus Auditorium",
    type: "Career",
    attendees: 150,
    isNew: true
  },
  {
    id: 2,
    title: "AI Workshop Series",
    date: "2024-02-20",
    time: "2:00 PM",
    location: "Computer Science Building",
    type: "Workshop",
    attendees: 45,
    isNew: true
  },
  {
    id: 3,
    title: "Alumni Networking Mixer",
    date: "2024-02-25",
    time: "6:00 PM",
    location: "University Club",
    type: "Networking",
    attendees: 80,
    isNew: false
  }
];

// Mock user role for demonstration
const userRole = "alumni"; // Change to 'student' or 'admin' to hide profile tab

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [userProfile, setUserProfile] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@university.edu",
    major: "Computer Science",
    year: "Junior",
    skills: ["JavaScript", "React", "Node.js"],
    interests: ["Web Development", "AI/ML", "Startups"],
    goals: ["Software Engineer", "Tech Leadership", "Innovation"]
  });

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    navigate("/userlogin");
  };

  const handleRequestGuidance = (alumniId: number) => {
    toast({
      title: "Guidance request sent!",
      description: "The alumni will be notified of your request.",
    });
  };

  const handleEventRegistration = (eventId: number) => {
    toast({
      title: "Event registered!",
      description: "You have successfully registered for this event.",
    });
  };

  const handleProfileUpdate = (updatedProfile: any) => {
    setUserProfile(updatedProfile);
    setShowProfileSetup(false);
    toast({
      title: "Profile updated!",
      description: "Your profile has been successfully updated.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">CampusConnect AI</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
                    { notifications}
                  </Badge>
                )}
              </Button>
              
              <div className="flex items-center space-x-2">
                <button onClick={() => navigate("/profile")} className="focus:outline-none">
                  <Avatar className="w-8 h-8 cursor-pointer ring-2 ring-orange-400 hover:ring-pink-400 transition-all">
                    <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" />
                    <AvatarFallback>AJ</AvatarFallback>
                  </Avatar>
                </button>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">{userProfile.name}</p>
                  <p className="text-xs text-gray-500">{userProfile.major}</p>
                </div>
              </div>
              
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {userProfile.name}! 👋</h2>
          <p className="text-gray-600">Here's what's happening in your campus community today.</p>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/80 rounded-xl shadow-md p-1 gap-2 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="alumni">Alumni Connections</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="campusgpt">CampusGPT</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Alumni Matches</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">+3 from last week</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground">Next: Tech Career Fair</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Profile Completion</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">85%</div>
                  <p className="text-xs text-muted-foreground">+5% this week</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">AI Interactions</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">23</div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-orange-500" />
                    Recent Alumni Matches
                  </CardTitle>
                  <CardDescription>Top AI-suggested connections for you</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockAlumni.slice(0, 2).map((alumni) => (
                    <div key={alumni.id} className="flex items-center justify-between p-3 rounded-lg border border-orange-100 bg-orange-50">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={alumni.avatar} />
                          <AvatarFallback>{alumni.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{alumni.name}</p>
                          <p className="text-xs text-gray-500">{alumni.role} at {alumni.company}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="text-xs">
                          {alumni.matchScore}% match
                        </Badge>
                        <Button size="sm" onClick={() => handleRequestGuidance(alumni.id)}>
                          Request
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-pink-500" />
                    Upcoming Events
                  </CardTitle>
                  <CardDescription>Events you might be interested in</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockEvents.slice(0, 2).map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-3 rounded-lg border border-pink-100 bg-pink-50">
                      <div>
                        <p className="font-medium text-sm">{event.title}</p>
                        <p className="text-xs text-gray-500">{event.date} at {event.time}</p>
                        <p className="text-xs text-gray-500">{event.location}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {event.isNew && (
                          <Badge variant="destructive" className="text-xs">New</Badge>
                        )}
                        <Button size="sm" variant="outline" onClick={() => handleEventRegistration(event.id)}>
                          Register
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Alumni Connections Tab */}
          <TabsContent value="alumni" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">AI-Suggested Alumni Connections</h3>
                <p className="text-sm text-gray-600">Get matched with relevant alumni based on your skills and goals</p>
              </div>
              <div className="flex items-center space-x-2">
                <Input placeholder="Search alumni..." className="w-64" />
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockAlumni.map((alumni) => (
                <Card key={alumni.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={alumni.avatar} />
                          <AvatarFallback>{alumni.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-base">{alumni.name}</CardTitle>
                          <CardDescription>{alumni.role} at {alumni.company}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className={`w-2 h-2 rounded-full ${alumni.isOnline ? 'bg-green-500' : 'bg-gray-300'}`} />
                        <Badge variant="secondary" className="text-xs">
                          {alumni.matchScore}% match
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Skills</p>
                        <div className="flex flex-wrap gap-1">
                          {alumni.skills.map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button 
                        className="w-full" 
                        onClick={() => handleRequestGuidance(alumni.id)}
                      >
                        Request Guidance
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Personalized Event Alerts</h3>
                <p className="text-sm text-gray-600">Never miss important campus opportunities</p>
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Event
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockEvents.map((event) => (
                <Card key={event.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{event.title}</CardTitle>
                      {event.isNew && (
                        <Badge variant="destructive">New</Badge>
                      )}
                    </div>
                    <CardDescription>{event.location}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Date & Time</span>
                        <span className="font-medium">{event.date} at {event.time}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Type</span>
                        <Badge variant="outline">{event.type}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Attendees</span>
                        <span className="font-medium">{event.attendees} registered</span>
                      </div>
                      <Button 
                        className="w-full" 
                        onClick={() => handleEventRegistration(event.id)}
                      >
                        Register for Event
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* CampusGPT Tab */}
          <TabsContent value="campusgpt" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-blue-500" />
                  CampusGPT Assistant
                </CardTitle>
                <CardDescription>
                  Your smart AI companion to explore alumni profiles, get event insights, and ask anything
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Hi! I'm CampusGPT, your AI assistant.</p>
                      <p className="text-sm text-gray-600">Ask me about alumni, events, career advice, or anything campus-related!</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-gray-700">Quick Questions:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <Button variant="outline" size="sm" className="justify-start text-left">
                        "Who are the top alumni in software engineering?"
                      </Button>
                      <Button variant="outline" size="sm" className="justify-start text-left">
                        "What events are happening this month?"
                      </Button>
                      <Button variant="outline" size="sm" className="justify-start text-left">
                        "How can I improve my coding skills?"
                      </Button>
                      <Button variant="outline" size="sm" className="justify-start text-left">
                        "Tell me about internship opportunities"
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Input placeholder="Ask CampusGPT anything..." className="flex-1" />
                    <Button>Send</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          {userRole === "alumni" && (
            <TabsContent value="profile" className="space-y-6">
              <ProfileSection />
            </TabsContent>
          )}
        </Tabs>
      </div>

      {/* Comprehensive Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold">CampusConnect AI</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Connecting students with alumni through AI-powered matching. 
                Building stronger campus communities and career pathways.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 2.567-1.645 0-3.768-2.245-3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-orange-400">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">Find Alumni</a></li>
                <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">Upcoming Events</a></li>
                <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">Career Resources</a></li>
                <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">Mentorship Program</a></li>
                <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">Campus News</a></li>
                <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">Student Groups</a></li>
              </ul>
            </div>

            {/* Support & Resources */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-orange-400">Support & Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">Contact Support</a></li>
                <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">Accessibility</a></li>
              </ul>
            </div>

            {/* Newsletter & Contact */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-orange-400">Stay Connected</h4>
              <p className="text-gray-300 text-sm">
                Get the latest updates on events, alumni news, and career opportunities.
              </p>
              <div className="space-y-3">
                <form className="flex mr-12 w-full max-w-md items-stretch gap-2" onSubmit={e => e.preventDefault()}>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className=" px-1 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2  bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:from-orange-400 hover:to-pink-400 transition-all duration-300 w-auto"
                  >
                    Subscribe
                  </button>
                </form>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span>We respect your privacy</span>
                </div>
              </div>
              
              {/* Contact Info */}
              <div className="pt-4 border-t border-gray-700">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span className="text-gray-300">support@campusconnect.ai</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-300">123 University Ave, Campus City</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <span className="text-gray-300">+1 (555) 123-4567</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-12 pt-8 border-t border-gray-700">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span>&copy; 2024 CampusConnect AI. All rights reserved.</span>
                <span>•</span>
                <span>Made with ❤️ for students</span>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
               
                </div>
                <div className="flex space-x-4">
                  
                  <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                    API Docs
                  </a>
                  <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                    Developer Portal
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Highlights */}
          
        </div>
      </footer>

      {/* Profile Setup Dialog */}
      <Dialog open={showProfileSetup} onOpenChange={setShowProfileSetup}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Complete Your Profile</DialogTitle>
            <DialogDescription>
              Help us personalize your experience by sharing your skills, interests, and goals.
            </DialogDescription>
          </DialogHeader>
          <ProfileSetupForm onComplete={handleProfileUpdate} currentProfile={userProfile} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Profile Setup Component
const ProfileSetupForm = ({ onComplete, currentProfile }: any) => {
  const [form, setForm] = useState(currentProfile);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="major">Major</Label>
          <Input
            id="major"
            value={form.major}
            onChange={(e) => setForm({ ...form, major: e.target.value })}
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="year">Year</Label>
          <Select value={form.year} onValueChange={(value) => setForm({ ...form, year: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Freshman">Freshman</SelectItem>
              <SelectItem value="Sophomore">Sophomore</SelectItem>
              <SelectItem value="Junior">Junior</SelectItem>
              <SelectItem value="Senior">Senior</SelectItem>
              <SelectItem value="Graduate">Graduate</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="skills">Skills (comma-separated)</Label>
        <Textarea
          id="skills"
          value={form.skills.join(', ')}
          onChange={(e) => setForm({ ...form, skills: e.target.value.split(',').map(s => s.trim()) })}
          placeholder="e.g., JavaScript, React, Python, Machine Learning"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="interests">Interests (comma-separated)</Label>
        <Textarea
          id="interests"
          value={form.interests.join(', ')}
          onChange={(e) => setForm({ ...form, interests: e.target.value.split(',').map(s => s.trim()) })}
          placeholder="e.g., Web Development, AI/ML, Startups, Research"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="goals">Career Goals (comma-separated)</Label>
        <Textarea
          id="goals"
          value={form.goals.join(', ')}
          onChange={(e) => setForm({ ...form, goals: e.target.value.split(',').map(s => s.trim()) })}
          placeholder="e.g., Software Engineer, Tech Leadership, Innovation"
          required
        />
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={() => onComplete(currentProfile)}>
          Skip for now
        </Button>
        <Button type="submit">Save Profile</Button>
      </div>
    </form>
  );
};

export default Dashboard; 