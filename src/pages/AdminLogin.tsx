import React, { useState } from "react";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { toast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useUser();

  // Helper function to extract name from email
  const extractNameFromEmail = (email: string) => {
    const emailPart = email.split('@')[0];
    // Convert email part to title case (e.g., "john.doe" -> "John Doe")
    return emailPart
      .replace(/[._-]/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://n8n-ssznitez.us-east-1.clawcloudrun.com/webhook/admin-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();

      console.log("Admin API Response:", data); // Debug log

      if (data.success || data.status === "success" || response.ok) {
        console.log("Admin login successful, navigating to dashboard..."); // Debug log
        
        // Extract admin data from different possible response structures
        const adminData = data.user || data.userData || data.profile || data;
        console.log("Admin data from API:", adminData); // Debug log
        
        // Check if we have a proper name from the API
        const apiName = adminData?.name || adminData?.fullName || adminData?.username || data.name;
        
        // Save admin profile data with better fallbacks
        const adminProfile = {
          email: form.email,
          name: apiName || extractNameFromEmail(form.email),
          year: "Admin",
          major: "Administration",
          role: "admin"
        };
        
        console.log("Extracted admin profile:", adminProfile); // Debug log
        
        login(adminProfile); // Save to context and localStorage
        toast({
          title: "Admin login successful!",
          description: "Welcome to the admin dashboard.",
        });
        navigate("/admin-dashboard"); // Navigate to admin dashboard
      } else {
        console.log("Admin login failed:", data.message); // Debug log
        toast({
          title: "Login failed",
          description: data.message || "Invalid credentials. Please try again.",
          variant: "destructive",
        });
        setLoading(false);
      }
    } catch (error) {
      console.error("Admin login error:", error);
      toast({
        title: "Login error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white px-4">
      <div className="relative w-full max-w-md flex flex-col items-center animate-fade-in">
        {/* Blurred background shadow */}
        <div className="absolute -inset-4 sm:-inset-6 rounded-3xl bg-orange-400/10 blur-2xl z-0" />
        <div className="relative w-full bg-white rounded-3xl shadow-2xl p-8 sm:p-12 flex flex-col items-center border border-orange-100 z-10">
          <h1 className="text-3xl sm:text-4xl font-playfair font-bold text-orange-600 mb-2 drop-shadow-lg">Admin Login</h1>
          <p className="text-gray-500 mb-8 text-center">Sign in to your CampusConnect AI admin account</p>
          <form className="w-full space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800 bg-orange-50 transition-all duration-300 placeholder-gray-400 shadow-sm"
                placeholder="admin@university.edu"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative flex items-center">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800 bg-orange-50 transition-all duration-300 placeholder-gray-400 shadow-sm pr-12 mb-2"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500 focus:outline-none"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <a href="#" className="mt-2 inline-block text-orange-500 text-sm font-medium hover:text-orange-600 transition-colors duration-300">Forgot password?</a>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 text-lg group mt-2 transform hover:scale-105 active:scale-100"
            >
              {loading ? "Logging in..." : "Login"}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </form>
          <div className="my-6 w-full flex items-center">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="mx-4 text-gray-400 text-sm">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <button
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 hover:border-orange-400 text-gray-700 font-semibold py-3 px-6 rounded-full transition-all duration-300 shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 text-base group hover:bg-orange-50"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6" />
            Continue with Google
          </button>
        </div>
      </div>
    </section>
  );
};

export default AdminLogin; 