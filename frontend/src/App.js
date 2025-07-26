import React, { useState, useEffect } from 'react';
import './App.css';
import resumeData from './resume.json';

function App() {
  const [resume, setResume] = useState(null);

  useEffect(() => {
    setResume(resumeData);
  }, []);

  if (!resume) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const { basics, work, education, skills, certificates, languages } = resume;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">{basics.name}</h1>
            <button 
              onClick={() => {
                const dataStr = JSON.stringify(resume, null, 2);
                const dataBlob = new Blob([dataStr], {type: 'application/json'});
                const url = URL.createObjectURL(dataBlob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'resume.json';
                link.click();
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Download JSON Resume
            </button>
          </div>
          <p className="text-xl text-gray-600 mt-2">{basics.label}</p>
          <p className="text-gray-500 mt-1">{basics.summary}</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
              <p className="text-gray-700 leading-relaxed">{basics.summary}</p>
            </section>

            {/* Experience */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Experience</h2>
              <div className="space-y-6">
                {work.map((job, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{job.position}</h3>
                        <p className="text-blue-600 font-medium">{job.name}</p>
                      </div>
                      <span className="text-sm text-gray-500">
                        {job.startDate} - {job.endDate || 'Present'}
                      </span>
                    </div>
                    <p className="text-gray-700 mt-2">{job.summary}</p>
                    {job.highlights && job.highlights.length > 0 && (
                      <ul className="mt-3 space-y-1">
                        {job.highlights.map((highlight, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Education */}
            {education && education.length > 0 && (
              <section className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Education</h2>
                <div className="space-y-4">
                  {education.map((edu, index) => (
                    <div key={index} className="border-l-4 border-green-500 pl-4">
                      <h3 className="text-lg font-semibold text-gray-900">{edu.studyType} in {edu.area}</h3>
                      <p className="text-green-600 font-medium">{edu.institution}</p>
                      <p className="text-sm text-gray-500">{edu.startDate} - {edu.endDate}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Contact</h2>
              <div className="space-y-2">
                {basics.email && (
                  <p className="text-gray-700">
                    <span className="font-medium">Email:</span> {basics.email}
                  </p>
                )}
                {basics.phone && (
                  <p className="text-gray-700">
                    <span className="font-medium">Phone:</span> {basics.phone}
                  </p>
                )}
                {basics.location && (
                  <div className="text-gray-700">
                    <span className="font-medium">Location:</span>
                    <p className="ml-2">{basics.location.city}, {basics.location.region}</p>
                    <p className="ml-2">{basics.location.countryCode}</p>
                  </div>
                )}
                {basics.profiles && basics.profiles.length > 0 && (
                  <div className="mt-4">
                    <p className="font-medium text-gray-900 mb-2">Profiles:</p>
                    {basics.profiles.map((profile, index) => (
                      <a
                        key={index}
                        href={profile.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-blue-600 hover:text-blue-800 text-sm"
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
              <section className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Skills</h2>
                <div className="space-y-4">
                  {skills.map((skillGroup, index) => (
                    <div key={index}>
                      <h3 className="font-semibold text-gray-900 mb-2">{skillGroup.name}</h3>
                      <div className="flex flex-wrap gap-2">
                        {skillGroup.keywords.map((keyword, idx) => (
                          <span
                            key={idx}
                            className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
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
              <section className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Certificates</h2>
                <div className="space-y-3">
                  {certificates.map((cert, index) => (
                    <div key={index} className="border-l-4 border-yellow-500 pl-3">
                      <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                      <p className="text-sm text-gray-600">{cert.issuer}</p>
                      <p className="text-xs text-gray-500">{cert.date}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Languages */}
            {languages && languages.length > 0 && (
              <section className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Languages</h2>
                <div className="space-y-2">
                  {languages.map((lang, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-gray-700">{lang.language}</span>
                      <span className="text-gray-500">{lang.fluency}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;