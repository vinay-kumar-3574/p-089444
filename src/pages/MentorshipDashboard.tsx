import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { 
  Bell, 
  Users, 
  Calendar, 
  Mail,
  LogOut,
  Check,
  X,
  Clock,
  Star,
  MessageCircle,
  Video,
  Phone,
  BookOpen,
  CheckCircle,
  CalendarCheck,
  CalendarDays,
  Crown
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

// Mock data for mentorship requests
const mockMentorshipRequests = [
  {
    id: 1,
    student: {
      name: "Sarah Johnson",
      email: "sarah.johnson@university.edu",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      major: "Computer Science",
      year: "Junior"
    },
    request: {
      subject: "Career Guidance in Software Engineering",
      message: "I'm looking for guidance on transitioning from academia to industry. Would love to discuss career paths, interview preparation, and skill development.",
      skills: ["React", "Node.js", "System Design"],
      urgency: "medium",
      preferredTime: "Weekdays after 6 PM",
      duration: "30 minutes"
    },
    status: "pending",
    createdAt: "2024-02-10T10:30:00Z",
    requestType: "career"
  },
  {
    id: 2,
    student: {
      name: "Michael Chen",
      email: "michael.chen@university.edu",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      major: "Data Science",
      year: "Senior"
    },
    request: {
      subject: "Project Portfolio Review",
      message: "I've been working on a machine learning project and would appreciate feedback on my portfolio and suggestions for improvement.",
      skills: ["Python", "Machine Learning", "Data Analysis"],
      urgency: "low",
      preferredTime: "Weekends",
      duration: "45 minutes"
    },
    status: "pending",
    createdAt: "2024-02-09T14:20:00Z",
    requestType: "portfolio"
  },
  {
    id: 3,
    student: {
      name: "Emily Rodriguez",
      email: "emily.rodriguez@university.edu",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      major: "Business Administration",
      year: "Sophomore"
    },
    request: {
      subject: "Networking and Industry Connections",
      message: "I'm interested in learning about networking strategies and building professional relationships in the tech industry.",
      skills: ["Networking", "Communication", "Leadership"],
      urgency: "high",
      preferredTime: "Any time",
      duration: "60 minutes"
    },
    status: "accepted",
    createdAt: "2024-02-08T09:15:00Z",
    requestType: "networking"
  }
];

// Mock data for mentorship history
const mockMentorshipHistory = [
  {
    id: 1,
    student: {
      name: "David Kim",
      email: "david.kim@university.edu",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      major: "Computer Science"
    },
    session: {
      date: "2024-02-05",
      duration: "45 minutes",
      type: "Video Call",
      topic: "Interview Preparation",
      notes: "Discussed behavioral questions and technical interview strategies"
    },
    feedback: {
      rating: 5,
      comment: "Extremely helpful session! Got great insights on interview preparation.",
      tags: ["helpful", "knowledgeable", "patient"]
    },
    status: "completed"
  },
  {
    id: 2,
    student: {
      name: "Lisa Wang",
      email: "lisa.wang@university.edu",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      major: "Data Science"
    },
    session: {
      date: "2024-01-28",
      duration: "30 minutes",
      type: "Phone Call",
      topic: "Career Transition",
      notes: "Explored different career paths in data science"
    },
    feedback: {
      rating: 4,
      comment: "Very informative session about career opportunities.",
      tags: ["informative", "supportive"]
    },
    status: "completed"
  }
];

const MentorshipDashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useUser();
  const [activeTab, setActiveTab] = useState("inbox");
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [showChatDialog, setShowChatDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/adminlogin");
    }
  }, [isAuthenticated, navigate]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading mentorship dashboard...</p>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    navigate("/roleselect");
  };

  const handleAcceptRequest = (requestId: number) => {
    // TODO: Implement API call to accept request
    toast({
      title: "Request accepted!",
      description: "The mentorship request has been accepted.",
    });
  };

  const handleDeclineRequest = (requestId: number) => {
    // TODO: Implement API call to decline request
    toast({
      title: "Request declined",
      description: "The mentorship request has been declined.",
    });
  };

  const handleScheduleMeeting = (request: any) => {
    setSelectedRequest(request);
    setShowScheduleDialog(true);
  };

  const handleStartChat = (request: any) => {
    setSelectedRequest(request);
    setShowChatDialog(true);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-blue-100 text-blue-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'declined': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredRequests = mockMentorshipRequests.filter(request => {
    const matchesSearch = request.student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.request.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || request.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    totalRequests: mockMentorshipRequests.length,
    pendingRequests: mockMentorshipRequests.filter(r => r.status === 'pending').length,
    completedSessions: mockMentorshipHistory.length,
    averageRating: mockMentorshipHistory.reduce((acc, session) => acc + session.feedback.rating, 0) / mockMentorshipHistory.length
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
                  <Users className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">Mentorship Dashboard</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate("/admin-dashboard")}
                className="flex items-center gap-2"
              >
                <Crown className="w-4 h-4" />
                <span className="hidden sm:inline">Admin</span>
              </Button>
              
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
                  {stats.pendingRequests}
                </Badge>
              </Button>
              
              <div className="flex items-center space-x-2">
                <button onClick={() => navigate("/profile")} className="focus:outline-none">
                  <Avatar className="w-8 h-8 cursor-pointer ring-2 ring-orange-400 hover:ring-pink-400 transition-all">
                    <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" />
                    <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                </button>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">Mentor</p>
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
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user.name}! 👨‍🏫</h2>
          <p className="text-gray-600">Manage your mentorship requests and track your impact on students.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
              <Mail className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalRequests}</div>
              <p className="text-xs text-blue-100">+3 this week</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
              <Clock className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingRequests}</div>
              <p className="text-xs text-yellow-100">Awaiting response</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Sessions</CardTitle>
              <CheckCircle className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completedSessions}</div>
              <p className="text-xs text-green-100">This semester</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Star className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageRating.toFixed(1)}</div>
              <p className="text-xs text-purple-100">Out of 5 stars</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-white shadow-sm">
            <TabsTrigger value="inbox" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Requests Inbox
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Mentorship History
            </TabsTrigger>
          </TabsList>

          {/* Requests Inbox Tab */}
          <TabsContent value="inbox" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Mentorship Requests</h3>
              <div className="flex gap-2">
                <Input
                  placeholder="Search requests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64"
                />
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Requests</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="accepted">Accepted</SelectItem>
                    <SelectItem value="declined">Declined</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              {filteredRequests.map((request) => (
                <Card key={request.id} className="overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={request.student.avatar} />
                          <AvatarFallback>{request.student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{request.student.name}</CardTitle>
                          <CardDescription>
                            {request.student.major} • {request.student.year} • {request.student.email}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getUrgencyColor(request.request.urgency)}>
                          {request.request.urgency} priority
                        </Badge>
                        <Badge className={getStatusColor(request.status)}>
                          {request.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900">{request.request.subject}</h4>
                        <p className="text-gray-600 mt-1">{request.request.message}</p>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {request.request.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{request.request.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{request.request.preferredTime}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CalendarDays className="w-4 h-4" />
                          <span>{new Date(request.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      {request.status === 'pending' && (
                        <div className="flex gap-2 pt-2">
                          <Button 
                            onClick={() => handleAcceptRequest(request.id)}
                            className="flex items-center gap-2"
                          >
                            <Check className="w-4 h-4" />
                            Accept
                          </Button>
                          <Button 
                            variant="outline"
                            onClick={() => handleDeclineRequest(request.id)}
                            className="flex items-center gap-2"
                          >
                            <X className="w-4 h-4" />
                            Decline
                          </Button>
                        </div>
                      )}

                      {request.status === 'accepted' && (
                        <div className="flex gap-2 pt-2">
                          <Button 
                            onClick={() => handleScheduleMeeting(request)}
                            className="flex items-center gap-2"
                          >
                            <CalendarCheck className="w-4 h-4" />
                            Schedule Meeting
                          </Button>
                          <Button 
                            variant="outline"
                            onClick={() => handleStartChat(request)}
                            className="flex items-center gap-2"
                          >
                            <MessageCircle className="w-4 h-4" />
                            Start Chat
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Mentorship History Tab */}
          <TabsContent value="history" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Mentorship History</h3>
              <Select defaultValue="all">
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="semester">This Semester</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {mockMentorshipHistory.map((session) => (
                <Card key={session.id} className="overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={session.student.avatar} />
                          <AvatarFallback>{session.student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{session.student.name}</CardTitle>
                          <CardDescription>
                            {session.student.major} • {session.student.email}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {[...Array(session.feedback.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          {session.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{session.session.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{session.session.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {session.session.type === 'Video Call' ? (
                            <Video className="w-4 h-4" />
                          ) : (
                            <Phone className="w-4 h-4" />
                          )}
                          <span>{session.session.type}</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900">Topic: {session.session.topic}</h4>
                        <p className="text-gray-600 mt-1">{session.session.notes}</p>
                      </div>

                      {session.feedback && (
                        <div className="border-t pt-4">
                          <h5 className="font-semibold text-gray-900 mb-2">Student Feedback</h5>
                          <p className="text-gray-600 mb-2">"{session.feedback.comment}"</p>
                          <div className="flex flex-wrap gap-1">
                            {session.feedback.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Schedule Meeting Dialog */}
      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Schedule Meeting with {selectedRequest?.student.name}</DialogTitle>
            <DialogDescription>
              Choose your preferred scheduling method for the mentorship session.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button className="flex items-center gap-2 p-6 h-auto">
                <CalendarCheck className="w-6 h-6" />
                <div className="text-left">
                  <div className="font-semibold">Calendly Link</div>
                  <div className="text-sm text-gray-600">Send scheduling link</div>
                </div>
              </Button>
              <Button variant="outline" className="flex items-center gap-2 p-6 h-auto">
                <Video className="w-6 h-6" />
                <div className="text-left">
                  <div className="font-semibold">Video Call</div>
                  <div className="text-sm text-gray-600">Schedule Zoom/Meet</div>
                </div>
              </Button>
            </div>
            <div className="text-sm text-gray-600">
              <p><strong>Student Request:</strong> {selectedRequest?.request.subject}</p>
              <p><strong>Duration:</strong> {selectedRequest?.request.duration}</p>
              <p><strong>Preferred Time:</strong> {selectedRequest?.request.preferredTime}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Start Chat Dialog */}
      <Dialog open={showChatDialog} onOpenChange={setShowChatDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Start Chat with {selectedRequest?.student.name}</DialogTitle>
            <DialogDescription>
              Choose your preferred communication method.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button className="flex items-center gap-2 p-6 h-auto">
                <MessageCircle className="w-6 h-6" />
                <div className="text-left">
                  <div className="font-semibold">In-App Chat</div>
                  <div className="text-sm text-gray-600">Use platform chat</div>
                </div>
              </Button>
              <Button variant="outline" className="flex items-center gap-2 p-6 h-auto">
                <Mail className="w-6 h-6" />
                <div className="text-left">
                  <div className="font-semibold">Email</div>
                  <div className="text-sm text-gray-600">Send email</div>
                </div>
              </Button>
            </div>
            <div className="text-sm text-gray-600">
              <p><strong>Student Email:</strong> {selectedRequest?.student.email}</p>
              <p><strong>Topic:</strong> {selectedRequest?.request.subject}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MentorshipDashboard; 