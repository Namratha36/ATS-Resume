/**
 * Demo Data Seed Script
 * ---------------------
 * Creates a demo user and populates realistic sample interview reports.
 * Safe to run multiple times (idempotent) — checks for existing demo user.
 *
 * Usage:
 *   node seed-demo.js
 *
 * Demo credentials:
 *   Email:    demo@resumeai.com
 *   Password: Demo@12345
 */

require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userModel = require("./src/models/user.model");
const interviewReportModel = require("./src/models/interviewReport.model");

const DEMO_EMAIL = "demo@resumeai.com";
const DEMO_USERNAME = "alex_morgan";
const DEMO_PASSWORD = "Demo@12345";

const demoReports = [
  {
    jobDescription: `Software Engineering Intern — TechCorp Inc.

We are looking for a motivated Software Engineering Intern to join our development team. The ideal candidate is pursuing a degree in Computer Science and has foundational knowledge of programming.

Responsibilities:
- Write clean, maintainable code in Python and JavaScript
- Participate in code reviews and team stand-ups
- Assist in designing and implementing REST APIs
- Write unit tests and documentation
- Debug and resolve software defects

Requirements:
- Currently pursuing a B.Tech/B.E. in Computer Science or equivalent
- Proficiency in at least one of: Python, C++, Java, JavaScript
- Understanding of data structures and algorithms
- Familiarity with Git version control
- Strong problem-solving and communication skills

Nice to have:
- Experience with React or Node.js
- Exposure to MongoDB or SQL databases
- Personal or academic projects on GitHub`,

    resumeText: `Alex Morgan
Email: alex.morgan@university.edu | Phone: +91-9876543210
LinkedIn: linkedin.com/in/alexmorgan | GitHub: github.com/alexmorgan

EDUCATION
B.Tech in Computer Science and Engineering
National Institute of Technology | 2022 – 2026 | CGPA: 8.7/10

TECHNICAL SKILLS
Languages: Python, C++, JavaScript, SQL
Frameworks: React.js, Node.js, Express.js
Databases: MongoDB, MySQL
Tools: Git, VS Code, Postman, Docker (basics)
Concepts: Data Structures, Algorithms, REST APIs, OOP, DBMS

PROJECTS
TaskFlow — Full-Stack Task Manager (React, Node.js, MongoDB)
- Built a full-stack task management app with user authentication
- Implemented CRUD operations with REST API backend
- Used JWT for secure authentication and MongoDB for storage
- Deployed on Render with CI/CD via GitHub Actions

CodeBuddy — DSA Practice Tracker (Python, Flask, SQLite)
- Developed a web app to track daily DSA problem-solving progress
- Features include streak tracking, topic-wise analytics, and bookmarks
- Built with Flask backend and vanilla JavaScript frontend

EXPERIENCE
Open Source Contributor — Mozilla Firefox (2024)
- Fixed 3 bugs in the Firefox developer tools frontend
- Participated in code reviews and followed contribution guidelines

CERTIFICATIONS
- Meta Front-End Developer Professional Certificate (Coursera)
- Python for Data Science — IBM (edX)`,

    selfDescription:
      "I am a third-year Computer Science undergraduate passionate about full-stack web development and problem-solving. I have built multiple projects using React, Node.js, and MongoDB. I actively solve DSA problems on LeetCode (300+ solved). I am looking for an internship where I can contribute to real-world products while growing as an engineer.",

    overallScore: 82,
    isDemo: true,
    technicalQnA: [
      {
        question:
          "Explain the difference between SQL and NoSQL databases. When would you choose MongoDB over MySQL?",
        intention:
          "Tests understanding of database paradigms and practical decision-making skills",
        answer:
          "SQL databases are relational, use structured schemas and tables, support ACID transactions, and are ideal for complex queries with joins. Examples: MySQL, PostgreSQL. NoSQL databases like MongoDB are document-based, schema-flexible, and horizontally scalable. Choose MongoDB when your data is semi-structured (like user profiles, logs), when you need rapid iteration on schema, or when horizontal scaling is critical. Choose MySQL for financial data or applications requiring strict data integrity and complex relational queries.",
      },
      {
        question:
          "What is the time complexity of common operations in a Hash Map? When can it degrade?",
        intention:
          "Assesses understanding of data structures and algorithmic complexity",
        answer:
          "Average case: O(1) for insert, lookup, and delete. Worst case: O(n) when many keys hash to the same bucket (hash collision). This can happen with a poor hash function or adversarial input. Mitigation strategies include using a good hash function, resizing the table when the load factor exceeds a threshold, and using techniques like open addressing or chaining with balanced BSTs (Java 8+ HashMap uses red-black trees for long chains).",
      },
      {
        question:
          "Explain how JWT authentication works in a Node.js application.",
        intention:
          "Tests practical understanding of authentication implementation",
        answer:
          "JWT (JSON Web Token) is a stateless authentication mechanism. Flow: 1) User sends credentials to login endpoint. 2) Server validates credentials and generates a signed JWT containing user ID and metadata using a secret key. 3) Token is sent to client (via cookie or response body). 4) Client includes the token in subsequent requests. 5) Server middleware verifies the token signature and expiry, extracts user data, and attaches it to the request object. 6) For logout, the token is added to a blacklist collection in the database to prevent reuse. Benefits: stateless, scalable, works across microservices.",
      },
      {
        question:
          "How does React's Virtual DOM work and why is it efficient?",
        intention:
          "Tests understanding of React internals and rendering optimization",
        answer:
          "React maintains a lightweight JavaScript representation of the actual DOM called the Virtual DOM. When state changes: 1) React creates a new Virtual DOM tree. 2) It diffs the new tree against the previous one using a reconciliation algorithm. 3) It computes the minimal set of actual DOM mutations needed. 4) It batches and applies those mutations. This is efficient because direct DOM manipulation is expensive (triggers reflows and repaints), while JavaScript object comparison is fast. React's fiber architecture further optimizes this with prioritized, interruptible rendering.",
      },
      {
        question:
          "What is a REST API? Explain REST principles and how you implemented them.",
        intention:
          "Tests API design knowledge and practical implementation experience",
        answer:
          "REST (Representational State Transfer) is an architectural style for designing networked APIs. Key principles: 1) Stateless — each request contains all information needed. 2) Resource-based — URLs represent resources (nouns, not verbs): /api/users, /api/reports. 3) HTTP methods define operations: GET (read), POST (create), PUT/PATCH (update), DELETE (remove). 4) Standard status codes: 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found. In my TaskFlow project, I implemented RESTful endpoints for tasks with proper HTTP methods, JSON request/response bodies, authentication middleware, and error handling.",
      },
    ],
    behavioralQnA: [
      {
        question:
          "Tell me about a challenging bug you encountered and how you resolved it.",
        intention:
          "Assesses problem-solving approach, debugging skills, and persistence using the STAR method",
        answer:
          "Situation: While building the TaskFlow project, authenticated users were intermittently getting 401 errors even with valid tokens. Task: I needed to identify why valid JWT tokens were being rejected randomly. Action: I added logging to the auth middleware and discovered the issue was a race condition — when a user logged out on one tab and the blacklisted token check was cached. I fixed it by ensuring the blacklist check always queries the database directly and added proper error messages. Result: Authentication became 100% reliable, and I learned the importance of not caching security-critical checks.",
      },
      {
        question:
          "Describe a time when you had to learn a new technology quickly for a project.",
        intention:
          "Tests learning agility and self-motivation",
        answer:
          "Situation: For my TaskFlow project, I needed to implement real-time features but had never used WebSockets. Task: Learn and implement a real-time notification system within a 2-week sprint. Action: I spent the first 3 days going through the Socket.io documentation and building small prototypes. Then I integrated it into the existing Express backend, handling connection management and room-based notifications. I used YouTube tutorials, the official docs, and Stack Overflow. Result: Successfully implemented real-time task update notifications. The experience taught me that breaking new technology into small experiments reduces the learning curve significantly.",
      },
      {
        question:
          "How do you handle disagreements with a teammate about a technical approach?",
        intention:
          "Tests teamwork, communication, and professional maturity",
        answer:
          "I believe in data-driven discussions. First, I make sure I fully understand the other person's perspective by asking clarifying questions. Then I present my reasoning with concrete examples — code benchmarks, documentation references, or diagrams. If we still disagree, I suggest building small prototypes of both approaches to compare objectively. In my open-source contribution to Mozilla, I had a discussion with a maintainer about a CSS approach. I created a codepen demonstrating both options, which helped us reach a consensus quickly. The key is focusing on the problem, not the person.",
      },
    ],
    skillGaps: [
      { skill: "Docker & Containerization", severity: "medium" },
      { skill: "CI/CD Pipelines", severity: "medium" },
      { skill: "System Design Fundamentals", severity: "high" },
      { skill: "Testing (Unit & Integration)", severity: "medium" },
    ],
    preparationPlan: [
      {
        day: 1,
        focus: "Data Structures Review",
        tasks: [
          "Review Arrays, Strings, and HashMap patterns",
          "Solve 5 LeetCode medium problems on these topics",
          "Write time/space complexity analysis for each solution",
        ],
      },
      {
        day: 2,
        focus: "Trees & Graphs",
        tasks: [
          "Review BFS, DFS, and common tree traversal patterns",
          "Practice 4 graph/tree problems on LeetCode",
          "Understand when to use adjacency list vs matrix",
        ],
      },
      {
        day: 3,
        focus: "System Design Basics",
        tasks: [
          "Study client-server architecture and load balancing concepts",
          "Understand database scaling: sharding, replication, indexing",
          "Design a simple URL shortener system on paper",
        ],
      },
      {
        day: 4,
        focus: "Docker & Deployment",
        tasks: [
          "Complete Docker getting started tutorial",
          "Containerize the TaskFlow project with a Dockerfile",
          "Understand docker-compose for multi-service setups",
        ],
      },
      {
        day: 5,
        focus: "Testing & CI/CD",
        tasks: [
          "Write unit tests for 3 API endpoints using Jest/Supertest",
          "Set up a basic GitHub Actions CI pipeline",
          "Learn about integration testing patterns",
        ],
      },
      {
        day: 6,
        focus: "Mock Interview Practice",
        tasks: [
          "Practice explaining projects with the STAR method",
          "Do a timed 45-minute coding challenge",
          "Review all behavioral question answers out loud",
        ],
      },
      {
        day: 7,
        focus: "Final Review",
        tasks: [
          "Review all weak areas identified in skill gaps",
          "Re-read project READMEs and architecture notes",
          "Prepare 3 thoughtful questions to ask the interviewer",
        ],
      },
    ],
  },
  {
    jobDescription: `Full-Stack Developer Intern — WebScale Solutions

We are seeking a Full-Stack Developer Intern who is comfortable working across the entire web stack. You will help build and maintain client-facing web applications.

Responsibilities:
- Develop responsive frontend interfaces using React.js
- Build and maintain backend services using Node.js and Express
- Design and query MongoDB databases
- Implement authentication and authorization
- Write clean, tested, and documented code
- Collaborate with designers and product managers

Requirements:
- Strong proficiency in JavaScript/TypeScript
- Experience with React.js and state management
- Backend experience with Node.js and Express
- Database experience with MongoDB or PostgreSQL
- Understanding of RESTful API design
- Experience with Git and collaborative development

Preferred:
- Experience with Next.js or similar frameworks
- Knowledge of deployment (Vercel, AWS, Heroku)
- Understanding of web security best practices`,

    resumeText: `Alex Morgan
Email: alex.morgan@university.edu | GitHub: github.com/alexmorgan

EDUCATION
B.Tech in Computer Science — National Institute of Technology (2022–2026) | CGPA: 8.7

SKILLS
Frontend: React.js, HTML5, CSS3, JavaScript ES6+, Responsive Design
Backend: Node.js, Express.js, REST API Design
Database: MongoDB, Mongoose ODM, MySQL
Tools: Git, GitHub, Postman, VS Code, npm
Other: JWT Auth, bcrypt, Multer (file uploads), PDF parsing

PROJECTS
TaskFlow — Task Management App
- Full-stack CRUD app with React frontend and Express/MongoDB backend
- JWT authentication with token blacklisting
- Responsive UI with real-time validation

ResumeAI — AI-Powered Interview Prep Tool
- Resume upload with PDF text extraction using pdf-parse
- Gemini AI integration for interview report generation
- Structured reports with technical questions, skill gaps, and prep plans
- User-scoped data with protected API endpoints`,

    selfDescription:
      "I am a full-stack developer with hands-on experience building production-quality web apps using the MERN stack. My ResumeAI project demonstrates end-to-end development including authentication, file handling, AI integration, and structured data modeling. I enjoy building features that solve real problems.",

    overallScore: 88,
    isDemo: true,
    technicalQnA: [
      {
        question:
          "Explain the MERN stack and how the components interact in a typical application.",
        intention:
          "Tests holistic understanding of full-stack architecture",
        answer:
          "MERN stands for MongoDB, Express.js, React.js, and Node.js. MongoDB is the NoSQL document database that stores data as JSON-like documents. Express.js is a minimal Node.js web framework that handles HTTP routing and middleware. React.js is the frontend library for building component-based UIs with a Virtual DOM. Node.js is the JavaScript runtime that enables server-side execution. In a typical flow: React sends HTTP requests to Express API endpoints. Express middleware handles auth, validation, and file uploads. Controllers process business logic and interact with MongoDB via Mongoose ODM. Responses flow back as JSON to React, which updates the UI reactively.",
      },
      {
        question:
          "How would you handle file uploads in a Node.js application?",
        intention:
          "Tests practical backend development skills and library knowledge",
        answer:
          "I use Multer middleware for file uploads. Setup: configure storage (disk or memory), set file size limits, and filter by MIME type. For my ResumeAI project, I use memory storage since the PDF is immediately parsed and not stored as a file. Flow: 1) Client sends multipart/form-data with the file. 2) Multer middleware intercepts, validates size (3MB limit), and attaches the file buffer to req.file. 3) Controller uses pdf-parse to extract text from the buffer. 4) Extracted text is stored in MongoDB, not the raw file. Security considerations: validate file type, limit size, never trust the filename, and use memory storage when you don't need to persist the raw file.",
      },
      {
        question:
          "What is CORS and why is it important? How did you configure it?",
        intention:
          "Tests understanding of web security fundamentals",
        answer:
          "CORS (Cross-Origin Resource Sharing) is a browser security mechanism that restricts web pages from making requests to a different origin (domain, port, or protocol) than the one that served the page. Without CORS headers, the browser blocks cross-origin requests. In ResumeAI, the React frontend runs on localhost:5173 and the Express backend on localhost:3000 — different ports mean different origins. I configured CORS using the `cors` npm package: `cors({ origin: 'http://localhost:5173', credentials: true })`. The `credentials: true` flag is essential because we use HTTP-only cookies for JWT tokens. Without it, cookies won't be sent cross-origin.",
      },
      {
        question:
          "Explain React Context API and when you would use it over prop drilling.",
        intention:
          "Tests React state management understanding",
        answer:
          "React Context API provides a way to share state across the component tree without passing props through every intermediate component (prop drilling). I use it in ResumeAI for authentication state: the AuthContext holds the current user and loading state, and any component in the tree can access it via useContext(AuthContext). Use Context when: 1) State is needed by many components at different nesting levels. 2) The state changes infrequently (auth state, theme, locale). Avoid Context for frequently changing state (form inputs, animations) because every consumer re-renders on context change. For complex state management, consider Redux or Zustand instead.",
      },
    ],
    behavioralQnA: [
      {
        question:
          "Describe a project you are most proud of and explain your contribution.",
        intention:
          "Assesses passion, ownership, and ability to articulate technical work",
        answer:
          "Situation: I wanted to build something that solves a real problem I faced — preparing for technical interviews without knowing what skills I was missing. Task: Build an end-to-end application that analyzes resumes against job descriptions using AI. Action: I designed the full architecture: React frontend with auth context, Express backend with JWT security, MongoDB for data persistence, and Gemini AI for intelligent analysis. I implemented PDF upload with text extraction, structured AI prompts with Zod schema validation for reliable JSON responses, and user-scoped data isolation. Result: ResumeAI generates detailed interview prep reports with technical questions, behavioral questions, skill gap analysis, and a day-by-day preparation plan. It taught me how to integrate AI APIs with structured output, handle file processing, and build production-quality auth systems.",
      },
      {
        question:
          "How do you prioritize tasks when working on multiple features simultaneously?",
        intention:
          "Tests organizational skills and work management",
        answer:
          "I follow a priority matrix approach. First, I categorize tasks as: 1) Critical path — features that other work depends on (e.g., authentication before protected routes). 2) High impact — features visible to users. 3) Nice-to-have — improvements that can wait. For ResumeAI, I built auth first, then the core AI analysis pipeline, then the report display UI, and finally polish items. I use GitHub issues and a simple Kanban approach to track progress. When I'm stuck on one task, I context-switch to a non-dependent task to maintain momentum.",
      },
    ],
    skillGaps: [
      { skill: "TypeScript", severity: "medium" },
      { skill: "Next.js / SSR Frameworks", severity: "medium" },
      { skill: "Deployment & DevOps", severity: "high" },
    ],
    preparationPlan: [
      {
        day: 1,
        focus: "React Advanced Patterns",
        tasks: [
          "Study custom hooks, memoization (useMemo, useCallback)",
          "Build a custom hook for API fetching with loading/error states",
          "Review React performance optimization techniques",
        ],
      },
      {
        day: 2,
        focus: "Node.js Deep Dive",
        tasks: [
          "Study the Node.js event loop in detail",
          "Understand streams and buffer handling",
          "Practice building middleware chains in Express",
        ],
      },
      {
        day: 3,
        focus: "MongoDB Advanced",
        tasks: [
          "Study aggregation pipeline with practical examples",
          "Understand indexing strategies and query optimization",
          "Practice schema design patterns (embedding vs referencing)",
        ],
      },
      {
        day: 4,
        focus: "TypeScript Fundamentals",
        tasks: [
          "Complete TypeScript handbook basics",
          "Convert one React component to TypeScript",
          "Understand generics and utility types",
        ],
      },
      {
        day: 5,
        focus: "Deployment Practice",
        tasks: [
          "Deploy a React app to Vercel",
          "Deploy a Node.js API to Render",
          "Set up environment variables for production",
        ],
      },
    ],
  },
  {
    jobDescription: `AI/ML Research Intern — DataMinds AI Lab

We are looking for a passionate AI/ML Research Intern to assist with NLP and machine learning projects.

Responsibilities:
- Assist in developing and fine-tuning ML models
- Preprocess and analyze large text datasets
- Implement and evaluate NLP pipelines
- Write research reports and documentation
- Collaborate with the ML engineering team

Requirements:
- Strong Python programming skills
- Understanding of ML fundamentals (supervised/unsupervised learning, evaluation metrics)
- Familiarity with NLP concepts (tokenization, embeddings, transformers)
- Experience with libraries: NumPy, Pandas, scikit-learn
- Basic understanding of deep learning frameworks (PyTorch or TensorFlow)
- Good technical writing skills

Preferred:
- Experience with Hugging Face Transformers
- Knowledge of LLM APIs (Gemini, OpenAI)
- Research paper reading experience
- Kaggle participation`,

    resumeText: `Alex Morgan
Email: alex.morgan@university.edu | GitHub: github.com/alexmorgan

EDUCATION
B.Tech in Computer Science — National Institute of Technology (2022–2026) | CGPA: 8.7

SKILLS
Languages: Python, C++, JavaScript, SQL
ML/AI: scikit-learn, NumPy, Pandas, Matplotlib, basic PyTorch
Web: React.js, Node.js, Express.js, MongoDB
API Integration: Gemini AI (structured output with Zod schemas)
Tools: Git, Jupyter Notebooks, VS Code, Postman

RELEVANT COURSEWORK
Data Structures & Algorithms, Database Systems, Machine Learning (audit), Linear Algebra, Probability & Statistics

PROJECTS
ResumeAI — AI-Powered Interview Prep (Node.js, Gemini API)
- Integrated Gemini AI for structured resume analysis
- Designed Zod schemas for validated AI JSON output
- Built complete interview report generation pipeline

Sentiment Analyzer — Movie Review Classifier (Python, scikit-learn)
- Built a text classification pipeline using TF-IDF and Logistic Regression
- Achieved 87% accuracy on IMDB dataset
- Implemented data preprocessing, feature extraction, and model evaluation`,

    selfDescription:
      "I am a CS undergraduate with growing interest in AI/ML and NLP. While my primary strength is full-stack web development, I have foundational knowledge of machine learning through coursework and a sentiment analysis project. My ResumeAI project demonstrates practical AI API integration with structured output. I am eager to deepen my ML skills through hands-on research experience.",

    overallScore: 65,
    isDemo: true,
    technicalQnA: [
      {
        question:
          "Explain the difference between supervised and unsupervised learning with examples.",
        intention:
          "Tests foundational ML knowledge",
        answer:
          "Supervised learning trains on labeled data — input-output pairs. The model learns a mapping function. Examples: classification (spam detection, sentiment analysis), regression (house price prediction). Common algorithms: Linear Regression, Logistic Regression, Decision Trees, SVM, Neural Networks. Unsupervised learning trains on unlabeled data — the model finds hidden patterns or structure. Examples: clustering (customer segmentation with K-Means), dimensionality reduction (PCA for visualization), anomaly detection. Semi-supervised learning combines both — uses a small labeled dataset with a large unlabeled one, common in NLP where labeling is expensive.",
      },
      {
        question:
          "How does TF-IDF work and why is it useful for text classification?",
        intention:
          "Tests NLP fundamentals and practical experience",
        answer:
          "TF-IDF (Term Frequency — Inverse Document Frequency) converts text into numerical vectors for ML models. TF measures how frequently a word appears in a document. IDF measures how rare or common a word is across all documents — common words like 'the' get low IDF, rare domain-specific words get high IDF. TF-IDF = TF × IDF. This gives high weights to words that are frequent in a specific document but rare overall — these are the most discriminative features. In my sentiment analysis project, I used TF-IDF with scikit-learn's TfidfVectorizer to convert movie reviews into feature vectors, then trained a Logistic Regression classifier that achieved 87% accuracy.",
      },
      {
        question:
          "What are Transformer models and why are they important in modern NLP?",
        intention:
          "Tests awareness of modern ML architectures",
        answer:
          "Transformers are neural network architectures introduced in the 'Attention is All You Need' paper (2017). Key innovation: the self-attention mechanism, which allows the model to weigh the importance of different words in a sequence relative to each other, regardless of distance. Unlike RNNs which process sequentially, Transformers process all tokens in parallel, making them faster to train. Architecture: encoder (understands input) and decoder (generates output). BERT uses only the encoder for understanding tasks. GPT uses only the decoder for generation. Modern LLMs like Gemini, GPT-4, and LLaMA are all based on the Transformer architecture scaled up with billions of parameters and trained on massive text corpora.",
      },
      {
        question:
          "How did you integrate the Gemini API in your ResumeAI project?",
        intention:
          "Tests practical AI API integration experience",
        answer:
          "I used the @google/genai SDK to call Gemini's content generation API. Key implementation details: 1) Defined a Zod schema specifying the exact JSON structure I wanted (overallScore, technicalQuestions, behavioralQuestions, skillGaps, preparationPlan). 2) Converted the Zod schema to JSON Schema using zod-to-json-schema. 3) Passed the schema as responseSchema in the API config with responseMimeType set to 'application/json'. This ensures Gemini returns structured, validated JSON instead of free-form text. 4) Parsed the response and stored it directly in MongoDB. This approach guarantees consistent, type-safe AI output that matches my database model — much more reliable than parsing free-text AI responses.",
      },
    ],
    behavioralQnA: [
      {
        question:
          "How do you approach learning a complex new topic you have limited experience with?",
        intention:
          "Tests learning methodology and self-awareness about skill gaps",
        answer:
          "Situation: When I decided to add AI integration to ResumeAI, I had no prior experience with LLM APIs or structured AI output. Task: Learn Gemini API integration well enough to build a reliable, production-quality feature. Action: I followed a structured approach: 1) Read the official documentation end-to-end. 2) Built a minimal 'hello world' test (invokeGeminiAi function). 3) Experimented with different prompts and studied the response format. 4) Researched structured output techniques and discovered Zod schema validation. 5) Built the final integration incrementally, testing each piece. Result: Successfully built a reliable AI pipeline that generates structured interview reports. My learning method: start with fundamentals, build small experiments, then integrate into the real project.",
      },
      {
        question:
          "Tell me about a time you received critical feedback on your work.",
        intention:
          "Tests receptiveness to feedback and growth mindset",
        answer:
          "Situation: During my Mozilla open-source contribution, a reviewer pointed out that my CSS fix, while functionally correct, didn't follow the project's BEM naming convention and lacked sufficient comments. Task: Address the feedback without being defensive and improve the contribution. Action: I thanked the reviewer, studied the project's CSS style guide thoroughly, refactored my changes to follow BEM conventions, added clear comments, and also fixed a similar inconsistency I noticed in adjacent code. Result: The PR was approved on the second review, and the maintainer specifically appreciated the extra cleanup. I learned that code style and conventions matter as much as functionality in collaborative projects.",
      },
    ],
    skillGaps: [
      { skill: "Deep Learning (PyTorch/TensorFlow)", severity: "high" },
      { skill: "Hugging Face Transformers", severity: "high" },
      { skill: "Research Paper Reading", severity: "medium" },
      { skill: "Experiment Tracking (MLflow/W&B)", severity: "medium" },
      { skill: "Advanced NLP Techniques", severity: "high" },
    ],
    preparationPlan: [
      {
        day: 1,
        focus: "ML Fundamentals Review",
        tasks: [
          "Review bias-variance tradeoff, overfitting, cross-validation",
          "Practice implementing Linear Regression and Logistic Regression from scratch",
          "Understand evaluation metrics: accuracy, precision, recall, F1, AUC-ROC",
        ],
      },
      {
        day: 2,
        focus: "NLP Foundations",
        tasks: [
          "Study text preprocessing: tokenization, stemming, lemmatization, stop words",
          "Implement a text classification pipeline with TF-IDF + Naive Bayes",
          "Understand word embeddings: Word2Vec, GloVe concepts",
        ],
      },
      {
        day: 3,
        focus: "Deep Learning Basics",
        tasks: [
          "Complete PyTorch 60-minute blitz tutorial",
          "Build a simple neural network for MNIST classification",
          "Understand backpropagation and gradient descent intuitively",
        ],
      },
      {
        day: 4,
        focus: "Transformers & Hugging Face",
        tasks: [
          "Read 'Attention Is All You Need' paper summary",
          "Complete Hugging Face quick start tutorial",
          "Fine-tune a pre-trained model on a small text dataset",
        ],
      },
      {
        day: 5,
        focus: "Project & Interview Prep",
        tasks: [
          "Prepare to explain ResumeAI's Gemini integration in depth",
          "Practice explaining the sentiment analysis project with metrics",
          "Review 10 common ML interview questions with answers",
        ],
      },
    ],
  },
];

async function seedDemoData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to database for seeding.");

    // Check if demo user already exists
    let demoUser = await userModel.findOne({ email: DEMO_EMAIL });

    if (demoUser) {
      console.log("Demo user already exists. Cleaning old demo reports...");
      await interviewReportModel.deleteMany({
        user: demoUser._id,
        isDemo: true,
      });
    } else {
      // Create demo user
      const hashedPassword = await bcrypt.hash(DEMO_PASSWORD, 10);
      demoUser = await userModel.create({
        username: DEMO_USERNAME,
        email: DEMO_EMAIL,
        password: hashedPassword,
      });
      console.log("Demo user created:", DEMO_EMAIL);
    }

    // Insert demo reports
    const reportsToInsert = demoReports.map((report) => ({
      ...report,
      user: demoUser._id,
      technicalQnA: report.technicalQnA.map((q) => ({
        question: q.question,
        intention: q.intention,
        answer: q.answer,
      })),
      behavioralQnA: report.behavioralQnA.map((q) => ({
        question: q.question,
        intention: q.intention,
        answer: q.answer,
      })),
    }));

    await interviewReportModel.insertMany(reportsToInsert);
    console.log(`Inserted ${reportsToInsert.length} demo interview reports.`);

    console.log("\n========================================");
    console.log("  DEMO DATA SEEDED SUCCESSFULLY");
    console.log("========================================");
    console.log(`  Email:    ${DEMO_EMAIL}`);
    console.log(`  Password: ${DEMO_PASSWORD}`);
    console.log("========================================\n");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seedDemoData();
