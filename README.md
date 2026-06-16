# 🚀 AI-Powered Resume Builder & Skill Gap Analyzer

An intelligent full-stack web application that helps users analyze resumes, identify missing skills, generate ATS-friendly resumes, and leverage Generative AI to improve employability.

Built using React.js, Node.js, Express.js, Gemini AI, JWT Authentication, and Puppeteer.

---

## 📖 Overview

This application enables users to upload their resumes, extract skills automatically, compare them against target job requirements, identify skill gaps, and generate optimized ATS-compliant resumes using AI.

The platform combines modern web development practices with Generative AI to provide personalized career enhancement recommendations.

---

## ✨ Features

### 🔐 Authentication & Security

- User Registration & Login
- JWT-Based Authentication
- Protected Routes
- Secure Password Handling
- Token Blacklisting for Logout Security
- Middleware-Based Authorization

### 📄 Resume Management

- Resume Upload Functionality
- Resume Parsing & Content Extraction
- Automatic Skill Identification
- Resume Data Storage

### 🤖 AI-Powered Features

- Gemini AI Integration
- Resume Analysis
- Skill Extraction
- AI-Based Skill Gap Detection
- Personalized Recommendations
- ATS Resume Optimization
- Resume Enhancement Suggestions

### 📊 Skill Gap Analysis

- Compare Resume Skills with Job Description
- Identify Missing Skills
- Recommend Learning Areas
- Generate Improvement Insights

### 📑 ATS Resume Generation

- ATS-Friendly Formatting
- AI-Generated Resume Improvements
- Dynamic Resume Sections
- Industry-Optimized Keywords

### 📥 PDF Generation

- Dynamic PDF Creation using Puppeteer
- Downloadable Professional Resume
- Consistent ATS-Compatible Layout

---

# 🏗️ System Architecture

```text
┌────────────────────┐
│     React Frontend │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│ Node.js + Express  │
│ REST API Backend   │
└─────────┬──────────┘
          │
 ┌────────┴────────┐
 ▼                 ▼

JWT Auth       Gemini AI
Module         Integration

 ▼                 ▼

Token       Skill Extraction
Blacklist   Resume Analysis
Storage     ATS Suggestions

          ▼
     Database
```

---

# 🛠 Tech Stack

## Frontend

- React.js
- React Router
- Axios
- CSS / Tailwind CSS

## Backend

- Node.js
- Express.js

## Authentication

- JSON Web Token (JWT)
- Token Blacklisting

## Artificial Intelligence

- Gemini API

## PDF Generation

- Puppeteer

## Database

- MongoDB

---

# 📂 Project Structure

```text
AI-Resume-Builder/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── context/
│   │   └── App.js
│   │
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── config/
│   ├── uploads/
│   └── server.js
│
├── README.md
├── .gitignore
└── package.json
```

---

# ⚙️ Installation & Setup

## Prerequisites

Ensure you have installed:

- Node.js (v18+)
- npm
- MongoDB
- Gemini API Key

---

## Clone Repository

```bash
git clone https://github.com/yourusername/ai-resume-builder.git

cd ai-resume-builder
```

---

## Backend Setup

```bash
cd backend

npm install
```

Create `.env`

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key
```

Start backend:

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend

npm install
```

Start frontend:

```bash
npm start
```

Application:

```text
Frontend: http://localhost:3000

Backend: http://localhost:5000
```

---

# 🔐 Authentication Flow

## Login

1. User submits credentials
2. Server validates credentials
3. JWT Token generated
4. Token returned to client
5. Protected routes accessible

## Logout

1. JWT added to blacklist
2. Blacklisted tokens rejected
3. User session terminated securely

---

# 🤖 AI Workflow

## Resume Analysis

```text
Upload Resume
       │
       ▼
Resume Parsing
       │
       ▼
Skill Extraction
       │
       ▼
Gemini Analysis
       │
       ▼
Skill Gap Detection
       │
       ▼
Recommendations
```

---

# 📄 ATS Resume Generation Workflow

```text
User Resume
      │
      ▼
Gemini Optimization
      │
      ▼
ATS Keyword Injection
      │
      ▼
Resume Formatting
      │
      ▼
Puppeteer PDF Generation
      │
      ▼
Download Resume
```

---

# 📡 API Endpoints

## Authentication

### Register User

```http
POST /api/auth/register
```

### Login User

```http
POST /api/auth/login
```

### Logout User

```http
POST /api/auth/logout
```

---

## Resume

### Upload Resume

```http
POST /api/resume/upload
```

### Analyze Resume

```http
POST /api/resume/analyze
```

### Generate ATS Resume

```http
POST /api/resume/generate
```

### Download PDF

```http
GET /api/resume/download/:id
```

---

# 🧠 Core Functionalities

## Resume Parsing

Extracts:

- Skills
- Education
- Experience
- Certifications
- Projects

from uploaded resumes.

---

## Skill Extraction

AI automatically identifies:

- Technical Skills
- Programming Languages
- Frameworks
- Tools
- Soft Skills

---

## Skill Gap Detection

Compares:

```text
Resume Skills
      VS
Job Description Skills
```

Returns:

- Missing Skills
- Improvement Areas
- Learning Recommendations

---

## ATS Optimization

Improves:

- Resume Structure
- Keyword Density
- Readability
- ATS Compatibility Score

---

# 📑 Dynamic PDF Generation

Using Puppeteer:

- Generates Professional Resume Layouts
- Preserves Formatting
- Downloadable PDF Output
- ATS-Friendly Structure

Example:

```javascript
const browser = await puppeteer.launch();

const page = await browser.newPage();

await page.setContent(htmlTemplate);

await page.pdf({
  path: "resume.pdf",
  format: "A4"
});
```

---

# 🔒 Security Features

- JWT Authentication
- Token Blacklisting
- Password Hashing
- Input Validation
- Route Protection
- Environment Variables
- CORS Configuration
- Secure API Access

---

# 🧪 Testing

Run Backend:

```bash
npm test
```

Run Frontend:

```bash
npm test
```

---

# 🚀 Future Enhancements

- Multi-Resume Templates
- Resume Score Dashboard
- LinkedIn Profile Analysis
- Cover Letter Generator
- Interview Question Generator
- Job Recommendation Engine
- Resume Version Tracking
- AI Career Roadmap Generator

---

# 🎯 Learning Outcomes

This project demonstrates:

- Full Stack Application Development
- REST API Design
- JWT Authentication
- Token Blacklisting
- Gemini AI Integration
- Resume Parsing Logic
- Skill Gap Analysis
- ATS Resume Optimization
- Puppeteer PDF Generation
- Production-Level Project Structure

---

# 👨‍💻 Author

**Your Name**

- GitHub: https://github.com/Namratha36

---

# 📜 License

This project is licensed under the MIT License.

Feel free to use, modify, and contribute.
