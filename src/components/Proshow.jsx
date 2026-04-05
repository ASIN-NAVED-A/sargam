import React from 'react';
import './Proshow.css';

const Proshow = () => {
  return (
    <section id="events" className="proshow-section">
      <h2 className="section-title neon-white-text">PROSHOW ARTISTS</h2>

      <div className="artists-container">
        {/* Artist 1 */}
        <div className="artist-card-wrapper">
          <div className="artist-card">
            <img
              src="/images/t1.png"
              alt="Artist Day 1"
              className="artist-img"
            />
            <div className="card-overlay"></div>
          </div>
          <h3 className="artist-day">DAY 1</h3>
        </div>

        {/* Artist 2 */}
        <div className="artist-card-wrapper">
          <div className="artist-card">
            <img
              src="/images/jrkf.png"
              alt="Artist Day 2"
              className="artist-img"
            />
            <div className="card-overlay"></div>
          </div>
          <h3 className="artist-day">DAY 2</h3>
        </div>
      </div>
    </section>
  );
};

export default Proshow;
