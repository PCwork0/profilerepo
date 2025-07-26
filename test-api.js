const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 8001;

// Middleware
app.use(cors());
app.use(express.json());

// Load resume data
function loadResumeData() {
  try {
    const resumePath = path.join(__dirname, 'data', 'resume.json');
    return JSON.parse(fs.readFileSync(resumePath, 'utf-8'));
  } catch (error) {
    console.error('Error loading resume data:', error);
    return { error: 'Resume data not found' };
  }
}

// Transform JSON Resume to Portfolio format
function transformToPortfolioFormat(jsonResume) {
  if (jsonResume.error) return jsonResume;

  // Transform skills
  const portfolioSkills = [];
  for (const skillGroup of jsonResume.skills || []) {
    const category = skillGroup.name || 'Other';
    for (const keyword of skillGroup.keywords || []) {
      portfolioSkills.push({
        name: keyword,
        category: category
      });
    }
  }

  // Transform education
  const portfolioEducation = [];
  for (const edu of jsonResume.education || []) {
    portfolioEducation.push({
      institution: edu.institution || '',
      degree: `${edu.studyType || ''}, ${edu.area || ''}`,
      duration: `${edu.startDate?.split('-')[0] || ''} - ${edu.endDate?.split('-')[0] || ''}`
    });
  }

  // Transform work experience with proper durations
  const portfolioExperience = [];
  for (const work of jsonResume.work || []) {
    let duration = '';
    let location = '';
    
    // Set specific durations and locations based on company
    if (work.name === 'Appfire') {
      duration = 'September 2019 - Present (5 years 11 months)';
      location = 'Hyderabad Area, India';
    } else if (work.name === 'OpenText') {
      duration = 'January 2017 - August 2019 (2 years 8 months)';
      location = 'Hyderabad Area, India';
    } else if (work.name === 'Pramati Technologies Private Limited' && work.position === 'Principal Engineer') {
      duration = 'March 2015 - January 2017 (1 year 11 months)';
      location = 'Hyderabad';
    } else if (work.name === 'Pramati Technologies Private Limited' && work.position === 'Software Development Engineer III') {
      duration = 'March 2013 - March 2015 (2 years 1 month)';
      location = 'Hyderabad Area, India';
    } else if (work.name === 'Nokia' && work.position === 'R & D Engineer III') {
      duration = 'March 2011 - February 2013 (2 years)';
      location = '';
    } else if (work.name === 'Nokia' && work.position === 'R&D Engineer II') {
      duration = 'February 2009 - February 2011 (2 years 1 month)';
      location = '';
    } else if (work.name === 'Sasken Communication Technologies Ltd') {
      duration = 'October 2006 - February 2009 (2 years 5 months)';
      location = 'Bengaluru Area, India';
    }

    portfolioExperience.push({
      company: work.name || '',
      position: work.position || '',
      duration: duration,
      location: location,
      responsibilities: work.highlights || []
    });
  }

  // Transform certifications
  const portfolioCertifications = [];
  for (const cert of jsonResume.certificates || []) {
    portfolioCertifications.push({
      name: cert.name || ''
    });
  }

  return {
    contact_info: {
      name: jsonResume.basics?.name || '',
      title: jsonResume.basics?.label || '',
      location: `${jsonResume.basics?.location?.city || ''}, ${jsonResume.basics?.location?.region || ''}, India`,
      phone: jsonResume.basics?.phone || '',
      address: jsonResume.basics?.location?.address || '',
      languages: jsonResume.languages?.map(lang => lang.language) || []
    },
    summary: jsonResume.basics?.summary || '',
    experience: portfolioExperience,
    education: portfolioEducation,
    certifications: portfolioCertifications,
    skills: portfolioSkills
  };
}

// Routes
app.get('/api/portfolio', (req, res) => {
  try {
    const resumeData = loadResumeData();
    const portfolioData = transformToPortfolioFormat(resumeData);
    res.json(portfolioData);
  } catch (error) {
    console.error('Error in /api/portfolio:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/resume', (req, res) => {
  try {
    const resumeData = loadResumeData();
    res.json(resumeData);
  } catch (error) {
    console.error('Error in /api/resume:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/contact', (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const contactData = {
      id: Date.now().toString(),
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString()
    };

    // Create contacts directory if it doesn't exist
    const contactsDir = path.join(__dirname, 'data', 'contacts');
    if (!fs.existsSync(contactsDir)) {
      fs.mkdirSync(contactsDir, { recursive: true });
    }

    // Save contact data
    const fileName = `contact_${contactData.id}.json`;
    const filePath = path.join(contactsDir, fileName);
    fs.writeFileSync(filePath, JSON.stringify(contactData, null, 2));

    res.json({ 
      message: 'Contact form submitted successfully', 
      id: contactData.id 
    });
  } catch (error) {
    console.error('Error in /api/contact:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/', (req, res) => {
  res.json({ 
    message: 'Portfolio API is running',
    endpoints: [
      'GET /api/portfolio - Portfolio data',
      'GET /api/resume - JSON Resume format',
      'POST /api/contact - Contact form'
    ]
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Test API server running on http://localhost:${PORT}`);
  console.log(`📄 JSON Resume endpoint: http://localhost:${PORT}/api/resume`);
  console.log(`💼 Portfolio endpoint: http://localhost:${PORT}/api/portfolio`);
});