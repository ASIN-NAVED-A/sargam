import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="site-header glass">
        <div className="header-left">
          <a href="#home" className="logo-link">
            <img src="/images/yukthi.png" alt="Yukthi College Union" className="union-logo-img" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <div
          className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <nav className={`header-right ${isMenuOpen ? 'nav-active' : ''}`}>
          <ul className="nav-links">
            <li><a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a></li>
            <li><a href="#events" onClick={() => setIsMenuOpen(false)}>Events</a></li>
            <li><a href="#leaderboard" onClick={() => setIsMenuOpen(false)}>Department Leaderboard</a></li>
            <li><a href="#winners" onClick={() => setIsMenuOpen(false)}>Winners</a></li>
            <li><a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
          </ul>
        </nav>
      </header>
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="color-sargam">
          <feColorMatrix
            type="matrix"
            values="
            0 0 0 0 1.0
            0 0 0 0 0.949
            0 0 0 0 0.658
            0 0 0 1 0"
          />
        </filter>
      </svg>
    </>
  );
};

export default Header;
