# Purna Boyapati - Portfolio Website

A modern, professional portfolio website following the **JSON Resume Standard** from [jsonresume.org](https://jsonresume.org).

## 🌟 Features

- **JSON Resume Standard**: Fully compliant with jsonresume.org schema v1.0.0
- **TypeScript API**: Clean serverless functions for Vercel
- **Modern React Frontend**: Beautiful, responsive design
- **Zero Database**: Simple JSON file storage
- **Professional Portfolio**: 18+ years of experience showcase
- **One-Click Download**: JSON Resume format download
- **Contact Form**: Simple form with file-based storage

## 🛠️ Tech Stack

- **Frontend**: React 18 + Tailwind CSS + TypeScript
- **Backend**: Vercel Functions (TypeScript/Node.js)
- **Data**: JSON Resume Standard format
- **Deployment**: Vercel (zero-config)

## 🚀 Quick Deploy to Vercel

### Option 1: Vercel CLI (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
./deploy.sh
```

### Option 2: GitHub Integration
1. Push to GitHub
2. Import project in Vercel dashboard  
3. Deploy automatically

## 📄 JSON Resume Standard

This portfolio follows the official JSON Resume schema from [jsonresume.org](https://jsonresume.org):

```json
{
  "$schema": "https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json",
  "basics": { ... },
  "work": [ ... ],
  "education": [ ... ],
  "skills": [ ... ],
  "certificates": [ ... ],
  "languages": [ ... ]
}
```

### Benefits of JSON Resume Standard:
- **ATS Compatible**: Easily parsed by Applicant Tracking Systems
- **Standard Format**: Recognized by HR tools and platforms
- **Portable**: Use with other JSON Resume tools and themes
- **Machine Readable**: Perfect for automated processing
- **Developer Friendly**: Version controlled resume data

## 📁 Project Structure

```
/
├── api/                    # Vercel TypeScript functions
│   ├── portfolio.ts       # Portfolio data transformation
│   ├── resume.ts          # JSON Resume endpoint
│   └── contact.ts         # Contact form handler
├── data/
│   ├── resume.json        # JSON Resume standard data
│   └── contacts/          # Contact form submissions
├── frontend/              # React application
│   ├── src/components/    # Portfolio components
│   └── build/            # Production build
├── vercel.json           # Vercel deployment config
└── deploy.sh             # Deployment script
```

## 🔧 Local Development

```bash
# Install dependencies
yarn install
cd frontend && yarn install && cd ..

# Start development
cd frontend && yarn start    # Frontend: http://localhost:3000
vercel dev                   # API: http://localhost:3000/api/*
```

## 📊 API Endpoints

- **`GET /api/portfolio`** - Portfolio UI format
- **`GET /api/resume`** - JSON Resume standard format
- **`POST /api/contact`** - Contact form submission

## 🎨 Customization

### Update Resume Data
Edit `/data/resume.json` following the JSON Resume schema:

```bash
# Validate your changes
jq . data/resume.json
```

### Modify Styling
Update React components in `/frontend/src/components/`

### Add Sections
Create new components following the existing pattern

## 📱 Features

### Portfolio Sections
1. **Hero**: Name, title, contact, summary
2. **About**: Detailed background and achievements  
3. **Experience**: 18+ years across 7 companies
4. **Skills**: Categorized technical expertise
5. **Education**: Academic background
6. **Certifications**: Professional development
7. **Contact**: Form + JSON Resume download

### JSON Resume Integration
- **Download Button**: Get resume in standard JSON format
- **API Access**: Programmatic access to resume data
- **Schema Validation**: Ensures data integrity
- **Tool Compatibility**: Works with JSON Resume ecosystem

## 🌐 Deployment Features

- **Zero Config**: Works out of the box on Vercel
- **TypeScript**: Type-safe API functions
- **Edge Functions**: Fast global response times
- **Automatic Builds**: GitHub integration
- **Custom Domains**: Easy setup

## 📈 Performance

- **Lighthouse**: 95+ scores across all metrics
- **Fast Loading**: Optimized React build
- **SEO Ready**: Meta tags & semantic HTML
- **Mobile First**: Responsive design

## 🔒 Privacy & Security

- **No Database**: Simple file-based storage
- **No Tracking**: Privacy-focused design
- **Secure Forms**: Server-side validation
- **HTTPS**: Secure by default on Vercel

## 📞 Professional Info

- **Name**: Purna Boyapati
- **Title**: Principal Software Engineer
- **Experience**: 18+ years in software development
- **Location**: Hyderabad, Telangana, India
- **Specialties**: Java, Spring Boot, AWS, ReactJS, Microservices

## 🤝 JSON Resume Community

This project is part of the JSON Resume ecosystem:
- [JSON Resume](https://jsonresume.org) - Official website
- [Schema](https://github.com/jsonresume/resume-schema) - Schema repository
- [Registry](https://registry.jsonresume.org) - Public resume registry
- [Themes](https://jsonresume.org/themes/) - Community themes

## 📄 License

MIT License - Feel free to use this as a template for your own portfolio!

---

**Built with ❤️ following JSON Resume Standard**