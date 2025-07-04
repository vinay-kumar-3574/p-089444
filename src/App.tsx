import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RoleSelect from "./pages/RoleSelect";
import UserLogin from "./pages/UserLogin";
import AdminLogin from "./pages/AdminLogin";
import AlumniLogin from "./pages/AlumniLogin";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import MentorshipDashboard from "./pages/MentorshipDashboard";
import ProfileSection from "./pages/ProfileSection";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/roleselect" element={<RoleSelect />} />
            <Route path="/userlogin" element={<UserLogin />} />
            <Route path="/adminlogin" element={<AdminLogin />} />
            <Route path="/alumnilogin" element={<AlumniLogin />} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/mentorship-dashboard" element={<MentorshipDashboard />} />
            <Route path="/profile" element={<ProfileSection />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
