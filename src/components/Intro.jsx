import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import LottieLib from 'lottie-react';
const Lottie = LottieLib.default || LottieLib;
import './Intro.css';

const Intro = () => {
  const introRef = useRef(null);
  const [isFinished, setIsFinished] = useState(false);
  const [animationData, setAnimationData] = useState(null);

  // Dynamically load the large JSON file from the public folder
  useEffect(() => {
    fetch('/video/data.json')
      .then(res => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then(data => {
        if (data && typeof data === 'object') {
          setAnimationData(data);
        }
      })
      .catch(err => console.error("Failed to load Lottie JSON", err));
  }, []);

  const handleAnimationEnd = () => {
    if (isFinished) return;
    setIsFinished(true);

    // INSTANT HARD-CUT VANISH NO ANIMATION
    if (introRef.current) {
      introRef.current.style.display = 'none'; // Absolutely zero delay for match-cut sequence
    }

    // Unhide main content natively
    const main = document.querySelector('.main-content');
    if (main) {
      main.style.visibility = 'visible';
      main.style.opacity = 1;

      // Start the pulse animation class natively to allow the seamless logo transition feeling
      const staticLogo = document.querySelector('.hero-static-logo');
      if (staticLogo) staticLogo.classList.add('pulse-active');

      // Trigger Hero text title reveal (SARGAM) coming in from above
      gsap.fromTo('.hero-title span',
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'back.out(1.7)' }
      );

      // Gently fade up the subtitle to draw focus sequentially below
      gsap.fromTo('.hero-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: 'power2.out', delay: 0.8 }
      );
    }
  };

  return (
    <div className="intro-container" ref={introRef}>
      <div className="video-wrapper">
        {animationData ? (
          <Lottie
            animationData={animationData}
            loop={false}
            onComplete={handleAnimationEnd}
            rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
            style={{ width: '100vw', height: '100vh', transform: 'scale(1.15)' }}
          />
        ) : (
          <div style={{ color: 'white', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontFamily: 'var(--font-heading)' }}>Loading Animation...</div>
        )}

        <div className="intro-overlay" style={{ pointerEvents: 'none', background: 'transparent' }}>
          <button className="skip-btn" onClick={handleAnimationEnd} style={{ pointerEvents: 'auto' }}>Skip Intro</button>
        </div>
      </div>
    </div>
  );
};

export default Intro;
