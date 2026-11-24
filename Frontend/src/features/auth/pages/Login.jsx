import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import "../auth.form.scss";

const Login = () => {
  const { user, handleLogin, handleGuestLogin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGuestLoading, setIsGuestLoading] = useState(false);
  const [error, setError] = useState("");

  // If already authenticated, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await handleLogin(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Invalid credentials. Please verify and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAutofillDemo = () => {
    setEmail("demo@resumeai.com");
    setPassword("Demo@12345");
    setError("");
  };

  const handleOneClickDemo = async () => {
    setError("");
    setIsSubmitting(true);
    try {
      await handleLogin("demo@resumeai.com", "Demo@12345");
      navigate("/dashboard");
    } catch (err) {
      setError("Demo login failed. Make sure the backend server and database are running.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGuestSession = async () => {
    setError("");
    setIsGuestLoading(true);
    try {
      await handleGuestLogin();
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Could not initialize guest session. Please try again.");
    } finally {
      setIsGuestLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="brand-badge">📄 ResumeAI Platform</div>
          <h1>Welcome Back</h1>
          <p>Sign in to access your resumes & interview prep reports</p>
        </div>

        <div className="auth-tabs">
          <Link to="/login" className="tab-btn active">
            Sign In
          </Link>
          <Link to="/register" className="tab-btn">
            Create Account
          </Link>
        </div>

        {error && (
          <div className="auth-error" role="alert">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? "Hide password" : "Show password"}
                tabIndex={-1}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="auth-submit-btn"
            disabled={isSubmitting || isGuestLoading}
          >
            {isSubmitting ? "Signing in..." : "Sign In to ResumeAI"}
          </button>
        </form>

        <div className="divider">
          <span>or instant access</span>
        </div>

        <div className="alternative-actions">
          <button
            type="button"
            className="btn-secondary btn-demo"
            onClick={handleOneClickDemo}
            disabled={isSubmitting || isGuestLoading}
          >
            ✨ One-Click Demo Login (Pre-loaded data)
          </button>

          <button
            type="button"
            className="btn-secondary"
            onClick={handleGuestSession}
            disabled={isSubmitting || isGuestLoading}
          >
            {isGuestLoading ? "Creating Guest Session..." : "👤 Continue as Guest (Private & Isolated)"}
          </button>
        </div>

        <div className="demo-callout">
          <div className="callout-header">
            <span>Demo Interview Credentials</span>
            <button type="button" className="fill-chip" onClick={handleAutofillDemo}>
              Autofill Form
            </button>
          </div>
          <div className="credentials-info">
            demo@resumeai.com &bull; Demo@12345
          </div>
        </div>

        <div className="auth-footer">
          Don't have an account yet?
          <Link to="/register">Create an account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
