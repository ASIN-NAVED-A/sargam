import React, { useState, useEffect } from 'react';
import './Leaderboard.css';

const Leaderboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch from Google Sheets API
  const fetchLeaderboard = async () => {
    try {
      const res = await fetch('https://opensheet.elk.sh/1d-zy78jGUXFinjwrq_bRGWQ2lI8E6o3HweO6ivwObsc/leaderboard');
      const json = await res.json();

      // Auto-sort by Score descending
      const sorted = json.sort((a, b) => parseInt(b.Score || 0) - parseInt(a.Score || 0));
      setData(sorted);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
    // Auto refresh every 30 seconds
    const interval = setInterval(fetchLeaderboard, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="leaderboard" className="leaderboard-section">
      <h2 className="section-title neon-white-text">DEPARTMENT LEADERBOARD</h2>

      <div className="leaderboard-container glass">
        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : (
          <ul className="leaderboard-list">
            {(() => {
              // Extract unique scores strictly to compute dense ranks (e.g., 1, 1, 2, 3)
              const uniqueScores = [...new Set(data.map(d => d.Score))];

              return data.map((item, index) => {
                // Compute the actual dense rank based on the unique ordered score positions
                const rank = uniqueScores.indexOf(item.Score) + 1;

                let rankClass = '';
                if (rank === 1) rankClass = 'rank-1';
                else if (rank === 2) rankClass = 'rank-2';
                else if (rank === 3) rankClass = 'rank-3';

                return (
                  <li key={index} className={`leaderboard-item ${rankClass}`}>
                    <div className="rank">#{rank}</div>
                    <div className="department">{item.Department || item.Dept}</div>
                    <div className="score">{item.Score} <span className="pts">pts</span></div>
                  </li>
                );
              });
            })()}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Leaderboard;
