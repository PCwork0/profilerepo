from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import json
import os
from pathlib import Path

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Get the data directory path
DATA_DIR = Path(__file__).parent.parent / "data"

def load_resume_data():
    """Load resume data from JSON file"""
    try:
        with open(DATA_DIR / "resume.json", "r") as f:
            return json.load(f)
    except FileNotFoundError:
        return {"error": "Resume data not found"}
    except json.JSONDecodeError:
        return {"error": "Invalid JSON format"}

def convert_to_portfolio_format(resume_data):
    """Convert JSON Resume format to portfolio format"""
    if "error" in resume_data:
        return resume_data
    
    # Transform skills from JSON Resume format to portfolio format
    portfolio_skills = []
    for skill_group in resume_data.get("skills", []):
        category = skill_group.get("name", "Other")
        for keyword in skill_group.get("keywords", []):
            portfolio_skills.append({
                "name": keyword,
                "category": category
            })
    
    # Transform education
    portfolio_education = []
    for edu in resume_data.get("education", []):
        portfolio_education.append({
            "institution": edu.get("institution", ""),
            "degree": f"{edu.get('studyType', '')}, {edu.get('area', '')}",
            "duration": f"{edu.get('startDate', '').split('-')[0]} - {edu.get('endDate', '').split('-')[0]}"
        })
    
    # Transform work experience
    portfolio_experience = []
    for work in resume_data.get("work", []):
        start_year = work.get("startDate", "").split("-")[0] if work.get("startDate") else ""
        end_year = work.get("endDate", "").split("-")[0] if work.get("endDate") else "Present"
        
        # Calculate duration
        if work.get("startDate") and work.get("endDate"):
            start_date = work.get("startDate")
            end_date = work.get("endDate")
        elif work.get("startDate"):
            start_date = work.get("startDate")
            end_date = "Present"
        else:
            start_date = ""
            end_date = ""
        
        # Format duration string
        duration = f"{start_date.split('-')[1] if len(start_date.split('-')) > 1 else ''} {start_year} - {end_date.split('-')[1] if end_date != 'Present' and len(end_date.split('-')) > 1 else ''} {end_year}".strip()
        duration = duration.replace("  ", " ")
        if not duration:
            duration = "Duration not specified"
        
        portfolio_experience.append({
            "company": work.get("name", ""),
            "position": work.get("position", ""),
            "duration": duration,
            "location": "",  # Not available in JSON Resume
            "responsibilities": work.get("highlights", [])
        })
    
    # Transform certifications
    portfolio_certifications = []
    for cert in resume_data.get("certificates", []):
        portfolio_certifications.append({
            "name": cert.get("name", "")
        })
    
    return {
        "contact_info": {
            "name": resume_data.get("basics", {}).get("name", ""),
            "title": resume_data.get("basics", {}).get("label", ""),
            "location": f"{resume_data.get('basics', {}).get('location', {}).get('city', '')}, {resume_data.get('basics', {}).get('location', {}).get('region', '')}, {resume_data.get('basics', {}).get('location', {}).get('countryCode', '')}",
            "phone": resume_data.get("basics", {}).get("phone", ""),
            "address": resume_data.get("basics", {}).get("location", {}).get("address", ""),
            "languages": [lang.get("language", "") for lang in resume_data.get("languages", [])]
        },
        "summary": resume_data.get("basics", {}).get("summary", ""),
        "experience": portfolio_experience,
        "education": portfolio_education,
        "certifications": portfolio_certifications,
        "skills": portfolio_skills
    }

@app.get("/")
async def root():
    return {"message": "Portfolio API is running"}

@app.get("/api/portfolio")
async def get_portfolio():
    """Get portfolio data in the original format"""
    resume_data = load_resume_data()
    return convert_to_portfolio_format(resume_data)

@app.get("/api/resume/json")
async def get_json_resume():
    """Get resume data in JSON Resume format"""
    return load_resume_data()

@app.post("/api/contact")
async def submit_contact(contact_data: dict):
    """Handle contact form submission - save to JSON file"""
    try:
        # Create contacts directory if it doesn't exist
        contacts_dir = DATA_DIR / "contacts"
        contacts_dir.mkdir(exist_ok=True)
        
        # Add timestamp to contact data
        from datetime import datetime
        contact_data["timestamp"] = datetime.utcnow().isoformat()
        contact_data["id"] = datetime.utcnow().strftime("%Y%m%d_%H%M%S")
        
        # Save to individual JSON file
        contact_file = contacts_dir / f"contact_{contact_data['id']}.json"
        with open(contact_file, "w") as f:
            json.dump(contact_data, f, indent=2)
        
        return {"message": "Contact form submitted successfully", "id": contact_data["id"]}
    except Exception as e:
        return {"error": f"Failed to save contact: {str(e)}"}, 500

# Vercel handler
def handler(request):
    return app(request)