import React, { useState } from "react";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const UserLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNameInput, setShowNameInput] = useState(false);
  const [userName, setUserName] = useState("");
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

  const handleNameSubmit = () => {
    if (userName.trim()) {
      const userProfile = {
        email: form.email,
        name: userName.trim(),
        year: "2024", // Default values
        major: "Computer Science",
      };
      
      login(userProfile);
      alert("Welcome! Your profile has been created.");
      navigate("/dashboard");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://n8n-ssznitez.us-east-1.clawcloudrun.com/webhook/student-login", {
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

      console.log("API Response:", data); // Debug log

      if (data.success || data.status === "success" || response.ok) {
        console.log("Login successful, navigating to dashboard..."); // Debug log
        
        // Extract user data from different possible response structures
        const userData = data.user || data.userData || data.profile || data;
        console.log("User data from API:", userData); // Debug log
        
        // Check if we have a proper name from the API
        const apiName = userData?.name || userData?.fullName || userData?.username || data.name;
        
        if (!apiName || apiName === "Student") {
          // If no name from API, show name input
          setShowNameInput(true);
          setLoading(false);
          return;
        }
        
        // Save user profile data with better fallbacks
        const userProfile = {
          email: form.email,
          name: apiName,
          year: userData?.year || userData?.academicYear || data.year || "2024",
          major: userData?.major || userData?.course || data.major || "Computer Science",
        };
        
        console.log("Extracted user profile:", userProfile); // Debug log
        
        login(userProfile); // Save to context and localStorage
        alert(data.message); // or use toast
        navigate("/dashboard"); // redirect to dashboard route
      } else {
        console.log("Login failed:", data.message); // Debug log
        alert(data.message);
        setLoading(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white px-4">
      <div className="relative w-full max-w-md flex flex-col items-center animate-fade-in">
        {/* Blurred background shadow */}
        <div className="absolute -inset-4 sm:-inset-6 rounded-3xl bg-orange-400/10 blur-2xl z-0" />
        <div className="relative w-full bg-white rounded-3xl shadow-2xl p-8 sm:p-12 flex flex-col items-center border border-orange-100 z-10">
          <h1 className="text-3xl sm:text-4xl font-playfair font-bold text-orange-600 mb-2 drop-shadow-lg">User Login</h1>
          <p className="text-gray-500 mb-8 text-center">Sign in to your CampusConnect AI account</p>
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
                placeholder="you@university.edu"
              />
            </div>
            
            {showNameInput && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800 bg-orange-50 transition-all duration-300 placeholder-gray-400 shadow-sm"
                  placeholder="Enter your full name"
                />
              </div>
            )}
            
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
              type={showNameInput ? "button" : "submit"}
              disabled={loading || (showNameInput && !userName.trim())}
              onClick={showNameInput ? handleNameSubmit : undefined}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 text-lg group mt-2 transform hover:scale-105 active:scale-100"
            >
              {loading ? "Logging in..." : showNameInput ? "Complete Profile" : "Login"}
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
          
          {/* Debug button - remove in production */}
          <button
            type="button"
            onClick={() => {
              localStorage.removeItem('userProfile');
              alert('User data cleared. You can test the login flow again.');
            }}
            className="w-full mt-4 text-xs text-gray-500 hover:text-red-500"
          >
            Clear stored user data (Debug)
          </button>
        </div>
      </div>
    </section>
  );
};

export default UserLogin; 