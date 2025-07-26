from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from pydantic import BaseModel
from typing import List, Optional
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Portfolio API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017/portfolio_db")
client = MongoClient(MONGO_URL)
db = client.get_database()

# Pydantic models
class ContactInfo(BaseModel):
    name: str
    title: str
    location: str
    phone: str
    address: str
    languages: List[str]

class Experience(BaseModel):
    company: str
    position: str
    duration: str
    location: str
    responsibilities: List[str]

class Education(BaseModel):
    institution: str
    degree: str
    duration: str

class Certification(BaseModel):
    name: str

class Skill(BaseModel):
    name: str
    category: str

class PortfolioData(BaseModel):
    contact_info: ContactInfo
    summary: str
    experience: List[Experience]
    education: List[Education]
    certifications: List[Certification]
    skills: List[Skill]

@app.get("/")
async def root():
    return {"message": "Portfolio API is running"}

@app.get("/api/portfolio")
async def get_portfolio():
    """Get complete portfolio data"""
    portfolio_data = {
        "contact_info": {
            "name": "Purna Boyapati",
            "title": "Principal Software Engineer at Appfire",
            "location": "Hyderabad, Telangana, India",
            "phone": "9160278155 (Home)",
            "address": "H.NO 3-5-119, Plot no 881, Vivekananda Nagar, Kukatpally",
            "languages": ["English", "Hindi", "Telugu"]
        },
        "summary": """Skilled Full Stack Developer ► Backend Development ► Java | Spring Boot | Groovy | Grails | Cloud Technologies | AWS | REST | Microservices | Middleware ► Camunda | Frontend ► Ember.js | ReactJS | Agile Methodologies""",
        "experience": [
            {
                "company": "Appfire",
                "position": "Principal Software Engineer",
                "duration": "September 2019 - Present (5 years 11 months)",
                "location": "Hyderabad Area, India",
                "responsibilities": [
                    "Building Appfire Connect Framework and apps to deliver Atlassian Cloud Apps",
                    "Developed serverless API's on AWS powered by Lambda (written in NodeJS and JAVA)",
                    "Developed infrastructure as code (AWS CDK Typescript) for Cloud Apps",
                    "Implemented AWS infrastructure - CloudFront, API Gateway, Lambda, DynamoDB, AppSync(GraphQL) etc",
                    "Automated deployment with CI/CD pipelines using Bitbucket, AWS etc",
                    "Implemented JEST unit tests for NodeJs modules",
                    "Handled Security (XSS, SSRF, Injections etc) issues",
                    "Enhancements of Appfire's popular JIRA and Confluence Server Apps"
                ]
            },
            {
                "company": "OpenText",
                "position": "Staff Software Engineer",
                "duration": "January 2017 - August 2019 (2 years 8 months)",
                "location": "Hyderabad Area, India",
                "responsibilities": [
                    "Worked on web application development for administration tool for different analytic products such as Recommind Axcelerate, Decisiv, Perceptiv",
                    "Migrated CI/CD for the product from gitlab to Jenkins",
                    "Developed features related to administration management and cross-platform management in spring boot, backbonejs and inhouse developed ui-ux frameworks",
                    "Developed workflows in camunda workflow engine for consistent task tracking",
                    "Worked on user management softwares such as LDAP, active directories"
                ]
            },
            {
                "company": "Pramati Technologies Private Limited",
                "position": "Principal Engineer",
                "duration": "March 2015 - January 2017 (1 year 11 months)",
                "location": "Hyderabad",
                "responsibilities": [
                    "Developed applications using Grails, GORM, and EmberJs, focusing on RESTful services and integrating SPA for dynamic user interfaces",
                    "Led the development of complex applications using SpringBoot, Hibernate, and EmberJs, integrating RESTful web services with single-page applications",
                    "Mastered the use of Spring and Hibernate frameworks to enforce an MVC architecture",
                    "Managed database interactions with DB2 and Cassandra, utilizing ORM frameworks for data transactions",
                    "Developed responsive interfaces using EmberJS and Angular, and implemented JAX-RS and Spring MVC for scalable REST API services",
                    "Employed Java 8 features for performance optimization, engaged in continuous integration with Jenkins"
                ]
            },
            {
                "company": "Pramati Technologies Private Limited",
                "position": "Software Development Engineer III",
                "duration": "March 2013 - March 2015 (2 years 1 month)",
                "location": "Hyderabad Area, India",
                "responsibilities": []
            },
            {
                "company": "Nokia",
                "position": "R & D Engineer III",
                "duration": "March 2011 - February 2013 (2 years)",
                "location": "",
                "responsibilities": []
            },
            {
                "company": "Nokia",
                "position": "R&D Engineer II",
                "duration": "February 2009 - February 2011 (2 years 1 month)",
                "location": "",
                "responsibilities": []
            },
            {
                "company": "Sasken Communication Technologies Ltd",
                "position": "Engineer Software",
                "duration": "October 2006 - February 2009 (2 years 5 months)",
                "location": "Bengaluru Area, India",
                "responsibilities": []
            }
        ],
        "education": [
            {
                "institution": "Jawaharlal Nehru Technological University",
                "degree": "MSIT, Software Engineering",
                "duration": "2004 - 2006"
            },
            {
                "institution": "DVR College",
                "degree": "Bachelor of Technology (B.Tech.), Computer Science",
                "duration": "1999 - 2003"
            }
        ],
        "certifications": [
            {"name": "Learning the OWASP Top 10"},
            {"name": "Introduction to Data Science"},
            {"name": "Machine Learning Foundations: A Case Study Approach"},
            {"name": "The Data Scientist's Toolbox"},
            {"name": "A Life of Happiness and Fulfillment"}
        ],
        "skills": [
            {"name": "Java", "category": "Programming Languages"},
            {"name": "JUnit", "category": "Testing"},
            {"name": "Java Enterprise Edition", "category": "Frameworks"},
            {"name": "Spring Boot", "category": "Frameworks"},
            {"name": "Groovy", "category": "Programming Languages"},
            {"name": "Grails", "category": "Frameworks"},
            {"name": "AWS", "category": "Cloud Technologies"},
            {"name": "REST", "category": "API Development"},
            {"name": "Microservices", "category": "Architecture"},
            {"name": "Camunda", "category": "Middleware"},
            {"name": "Ember.js", "category": "Frontend"},
            {"name": "ReactJS", "category": "Frontend"},
            {"name": "NodeJS", "category": "Backend"},
            {"name": "GraphQL", "category": "API Development"},
            {"name": "AWS CDK", "category": "Infrastructure"},
            {"name": "DynamoDB", "category": "Database"},
            {"name": "Lambda", "category": "Serverless"},
            {"name": "CloudFront", "category": "Cloud Technologies"},
            {"name": "API Gateway", "category": "Cloud Technologies"}
        ]
    }
    
    return portfolio_data

@app.get("/api/resume/json")
async def get_json_resume():
    """Get portfolio data in JSON Resume format"""
    json_resume = {
        "basics": {
            "name": "Purna Boyapati",
            "label": "Principal Software Engineer",
            "image": "",
            "email": "",
            "phone": "9160278155 (Home)",
            "url": "",
            "summary": "Skilled Full Stack Developer ► Backend Development ► Java | Spring Boot | Groovy | Grails | Cloud Technologies | AWS | REST | Microservices | Middleware ► Camunda | Frontend ► Ember.js | ReactJS | Agile Methodologies",
            "location": {
                "address": "H.NO 3-5-119, Plot no 881, Vivekananda Nagar, Kukatpally",
                "postalCode": "",
                "city": "Hyderabad",
                "countryCode": "IN",
                "region": "Telangana"
            },
            "profiles": []
        },
        "work": [
            {
                "name": "Appfire",
                "position": "Principal Software Engineer",
                "url": "",
                "startDate": "2019-09-01",
                "endDate": "",
                "summary": "Building Appfire Connect Framework and apps to deliver Atlassian Cloud Apps. Leading serverless development and AWS infrastructure implementation.",
                "highlights": [
                    "Building Appfire Connect Framework and apps to deliver Atlassian Cloud Apps",
                    "Developed serverless API's on AWS powered by Lambda (written in NodeJS and JAVA)",
                    "Developed infrastructure as code (AWS CDK Typescript) for Cloud Apps",
                    "Implemented AWS infrastructure - CloudFront, API Gateway, Lambda, DynamoDB, AppSync(GraphQL) etc",
                    "Automated deployment with CI/CD pipelines using Bitbucket, AWS etc",
                    "Implemented JEST unit tests for NodeJs modules",
                    "Handled Security (XSS, SSRF, Injections etc) issues",
                    "Enhancements of Appfire's popular JIRA and Confluence Server Apps"
                ]
            },
            {
                "name": "OpenText",
                "position": "Staff Software Engineer",
                "url": "",
                "startDate": "2017-01-01",
                "endDate": "2019-08-31",
                "summary": "Worked on web application development for administration tool for different analytic products.",
                "highlights": [
                    "Worked on web application development for administration tool for different analytic products such as Recommind Axcelerate, Decisiv, Perceptiv",
                    "Migrated CI/CD for the product from gitlab to Jenkins",
                    "Developed features related to administration management and cross-platform management in spring boot, backbonejs and inhouse developed ui-ux frameworks",
                    "Developed workflows in camunda workflow engine for consistent task tracking",
                    "Worked on user management softwares such as LDAP, active directories"
                ]
            },
            {
                "name": "Pramati Technologies Private Limited",
                "position": "Principal Engineer",
                "url": "",
                "startDate": "2015-03-01",
                "endDate": "2017-01-31",
                "summary": "Led development of complex applications using SpringBoot, Hibernate, and EmberJs.",
                "highlights": [
                    "Developed applications using Grails, GORM, and EmberJs, focusing on RESTful services and integrating SPA for dynamic user interfaces",
                    "Led the development of complex applications using SpringBoot, Hibernate, and EmberJs, integrating RESTful web services with single-page applications",
                    "Mastered the use of Spring and Hibernate frameworks to enforce an MVC architecture",
                    "Managed database interactions with DB2 and Cassandra, utilizing ORM frameworks for data transactions",
                    "Developed responsive interfaces using EmberJS and Angular, and implemented JAX-RS and Spring MVC for scalable REST API services",
                    "Employed Java 8 features for performance optimization, engaged in continuous integration with Jenkins"
                ]
            },
            {
                "name": "Pramati Technologies Private Limited",
                "position": "Software Development Engineer III",
                "url": "",
                "startDate": "2013-03-01",
                "endDate": "2015-03-31",
                "summary": "Software development role focused on enterprise applications.",
                "highlights": []
            },
            {
                "name": "Nokia",
                "position": "R & D Engineer III",
                "url": "",
                "startDate": "2011-03-01",
                "endDate": "2013-02-28",
                "summary": "Research and development role in telecommunications technology.",
                "highlights": []
            },
            {
                "name": "Nokia",
                "position": "R&D Engineer II",
                "url": "",
                "startDate": "2009-02-01",
                "endDate": "2011-02-28",
                "summary": "Research and development role in telecommunications technology.",
                "highlights": []
            },
            {
                "name": "Sasken Communication Technologies Ltd",
                "position": "Engineer Software",
                "url": "",
                "startDate": "2006-10-01",
                "endDate": "2009-02-28",
                "summary": "Software engineering role in communication technologies.",
                "highlights": []
            }
        ],
        "volunteer": [],
        "education": [
            {
                "institution": "Jawaharlal Nehru Technological University",
                "url": "",
                "area": "Software Engineering",
                "studyType": "MSIT",
                "startDate": "2004-01-01",
                "endDate": "2006-12-31",
                "score": "",
                "courses": []
            },
            {
                "institution": "DVR College",
                "url": "",
                "area": "Computer Science",
                "studyType": "Bachelor of Technology (B.Tech.)",
                "startDate": "1999-01-01",
                "endDate": "2003-12-31",
                "score": "",
                "courses": []
            }
        ],
        "awards": [],
        "certificates": [
            {
                "name": "Learning the OWASP Top 10",
                "date": "",
                "issuer": "",
                "url": ""
            },
            {
                "name": "Introduction to Data Science",
                "date": "",
                "issuer": "",
                "url": ""
            },
            {
                "name": "Machine Learning Foundations: A Case Study Approach",
                "date": "",
                "issuer": "",
                "url": ""
            },
            {
                "name": "The Data Scientist's Toolbox",
                "date": "",
                "issuer": "",
                "url": ""
            },
            {
                "name": "A Life of Happiness and Fulfillment",
                "date": "",
                "issuer": "",
                "url": ""
            }
        ],
        "publications": [],
        "skills": [
            {
                "name": "Programming Languages",
                "level": "Expert",
                "keywords": ["Java", "Groovy", "JavaScript", "NodeJS"]
            },
            {
                "name": "Frameworks & Libraries",
                "level": "Expert", 
                "keywords": ["Spring Boot", "Java Enterprise Edition", "Grails", "ReactJS", "Ember.js", "Angular"]
            },
            {
                "name": "Cloud Technologies",
                "level": "Expert",
                "keywords": ["AWS", "Lambda", "DynamoDB", "CloudFront", "API Gateway", "AWS CDK"]
            },
            {
                "name": "Architecture & Design",
                "level": "Expert",
                "keywords": ["Microservices", "REST", "GraphQL", "MVC", "Serverless"]
            },
            {
                "name": "DevOps & Tools",
                "level": "Advanced",
                "keywords": ["CI/CD", "Jenkins", "Bitbucket", "Git", "JIRA"]
            },
            {
                "name": "Testing",
                "level": "Advanced",
                "keywords": ["JUnit", "JEST"]
            },
            {
                "name": "Databases",
                "level": "Advanced",
                "keywords": ["DynamoDB", "MongoDB", "DB2", "Cassandra"]
            },
            {
                "name": "Security",
                "level": "Advanced",
                "keywords": ["OWASP", "XSS Prevention", "SSRF", "Injection Prevention"]
            }
        ],
        "languages": [
            {
                "language": "English",
                "fluency": "Fluent"
            },
            {
                "language": "Hindi", 
                "fluency": "Native"
            },
            {
                "language": "Telugu",
                "fluency": "Native"
            }
        ],
        "interests": [],
        "references": [],
        "projects": [],
        "meta": {
            "canonical": "https://raw.githubusercontent.com/jsonresume/resume-schema/master/schema.json",
            "version": "v1.0.0",
            "lastModified": "2024-01-01T00:00:00.000Z"
        }
    }
    
    return json_resume

@app.post("/api/contact")
async def submit_contact(contact_data: dict):
    """Handle contact form submission"""
    try:
        # Store contact message in database
        result = db.contact_messages.insert_one(contact_data)
        return {"message": "Contact form submitted successfully", "id": str(result.inserted_id)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)