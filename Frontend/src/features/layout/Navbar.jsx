import React from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../auth/hooks/useAuth";
import "./navbar.scss";

const Navbar = () => {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();

  const onLogout = async () => {
    await handleLogout();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <span className="brand-icon">📄</span> ResumeAI
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/analyze">Analyze</Link>
        <Link to="/reports">Reports</Link>
        <Link to="/profile">Profile</Link>
      </div>
      <div className="navbar-user">
        <span className="username">{user.username}</span>
        <button className="button logout-button" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
