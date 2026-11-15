const bcrypt = require("bcryptjs");

// In-Memory & Local Fallback Store
const memoryDB = {
  users: [],
  reports: [],
  blacklist: [],
};

const DEMO_EMAIL = "demo@resumeai.com";
const DEMO_USERNAME = "alex_morgan";
const DEMO_USER_ID = "660000000000000000000001";

// Demo Reports to initialize automatically
const defaultDemoReports = [
  {
    _id: "660000000000000000000011",
    user: DEMO_USER_ID,
    jobDescription: `Software Engineering Intern — TechCorp Inc.

We are looking for a motivated Software Engineering Intern to join our development team. Pursuing degree in Computer Science.
Responsibilities:
- Write clean, maintainable code in Python and JavaScript
- Assist in designing and implementing REST APIs
- Write unit tests and documentation
Requirements:
- Proficiency in Python, C++, or JavaScript
- Data structures and algorithms
- Git version control`,
    resumeText: `Alex Morgan | alex.morgan@university.edu
B.Tech in Computer Science — CGPA: 8.7/10
Skills: Python, C++, JavaScript, React.js, Node.js, MongoDB, Git, SQL
Projects: TaskFlow (Full-Stack CRUD), CodeBuddy (DSA Tracker)
Experience: Open Source Contributor — Mozilla Firefox`,
    selfDescription:
      "Third-year Computer Science undergraduate passionate about full-stack development and algorithms. Solved 300+ LeetCode problems.",
    overallScore: 82,
    isDemo: true,
    technicalQnA: [
      {
        question:
          "Explain the difference between SQL and NoSQL databases. When would you choose MongoDB over MySQL?",
        intention:
          "Tests database paradigms and practical architectural decision-making",
        answer:
          "SQL databases are relational and structured with ACID transactions (e.g. MySQL). NoSQL databases like MongoDB are document-oriented and horizontally scalable. Choose MongoDB for flexible schemas and rapid iteration; choose MySQL for complex relational integrity.",
      },
      {
        question:
          "What is the time complexity of common operations in a Hash Map?",
        intention:
          "Assesses data structures and algorithmic complexity understanding",
        answer:
          "Average case is O(1) for insert, lookup, and delete. Worst case is O(n) under severe hash collisions. Mitigated via good hashing and resizing thresholds.",
      },
      {
        question: "Explain how JWT authentication works in a Node.js application.",
        intention: "Tests practical security and stateless authentication flow",
        answer:
          "User credentials are exchanged for a signed token containing user ID and expiry. Client sends this token on subsequent requests. Server validates signature and checks token blacklist for logout.",
      },
    ],
    behavioralQnA: [
      {
        question:
          "Tell me about a challenging bug you encountered and how you resolved it.",
        intention: "Assesses problem-solving methodology using STAR",
        answer:
          "Situation: Intermittent 401 errors during auth in TaskFlow. Action: Traced middleware race condition in cached blacklist lookups. Result: Re-architected direct verification, eliminating all session drops.",
      },
    ],
    skillGaps: [
      { skill: "Docker & Containerization", severity: "medium" },
      { skill: "System Design Fundamentals", severity: "high" },
      { skill: "CI/CD Pipelines", severity: "medium" },
    ],
    preparationPlan: [
      {
        day: 1,
        focus: "Data Structures Review",
        tasks: ["Review Arrays, Strings, and HashMap patterns", "Solve 5 LeetCode medium problems"],
      },
      {
        day: 2,
        focus: "System Design Basics",
        tasks: ["Study client-server architecture", "Understand database scaling and sharding"],
      },
      {
        day: 3,
        focus: "Docker & Deployment",
        tasks: ["Containerize Node.js app", "Review Dockerfile best practices"],
      },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    _id: "660000000000000000000012",
    user: DEMO_USER_ID,
    jobDescription: `Full-Stack Developer Intern — WebScale Solutions
Responsibilities:
- Develop responsive frontend interfaces using React.js
- Build and maintain backend services using Node.js and Express
- Implement authentication and authorization
Requirements:
- JavaScript/TypeScript, React.js, Node.js, Express, MongoDB`,
    resumeText: `Alex Morgan | Full-Stack Developer
Skills: React.js, Node.js, Express.js, MongoDB, JWT Auth, Multer, REST APIs
Projects: TaskFlow (Task Manager), ResumeAI (Interview Prep Tool)`,
    selfDescription:
      "Full-stack developer with experience building production-quality web applications using the MERN stack.",
    overallScore: 88,
    isDemo: true,
    technicalQnA: [
      {
        question: "Explain the MERN stack and how components interact.",
        intention: "Tests holistic full-stack architecture comprehension",
        answer:
          "React handles the frontend UI, Node/Express handles the REST API and business logic, and MongoDB stores JSON documents via Mongoose.",
      },
      {
        question: "How do you handle file uploads in Node.js?",
        intention: "Tests backend middleware knowledge",
        answer:
          "Using Multer with memoryStorage to buffer files in memory, immediately parsing with pdf-parse and storing extracted text rather than raw files.",
      },
    ],
    behavioralQnA: [
      {
        question: "Describe a project you are most proud of.",
        intention: "Evaluates ownership and technical articulation",
        answer:
          "Designed ResumeAI end-to-end with React frontend, JWT security, and structured AI response modeling.",
      },
    ],
    skillGaps: [
      { skill: "TypeScript", severity: "medium" },
      { skill: "Next.js / SSR Frameworks", severity: "medium" },
      { skill: "DevOps & Cloud", severity: "high" },
    ],
    preparationPlan: [
      {
        day: 1,
        focus: "React Advanced Patterns",
        tasks: ["Custom hooks", "useMemo & useCallback optimization"],
      },
      {
        day: 2,
        focus: "TypeScript Migration",
        tasks: ["Study interfaces and generics", "Convert sample components to TS"],
      },
    ],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    _id: "660000000000000000000013",
    user: DEMO_USER_ID,
    jobDescription: `AI/ML Research Intern — DataMinds AI Lab
Requirements:
- Python programming, scikit-learn, NumPy, Pandas
- Familiarity with NLP (embeddings, transformers)
- Understanding of LLM APIs (Gemini, OpenAI)`,
    resumeText: `Alex Morgan | CS Undergraduate
Skills: Python, C++, scikit-learn, NumPy, Pandas, Gemini API
Projects: Sentiment Analyzer (TF-IDF + Logistic Regression, 87% accuracy), ResumeAI`,
    selfDescription:
      "CS student with foundational knowledge of NLP and machine learning, and hands-on Gemini API structured output experience.",
    overallScore: 65,
    isDemo: true,
    technicalQnA: [
      {
        question: "Explain the difference between supervised and unsupervised learning.",
        intention: "Foundational ML theory evaluation",
        answer:
          "Supervised learning trains on labeled data (classification/regression); unsupervised finds inherent structure in unlabeled data (clustering/PCA).",
      },
      {
        question: "How does TF-IDF work?",
        intention: "Tests NLP text representation fundamentals",
        answer:
          "Term Frequency multiplied by Inverse Document Frequency weights terms that are frequent in a given document but rare across the corpus.",
      },
    ],
    behavioralQnA: [
      {
        question: "How do you approach learning complex new technologies?",
        intention: "Tests self-directed learning approach",
        answer:
          "Break down documentation, build minimal prototypes, study failure cases, and integrate incrementally.",
      },
    ],
    skillGaps: [
      { skill: "Deep Learning (PyTorch)", severity: "high" },
      { skill: "Hugging Face Transformers", severity: "high" },
      { skill: "Advanced NLP Techniques", severity: "high" },
    ],
    preparationPlan: [
      {
        day: 1,
        focus: "Deep Learning Fundamentals",
        tasks: ["PyTorch blitz tutorial", "Implement simple feedforward network"],
      },
      {
        day: 2,
        focus: "Transformer Architectures",
        tasks: ["Read 'Attention Is All You Need'", "Hugging Face quickstart"],
      },
    ],
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
];

async function initDemoData() {
  const hashedPassword = await bcrypt.hash("Demo@12345", 10);
  memoryDB.users = [
    {
      _id: DEMO_USER_ID,
      username: DEMO_USERNAME,
      email: DEMO_EMAIL,
      password: hashedPassword,
    },
  ];
  memoryDB.reports = [...defaultDemoReports];
  console.log("⚡ [ResumeAI] In-Memory Demo Store initialized with 3 sample reports.");
}

function enableFallbackModels(userModel, interviewReportModel, tokenBlacklistModel) {
  // Override userModel
  userModel.findOne = async function (query) {
    if (query.$or) {
      const [{ username }, { email }] = query.$or;
      return (
        memoryDB.users.find(
          (u) =>
            (username && u.username === username) ||
            (email && u.email === email)
        ) || null
      );
    }
    if (query.email) {
      return memoryDB.users.find((u) => u.email === query.email) || null;
    }
    return null;
  };

  userModel.findById = async function (id) {
    const stringId = id?.toString();
    return memoryDB.users.find((u) => u._id.toString() === stringId) || null;
  };

  userModel.create = async function (data) {
    const newUser = {
      _id: `user_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      ...data,
    };
    memoryDB.users.push(newUser);
    return newUser;
  };

  // Override interviewReportModel
  interviewReportModel.create = async function (data) {
    const newReport = {
      _id: `rep_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
      ...data,
    };
    memoryDB.reports.unshift(newReport);
    return newReport;
  };

  interviewReportModel.find = function (query) {
    const userId = query.user?.toString();
    let results = memoryDB.reports.filter(
      (r) => r.user.toString() === userId
    );

    return {
      select: function (fields) {
        const fieldList = fields.split(" ");
        const mapped = results.map((r) => {
          const item = {};
          fieldList.forEach((f) => {
            if (r[f] !== undefined) item[f] = r[f];
          });
          item._id = r._id;
          return item;
        });
        return {
          sort: function () {
            return mapped;
          },
        };
      },
      sort: function () {
        return results;
      },
    };
  };

  interviewReportModel.findOne = async function (query) {
    const reportId = query._id?.toString();
    const userId = query.user?.toString();
    return (
      memoryDB.reports.find(
        (r) =>
          r._id.toString() === reportId && r.user.toString() === userId
      ) || null
    );
  };

  interviewReportModel.countDocuments = async function (query) {
    const userId = query.user?.toString();
    return memoryDB.reports.filter((r) => r.user.toString() === userId).length;
  };

  interviewReportModel.deleteMany = async function (query) {
    const userId = query.user?.toString();
    memoryDB.reports = memoryDB.reports.filter(
      (r) => !(r.user.toString() === userId && (!query.isDemo || r.isDemo))
    );
    return { acknowledged: true };
  };

  interviewReportModel.insertMany = async function (reports) {
    reports.forEach((r) => {
      if (!r._id) {
        r._id = `rep_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      }
      if (!r.createdAt) {
        r.createdAt = new Date().toISOString();
      }
      memoryDB.reports.push(r);
    });
    return reports;
  };

  // Override tokenBlacklistModel
  tokenBlacklistModel.findOne = async function (query) {
    return memoryDB.blacklist.find((b) => b.token === query.token) || null;
  };

  tokenBlacklistModel.create = async function (data) {
    memoryDB.blacklist.push({ ...data, createdAt: new Date() });
    return data;
  };
}

module.exports = {
  memoryDB,
  initDemoData,
  enableFallbackModels,
};
