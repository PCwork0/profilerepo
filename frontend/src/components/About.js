import React from 'react';
import { FaCode, FaCloud, FaMobile, FaDatabase } from 'react-icons/fa';

const About = ({ summary }) => {
  const highlights = [
    {
      icon: <FaCode className="text-3xl text-primary-600" />,
      title: "Full Stack Development",
      description: "Expertise in both frontend and backend technologies with a focus on scalable solutions."
    },
    {
      icon: <FaCloud className="text-3xl text-primary-600" />,
      title: "Cloud Technologies",
      description: "Extensive experience with AWS services, serverless architecture, and infrastructure as code."
    },
    {
      icon: <FaMobile className="text-3xl text-primary-600" />,
      title: "Modern Frameworks",
      description: "Proficient in React, Spring Boot, Node.js, and other cutting-edge technologies."
    },
    {
      icon: <FaDatabase className="text-3xl text-primary-600" />,
      title: "Data Management",
      description: "Experience with various databases including DynamoDB, MongoDB, and traditional SQL databases."
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About Me
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-8"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Passionate Software Engineer with 18+ Years of Experience
            </h3>
            
            <div className="prose prose-lg text-gray-600">
              <p className="text-lg leading-relaxed mb-6">
                {summary}
              </p>
              
              <p className="text-lg leading-relaxed mb-6">
                Throughout my career, I've had the privilege of working with industry-leading companies 
                like Appfire, OpenText, Nokia, and many others. My journey has been focused on building 
                scalable, robust applications and leading development teams to deliver exceptional software solutions.
              </p>
              
              <p className="text-lg leading-relaxed">
                I'm passionate about staying at the forefront of technology trends, from serverless architectures 
                to modern frontend frameworks, always seeking to improve development processes and deliver 
                value to businesses and end-users alike.
              </p>
            </div>

            <div className="pt-6">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Key Achievements:</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Led development of Appfire Connect Framework for Atlassian Cloud Apps
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Implemented serverless APIs using AWS Lambda and modern cloud infrastructure
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Successfully migrated CI/CD pipelines and automated deployment processes
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Enhanced security measures addressing XSS, SSRF, and injection vulnerabilities
                </li>
              </ul>
            </div>
          </div>

          {/* Right side - Highlights grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {highlights.map((highlight, index) => (
              <div 
                key={index}
                className="card p-6 text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="mb-4 flex justify-center">
                  {highlight.icon}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  {highlight.title}
                </h4>
                <p className="text-gray-600 text-sm">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;