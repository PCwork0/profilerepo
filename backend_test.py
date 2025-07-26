#!/usr/bin/env python3
"""
Comprehensive Backend API Testing for Portfolio Website
Tests all three main API endpoints with detailed validation
"""

import requests
import json
import sys
from datetime import datetime
from typing import Dict, Any

# Backend URL from frontend environment
BACKEND_URL = "http://localhost:8001"

class PortfolioAPITester:
    def __init__(self):
        self.backend_url = BACKEND_URL
        self.test_results = []
        self.failed_tests = []
        
    def log_test(self, test_name: str, passed: bool, details: str = ""):
        """Log test results"""
        status = "✅ PASS" if passed else "❌ FAIL"
        result = f"{status} - {test_name}"
        if details:
            result += f": {details}"
        
        self.test_results.append(result)
        if not passed:
            self.failed_tests.append(test_name)
        print(result)
        
    def test_portfolio_api(self):
        """Test GET /api/portfolio endpoint"""
        print("\n=== Testing Portfolio API ===")
        
        try:
            response = requests.get(f"{self.backend_url}/api/portfolio", timeout=10)
            
            # Test 1: Response status
            self.log_test("Portfolio API Response Status", 
                         response.status_code == 200,
                         f"Status: {response.status_code}")
            
            if response.status_code != 200:
                return
                
            data = response.json()
            
            # Test 2: Required sections present
            required_sections = ['contact_info', 'summary', 'experience', 'education', 'certifications', 'skills']
            for section in required_sections:
                self.log_test(f"Portfolio has {section} section",
                             section in data,
                             f"Section {'found' if section in data else 'missing'}")
            
            # Test 3: Contact info completeness
            if 'contact_info' in data:
                contact = data['contact_info']
                required_contact_fields = ['name', 'title', 'location', 'phone', 'address', 'languages']
                for field in required_contact_fields:
                    self.log_test(f"Contact info has {field}",
                                 field in contact and contact[field],
                                 f"Field {'present' if field in contact and contact[field] else 'missing/empty'}")
            
            # Test 4: Experience data validation
            if 'experience' in data:
                experience = data['experience']
                self.log_test("Experience is a list", 
                             isinstance(experience, list),
                             f"Type: {type(experience)}")
                
                self.log_test("Experience has 7 companies",
                             len(experience) == 7,
                             f"Found {len(experience)} companies")
                
                # Check for specific companies
                companies = [exp.get('company', '') for exp in experience]
                expected_companies = ['Appfire', 'OpenText', 'Pramati Technologies Private Limited', 'Nokia', 'Sasken Communication Technologies Ltd']
                
                for company in expected_companies:
                    self.log_test(f"Experience includes {company}",
                                 company in companies,
                                 f"Company {'found' if company in companies else 'not found'}")
            
            # Test 5: Education validation
            if 'education' in data:
                education = data['education']
                self.log_test("Education has 2 degrees",
                             len(education) == 2,
                             f"Found {len(education)} degrees")
                
                degrees = [edu.get('degree', '') for edu in education]
                self.log_test("Has B.Tech degree",
                             any('B.Tech' in degree for degree in degrees),
                             "B.Tech degree validation")
                
                self.log_test("Has MSIT degree", 
                             any('MSIT' in degree for degree in degrees),
                             "MSIT degree validation")
            
            # Test 6: Skills categorization
            if 'skills' in data:
                skills = data['skills']
                self.log_test("Skills is a list",
                             isinstance(skills, list),
                             f"Type: {type(skills)}")
                
                categories = set(skill.get('category', '') for skill in skills)
                self.log_test("Skills are categorized",
                             len(categories) > 1,
                             f"Found {len(categories)} categories: {list(categories)}")
            
            # Test 7: Certifications count
            if 'certifications' in data:
                certs = data['certifications']
                self.log_test("Has certifications",
                             len(certs) >= 5,
                             f"Found {len(certs)} certifications")
                             
        except requests.exceptions.RequestException as e:
            self.log_test("Portfolio API Connection", False, f"Connection error: {str(e)}")
        except json.JSONDecodeError as e:
            self.log_test("Portfolio API JSON Response", False, f"JSON decode error: {str(e)}")
        except Exception as e:
            self.log_test("Portfolio API General", False, f"Unexpected error: {str(e)}")
    
    def test_json_resume_api(self):
        """Test GET /api/resume/json endpoint"""
        print("\n=== Testing JSON Resume API ===")
        
        try:
            response = requests.get(f"{self.backend_url}/api/resume/json", timeout=10)
            
            # Test 1: Response status
            self.log_test("JSON Resume API Response Status",
                         response.status_code == 200,
                         f"Status: {response.status_code}")
            
            if response.status_code != 200:
                return
                
            data = response.json()
            
            # Test 2: JSON Resume schema compliance
            required_sections = ['basics', 'work', 'education', 'skills', 'certificates', 'languages']
            for section in required_sections:
                self.log_test(f"JSON Resume has {section} section",
                             section in data,
                             f"Section {'found' if section in data else 'missing'}")
            
            # Test 3: Basics section validation
            if 'basics' in data:
                basics = data['basics']
                required_basics = ['name', 'label', 'phone', 'summary', 'location']
                for field in required_basics:
                    self.log_test(f"Basics has {field}",
                                 field in basics,
                                 f"Field {'present' if field in basics else 'missing'}")
                
                # Location structure
                if 'location' in basics:
                    location = basics['location']
                    location_fields = ['address', 'city', 'countryCode', 'region']
                    for field in location_fields:
                        self.log_test(f"Location has {field}",
                                     field in location,
                                     f"Field {'present' if field in location else 'missing'}")
            
            # Test 4: Work experience validation
            if 'work' in data:
                work = data['work']
                self.log_test("Work is a list",
                             isinstance(work, list),
                             f"Type: {type(work)}")
                
                self.log_test("Work has 7 positions",
                             len(work) == 7,
                             f"Found {len(work)} positions")
                
                # Check work entry structure
                if work:
                    first_job = work[0]
                    work_fields = ['name', 'position', 'startDate', 'summary', 'highlights']
                    for field in work_fields:
                        self.log_test(f"Work entry has {field}",
                                     field in first_job,
                                     f"Field {'present' if field in first_job else 'missing'}")
            
            # Test 5: Skills structure validation
            if 'skills' in data:
                skills = data['skills']
                self.log_test("Skills is a list",
                             isinstance(skills, list),
                             f"Type: {type(skills)}")
                
                if skills:
                    first_skill = skills[0]
                    skill_fields = ['name', 'level', 'keywords']
                    for field in skill_fields:
                        self.log_test(f"Skill entry has {field}",
                                     field in first_skill,
                                     f"Field {'present' if field in first_skill else 'missing'}")
            
            # Test 6: Meta information
            if 'meta' in data:
                meta = data['meta']
                self.log_test("Has JSON Resume version",
                             'version' in meta and meta['version'] == 'v1.0.0',
                             f"Version: {meta.get('version', 'missing')}")
                             
        except requests.exceptions.RequestException as e:
            self.log_test("JSON Resume API Connection", False, f"Connection error: {str(e)}")
        except json.JSONDecodeError as e:
            self.log_test("JSON Resume API JSON Response", False, f"JSON decode error: {str(e)}")
        except Exception as e:
            self.log_test("JSON Resume API General", False, f"Unexpected error: {str(e)}")
    
    def test_contact_api(self):
        """Test POST /api/contact endpoint"""
        print("\n=== Testing Contact API ===")
        
        # Test data
        test_contact_data = {
            "name": "John Smith",
            "email": "john.smith@example.com",
            "subject": "Portfolio Inquiry",
            "message": "I am interested in discussing potential opportunities. Your portfolio showcases impressive experience in full-stack development.",
            "timestamp": datetime.now().isoformat()
        }
        
        try:
            # Test 1: Successful submission
            response = requests.post(
                f"{self.backend_url}/api/contact",
                json=test_contact_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            self.log_test("Contact API Response Status",
                         response.status_code == 200,
                         f"Status: {response.status_code}")
            
            if response.status_code == 200:
                try:
                    response_data = response.json()
                    self.log_test("Contact API Response Format",
                                 'message' in response_data and 'id' in response_data,
                                 f"Response keys: {list(response_data.keys())}")
                    
                    self.log_test("Contact API Success Message",
                                 'successfully' in response_data.get('message', '').lower(),
                                 f"Message: {response_data.get('message', '')}")
                                 
                except json.JSONDecodeError:
                    self.log_test("Contact API JSON Response", False, "Invalid JSON response")
            
            # Test 2: Empty data validation
            empty_response = requests.post(
                f"{self.backend_url}/api/contact",
                json={},
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            self.log_test("Contact API Empty Data Handling",
                         empty_response.status_code in [400, 422, 500],
                         f"Status for empty data: {empty_response.status_code}")
            
            # Test 3: Invalid JSON handling
            try:
                invalid_response = requests.post(
                    f"{self.backend_url}/api/contact",
                    data="invalid json",
                    headers={"Content-Type": "application/json"},
                    timeout=10
                )
                
                self.log_test("Contact API Invalid JSON Handling",
                             invalid_response.status_code in [400, 422],
                             f"Status for invalid JSON: {invalid_response.status_code}")
            except:
                self.log_test("Contact API Invalid JSON Handling", True, "Request properly rejected")
                             
        except requests.exceptions.RequestException as e:
            self.log_test("Contact API Connection", False, f"Connection error: {str(e)}")
        except Exception as e:
            self.log_test("Contact API General", False, f"Unexpected error: {str(e)}")
    
    def test_server_health(self):
        """Test basic server health"""
        print("\n=== Testing Server Health ===")
        
        try:
            # Test root endpoint
            response = requests.get(f"{self.backend_url}/", timeout=5)
            self.log_test("Server Root Endpoint",
                         response.status_code == 200,
                         f"Status: {response.status_code}")
            
            if response.status_code == 200:
                try:
                    data = response.json()
                    self.log_test("Server Health Message",
                                 'message' in data,
                                 f"Response: {data}")
                except:
                    self.log_test("Server Health Message", False, "Invalid JSON response")
                    
        except requests.exceptions.RequestException as e:
            self.log_test("Server Health Check", False, f"Connection error: {str(e)}")
        except Exception as e:
            self.log_test("Server Health Check", False, f"Unexpected error: {str(e)}")
    
    def run_all_tests(self):
        """Run all backend API tests"""
        print(f"🚀 Starting Portfolio Backend API Testing")
        print(f"Backend URL: {self.backend_url}")
        print("=" * 60)
        
        # Run all test suites
        self.test_server_health()
        self.test_portfolio_api()
        self.test_json_resume_api()
        self.test_contact_api()
        
        # Summary
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        
        total_tests = len(self.test_results)
        passed_tests = total_tests - len(self.failed_tests)
        
        print(f"Total Tests: {total_tests}")
        print(f"Passed: {passed_tests}")
        print(f"Failed: {len(self.failed_tests)}")
        print(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        
        if self.failed_tests:
            print(f"\n❌ Failed Tests:")
            for test in self.failed_tests:
                print(f"  - {test}")
        else:
            print(f"\n🎉 All tests passed!")
        
        return len(self.failed_tests) == 0

if __name__ == "__main__":
    tester = PortfolioAPITester()
    success = tester.run_all_tests()
    sys.exit(0 if success else 1)