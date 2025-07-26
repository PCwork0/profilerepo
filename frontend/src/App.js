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

  const { basics, work, education, skills, certificates, languages, projects, interests } = resume;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              <h1 className="text-4xl font-bold" style={{ color: '#23272f', letterSpacing: '0.01em', marginBottom: '0.5rem' }}>
                {basics.name}
              </h1>
              <p className="text-xl font-semibold mb-3" style={{ color: '#23272f' }}>
                {basics.label}
              </p>
              <p className="text-lg leading-relaxed max-w-4xl" style={{ color: '#444950', lineHeight: 1.7 }}>
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
              >
                Download JSON Resume
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* About */}
            <section className="bg-white">
              <h2 className="text-3xl font-bold mb-6" style={{ color: '#23272f', letterSpacing: '0.01em' }}>
                About
              </h2>
              <p className="text-lg" style={{ color: '#444950', lineHeight: 1.7 }}>{basics.summary}</p>
            </section>

            {/* Experience */}
            <section className="bg-white">
              <h2 className="text-3xl font-bold mb-8" style={{ color: '#23272f', letterSpacing: '0.01em' }}>
                Professional Experience
              </h2>
              <div className="space-y-10">
                {work.map((job, index) => (
                  <div key={index} className="experience-item">
                    <div className="ml-0">
                      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-1" style={{ color: '#23272f' }}>{job.position}</h3>
                          <p className="font-semibold text-lg mb-2" style={{ color: '#23272f' }}>{job.name}</p>
                          <p className="mb-3" style={{ color: '#444950', lineHeight: 1.6 }}>{job.summary}</p>
                        </div>
                        <span className="text-sm" style={{ color: '#bfc8d9', background: '#f4f6fa', borderRadius: '0.5rem', padding: '0.25rem 1rem', alignSelf: 'flex-start' }}>
                          {job.startDate} - {job.endDate || 'Present'}
                        </span>
                      </div>
                      {job.highlights && job.highlights.length > 0 && (
                        <ul className="space-y-2" style={{ marginLeft: '0.5rem' }}>
                          {job.highlights.map((highlight, idx) => (
                            <li key={idx} style={{ color: '#444950', fontSize: '1rem', lineHeight: 1.6 }}>
                              {highlight}
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
              <section className="bg-white">
                <h2 className="text-3xl font-bold mb-8" style={{ color: '#23272f', letterSpacing: '0.01em' }}>
                  Key Projects
                </h2>
                <div className="grid gap-6">
                  {projects.map((project, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow bg-white">
                      <h3 className="text-xl font-bold mb-2" style={{ color: '#23272f' }}>{project.name}</h3>
                      <p className="mb-4" style={{ color: '#444950', lineHeight: 1.6 }}>{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.keywords.map((keyword, idx) => (
                          <span
                            key={idx}
                            className="skill-badge"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                      <div className="text-sm" style={{ color: '#bfc8d9' }}>
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
              <section className="bg-white">
                <h2 className="text-3xl font-bold mb-8" style={{ color: '#23272f', letterSpacing: '0.01em' }}>
                  Education
                </h2>
                <div className="space-y-6">
                  {education.map((edu, index) => (
                    <div key={index} className="relative">
                      <div className="ml-0">
                        <h3 className="text-xl font-bold mb-1" style={{ color: '#23272f' }}>{edu.studyType} in {edu.area}</h3>
                        <p className="font-semibold text-lg mb-2" style={{ color: '#23272f' }}>{edu.institution}</p>
                        <p className="text-sm mb-3" style={{ color: '#bfc8d9' }}>{edu.startDate} - {edu.endDate}</p>
                        {edu.score && (
                          <p className="text-sm mb-2" style={{ color: '#444950' }}>
                            <span className="font-medium">Grade:</span> {edu.score}
                          </p>
                        )}
                        {edu.courses && edu.courses.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {edu.courses.map((course, idx) => (
                              <span
                                key={idx}
                                className="skill-badge"
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
          <div className="space-y-12">
            {/* Contact Info */}
            <section className="bg-white">
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#23272f', letterSpacing: '0.01em' }}>
                Contact
              </h2>
              <div className="space-y-4">
                {basics.email && (
                  <div className="flex items-center">
                    <span className="mr-3" style={{ color: '#bfc8d9' }}>Email:</span>
                    <a href={`mailto:${basics.email}`} style={{ color: '#23272f', fontWeight: 500 }}>
                      {basics.email}
                    </a>
                  </div>
                )}
                {basics.location && (
                  <div className="flex items-start">
                    <span className="mr-3" style={{ color: '#bfc8d9' }}>Location:</span>
                    <div>
                      <p style={{ color: '#444950' }}>{basics.location.city}, {basics.location.region}</p>
                      <p className="text-sm" style={{ color: '#bfc8d9' }}>{basics.location.countryCode}</p>
                    </div>
                  </div>
                )}
                {basics.profiles && basics.profiles.length > 0 && (
                  <div className="pt-4 border-t border-gray-200">
                    <p className="font-semibold mb-3" style={{ color: '#23272f' }}>Profiles:</p>
                    {basics.profiles.map((profile, index) => (
                      <a
                        key={index}
                        href={profile.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#23272f', fontWeight: 500, display: 'block', marginBottom: '0.5rem' }}
                      >
                        {profile.network}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* Skills */}
            {skills && skills.length > 0 && (
              <section className="bg-white">
                <h2 className="text-2xl font-bold mb-6" style={{ color: '#23272f', letterSpacing: '0.01em' }}>
                  Skills
                </h2>
                <div className="space-y-6">
                  {skills.map((skillGroup, index) => (
                    <div key={index}>
                      <h3 className="font-bold mb-3" style={{ color: '#23272f' }}>{skillGroup.name}</h3>
                      <div className="flex flex-wrap gap-2">
                        {skillGroup.keywords.map((keyword, idx) => (
                          <span
                            key={idx}
                            className="skill-badge"
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
              <section className="bg-white">
                <h2 className="text-2xl font-bold mb-6" style={{ color: '#23272f', letterSpacing: '0.01em' }}>
                  Certifications
                </h2>
                <div className="space-y-4">
                  {certificates.map((cert, index) => (
                    <div key={index} className="border-l-4 pl-4" style={{ borderColor: '#e2e8f0' }}>
                      <h3 className="font-bold" style={{ color: '#23272f' }}>{cert.name}</h3>
                      <p className="text-sm" style={{ color: '#bfc8d9' }}>{cert.issuer} • {cert.date}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Languages */}
            {languages && languages.length > 0 && (
              <section className="bg-white">
                <h2 className="text-2xl font-bold mb-6" style={{ color: '#23272f', letterSpacing: '0.01em' }}>
                  Languages
                </h2>
                <div className="space-y-3">
                  {languages.map((lang, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="font-medium" style={{ color: '#23272f' }}>{lang.language}</span>
                      <span style={{ color: '#444950', background: '#f4f6fa', borderRadius: '0.5rem', padding: '0.25rem 1rem', fontSize: '0.95em' }}>
                        {lang.fluency}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Interests */}
            {interests && interests.length > 0 && (
              <section className="bg-white">
                <h2 className="text-2xl font-bold mb-6" style={{ color: '#23272f', letterSpacing: '0.01em' }}>
                  Interests
                </h2>
                <div className="space-y-4">
                  {interests.map((interest, index) => (
                    <div key={index}>
                      <h3 className="font-semibold mb-2" style={{ color: '#23272f' }}>{interest.name}</h3>
                      <div className="flex flex-wrap gap-2">
                        {interest.keywords.map((keyword, idx) => (
                          <span
                            key={idx}
                            className="skill-badge"
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
      <footer className="bg-white py-8 mt-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 {basics.name} • Built with React & JSON Resume Standard
          </p>
          <p className="text-gray-300 text-xs mt-2">
            <a href="https://jsonresume.org" target="_blank" rel="noopener noreferrer" className="hover:text-gray-500">
              JSON Resume Standard
            </a> • 
            <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-500 ml-2">
              Deployed on Vercel
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;