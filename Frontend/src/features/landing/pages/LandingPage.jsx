import React from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../auth/hooks/useAuth";
import "./landing.scss";

const LandingPage = () => {
  const { user, handleGuestLogin } = useAuth();
  const navigate = useNavigate();

  const handleInstantDemo = async () => {
    try {
      await handleGuestLogin();
      navigate("/dashboard");
    } catch (e) {
      navigate("/login");
    }
  };

  return (
    <div className="landing-page">
      {/* Navigation Header */}
      <header className="landing-nav">
        <div className="nav-container">
          <Link to="/" className="brand">
            <span className="brand-icon">📄</span>
            <span className="brand-text">ResumeAI</span>
            <span className="brand-tag">PRO</span>
          </Link>

          <nav className="nav-links">
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#preview">Report Preview</a>
            <a href="#why-us">Why ResumeAI</a>
          </nav>

          <div className="nav-actions">
            {user ? (
              <Link to="/dashboard" className="btn btn-primary">
                Go to Dashboard →
              </Link>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost">
                  Sign In
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Get Started Free
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-badge">
            <span className="sparkle">✨</span>
            <span>AI-Powered Career & Interview Intelligence</span>
          </div>

          <h1 className="hero-title">
            Land Your Dream Tech Job with{" "}
            <span className="gradient-text">AI-Powered Resume Analysis</span>
          </h1>

          <p className="hero-description">
            Benchmark your resume against target job descriptions, uncover critical skill
            gaps, and generate custom technical Q&As, behavioral STAR answers, and a
            tailored preparation roadmap in seconds.
          </p>

          <div className="hero-cta-group">
            {user ? (
              <Link to="/dashboard" className="btn btn-hero-primary">
                Open Your Dashboard →
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn btn-hero-primary">
                  Analyze Your Resume Free →
                </Link>
                <button
                  type="button"
                  onClick={handleInstantDemo}
                  className="btn btn-hero-secondary"
                >
                  ⚡ Try Instant Guest Demo
                </button>
              </>
            )}
          </div>

          <div className="hero-trust">
            <span className="trust-item">✓ Instant Match Score</span>
            <span className="trust-item">✓ STAR Behavioral Guidance</span>
            <span className="trust-item">✓ 100% Private & Isolated</span>
          </div>

          {/* Interactive Report Preview Mockup */}
          <div className="hero-preview" id="preview">
            <div className="preview-card">
              <div className="preview-top">
                <div className="preview-score-badge">
                  <div className="score-num">88%</div>
                  <div className="score-sub">Match Score</div>
                </div>
                <div className="preview-header-meta">
                  <h3>Full-Stack Developer Intern &bull; WebScale Solutions</h3>
                  <p>Analyzed candidate resume: Alex Morgan</p>
                </div>
                <div className="status-pill">High Alignment</div>
              </div>

              <div className="preview-grid">
                <div className="preview-box">
                  <h4>💡 Targeted Technical Question</h4>
                  <p className="q-text">
                    "How do you handle file uploads in Express memory storage, and why is it preferred over disk for ephemeral processing?"
                  </p>
                  <span className="meta-tag">Includes Model Answer & Intent</span>
                </div>

                <div className="preview-box">
                  <h4>⚠️ Identified Skill Gaps</h4>
                  <div className="gap-tags">
                    <span className="gap-tag high">System Design (High)</span>
                    <span className="gap-tag medium">Docker & CI/CD (Med)</span>
                    <span className="gap-tag low">TypeScript (Low)</span>
                  </div>
                </div>

                <div className="preview-box">
                  <h4>🗺️ 5-Day Preparation Roadmap</h4>
                  <p className="roadmap-preview">
                    Day 1: React State & Custom Hooks &bull; Day 2: Node.js Streams & Event Loop &bull; Day 3: System Design
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="features">
        <div className="section-container">
          <div className="section-header">
            <span className="section-eyebrow">Comprehensive Toolkit</span>
            <h2>Everything You Need to Ace Your Next Interview</h2>
            <p>
              Built specifically for software engineers, full-stack developers, and AI/ML candidates.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>ATS Score & Skill Matching</h3>
              <p>
                Extract keywords and match resume qualifications against any job description to discover where you shine and where you fall short.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">💻</div>
              <h3>Curated Technical Q&A</h3>
              <p>
                Get technical interview questions matched to the exact tech stack of the job, complete with interviewer intentions and optimal answers.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🗣️</div>
              <h3>STAR Behavioral Answers</h3>
              <p>
                Structured Situation, Task, Action, and Result frameworks tailored to your actual project experiences to conquer behavioral rounds.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Visual Skill Gap Severity</h3>
              <p>
                Pinpoint High, Medium, and Low severity skill gaps so you know exactly which technologies to prioritize before your interview.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📅</div>
              <h3>Personalized Prep Roadmap</h3>
              <p>
                A structured day-by-day study plan with specific tasks, coding practice goals, and system design topics for focused preparation.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Private & Isolated Sessions</h3>
              <p>
                Your resumes and reports are scoped strictly to your account. Guest sessions are completely isolated with cryptographic tokens.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-section" id="how-it-works">
        <div className="section-container">
          <div className="section-header">
            <span className="section-eyebrow">Simple 3-Step Process</span>
            <h2>How ResumeAI Works</h2>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">01</div>
              <h3>Upload Your Resume</h3>
              <p>
                Upload your resume PDF (up to 3MB). Our server-side parser safely extracts all technical skills, projects, and work experience.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">02</div>
              <h3>Paste Target Job Description</h3>
              <p>
                Provide the job requirements and a short summary of yourself. Our engine performs structured keyword & context analysis.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">03</div>
              <h3>Receive Your Report</h3>
              <p>
                Access your interactive 5-tab report featuring score benchmarking, technical Q&As, behavioral stories, and your study plan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="why-section" id="why-us">
        <div className="section-container">
          <div className="why-card">
            <div className="why-content">
              <h2>Why Traditional Resume Checkers Fall Short</h2>
              <p>
                Generic ATS checkers only count keywords. ResumeAI understands software architecture, modern frameworks, and what engineering managers actually look for during interviews.
              </p>
              <ul className="why-list">
                <li>✨ Formatted for real engineering roles, not generic business positions</li>
                <li>✨ Actionable technical & behavioral questions, not vague advice</li>
                <li>✨ Instant zero-setup demo mode for immediate testing</li>
              </ul>
            </div>
            <div className="why-cta">
              <h3>Start Preparing Today</h3>
              <p>Free for candidates. No credit card required.</p>
              <Link to="/register" className="btn btn-primary btn-large">
                Create Free Account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-container">
          <div className="footer-brand">
            <span className="brand-icon">📄</span>
            <span className="brand-text">ResumeAI</span>
            <p>AI-Powered Career Intelligence & Technical Interview Preparation Platform.</p>
          </div>

          <div className="footer-links">
            <div className="footer-col">
              <h4>Navigation</h4>
              <Link to="/login">Sign In</Link>
              <Link to="/register">Create Account</Link>
              <Link to="/dashboard">Dashboard</Link>
            </div>

            <div className="footer-col">
              <h4>Platform</h4>
              <Link to="/analyze">Analyze Resume</Link>
              <Link to="/reports">Report History</Link>
              <Link to="/profile">Profile</Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} ResumeAI. Built for engineering candidates.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
