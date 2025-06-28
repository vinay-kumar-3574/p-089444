
import React from "react";
import { Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-white py-8">
      <div className="section-container">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-600 hover:text-pulse-500 transition-colors"
            >
              <Github size={24} />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-600 hover:text-pulse-500 transition-colors"
            >
              <Linkedin size={24} />
            </a>
          </div>
          <p className="text-center text-gray-600 text-sm">
            Made with ❤️ at [Your University] • Powered by AI + n8n
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
