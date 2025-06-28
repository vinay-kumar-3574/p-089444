import React from "react";
import { Github, Linkedin, Mail, Phone, MapPin, Users, Calendar, BarChart3 } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white py-16">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
             
              <span className="text-xl font-semibold">CampusConnect AI</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Empowering universities with AI-driven networking solutions that connect students and alumni meaningfully.
            </p>
            <div className="flex items-center space-x-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors p-2 bg-gray-800 rounded-lg hover:bg-gray-700"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors p-2 bg-gray-800 rounded-lg hover:bg-gray-700"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="mailto:support@campusconnect.ai" 
                className="text-gray-400 hover:text-white transition-colors p-2 bg-gray-800 rounded-lg hover:bg-gray-700"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Features Section */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Platform Features</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                <Users size={16} className="text-pulse-500" />
                <span>Smart Mentorship Matching</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                <Calendar size={16} className="text-pulse-500" />
                <span>Event Intelligence</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                <BarChart3 size={16} className="text-pulse-500" />
                <span>Analytics Dashboard</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                <Mail size={16} className="text-pulse-500" />
                <span>Automated Communications</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><a href="#" className="footer-link">Home</a></li>
              <li><a href="#about" className="footer-link">About Platform</a></li>
              <li><a href="#features" className="footer-link">Campus Events</a></li>
              <li><a href="#testimonials" className="footer-link">Alumni Network</a></li>
              <li><a href="#contact" className="footer-link">Admin Portal</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Get In Touch</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail size={16} className="text-pulse-500 mt-1" />
                <div>
                  <p className="text-gray-300">support@campusconnect.ai</p>
                  <p className="text-gray-400 text-sm">General inquiries</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={16} className="text-pulse-500 mt-1" />
                <div>
                  <p className="text-gray-300">+1 (555) 123-4567</p>
                  <p className="text-gray-400 text-sm">Support hotline</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-pulse-500 mt-1" />
                <div>
                  <p className="text-gray-300">University Campus</p>
                  <p className="text-gray-400 text-sm">Innovation Hub</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-pulse-500 mb-2">500+</div>
              <div className="text-gray-400">Active Alumni</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pulse-500 mb-2">2000+</div>
              <div className="text-gray-400">Student Connections</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pulse-500 mb-2">95%</div>
              <div className="text-gray-400">Success Rate</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              Made with ❤️  • Powered by Let's Connect AI 
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <a href="#" className="footer-link">Privacy Policy</a>
              <a href="#" className="footer-link">Terms of Service</a>
              <a href="#" className="footer-link">Cookie Policy</a>
            </div>
          </div>
          <div className="text-center mt-4 pt-4 border-t border-gray-800">
            <p className="text-gray-500 text-xs">
              © 2024 CampusConnect AI. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
