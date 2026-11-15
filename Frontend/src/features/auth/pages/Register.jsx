import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import "../auth.form.scss";

const Register = () => {
  const { user, handleRegister, handleGuestLogin } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGuestLoading, setIsGuestLoading] = useState(false);
  const [error, setError] = useState("");

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please re-check.");
      return;
    }

    setIsSubmitting(true);
    try {
      await handleRegister(username, email, password);
      navigate("/");
    } catch (err) {
      setError(err.message || "Registration failed. Please try a different username/email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGuestSession = async () => {
    setError("");
    setIsGuestLoading(true);
    try {
      await handleGuestLogin();
      navigate("/");
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
          <h1>Create Account</h1>
          <p>Join to analyze resumes, track skill gaps & prep for interviews</p>
        </div>

        <div className="auth-tabs">
          <Link to="/login" className="tab-btn">
            Sign In
          </Link>
          <Link to="/register" className="tab-btn active">
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
            <label htmlFor="username">Full Name / Username</label>
            <div className="input-wrapper">
              <input
                id="username"
                type="text"
                placeholder="e.g. alex_morgan"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
              />
            </div>
          </div>

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
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
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
            <span className="field-hint">Minimum 6 characters</span>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-wrapper">
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="auth-submit-btn"
            disabled={isSubmitting || isGuestLoading}
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="divider">
          <span>or try without registering</span>
        </div>

        <div className="alternative-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={handleGuestSession}
            disabled={isSubmitting || isGuestLoading}
          >
            {isGuestLoading ? "Creating Guest Session..." : "👤 Continue as Guest (Isolated Workspace)"}
          </button>
        </div>

        <div className="auth-footer">
          Already have an account?
          <Link to="/login">Sign in here</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
