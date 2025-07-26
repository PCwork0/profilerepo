import React from 'react';
import { FaGraduationCap, FaCalendarAlt, FaUniversity } from 'react-icons/fa';

const Education = ({ education }) => {
  return (
    <section id="education" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Education
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Strong academic foundation in computer science and software engineering
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {education?.map((edu, index) => (
            <div key={index} className="card p-8 hover:shadow-xl transition-all duration-300">
              {/* Icon */}
              <div className="flex items-start mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-blue-600 rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                  <FaGraduationCap className="text-2xl text-white" />
                </div>
                
                <div className="flex-1">
                  {/* Degree */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {edu.degree}
                  </h3>
                  
                  {/* Institution */}
                  <div className="flex items-center text-primary-600 mb-3">
                    <FaUniversity className="mr-2" />
                    <span className="font-semibold">{edu.institution}</span>
                  </div>
                  
                  {/* Duration */}
                  <div className="flex items-center text-gray-600">
                    <FaCalendarAlt className="mr-2" />
                    <span>{edu.duration}</span>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="border-t border-gray-200 pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium text-gray-900">Field:</span>
                    <span className="ml-2">{edu.degree.split(',')[1]?.trim() || 'Technology'}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Duration:</span>
                    <span className="ml-2">
                      {edu.duration.includes('-') 
                        ? `${parseInt(edu.duration.split(' - ')[1]) - parseInt(edu.duration.split(' - ')[0])} years`
                        : 'Standard duration'
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Educational Journey Summary */}
        <div className="mt-16 bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Educational Journey
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">Master's</div>
                <div className="text-gray-600">MSIT in Software Engineering</div>
                <div className="text-sm text-gray-500 mt-1">Advanced specialization</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">Bachelor's</div>
                <div className="text-gray-600">B.Tech in Computer Science</div>
                <div className="text-sm text-gray-500 mt-1">Strong foundation</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">Continuous</div>
                <div className="text-gray-600">Learning & Certifications</div>
                <div className="text-sm text-gray-500 mt-1">Staying current</div>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Achievements */}
        <div className="mt-12 text-center">
          <h4 className="text-xl font-semibold text-gray-900 mb-4">
            Academic Foundation
          </h4>
          <p className="text-gray-600 max-w-4xl mx-auto leading-relaxed">
            My educational journey began with a strong foundation in Computer Science through my Bachelor's degree, 
            followed by specialized training in Software Engineering at the Master's level. This academic background, 
            combined with continuous learning through professional certifications, has provided me with both theoretical 
            knowledge and practical skills essential for modern software development.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Education;