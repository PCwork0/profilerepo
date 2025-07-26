import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaDownload } from 'react-icons/fa';

const Hero = ({ contactInfo, summary }) => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 gradient-bg"></div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          {/* Profile Image Placeholder */}
          <div className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm border-4 border-white border-opacity-30">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
              <span className="text-3xl md:text-4xl font-bold text-white">
                {contactInfo?.name?.charAt(0) || 'P'}
              </span>
            </div>
          </div>

          {/* Name and Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 animate-slide-up">
            {contactInfo?.name || 'Purna Boyapati'}
          </h1>
          
          <h2 className="text-xl md:text-2xl lg:text-3xl text-primary-100 mb-6 animate-slide-up" style={{animationDelay: '0.2s'}}>
            {contactInfo?.title || 'Principal Software Engineer'}
          </h2>

          {/* Location and Contact */}
          <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-6 mb-8 text-primary-100 animate-slide-up" style={{animationDelay: '0.4s'}}>
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-2" />
              <span>{contactInfo?.location || 'Hyderabad, India'}</span>
            </div>
            <div className="flex items-center">
              <FaPhone className="mr-2" />
              <span>{contactInfo?.phone || 'Available on request'}</span>
            </div>
          </div>

          {/* Summary */}
          <p className="text-lg md:text-xl text-primary-100 max-w-4xl mx-auto mb-10 leading-relaxed animate-slide-up" style={{animationDelay: '0.6s'}}>
            {summary}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{animationDelay: '0.8s'}}>
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-white text-primary-600 font-semibold py-4 px-8 rounded-lg hover:bg-primary-50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              Get In Touch
            </button>
            <button
              onClick={() => scrollToSection('experience')}
              className="border-2 border-white text-white font-semibold py-4 px-8 rounded-lg hover:bg-white hover:text-primary-600 transition-all duration-300 transform hover:scale-105"
            >
              View My Work
            </button>
          </div>

          {/* Languages */}
          {contactInfo?.languages && contactInfo.languages.length > 0 && (
            <div className="mt-12 animate-slide-up" style={{animationDelay: '1s'}}>
              <p className="text-primary-200 mb-4">Languages:</p>
              <div className="flex justify-center space-x-4">
                {contactInfo.languages.map((language, index) => (
                  <span 
                    key={index}
                    className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button
            onClick={() => scrollToSection('about')}
            className="text-white hover:text-primary-200 transition-colors duration-300"
          >
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;