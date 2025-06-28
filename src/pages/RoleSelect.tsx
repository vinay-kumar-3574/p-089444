import React from "react";
import { User, Shield, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const roles = [
  {
    label: "Admin",
    icon: <Shield className="w-8 h-8 text-orange-500 mb-2" />,
    value: "admin",
  },
  {
    label: "Alumni",
    icon: <GraduationCap className="w-8 h-8 text-orange-500 mb-2" />,
    value: "alumni",
  },
  {
    label: "User",
    icon: <User className="w-8 h-8 text-orange-500 mb-2" />,
    value: "user",
  },
];

const RoleSelect = () => {
  const navigate = useNavigate();
  const handleSelect = (role: string) => {
    if (role === "user") {
      navigate("/userlogin");
    } else if (role === "alumni") {
      navigate("/alumnilogin");
    } else if (role === "admin") {
      navigate("/adminlogin");
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-white px-4">
      <div className="max-w-xl w-full text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-playfair font-bold mb-4 text-orange-600">Choose Your Role</h1>
        <p className="text-lg text-gray-600 mb-8">Select how you want to connect with Let's Connect AI. Please choose your role to continue.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-2xl">
        {roles.map((role) => (
          <button
            key={role.value}
            onClick={() => handleSelect(role.value)}
            className="group flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-200 hover:border-orange-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
          >
            {role.icon}
            <span className="text-xl font-semibold text-gray-800 group-hover:text-orange-500 mb-2 transition-colors duration-300">{role.label}</span>
          </button>
        ))}
      </div>
      

    </section>
  );
};

export default RoleSelect; 