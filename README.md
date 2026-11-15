# 📄 ResumeAI — AI-Powered Interview Preparation Tool

A full-stack web application that analyzes resumes against job descriptions using **Google Gemini AI** and generates comprehensive interview preparation reports including technical questions, behavioral questions, skill gap analysis, and personalized preparation plans.

Built with **React.js**, **Node.js**, **Express.js**, **MongoDB**, and **Google Gemini API**.

---

## ✨ Features

### 🔐 Authentication & Security
- User Registration & Login with email/password
- JWT-based stateless authentication (stored in HTTP cookies)
- Token blacklisting for secure logout
- Protected routes — all data endpoints require valid JWT
- Password hashing with bcrypt
- User-scoped data isolation — users can only access their own reports

### 📄 Resume Analysis
- PDF resume upload (max 3MB) via Multer middleware
- Server-side text extraction using `pdf-parse`
- Job description and self-description input
- AI-powered analysis via Google Gemini structured output

### 📊 Interview Report Generation
- **Overall Match Score** (0–100) between resume and job description
- **Technical Interview Questions** with interviewer intent and model answers
- **Behavioral Interview Questions** (STAR format) with guidance
- **Skill Gap Analysis** with severity ratings (low/medium/high)
- **Personalized Preparation Plan** — day-by-day study schedule

### 📋 Report Management
- View all past reports with search and filtering
- Detailed report view with tabbed navigation
- Dashboard with statistics (total reports, average score, highest score)
- Demo reports clearly labeled as "Sample Demo Report"

### 👤 User Profile
- Account details display
- Performance statistics

---

## 🏗️ System Architecture

```
┌──────────────────────────────────────────────────────┐
│                   FRONTEND (React)                   │
│  Login/Register → Dashboard → Analyze → Reports      │
│  React Router · Axios · Context API · SCSS            │
└───────────────────────┬──────────────────────────────┘
                        │ HTTP (REST API + Cookies)
┌───────────────────────▼──────────────────────────────┐
│                BACKEND (Express.js)                   │
│  Auth Routes    │  Interview Routes                   │
│  ┌────────────┐ │  ┌──────────────────────────────┐  │
│  │ register   │ │  │ POST /  → generate report    │  │
│  │ login      │ │  │ GET /reports → list reports   │  │
│  │ logout     │ │  │ GET /reports/:id → get one    │  │
│  │ get-me     │ │  │ GET /stats → dashboard stats  │  │
│  └────────────┘ │  └──────────────────────────────┘  │
│       │                      │                        │
│  ┌────▼────┐    ┌───────────▼────────────┐           │
│  │  Auth   │    │  Multer (file upload)  │           │
│  │Middleware│    │  pdf-parse (extract)   │           │
│  │ (JWT)   │    │  Gemini AI (analyze)   │           │
│  └─────────┘    └────────────────────────┘           │
└───────────────────────┬──────────────────────────────┘
                        │
              ┌─────────▼─────────┐
              │     MongoDB       │
              │  ┌─────────────┐  │
              │  │ Users       │  │
              │  │ Reports     │  │
              │  │ Blacklist   │  │
              │  └─────────────┘  │
              └───────────────────┘
```

---

## 📂 Project Structure

```
ATS-Resume/
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js          # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── auth.controller.js    # Register, login, logout, getMe
│   │   │   └── interview.controller.js # Report generation, listing, stats
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js     # JWT verification + blacklist check
│   │   │   └── file.middleware.js     # Multer config (memory storage, 3MB)
│   │   ├── models/
│   │   │   ├── user.model.js          # User schema (username, email, password)
│   │   │   ├── interviewReport.model.js # Report schema (score, Q&A, gaps, plan)
│   │   │   └── blacklist.model.js     # Token blacklist for logout
│   │   ├── routes/
│   │   │   ├── auth.routes.js         # /api/auth/*
│   │   │   └── interview.routes.js    # /api/interview/*
│   │   ├── services/
│   │   │   └── ai.service.js          # Gemini API integration with Zod schema
│   │   └── app.js                     # Express app setup (CORS, routes)
│   ├── server.js                      # Entry point (DB connect + listen)
│   ├── seed-demo.js                   # Demo data seeding script
│   ├── .env.example                   # Environment variables template
│   └── package.json
│
├── Frontend/
│   ├── src/
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   │   ├── pages/Login.jsx, Register.jsx
│   │   │   │   ├── components/Protected.jsx
│   │   │   │   ├── hooks/useAuth.js
│   │   │   │   ├── services/auth.api.js
│   │   │   │   └── auth.form.scss
│   │   │   ├── dashboard/
│   │   │   │   └── pages/Dashboard.jsx, dashboard.scss
│   │   │   ├── interview/
│   │   │   │   ├── pages/Analyze.jsx, Reports.jsx, ReportDetail.jsx
│   │   │   │   └── services/interview.api.js
│   │   │   ├── profile/
│   │   │   │   └── pages/Profile.jsx, profile.scss
│   │   │   └── layout/
│   │   │       ├── AppLayout.jsx
│   │   │       ├── Navbar.jsx
│   │   │       └── navbar.scss
│   │   ├── App.jsx
│   │   ├── app.routes.jsx
│   │   ├── main.jsx
│   │   └── style.scss, style/button.scss
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

## 🛠️ Tech Stack

| Layer          | Technology                                    |
|----------------|-----------------------------------------------|
| Frontend       | React 19, React Router 7, Axios, SCSS         |
| Backend        | Node.js, Express 5                            |
| Database       | MongoDB with Mongoose ODM                     |
| AI             | Google Gemini API (`@google/genai`)            |
| Authentication | JWT (jsonwebtoken), bcryptjs                  |
| File Handling  | Multer (memory storage), pdf-parse            |
| Schema         | Zod + zod-to-json-schema (AI output)          |
| Build Tool     | Vite 8                                        |

---

## ⚙️ Setup & Installation

### Prerequisites

- Node.js v18+
- npm
- MongoDB (local or Atlas)
- Google Gemini API Key (for AI features — optional for demo mode)

### 1. Clone the repository

```bash
git clone https://github.com/Namratha36/ATS-Resume.git
cd ATS-Resume
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file:

```env
GOOGLE_GENAI_API_KEY=your_gemini_api_key_here
MONGO_URI=mongodb://localhost:27017/resumeai
JWT_SECRET=your_secret_key_here
PORT=3000
```

> **Note:** If you don't have Gemini API credits, leave the key blank. Existing demo reports will still be viewable. New AI analysis will show a friendly error message.

### 3. Seed Demo Data

```bash
npm run seed
```

This creates a demo account with 3 pre-loaded interview reports:
- **Email:** `demo@resumeai.com`
- **Password:** `Demo@12345`

### 4. Start Backend

```bash
npm run dev
```

Backend runs on `http://localhost:3000`

### 5. Frontend Setup

```bash
cd ../Frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

---

## 🎯 Demo Walkthrough

1. Open `http://localhost:5173`
2. Login with: `demo@resumeai.com` / `Demo@12345`
3. **Dashboard** — View stats (3 reports, average & highest scores)
4. **Reports** — Browse all 3 demo reports with search
5. **Report Detail** — Click any report to explore:
   - Overview tab (job description, resume text)
   - Technical Q&A tab (5 questions with answers)
   - Behavioral Q&A tab (STAR-format questions)
   - Skill Gaps tab (severity-coded gap analysis)
   - Prep Plan tab (day-by-day preparation timeline)
6. **Analyze** — Try generating a new report (shows graceful error if no API credits)
7. **Profile** — View account details and statistics
8. **Logout** — Redirects to login, token is blacklisted

---

## 📡 API Endpoints

| Method | Endpoint                  | Auth | Description                    |
|--------|---------------------------|------|--------------------------------|
| POST   | `/api/auth/register`      | No   | Create new user account        |
| POST   | `/api/auth/login`         | No   | Login and receive JWT cookie   |
| GET    | `/api/auth/logout`        | No   | Blacklist token and clear cookie|
| GET    | `/api/auth/get-me`        | Yes  | Get current user profile       |
| POST   | `/api/interview/`         | Yes  | Generate new AI report         |
| GET    | `/api/interview/reports`  | Yes  | List user's reports            |
| GET    | `/api/interview/reports/:id` | Yes | Get report by ID            |
| GET    | `/api/interview/stats`    | Yes  | Get dashboard statistics       |
| GET    | `/api/health`             | No   | Health check                   |

---

## 🔐 Authentication Flow

```
Register/Login → Server validates → JWT signed with secret
    → Token set as HTTP cookie → Sent with every request
    → Auth middleware verifies token + checks blacklist
    → req.user populated → Controller processes request

Logout → Token added to blacklist collection
    → Cookie cleared → Future requests with old token rejected
```

---

## 🤖 Gemini AI Integration Architecture

```
User Input (Resume PDF + Job Description + Self Description)
    │
    ▼
Express Controller
    │ ── Multer extracts file buffer
    │ ── pdf-parse extracts text from PDF
    │
    ▼
AI Service (ai.service.js)
    │ ── Constructs prompt with resume, JD, self-description
    │ ── Defines Zod schema for expected output structure
    │ ── Converts Zod → JSON Schema via zod-to-json-schema
    │ ── Calls Gemini API with responseMimeType: "application/json"
    │    and responseSchema for structured output
    │ ── Parses JSON response
    │
    ▼
MongoDB Storage
    │ ── Report saved with user reference
    │ ── Available for future viewing without AI calls
```

**Key technical decision:** Using Zod schemas with `responseSchema` ensures Gemini returns validated, structured JSON matching our database model — eliminating the need for fragile text parsing of AI responses.

---

## ⚠️ Current Limitations

| Feature | Status |
|---------|--------|
| New AI analysis | ❌ Requires Gemini API credits |
| View existing reports | ✅ Works without API credits |
| User registration/login | ✅ Fully functional |
| Resume PDF upload + parsing | ✅ Works (but AI analysis may fail) |
| PDF export of resumes | ❌ Not implemented (README previously claimed Puppeteer) |
| Resume creation/editing | ❌ Not implemented — app focuses on analysis |
| Guest access | ❌ Not implemented — use demo account instead |
| Deployment | ❌ Not deployed — local development only |

---

## 🔒 Security Measures

- Passwords hashed with bcrypt (10 salt rounds)
- JWT tokens with 1-day expiry
- Token blacklisting on logout
- User-scoped data queries (reports filtered by `user: req.user.id`)
- File upload size limits (3MB max)
- CORS restricted to frontend origin
- Environment variables for secrets
- Input validation on all endpoints

---

## 🧠 Technical Decisions & Challenges

1. **Structured AI Output** — Used Zod schema + JSON Schema to force Gemini to return predictable JSON instead of free text. This ensures the response always matches the MongoDB model.

2. **Memory Storage for Uploads** — Used Multer's memory storage instead of disk because the PDF is immediately parsed and only the text is stored. No raw files on disk = simpler cleanup and deployment.

3. **Cookie-based JWT** — Chose HTTP cookies over localStorage for JWT tokens because cookies are automatically sent with requests and can be httpOnly (preventing XSS access to tokens).

4. **Token Blacklisting** — Implemented a blacklist collection to invalidate tokens on logout, solving the "JWT can't be revoked" problem.

5. **Graceful AI Failure** — When Gemini API is unavailable, the app returns a clear 503 error with the `GEMINI_UNAVAILABLE` code. The frontend displays a user-friendly message instead of crashing.

---

## 👨‍💻 Author

**Namratha Jyoshika**
- GitHub: [github.com/Namratha36](https://github.com/Namratha36)

---

## 📜 License

This project is licensed under the MIT License.
