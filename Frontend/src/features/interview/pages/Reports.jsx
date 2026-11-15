import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { getReports } from "../../interview/services/interview.api";
import "./reports.scss";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await getReports();
        setReports(data.reports);
        setFiltered(data.reports);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setFiltered(reports);
    } else {
      const term = search.toLowerCase();
      setFiltered(
        reports.filter((r) => r.jobDescription.toLowerCase().includes(term))
      );
    }
  }, [search, reports]);

  if (loading) {
    return (
      <main className="reports-page">
        <div className="loading">Loading reports...</div>
      </main>
    );
  }

  return (
    <main className="reports-page">
      <div className="reports-container">
        <div className="reports-header">
          <h1>📊 Report History</h1>
          <Link to="/analyze" className="button primary-button">
            + New Analysis
          </Link>
        </div>

        <input
          type="text"
          className="search-input"
          placeholder="Search by job description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {filtered.length === 0 ? (
          <div className="empty-state">
            {search ? (
              <p>No reports match your search.</p>
            ) : (
              <>
                <p>No reports yet. Analyze your first resume!</p>
                <Link to="/analyze" className="button primary-button">
                  Get Started
                </Link>
              </>
            )}
          </div>
        ) : (
          <div className="reports-list">
            {filtered.map((report) => (
              <Link
                to={`/reports/${report._id}`}
                key={report._id}
                className="report-item"
              >
                <div className="report-left">
                  <span
                    className={`score-badge ${
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
                <div className="report-center">
                  <p className="jd-preview">
                    {report.jobDescription.substring(0, 100)}...
                  </p>
                  <span className="date">
                    {new Date(report.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  {report.isDemo && (
                    <span className="demo-badge">Sample Demo</span>
                  )}
                </div>
                <div className="report-right">→</div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Reports;
