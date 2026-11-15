import React, { useState } from "react";
import { useNavigate } from "react-router";
import { generateReport } from "../../interview/services/interview.api";
import "./analyze.scss";

const Analyze = () => {
  const navigate = useNavigate();
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!resumeFile) {
      setError("Please upload your resume PDF.");
      return;
    }
    if (!jobDescription.trim()) {
      setError("Please enter the job description.");
      return;
    }
    if (!selfDescription.trim()) {
      setError("Please enter a self description.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("resume", resumeFile);
      formData.append("jobDescription", jobDescription);
      formData.append("selfDescription", selfDescription);

      const data = await generateReport(formData);
      navigate(`/reports/${data.interviewReport._id}`);
    } catch (err) {
      if (err.errorCode === "GEMINI_UNAVAILABLE") {
        setError(
          "⚠️ AI analysis is temporarily unavailable. The Gemini API could not be reached — this may be due to expired API credits or a network issue. Your existing reports are still accessible. Please try again later."
        );
      } else {
        setError(err.message || "Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="analyze-page">
      <div className="analyze-container">
        <h1>📄 Analyze Your Resume</h1>
        <p className="subtitle">
          Upload your resume, paste the job description, and get an AI-powered
          interview preparation report.
        </p>

        {error && <div className="error-banner">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="resume">Resume (PDF only, max 3MB)</label>
            <input
              type="file"
              id="resume"
              accept=".pdf"
              onChange={(e) => setResumeFile(e.target.files[0])}
            />
            {resumeFile && (
              <span className="file-name">📎 {resumeFile.name}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="jobDescription">Job Description</label>
            <textarea
              id="jobDescription"
              rows="6"
              placeholder="Paste the full job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="selfDescription">
              Self Description (tell us about yourself)
            </label>
            <textarea
              id="selfDescription"
              rows="4"
              placeholder="Briefly describe your background, skills, and what you're looking for..."
              value={selfDescription}
              onChange={(e) => setSelfDescription(e.target.value)}
            />
          </div>

          <button
            className="button primary-button submit-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? "Analyzing... ⏳" : "Generate Report 🚀"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default Analyze;
