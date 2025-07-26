import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaDownload, FaFileAlt } from 'react-icons/fa';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

const Contact = ({ contactInfo }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await axios.post(`${API_BASE_URL}/api/contact`, {
        ...formData,
        timestamp: new Date().toISOString()
      });
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const downloadJsonResume = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/resume/json`);
      const jsonData = JSON.stringify(response.data, null, 2);
      
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'purna-boyapati-resume.json';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading JSON resume:', error);
      alert('Failed to download resume. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Let's discuss how we can work together to bring your next project to life
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center mr-4">
                    <FaEnvelope className="text-white" />
                  </div>
                  <div>
                    <div className="text-gray-300 text-sm">Email</div>
                    <div className="text-white font-medium">Available upon request</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center mr-4">
                    <FaPhone className="text-white" />
                  </div>
                  <div>
                    <div className="text-gray-300 text-sm">Phone</div>
                    <div className="text-white font-medium">{contactInfo?.phone}</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center mr-4 mt-1">
                    <FaMapMarkerAlt className="text-white" />
                  </div>
                  <div>
                    <div className="text-gray-300 text-sm">Address</div>
                    <div className="text-white font-medium">
                      {contactInfo?.address}<br />
                      {contactInfo?.location}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center mr-4">
                    <FaLinkedin className="text-white" />
                  </div>
                  <div>
                    <div className="text-gray-300 text-sm">LinkedIn</div>
                    <div className="text-white font-medium">linkedin.com/in/purnaboyapati</div>
                  </div>
                </div>
              </div>
            </div>

            {/* JSON Resume Download Section */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h4 className="text-xl font-bold text-white mb-4">
                Download Resume Data
              </h4>
              <p className="text-gray-300 mb-4">
                Get my complete professional information in JSON Resume format - 
                perfect for ATS systems, developer tools, or integration with your HR systems.
              </p>
              <button
                onClick={downloadJsonResume}
                className="flex items-center bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <FaDownload className="mr-2" />
                Download JSON Resume
              </button>
              <div className="mt-3 text-sm text-gray-400">
                <FaFileAlt className="inline mr-2" />
                JSON Resume Schema v1.0.0 compliant
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-800 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-white mb-6">
              Send a Message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600 transition-colors duration-300"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600 transition-colors duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600 transition-colors duration-300"
                  placeholder="What's this about?"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600 transition-colors duration-300 resize-none"
                  placeholder="Tell me about your project or inquiry..."
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-600 text-white font-medium py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:transform-none disabled:hover:scale-100"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              
              {submitStatus === 'success' && (
                <div className="text-green-400 text-center">
                  Thank you! Your message has been sent successfully.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="text-red-400 text-center">
                  Something went wrong. Please try again or contact me directly.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;