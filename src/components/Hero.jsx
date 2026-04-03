import React from 'react';
import './Hero.css';

const Hero = () => {
  const title = "SARGAM".split("");

  return (
    <section id="home" className="hero-section">
      {/* Background Image Placeholder */}
      <div className="hero-bg"></div>
      
      {/* Dark gradient overlay so text is readable */}
      <div className="hero-overlay"></div>

      {/* Symmetrical bottom corner graphics */}
      <img src="/images/left.png" alt="" className="hero-corner-decor bottom-left" />
      <img src="/images/right.png" alt="" className="hero-corner-decor bottom-right" />

      {/* Precisely aligned static logo replacing the title wrapper */}
      <img 
        src="/images/Sargam logo.svg" 
        alt="Sargam Vector Logo" 
        className="hero-static-logo" 
      />
      
      <div className="hero-content">
        <h1 className="hero-title">
          {title.map((char, index) => (
            <span key={index}>{char}</span>
          ))}
        </h1>
      </div>

      {/* Flawless SVG native color matrix guaranteeing pure Red duotone masking */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="duotone-red">
          {/* Converts structural luma directly into pristine red channels, nullifying green and blue */}
          <feColorMatrix 
            type="matrix" 
            values="
            0.6 0.6 0.6 0 0
            0   0   0   0 0
            0   0   0   0 0
            0   0   0   1 0" 
          />
        </filter>
      </svg>
    </section>
  );
};

export default Hero;
