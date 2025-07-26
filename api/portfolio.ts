import { NextApiRequest, NextApiResponse } from 'next';
import resumeData from '../data/resume.json';

// Transform JSON Resume to Portfolio format
function transformToPortfolioFormat(jsonResume: any) {
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
      languages: jsonResume.languages?.map((lang: any) => lang.language) || []
    },
    summary: jsonResume.basics?.summary || '',
    experience: portfolioExperience,
    education: portfolioEducation,
    certifications: portfolioCertifications,
    skills: portfolioSkills
  };
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const portfolioData = transformToPortfolioFormat(resumeData);
    res.status(200).json(portfolioData);
  } catch (error) {
    console.error('Error processing portfolio data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}