import React from 'react';
import { FaLinkedin, FaGithub, FaTwitter, FaHeart, FaArrowUp } from 'react-icons/fa';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Purna Boyapati</h3>
            <p className="text-gray-300 leading-relaxed">
              Principal Software Engineer with 18+ years of experience in full-stack development, 
              cloud technologies, and modern software architecture. Passionate about building 
              scalable solutions and leading development teams.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <button
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-gray-300 hover:text-primary-400 transition-colors duration-300"
              >
                About Me
              </button>
              <button
                onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-gray-300 hover:text-primary-400 transition-colors duration-300"
              >
                Experience
              </button>
              <button
                onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-gray-300 hover:text-primary-400 transition-colors duration-300"
              >
                Skills
              </button>
              <button
                onClick={() => document.getElementById('education')?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-gray-300 hover:text-primary-400 transition-colors duration-300"
              >
                Education
              </button>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-gray-300 hover:text-primary-400 transition-colors duration-300"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Contact Info & Social */}
          <div>
            <h3 className="text-xl font-bold mb-4">Connect</h3>
            <div className="space-y-3">
              <div className="text-gray-300">
                <div className="font-medium">Location</div>
                <div className="text-sm">Hyderabad, Telangana, India</div>
              </div>
              <div className="text-gray-300">
                <div className="font-medium">Phone</div>
                <div className="text-sm">9160278155 (Home)</div>
              </div>
              
              {/* Social Links */}
              <div className="pt-4">
                <div className="flex space-x-4">
                  <a
                    href="https://linkedin.com/in/purnaboyapati"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors duration-300"
                  >
                    <FaLinkedin />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors duration-300"
                  >
                    <FaGithub />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors duration-300"
                  >
                    <FaTwitter />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Copyright */}
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-gray-300 text-sm">
                © {currentYear} Purna Boyapati. All rights reserved.
              </p>
              <p className="text-gray-400 text-xs mt-1">
                Made with <FaHeart className="inline text-red-500 mx-1" /> and modern web technologies
              </p>
            </div>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="flex items-center text-gray-300 hover:text-primary-400 transition-colors duration-300 group"
            >
              <span className="mr-2 text-sm">Back to top</span>
              <FaArrowUp className="group-hover:transform group-hover:-translate-y-1 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 pt-6 border-t border-gray-800 text-center">
          <div className="text-gray-400 text-sm">
            <p className="mb-2">
              This portfolio showcases 18+ years of software engineering experience
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs">
              <span>✨ Full Stack Development</span>
              <span>☁️ Cloud Architecture</span>
              <span>🚀 Microservices</span>
              <span>⚡ Serverless Computing</span>
              <span>🔒 Security Best Practices</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;