import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create contact data with timestamp
    const contactData = {
      id: Date.now().toString(),
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString()
    };

    // Create contacts directory if it doesn't exist
    const contactsDir = path.join(process.cwd(), 'data', 'contacts');
    if (!fs.existsSync(contactsDir)) {
      fs.mkdirSync(contactsDir, { recursive: true });
    }

    // Save contact data to JSON file
    const fileName = `contact_${contactData.id}.json`;
    const filePath = path.join(contactsDir, fileName);
    fs.writeFileSync(filePath, JSON.stringify(contactData, null, 2));

    res.status(200).json({ 
      message: 'Contact form submitted successfully', 
      id: contactData.id 
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}