import React from 'react';
import { FaJava, FaAws, FaReact, FaNodeJs, FaDatabase, FaCode, FaShieldAlt, FaTools } from 'react-icons/fa';

const Skills = ({ skills }) => {
  // Group skills by category
  const groupedSkills = skills?.reduce((acc, skill) => {
    const category = skill.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {}) || {};

  // Icons for different categories
  const categoryIcons = {
    'Programming Languages': <FaCode className="text-2xl" />,
    'Frameworks': <FaReact className="text-2xl" />,
    'Cloud Technologies': <FaAws className="text-2xl" />,
    'Backend': <FaNodeJs className="text-2xl" />,
    'Frontend': <FaReact className="text-2xl" />,
    'Database': <FaDatabase className="text-2xl" />,
    'Testing': <FaTools className="text-2xl" />,
    'API Development': <FaCode className="text-2xl" />,
    'Architecture': <FaCode className="text-2xl" />,
    'Infrastructure': <FaAws className="text-2xl" />,
    'Serverless': <FaAws className="text-2xl" />,
    'Middleware': <FaTools className="text-2xl" />,
    'Other': <FaTools className="text-2xl" />
  };

  // Color schemes for different categories
  const categoryColors = {
    'Programming Languages': 'from-blue-500 to-purple-600',
    'Frameworks': 'from-green-500 to-teal-600',
    'Cloud Technologies': 'from-orange-500 to-red-600',
    'Backend': 'from-indigo-500 to-blue-600',
    'Frontend': 'from-pink-500 to-rose-600',
    'Database': 'from-yellow-500 to-orange-600',
    'Testing': 'from-cyan-500 to-blue-600',
    'API Development': 'from-purple-500 to-indigo-600',
    'Architecture': 'from-gray-500 to-gray-700',
    'Infrastructure': 'from-red-500 to-pink-600',
    'Serverless': 'from-emerald-500 to-green-600',
    'Middleware': 'from-violet-500 to-purple-600',
    'Other': 'from-slate-500 to-gray-600'
  };

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Skills & Technologies
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive toolkit built over 18+ years of software development experience
          </p>
        </div>

        {/* Skills Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category} className="card p-6 hover:shadow-xl transition-all duration-300">
              {/* Category Header */}
              <div className="flex items-center mb-6">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${categoryColors[category] || categoryColors['Other']} text-white mr-4`}>
                  {categoryIcons[category] || categoryIcons['Other']}
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  {category}
                </h3>
              </div>

              {/* Skills List */}
              <div className="space-y-3">
                {categorySkills.map((skill, index) => (
                  <div key={index} className="group">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-700 group-hover:text-primary-600 transition-colors duration-200">
                        {skill.name}
                      </span>
                    </div>
                    {/* Skill level indicator */}
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full bg-gradient-to-r ${categoryColors[category] || categoryColors['Other']} transition-all duration-500 group-hover:scale-105`}
                        style={{ width: '85%' }} // Default proficiency level
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Key Highlights */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Technical Highlights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaJava className="text-2xl text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Backend Expert</h4>
              <p className="text-sm text-gray-600">Java, Spring Boot, Microservices</p>
            </div>
            
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaAws className="text-2xl text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Cloud Native</h4>
              <p className="text-sm text-gray-600">AWS, Lambda, Serverless</p>
            </div>
            
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaReact className="text-2xl text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Modern Frontend</h4>
              <p className="text-sm text-gray-600">ReactJS, EmberJS, SPA</p>
            </div>
            
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaShieldAlt className="text-2xl text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Security Focus</h4>
              <p className="text-sm text-gray-600">OWASP, XSS, SSRF Prevention</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;