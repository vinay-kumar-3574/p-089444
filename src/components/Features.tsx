
import React from "react";
import { GraduationCap, Calendar, TrendingUp } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: GraduationCap,
      title: "Mentorship Discovery",
      description: "AI-powered matching connects students with the perfect alumni mentors based on career goals, interests, and academic background."
    },
    {
      icon: Calendar,
      title: "Event Notifications",
      description: "Never miss important campus events. Get personalized recommendations and automated reminders for networking opportunities."
    },
    {
      icon: TrendingUp,
      title: "Engagement Analytics",
      description: "Real-time admin dashboards track networking success, event attendance, and platform engagement metrics."
    }
  ];

  return (
    <section className="py-12 bg-gray-50" id="features">
      <div className="section-container opacity-0 animate-on-scroll">
        <div className="flex items-center gap-4 mb-6">
          <div className="pulse-chip">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">3</span>
            <span>Features</span>
          </div>
        </div>
        
        <h2 className="text-5xl font-display font-bold mb-12 text-left">Platform Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card bg-white hover:shadow-elegant-hover"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 bg-pulse-100 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-pulse-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
