import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { getStats, getReports } from "../../interview/services/interview.api";
import { useAuth } from "../../auth/hooks/useAuth";
import "./dashboard.scss";

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentReports, setRecentReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, reportsData] = await Promise.all([
          getStats(),
          getReports(),
        ]);
        setStats(statsData);
        setRecentReports(reportsData.reports.slice(0, 3));
      } catch (err) {
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <main className="dashboard-page">
        <div className="loading">Loading dashboard...</div>
      </main>
    );
  }

  return (
    <main className="dashboard-page">
      <div className="dashboard-container">
        <div className="welcome-section">
          <h1>Welcome back, {user?.username || "User"} 👋</h1>
          <p>Here's an overview of your interview preparation progress.</p>
        </div>

        {error && <div className="error-banner">{error}</div>}

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{stats?.totalReports || 0}</div>
            <div className="stat-label">Total Reports</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats?.avgScore || 0}%</div>
            <div className="stat-label">Average Score</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats?.highestScore || 0}%</div>
            <div className="stat-label">Highest Score</div>
          </div>
        </div>

        <div className="section-header">
          <h2>Recent Reports</h2>
          <Link to="/reports" className="view-all">
            View All →
          </Link>
        </div>

        {recentReports.length === 0 ? (
          <div className="empty-state">
            <p>No reports yet. Start by analyzing your resume!</p>
            <Link to="/analyze" className="button primary-button">
              Analyze Resume
            </Link>
          </div>
        ) : (
          <div className="reports-grid">
            {recentReports.map((report) => (
              <Link
                to={`/reports/${report._id}`}
                key={report._id}
                className="report-card"
              >
                <div className="report-score">
                  <span
                    className={`score ${
                      report.overallScore >= 75
                        ? "high"
                        : report.overallScore >= 50
                        ? "mid"
                        : "low"
                    }`}
                  >
                    {report.overallScore}%
                  </span>
                </div>
                <div className="report-info">
                  <p className="report-jd">
                    {report.jobDescription.substring(0, 80)}...
                  </p>
                  <span className="report-date">
                    {new Date(report.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <Link to="/analyze" className="action-card">
              <span className="action-icon">🔍</span>
              <span>New Analysis</span>
            </Link>
            <Link to="/reports" className="action-card">
              <span className="action-icon">📊</span>
              <span>View Reports</span>
            </Link>
            <Link to="/profile" className="action-card">
              <span className="action-icon">👤</span>
              <span>My Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
