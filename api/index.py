from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import json
import os
from pathlib import Path
from datetime import datetime

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
        
        # Calculate duration with better formatting
        start_date = work.get("startDate", "")
        end_date = work.get("endDate", "")
        
        if start_date and end_date:
            duration = f"January {start_year} - August {end_year}" if work.get("name") == "OpenText" else f"March {start_year} - January {end_year}"
        elif start_date:
            duration = f"September {start_year} - Present" if work.get("name") == "Appfire" else f"{start_year} - Present"
        else:
            duration = "Duration not specified"
        
        # Use specific durations for known companies
        if work.get("name") == "Appfire":
            duration = "September 2019 - Present (5 years 11 months)"
        elif work.get("name") == "OpenText":
            duration = "January 2017 - August 2019 (2 years 8 months)"
        elif work.get("name") == "Pramati Technologies Private Limited" and work.get("position") == "Principal Engineer":
            duration = "March 2015 - January 2017 (1 year 11 months)"
        elif work.get("name") == "Pramati Technologies Private Limited" and work.get("position") == "Software Development Engineer III":
            duration = "March 2013 - March 2015 (2 years 1 month)"
        elif work.get("name") == "Nokia" and work.get("position") == "R & D Engineer III":
            duration = "March 2011 - February 2013 (2 years)"
        elif work.get("name") == "Nokia" and work.get("position") == "R&D Engineer II":
            duration = "February 2009 - February 2011 (2 years 1 month)"
        elif work.get("name") == "Sasken Communication Technologies Ltd":
            duration = "October 2006 - February 2009 (2 years 5 months)"
        
        portfolio_experience.append({
            "company": work.get("name", ""),
            "position": work.get("position", ""),
            "duration": duration,
            "location": "Hyderabad Area, India" if work.get("name") in ["Appfire", "OpenText", "Pramati Technologies Private Limited"] else "Bengaluru Area, India" if work.get("name") == "Sasken Communication Technologies Ltd" else "",
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
            "location": f"{resume_data.get('basics', {}).get('location', {}).get('city', '')}, {resume_data.get('basics', {}).get('location', {}).get('region', '')}, India",
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
    return {"message": "Portfolio API is running on Vercel"}

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
        contact_data["timestamp"] = datetime.utcnow().isoformat()
        contact_data["id"] = datetime.utcnow().strftime("%Y%m%d_%H%M%S")
        
        # Save to individual JSON file
        contact_file = contacts_dir / f"contact_{contact_data['id']}.json"
        with open(contact_file, "w") as f:
            json.dump(contact_data, f, indent=2)
        
        return {"message": "Contact form submitted successfully", "id": contact_data["id"]}
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"error": f"Failed to save contact: {str(e)}"}
        )

# Vercel serverless function handler
def handler(event, context):
    return app