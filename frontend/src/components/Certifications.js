import React from 'react';
import { FaCertificate, FaAward, FaStar, FaDownload } from 'react-icons/fa';

const Certifications = ({ certifications }) => {
  // Icons for different types of certifications
  const getCertificationIcon = (name) => {
    if (name.toLowerCase().includes('security') || name.toLowerCase().includes('owasp')) {
      return '🛡️';
    } else if (name.toLowerCase().includes('data') || name.toLowerCase().includes('machine learning')) {
      return '📊';
    } else if (name.toLowerCase().includes('happiness') || name.toLowerCase().includes('fulfillment')) {
      return '😊';
    } else {
      return '🎓';
    }
  };

  // Get category for certification
  const getCertificationCategory = (name) => {
    if (name.toLowerCase().includes('security') || name.toLowerCase().includes('owasp')) {
      return 'Security';
    } else if (name.toLowerCase().includes('data') || name.toLowerCase().includes('machine learning')) {
      return 'Data Science';
    } else if (name.toLowerCase().includes('happiness') || name.toLowerCase().includes('fulfillment')) {
      return 'Personal Development';
    } else {
      return 'Technology';
    }
  };

  return (
    <section id="certifications" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Certifications
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Continuous learning and professional development through recognized certifications
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {certifications?.map((cert, index) => (
            <div key={index} className="card p-6 hover:shadow-xl transition-all duration-300 group">
              {/* Header */}
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-blue-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">{getCertificationIcon(cert.name)}</span>
                </div>
                <div className="flex-1">
                  <span className="inline-block px-2 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full mb-2">
                    {getCertificationCategory(cert.name)}
                  </span>
                </div>
              </div>

              {/* Certification Name */}
              <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors duration-300">
                {cert.name}
              </h3>

              {/* Description based on certification type */}
              <p className="text-gray-600 text-sm mb-4">
                {cert.name.toLowerCase().includes('owasp') && 
                  "Security best practices and vulnerability prevention techniques."
                }
                {cert.name.toLowerCase().includes('data science') && 
                  "Foundational concepts and methodologies in data science and analytics."
                }
                {cert.name.toLowerCase().includes('machine learning') && 
                  "Practical applications and case studies in machine learning implementations."
                }
                {cert.name.toLowerCase().includes('toolbox') && 
                  "Essential tools and techniques for data science practitioners."
                }
                {cert.name.toLowerCase().includes('happiness') && 
                  "Personal development and well-being strategies for professional growth."
                }
              </p>

              {/* Status */}
              <div className="flex items-center justify-between">
                <div className="flex items-center text-green-600">
                  <FaStar className="mr-1 text-sm" />
                  <span className="text-sm font-medium">Completed</span>
                </div>
                <FaCertificate className="text-primary-600 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Certification Summary */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Professional Development
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  {certifications?.length || 0}
                </div>
                <div className="text-gray-600">Total Certifications</div>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-primary-600 mb-2">Security</div>
                <div className="text-gray-600">OWASP Top 10</div>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-primary-600 mb-2">Data</div>
                <div className="text-gray-600">Science & ML</div>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-primary-600 mb-2">Growth</div>
                <div className="text-gray-600">Personal Development</div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              Commitment to Continuous Learning
            </h4>
            <p className="text-gray-600 text-center max-w-4xl mx-auto leading-relaxed">
              These certifications reflect my commitment to staying current with industry best practices, 
              emerging technologies, and personal development. From security fundamentals to data science 
              methodologies, each certification has contributed to my comprehensive skill set and 
              professional growth throughout my career.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;