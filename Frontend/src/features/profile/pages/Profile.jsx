import React, { useEffect, useState } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import { getStats } from "../../interview/services/interview.api";
import "./profile.scss";

const Profile = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getStats();
        setStats(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  return (
    <main className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <div className="avatar">
            {user?.username?.charAt(0).toUpperCase() || "U"}
          </div>
          <div className="profile-info">
            <h1>{user?.username}</h1>
            <p className="email">{user?.email}</p>
          </div>
        </div>

        <div className="profile-stats">
          <h2>Your Statistics</h2>
          <div className="stats-row">
            <div className="stat-item">
              <span className="stat-val">{stats?.totalReports || 0}</span>
              <span className="stat-lbl">Reports Generated</span>
            </div>
            <div className="stat-item">
              <span className="stat-val">{stats?.avgScore || 0}%</span>
              <span className="stat-lbl">Average Match Score</span>
            </div>
            <div className="stat-item">
              <span className="stat-val">{stats?.highestScore || 0}%</span>
              <span className="stat-lbl">Highest Score</span>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h2>Account Details</h2>
          <div className="detail-row">
            <span className="detail-label">Username</span>
            <span className="detail-value">{user?.username}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Email</span>
            <span className="detail-value">{user?.email}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">User ID</span>
            <span className="detail-value mono">{user?.id}</span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
