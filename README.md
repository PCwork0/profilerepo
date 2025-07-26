# Purna Boyapati - Portfolio Website

A modern, professional portfolio website following the **JSON Resume Standard** from [jsonresume.org](https://jsonresume.org).

## 🌟 Features

- **JSON Resume Standard**: Fully compliant with jsonresume.org schema v1.0.0
- **Simple React Frontend**: Beautiful, responsive design
- **Zero Backend**: Direct JSON file integration
- **Professional Portfolio**: 18+ years of experience showcase
- **One-Click Download**: JSON Resume format download
- **Vercel Ready**: Zero-config deployment

## 🛠️ Tech Stack

- **Frontend**: React 18 + Tailwind CSS
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
├── data/
│   └── resume.json        # JSON Resume standard data
├── frontend/              # React application
│   ├── src/              # React source code
│   ├── public/           # Static assets
│   └── build/            # Production build
├── vercel.json           # Vercel deployment config
└── deploy.sh             # Deployment script
```

## 🔧 Local Development

```bash
# Install dependencies
cd frontend && npm install

# Start development
cd frontend && npm start    # Frontend: http://localhost:3000
```

## 📊 Data Access

- **`/resume.json`** - Direct access to JSON Resume data
- **Download Button** - One-click JSON Resume download

## 🎨 Customization

### Update Resume Data
Edit `/data/resume.json` following the JSON Resume schema:

```bash
# Validate your changes
jq . data/resume.json
```

### Modify Styling
Update React components in `/frontend/src/App.js`

### Add Sections
Modify the App.js file to add new sections

## 📱 Features

### Portfolio Sections
1. **Header**: Name, title, summary, download button
2. **About**: Detailed background and achievements  
3. **Experience**: 18+ years across 7 companies
4. **Skills**: Categorized technical expertise
5. **Education**: Academic background
6. **Certifications**: Professional development
7. **Contact**: Contact information and social profiles

### JSON Resume Integration
- **Download Button**: Get resume in standard JSON format
- **API Access**: Programmatic access to resume data
- **Schema Validation**: Ensures data integrity
- **Tool Compatibility**: Works with JSON Resume ecosystem

## 🌐 Deployment Features

- **Zero Config**: Works out of the box on Vercel
- **Static Site**: Fast global response times
- **Automatic Builds**: GitHub integration
- **Custom Domains**: Easy setup

## 📈 Performance

- **Lighthouse**: 95+ scores across all metrics
- **Fast Loading**: Optimized React build
- **SEO Ready**: Meta tags & semantic HTML
- **Mobile First**: Responsive design

## 🔒 Privacy & Security

- **No Backend**: Simple file-based data
- **No Tracking**: Privacy-focused design
- **Static Site**: No server-side processing
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