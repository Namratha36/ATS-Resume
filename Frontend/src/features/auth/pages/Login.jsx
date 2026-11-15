import React, { useState } from "react";
import "../auth.form.scss";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { loading, handleLogin, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // If already logged in, redirect
  if (user) {
    navigate("/");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await handleLogin(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message || "Login failed. Check your credentials.");
    }
  };

  if (loading) {
    return (
      <main>
        <h2 style={{ textAlign: "center", padding: "4rem" }}>Loading...</h2>
      </main>
    );
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <p className="form-subtitle">Welcome back to ResumeAI</p>

        {error && <div className="form-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              placeholder="Your password"
              required
            />
          </div>
          <button className="button primary-button" type="submit">
            Login
          </button>
        </form>

        <p className="form-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>

        <div className="demo-credentials">
          <p>
            <strong>Demo Account:</strong>
          </p>
          <p>Email: demo@resumeai.com</p>
          <p>Password: Demo@12345</p>
        </div>
      </div>
    </main>
  );
};

export default Login;
