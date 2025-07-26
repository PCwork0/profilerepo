import React, { useState } from 'react';
import { FaBuilding, FaCalendarAlt, FaMapMarkerAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Experience = ({ experience }) => {
  const [expandedCards, setExpandedCards] = useState(new Set([0])); // First card expanded by default

  const toggleCard = (index) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedCards(newExpanded);
  };

  return (
    <section id="experience" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Professional Experience
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            18+ years of experience building scalable applications and leading development teams 
            across various industries and technologies.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 md:transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-primary-200"></div>

          {/* Experience items */}
          <div className="space-y-8">
            {experience?.map((exp, index) => (
              <div 
                key={index}
                className={`relative flex flex-col md:flex-row ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4 bg-primary-600 rounded-full border-4 border-white shadow-lg z-10"></div>

                {/* Content */}
                <div className={`ml-16 md:ml-0 md:w-1/2 ${
                  index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                }`}>
                  <div className="card p-6 hover:shadow-xl transition-all duration-300">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {exp.position}
                        </h3>
                        <div className="flex items-center text-primary-600 mb-2">
                          <FaBuilding className="mr-2" />
                          <span className="font-semibold">{exp.company}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center text-gray-600 text-sm space-y-1 sm:space-y-0 sm:space-x-4">
                          <div className="flex items-center">
                            <FaCalendarAlt className="mr-2" />
                            <span>{exp.duration}</span>
                          </div>
                          {exp.location && (
                            <div className="flex items-center">
                              <FaMapMarkerAlt className="mr-2" />
                              <span>{exp.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Expand/Collapse button for experiences with responsibilities */}
                      {exp.responsibilities && exp.responsibilities.length > 0 && (
                        <button
                          onClick={() => toggleCard(index)}
                          className="ml-4 p-2 text-primary-600 hover:bg-primary-50 rounded-full transition-colors duration-200"
                        >
                          {expandedCards.has(index) ? <FaChevronUp /> : <FaChevronDown />}
                        </button>
                      )}
                    </div>

                    {/* Responsibilities */}
                    {exp.responsibilities && exp.responsibilities.length > 0 && expandedCards.has(index) && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-3">Key Responsibilities:</h4>
                        <ul className="space-y-2">
                          {exp.responsibilities.map((responsibility, respIndex) => (
                            <li key={respIndex} className="flex items-start text-gray-600">
                              <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              <span className="text-sm leading-relaxed">{responsibility}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* No responsibilities message */}
                    {(!exp.responsibilities || exp.responsibilities.length === 0) && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-gray-500 text-sm italic">
                          Detailed responsibilities information available upon request.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Spacer for timeline */}
                <div className="hidden md:block md:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Career summary */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Career Journey Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">18+</div>
                <div className="text-gray-600">Years of Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">{experience?.length || 0}</div>
                <div className="text-gray-600">Companies Worked</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">Multiple</div>
                <div className="text-gray-600">Leadership Roles</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;