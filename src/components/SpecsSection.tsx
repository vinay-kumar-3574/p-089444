
import React from "react";
import { Users, Calendar, BarChart3, MessageSquare, Zap, Shield } from "lucide-react";

const SpecsSection = () => {
  const features = [
    {
      icon: Users,
      title: "Smart Mentorship Matching",
      description: "AI-powered algorithm connects students with the most relevant alumni based on career goals, interests, and expertise."
    },
    {
      icon: Calendar,
      title: "Intelligent Event Discovery",
      description: "Personalized event recommendations help students discover workshops, seminars, and networking opportunities."
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Comprehensive dashboards track engagement metrics, connection success rates, and platform utilization."
    },
    {
      icon: MessageSquare,
      title: "Seamless Communication",
      description: "Built-in messaging system facilitates meaningful conversations between students and alumni."
    },
    {
      icon: Zap,
      title: "Automated Workflows",
      description: "Smart automation handles event notifications, follow-ups, and administrative tasks efficiently."
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Enterprise-grade security ensures all interactions and data remain protected and confidential."
    }
  ];

  return (
    <section className="w-full py-16 sm:py-24 bg-white" id="about">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 sm:mb-16">
          <div className="flex items-center gap-4">
            <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-orange-100 text-orange-700">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-orange-500 text-white mr-2">2</span>
              <span>About</span>
            </div>
          </div>
          <div className="flex-1 h-[1px] bg-gray-300"></div>
        </div>
        
        {/* Main content */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display leading-tight mb-8">
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-600">
                Why CampusConnect AI?
              </span>
            </h2>
            <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              CampusConnect AI bridges the gap between students and alumni through intelligent mentorship matching, 
              AI-recommended campus events, and admin dashboards that track engagement in real time.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-2xl shadow-elegant hover:shadow-elegant-hover transition-all duration-300 border border-gray-100"
              >
                <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-8 sm:p-12 text-white">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl sm:text-5xl font-bold mb-2">500+</div>
                <div className="text-orange-100">Active Alumni</div>
              </div>
              <div>
                <div className="text-4xl sm:text-5xl font-bold mb-2">2000+</div>
                <div className="text-orange-100">Student Connections</div>
              </div>
              <div>
                <div className="text-4xl sm:text-5xl font-bold mb-2">95%</div>
                <div className="text-orange-100">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecsSection;
