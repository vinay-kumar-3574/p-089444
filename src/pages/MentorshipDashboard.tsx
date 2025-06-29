import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { useToast } from "@/hooks/use-toast";
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
  Crown,
  MapPin
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

const MentorshipDashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useUser();
  const [activeTab, setActiveTab] = useState("event-requests");
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [showChatDialog, setShowChatDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [eventRequests, setEventRequests] = useState([]);
  const [mentorshipRequests, setMentorshipRequests] = useState([]);
  const [mentorshipHistory, setMentorshipHistory] = useState([]);

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

  const handleAcceptEventRequest = (requestId: number) => {
    // TODO: Implement API call to accept event request
    setEventRequests(prev => prev.map(req => 
      req.id === requestId ? { ...req, status: 'accepted' } : req
    ));
    toast({
      title: "Event request accepted!",
      description: "The event has been created and students will be notified.",
    });
  };

  const handleDeclineEventRequest = (requestId: number) => {
    // TODO: Implement API call to decline event request
    setEventRequests(prev => prev.map(req => 
      req.id === requestId ? { ...req, status: 'declined' } : req
    ));
    toast({
      title: "Event request declined",
      description: "The event request has been declined.",
    });
  };

  // Function to add new event request (called when admin sends request)
  const addNewEventRequest = (newRequest: any) => {
    setEventRequests(prev => [newRequest, ...prev]);
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

  const filteredRequests = mentorshipRequests.filter(request => {
    const matchesSearch = request.student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.request.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || request.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    totalRequests: mentorshipRequests.length,
    pendingRequests: mentorshipRequests.filter(r => r.status === 'pending').length,
    completedSessions: mentorshipHistory.length,
    averageRating: mentorshipHistory.length > 0 
      ? mentorshipHistory.reduce((acc, session) => acc + session.feedback.rating, 0) / mentorshipHistory.length 
      : 0,
    pendingEventRequests: eventRequests.filter(r => r.status === 'pending').length
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
                  {stats.pendingRequests + stats.pendingEventRequests}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
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

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Event Requests</CardTitle>
              <Calendar className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingEventRequests}</div>
              <p className="text-xs text-orange-100">From admin</p>
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
            <TabsTrigger value="event-requests" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Event Requests
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Mentorship History
            </TabsTrigger>
          </TabsList>

          {/* Event Requests Tab */}
          <TabsContent value="event-requests" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Event Requests from Admin</h3>
              <div className="flex gap-2">
                <Input
                  placeholder="Search event requests..."
                  className="w-64"
                />
                <Select defaultValue="all">
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
              {eventRequests.length === 0 ? (
                <Card className="p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Event Requests Yet</h3>
                  <p className="text-gray-600 mb-4">Event requests from admin will appear here when they are sent.</p>
                </Card>
              ) : (
                eventRequests.map((request) => (
                  <Card key={request.id} className="overflow-hidden">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
                            <Crown className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{request.admin.name}</CardTitle>
                            <CardDescription>
                              {request.admin.email} • Requested on {request.requestedDate}
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(request.status)}>
                            {request.status}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 text-lg">{request.event.title}</h4>
                          <p className="text-gray-600 mt-1">{request.event.description}</p>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {request.event.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{request.event.date} at {request.event.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{request.event.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            <span>Max {request.event.maxSeats} students</span>
                          </div>
                        </div>

                        {request.status === 'pending' && (
                          <div className="flex gap-2 pt-2">
                            <Button 
                              onClick={() => handleAcceptEventRequest(request.id)}
                              className="flex items-center gap-2"
                            >
                              <Check className="w-4 h-4" />
                              Accept & Create Event
                            </Button>
                            <Button 
                              variant="outline"
                              onClick={() => handleDeclineEventRequest(request.id)}
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
                              variant="outline"
                              className="flex items-center gap-2"
                            >
                              <Calendar className="w-4 h-4" />
                              View Event Details
                            </Button>
                            <Button 
                              variant="outline"
                              className="flex items-center gap-2"
                            >
                              <Users className="w-4 h-4" />
                              View Registrations
                            </Button>
                          </div>
                        )}

                        {request.status === 'declined' && (
                          <div className="pt-2">
                            <p className="text-sm text-gray-500">This request was declined on {request.deadline}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
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
              {mentorshipHistory.length === 0 ? (
                <Card className="p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Mentorship History Yet</h3>
                  <p className="text-gray-600 mb-4">Your completed mentorship sessions will appear here.</p>
                </Card>
              ) : (
                mentorshipHistory.map((session) => (
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
                ))
              )}
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