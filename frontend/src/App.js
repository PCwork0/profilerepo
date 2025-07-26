import React, { useState, useEffect } from 'react';
import './App.css';
import resumeData from './resume.json';

function App() {
  const [resume, setResume] = useState(null);

  useEffect(() => {
    setResume(resumeData);
  }, []);

  if (!resume) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const { basics, work, education, skills, certificates, languages, awards, projects, interests } = resume;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                {basics.name}
              </h1>
              <p className="text-xl lg:text-2xl text-blue-600 font-semibold mb-3">
                {basics.label}
              </p>
              <p className="text-gray-600 text-lg leading-relaxed max-w-4xl">
                {basics.summary}
              </p>
            </div>
            <div className="mt-6 lg:mt-0 lg:ml-8">
              <button 
                onClick={() => {
                  const dataStr = JSON.stringify(resume, null, 2);
                  const dataBlob = new Blob([dataStr], {type: 'application/json'});
                  const url = URL.createObjectURL(dataBlob);
                  const link = document.createElement('a');
                  link.href = url;
                  link.download = 'purna-boyapati-resume.json';
                  link.click();
                }}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                📄 Download JSON Resume
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <section className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-3">👨‍💻</span>
                About
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">{basics.summary}</p>
            </section>

            {/* Experience */}
            <section className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                <span className="bg-green-100 text-green-600 p-2 rounded-lg mr-3">💼</span>
                Professional Experience
              </h2>
              <div className="space-y-8">
                {work.map((job, index) => (
                  <div key={index} className="relative">
                    <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
                    <div className="ml-6">
                      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{job.position}</h3>
                          <p className="text-blue-600 font-semibold text-lg mb-2">{job.name}</p>
                          <p className="text-gray-600 mb-3">{job.summary}</p>
                        </div>
                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full lg:ml-4">
                          {job.startDate} - {job.endDate || 'Present'}
                        </span>
                      </div>
                      {job.highlights && job.highlights.length > 0 && (
                        <ul className="space-y-2">
                          {job.highlights.map((highlight, idx) => (
                            <li key={idx} className="text-gray-700 flex items-start">
                              <span className="text-blue-500 mr-3 mt-1">▸</span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Projects */}
            {projects && projects.length > 0 && (
              <section className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                  <span className="bg-purple-100 text-purple-600 p-2 rounded-lg mr-3">🚀</span>
                  Key Projects
                </h2>
                <div className="grid gap-6">
                  {projects.map((project, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{project.name}</h3>
                      <p className="text-gray-600 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.keywords.map((keyword, idx) => (
                          <span
                            key={idx}
                            className="bg-purple-100 text-purple-700 text-sm px-3 py-1 rounded-full"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                      <div className="text-sm text-gray-500">
                        <span className="font-medium">Role:</span> {project.roles.join(', ')} | 
                        <span className="font-medium ml-2">Entity:</span> {project.entity}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {education && education.length > 0 && (
              <section className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                  <span className="bg-yellow-100 text-yellow-600 p-2 rounded-lg mr-3">🎓</span>
                  Education
                </h2>
                <div className="space-y-6">
                  {education.map((edu, index) => (
                    <div key={index} className="relative">
                      <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-yellow-500 to-orange-500 rounded-full"></div>
                      <div className="ml-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{edu.studyType} in {edu.area}</h3>
                        <p className="text-yellow-600 font-semibold text-lg mb-2">{edu.institution}</p>
                        <p className="text-sm text-gray-500 mb-3">{edu.startDate} - {edu.endDate}</p>
                        {edu.score && (
                          <p className="text-sm text-gray-600 mb-2">
                            <span className="font-medium">Grade:</span> {edu.score}
                          </p>
                        )}
                        {edu.courses && edu.courses.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {edu.courses.map((course, idx) => (
                              <span
                                key={idx}
                                className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full"
                              >
                                {course}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Contact Info */}
            <section className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="bg-green-100 text-green-600 p-2 rounded-lg mr-3">📧</span>
                Contact
              </h2>
              <div className="space-y-4">
                {basics.email && (
                  <div className="flex items-center">
                    <span className="text-gray-400 mr-3">📧</span>
                    <a href={`mailto:${basics.email}`} className="text-blue-600 hover:text-blue-800">
                      {basics.email}
                    </a>
                  </div>
                )}
                {basics.location && (
                  <div className="flex items-start">
                    <span className="text-gray-400 mr-3 mt-1">📍</span>
                    <div>
                      <p className="text-gray-700">{basics.location.city}, {basics.location.region}</p>
                      <p className="text-gray-500 text-sm">{basics.location.countryCode}</p>
                    </div>
                  </div>
                )}
                {basics.profiles && basics.profiles.length > 0 && (
                  <div className="pt-4 border-t border-gray-200">
                    <p className="font-semibold text-gray-900 mb-3">Profiles:</p>
                    {basics.profiles.map((profile, index) => (
                      <a
                        key={index}
                        href={profile.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:text-blue-800 mb-2 transition-colors"
                      >
                        <span className="mr-2">🔗</span>
                        {profile.network}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* Skills */}
            {skills && skills.length > 0 && (
              <section className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-indigo-100 text-indigo-600 p-2 rounded-lg mr-3">⚡</span>
                  Skills
                </h2>
                <div className="space-y-6">
                  {skills.map((skillGroup, index) => (
                    <div key={index}>
                      <h3 className="font-bold text-gray-900 mb-3">{skillGroup.name}</h3>
                      <div className="flex flex-wrap gap-2">
                        {skillGroup.keywords.map((keyword, idx) => (
                          <span
                            key={idx}
                            className="bg-indigo-100 text-indigo-700 text-sm px-3 py-1 rounded-full hover:bg-indigo-200 transition-colors"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certificates */}
            {certificates && certificates.length > 0 && (
              <section className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-red-100 text-red-600 p-2 rounded-lg mr-3">📜</span>
                  Certifications
                </h2>
                <div className="space-y-4">
                  {certificates.map((cert, index) => (
                    <div key={index} className="border-l-4 border-red-500 pl-4">
                      <h3 className="font-bold text-gray-900">{cert.name}</h3>
                      <p className="text-sm text-gray-600">{cert.issuer} • {cert.date}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Languages */}
            {languages && languages.length > 0 && (
              <section className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-teal-100 text-teal-600 p-2 rounded-lg mr-3">🌍</span>
                  Languages
                </h2>
                <div className="space-y-3">
                  {languages.map((lang, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium">{lang.language}</span>
                      <span className="text-teal-600 bg-teal-100 px-2 py-1 rounded-full text-sm">
                        {lang.fluency}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Interests */}
            {interests && interests.length > 0 && (
              <section className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-pink-100 text-pink-600 p-2 rounded-lg mr-3">🎯</span>
                  Interests
                </h2>
                <div className="space-y-4">
                  {interests.map((interest, index) => (
                    <div key={index}>
                      <h3 className="font-semibold text-gray-900 mb-2">{interest.name}</h3>
                      <div className="flex flex-wrap gap-2">
                        {interest.keywords.map((keyword, idx) => (
                          <span
                            key={idx}
                            className="bg-pink-100 text-pink-700 text-xs px-2 py-1 rounded-full"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-300">
            © 2024 {basics.name} • Built with React & JSON Resume Standard
          </p>
          <p className="text-gray-400 text-sm mt-2">
            <a href="https://jsonresume.org" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              JSON Resume Standard
            </a> • 
            <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="hover:text-white ml-2">
              Deployed on Vercel
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;