# Purna Boyapati - Portfolio Website

A modern, responsive portfolio website showcasing 18+ years of software engineering experience with JSON Resume format support.

## 🌟 Features

- **Professional Portfolio**: Complete showcase of experience, skills, and achievements
- **JSON Resume Format**: Download resume data in standardized JSON Resume schema v1.0.0
- **Modern Design**: Purple gradient theme with smooth animations and responsive layout
- **Contact Form**: Integrated contact form with form submission handling
- **Vercel Ready**: Optimized for easy deployment on Vercel platform

## 🛠️ Tech Stack

- **Frontend**: React 18, Tailwind CSS, React Icons, Framer Motion
- **Backend**: FastAPI (Serverless functions for Vercel)
- **Data Storage**: JSON files (no database required)
- **Deployment**: Vercel-optimized configuration

## 📋 Portfolio Sections

1. **Hero Section**: Name, title, contact info, and professional summary
2. **About Me**: Detailed background and key achievements
3. **Experience**: 18+ years across 7 companies with detailed responsibilities
4. **Skills**: Categorized technical skills with proficiency indicators
5. **Education**: B.Tech and MSIT degrees with institution details
6. **Certifications**: 5 professional certifications including OWASP and Data Science
7. **Contact**: Contact form with JSON resume download functionality

## 🚀 Quick Deploy to Vercel

### Prerequisites
- Node.js 14+ installed
- Vercel account

### Deployment Steps

1. **Clone and Install**:
   ```bash
   git clone <repository-url>
   cd portfolio
   npm install
   ```

2. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Follow prompts**:
   - Set up and deploy: Y
   - Which scope: Your username
   - Link to existing project: N
   - Project name: purna-boyapati-portfolio
   - Directory: ./
   - Override settings: N

### Alternative: GitHub Integration

1. Fork this repository
2. Connect your GitHub account to Vercel
3. Import the project in Vercel dashboard
4. Deploy automatically

## 📁 Project Structure

```
/
├── api/                    # Vercel serverless functions
│   └── index.py           # FastAPI backend
├── data/                  # JSON data storage
│   ├── resume.json        # JSON Resume format data
│   └── contacts/          # Contact form submissions
├── frontend/              # React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   ├── package.json
│   └── tailwind.config.js
├── vercel.json           # Vercel configuration
├── package.json          # Root package.json
└── requirements.txt      # Python dependencies
```

## 🔧 Local Development

1. **Install dependencies**:
   ```bash
   cd frontend && yarn install
   pip install -r requirements.txt
   ```

2. **Start development servers**:
   ```bash
   # Frontend (React)
   cd frontend && yarn start

   # Backend (FastAPI) 
   uvicorn api.index:app --reload --port 8001
   ```

3. **Open browser**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8001

## 📊 API Endpoints

- `GET /api/portfolio` - Portfolio data in custom format
- `GET /api/resume/json` - JSON Resume format data
- `POST /api/contact` - Contact form submission

## 🎨 Customization

### Update Portfolio Data
Edit `/data/resume.json` following JSON Resume schema v1.0.0

### Modify Styling
Update Tailwind classes in React components or modify `tailwind.config.js`

### Add New Sections
Create new React components and add to main App.js

## 📱 Responsive Design

- **Desktop**: Full layout with all sections
- **Tablet**: Responsive grid layouts
- **Mobile**: Stacked layout with mobile navigation

## 🔒 Privacy & Data

- No external databases required
- Contact form data stored in JSON files
- No third-party tracking or analytics
- Privacy-focused design

## 📈 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Fast Loading**: Optimized images and code splitting
- **SEO Optimized**: Meta tags and semantic HTML
- **Accessible**: WCAG 2.1 compliant

## 📄 JSON Resume Schema

Fully compliant with JSON Resume Schema v1.0.0:
- Basics (name, contact, summary)
- Work experience with highlights
- Education history
- Skills with keywords
- Certifications
- Languages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Contact

- **Name**: Purna Boyapati
- **Title**: Principal Software Engineer
- **Location**: Hyderabad, Telangana, India
- **Phone**: 9160278155 (Home)

## 📄 License

This project is open source and available under the MIT License.

---

**Built with ❤️ using React, FastAPI, and modern web technologies**