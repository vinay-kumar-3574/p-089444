import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { 
  Bell, 
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
  Star,
  BarChart3,
  Activity,
  Mail,
  Shield,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  ChevronDown,
  Clock,
  MapPin,
  Tag,
  Image as ImageIcon,
  Link,
  Send,
  CheckCircle,
  XCircle,
  AlertCircle,
  UserCheck,
  UserX,
  Crown,
  GraduationCap,
  Building,
  MailCheck,
  CalendarDays,
  PieChart,
  LineChart,
  BellRing,
  Settings2,
  Database,
  Zap
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
import EventForm from "@/components/EventForm";
import NotificationForm from "@/components/NotificationForm";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useUser();
  const [activeTab, setActiveTab] = useState("overview");
  const [showEventForm, setShowEventForm] = useState(false);
  const [showNotificationForm, setShowNotificationForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [userFilter, setUserFilter] = useState("all");
  const [alumniRequests, setAlumniRequests] = useState([]);
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalAlumni: 0,
    totalEvents: 0,
    totalAttendance: 0,
    recentActivity: []
  });

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/adminlogin");
    } else if (user && user.role !== "admin") {
      // Redirect non-admin users to their appropriate dashboard
      toast({
        title: "Access denied",
        description: "You don't have permission to access the admin dashboard.",
        variant: "destructive",
      });
      navigate("/dashboard");
    }
  }, [isAuthenticated, user, navigate]);

  // Fetch events from backend
  const fetchEvents = async () => {
    const response = await fetch("http://localhost:3001/api/events");
    const data = await response.json();
    setEvents(data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your admin account.",
    });
    logout();
    navigate("/roleselect");
  };

  const handleCreateEvent = (eventData: any) => {
    // Event creation is now handled in the EventForm component
    // This function is called after successful API submission
    setShowEventForm(false);
    // You can add additional logic here if needed, like refreshing the events list
  };

  // Add new event to backend
  const handleAdminEventRequest = async (eventData) => {
    try {
      // POST to backend
      const response = await fetch("http://localhost:3001/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });
      if (!response.ok) throw new Error("Failed to add event");
      await fetchEvents(); // Refresh events list
      toast({
        title: "Event added!",
        description: "Your event has been added and will be visible to users.",
      });
      setShowEventForm(false);
    } catch (error) {
      toast({
        title: "Error adding event",
        description: "There was an error adding your event. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSendNotification = (notificationData: any) => {
    // TODO: Implement notification API call
    toast({
      title: "Notification sent!",
      description: "The notification has been sent to selected users.",
    });
    setShowNotificationForm(false);
  };

  const handleVerifyUser = (userId: number) => {
    // TODO: Implement user verification API call
    toast({
      title: "User verified!",
      description: "The user has been successfully verified.",
    });
  };

  const handleChangeUserRole = (userId: number, newRole: string) => {
    // TODO: Implement role change API call
    toast({
      title: "Role updated!",
      description: `User role has been changed to ${newRole}.`,
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
                  <Crown className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">CampusConnect AI - Admin</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate("/mentorship-dashboard")}
                className="flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Mentorship</span>
              </Button>
              
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
                  3
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
                  <p className="text-xs text-gray-500">{user.major || "Administrator"}</p>
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
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user.name}! 👑</h2>
          <p className="text-gray-600">Manage your campus community and drive engagement.</p>
        </div>

        {/* Main Dashboard */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white shadow-sm">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Events
            </TabsTrigger>
            <TabsTrigger value="alumni-requests" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Alumni Requests
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Users
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                  <GraduationCap className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalStudents.toLocaleString()}</div>
                  <p className="text-xs text-blue-100">+12% from last month</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Alumni</CardTitle>
                  <Building className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalAlumni.toLocaleString()}</div>
                  <p className="text-xs text-green-100">+8% from last month</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Events</CardTitle>
                  <Calendar className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalEvents}</div>
                  <p className="text-xs text-purple-100">+5 new this month</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Attendance</CardTitle>
                  <Users className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalAttendance.toLocaleString()}</div>
                  <p className="text-xs text-orange-100">+15% from last month</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Access Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/mentorship-dashboard")}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    Mentorship Dashboard
                  </CardTitle>
                  <CardDescription>Manage mentorship requests and track your impact</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Pending Requests:</span>
                      <span className="font-semibold text-blue-600">3</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Completed Sessions:</span>
                      <span className="font-semibold text-green-600">12</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Average Rating:</span>
                      <span className="font-semibold text-yellow-600">4.8/5</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    View Dashboard
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-green-600" />
                    Event Analytics
                  </CardTitle>
                  <CardDescription>Detailed insights into event performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>This Month:</span>
                      <span className="font-semibold text-green-600">8 events</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Total Attendance:</span>
                      <span className="font-semibold text-green-600">1,234</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Satisfaction:</span>
                      <span className="font-semibold text-yellow-600">92%</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    View Analytics
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-purple-600" />
                    User Management
                  </CardTitle>
                  <CardDescription>Manage students, alumni, and permissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Active Users:</span>
                      <span className="font-semibold text-purple-600">2,139</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>New This Week:</span>
                      <span className="font-semibold text-purple-600">45</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Verification Rate:</span>
                      <span className="font-semibold text-yellow-600">87%</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    Manage Users
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Charts and Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Event Attendance Graph */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="w-5 h-5" />
                    Event Attendance Trend
                  </CardTitle>
                  <CardDescription>Monthly event attendance over the last 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <div className="text-center text-gray-500">
                      <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                      <p>Chart visualization will be implemented here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>Latest platform activities and updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stats.recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {activity.user}
                          </p>
                          <p className="text-sm text-gray-600">
                            {activity.action}
                          </p>
                          <p className="text-xs text-gray-400">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Event Management</h3>
              <Dialog open={showEventForm} onOpenChange={setShowEventForm}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Create Event
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create New Event</DialogTitle>
                    <DialogDescription>
                      Fill in the details to create a new campus event.
                    </DialogDescription>
                  </DialogHeader>
                  <EventForm onComplete={handleCreateEvent} onCancel={() => setShowEventForm(false)} />
                </DialogContent>
              </Dialog>
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.length === 0 ? (
                <Card className="col-span-full p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Events Yet</h3>
                  <p className="text-gray-600 mb-4">Events will appear here once they are created and approved.</p>
                </Card>
              ) : (
                events.map((event) => (
                  <Card key={event._id} className="overflow-hidden">
                    <div className="relative">
                      <img 
                        src={event.image} 
                        alt={event.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant={event.status === 'upcoming' ? 'default' : 'secondary'}>
                          {event.status}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{event.description}</CardDescription>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {event.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {event.date} at {event.time}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {event.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          {event.registeredSeats}/{event.maxSeats} registered
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <div className="flex gap-1">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Alumni Requests Tab */}
          <TabsContent value="alumni-requests" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Alumni Event Requests</h3>
              <Dialog open={showEventForm} onOpenChange={setShowEventForm}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Request Event from Alumni
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Request Event from Alumni</DialogTitle>
                    <DialogDescription>
                      Send a request to alumni to create and host an event for students.
                    </DialogDescription>
                  </DialogHeader>
                  <EventForm onComplete={handleAdminEventRequest} onCancel={() => setShowEventForm(false)} />
                </DialogContent>
              </Dialog>
            </div>

            {/* Alumni Requests Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{alumniRequests.filter(r => r.status === 'pending').length}</div>
                  <p className="text-xs text-muted-foreground">Awaiting alumni response</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Accepted</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{alumniRequests.filter(r => r.status === 'accepted').length}</div>
                  <p className="text-xs text-muted-foreground">Events created</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Declined</CardTitle>
                  <XCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{alumniRequests.filter(r => r.status === 'declined').length}</div>
                  <p className="text-xs text-muted-foreground">Requests declined</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {alumniRequests.length > 0 
                      ? Math.round((alumniRequests.filter(r => r.status === 'accepted').length / alumniRequests.length) * 100)
                      : 0}%
                  </div>
                  <p className="text-xs text-muted-foreground">Acceptance rate</p>
                </CardContent>
              </Card>
            </div>

            {/* Alumni Requests List */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Alumni Requests</CardTitle>
                <CardDescription>
                  Track requests sent to alumni for event creation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alumniRequests.length === 0 ? (
                    <Card className="p-8 text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Mail className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No Alumni Requests Yet</h3>
                      <p className="text-gray-600 mb-4">When you send event requests to alumni, they will appear here for tracking.</p>
                      <Button onClick={() => setShowEventForm(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Send First Request
                      </Button>
                    </Card>
                  ) : (
                    alumniRequests.map((request) => (
                      <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src={request.alumni.avatar} />
                            <AvatarFallback>{request.alumni.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{request.alumni.name}</p>
                            <p className="text-sm text-gray-500">{request.alumni.email}</p>
                            <p className="text-sm text-gray-600">{request.eventTitle}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={request.status === 'pending' ? 'secondary' : request.status === 'accepted' ? 'default' : 'destructive'}>
                            {request.status}
                          </Badge>
                          <span className="text-sm text-gray-500">{request.requestedDate}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Notification Center</h3>
              <Dialog open={showNotificationForm} onOpenChange={setShowNotificationForm}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Send Notification
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Send Notification</DialogTitle>
                    <DialogDescription>
                      Create and send personalized notifications to your community.
                    </DialogDescription>
                  </DialogHeader>
                  <NotificationForm onComplete={handleSendNotification} events={events} onCancel={() => setShowNotificationForm(false)} />
                </DialogContent>
              </Dialog>
            </div>

            {/* Notification Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sent Today</CardTitle>
                  <Mail className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">+2 from yesterday</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Open Rate</CardTitle>
                  <MailCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">89%</div>
                  <p className="text-xs text-muted-foreground">+5% from last week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground">Next: Tech Career Fair</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">User Management</h3>
              <div className="flex gap-2">
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64"
                />
                <Select value={userFilter} onValueChange={setUserFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="students">Students</SelectItem>
                    <SelectItem value="alumni">Alumni</SelectItem>
                    <SelectItem value="verified">Verified Alumni</SelectItem>
                    <SelectItem value="unverified">Unverified Alumni</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Users Table */}
            <Card>
              <CardHeader>
                <CardTitle>Community Members</CardTitle>
                <CardDescription>
                  Manage students and alumni accounts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.length === 0 ? (
                    <Card className="p-8 text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No Users Yet</h3>
                      <p className="text-gray-600 mb-4">User data will appear here once students and alumni register.</p>
                    </Card>
                  ) : (
                    users.map((mockUser) => (
                      <div key={mockUser.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src={mockUser.avatar} />
                            <AvatarFallback>{mockUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{mockUser.name}</p>
                            <p className="text-sm text-gray-500">{mockUser.email}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant={mockUser.role === 'alumni' ? 'default' : 'secondary'}>
                                {mockUser.role === 'alumni' ? 'Alumni' : 'Student'}
                              </Badge>
                              {mockUser.role === 'alumni' && (
                                <Badge variant={mockUser.status === 'verified' ? 'default' : 'outline'}>
                                  {mockUser.status === 'verified' ? 'Verified' : 'Unverified'}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {mockUser.role === 'alumni' && mockUser.status !== 'verified' && (
                            <Button size="sm" onClick={() => handleVerifyUser(mockUser.id)}>
                              <UserCheck className="w-4 h-4 mr-1" />
                              Verify
                            </Button>
                          )}
                          <Select onValueChange={(value) => handleChangeUserRole(mockUser.id, value)}>
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="student">Student</SelectItem>
                              <SelectItem value="alumni">Alumni</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button variant="outline" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard; 