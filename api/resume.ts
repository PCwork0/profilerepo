import { NextApiRequest, NextApiResponse } from 'next';
import resumeData from '../data/resume.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Return the JSON Resume data directly from jsonresume.org standard
    res.status(200).json(resumeData);
  } catch (error) {
    console.error('Error serving resume data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}