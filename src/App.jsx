import React, { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Analytics } from '@vercel/analytics/react';
import Intro from './components/Intro';
import Header from './components/Header';
import Hero from './components/Hero';
import TVSection from './components/TVSection';
import Proshow from './components/Proshow';
import Leaderboard from './components/Leaderboard';
import Winners from './components/Winners';
import Footer from './components/Footer';

import ErrorBoundary from './components/ErrorBoundary';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useLayoutEffect(() => {
    // Force scroll to top on every fresh reload to ensure we land at the Home section
    window.scrollTo(0, 0);
    
    // Clear any hash fragments from the URL (like #winners) to prevent browser from auto-scrolling away from home
    if (window.location.hash) {
      window.history.replaceState('', document.title, window.location.pathname + window.location.search);
    }
  }, []);

  return (
    <div className="app-container">
      <ErrorBoundary>
        <Intro />
      </ErrorBoundary>
      {/* Main Content (revealed after Intro) */}
      <div className="main-content" style={{ visibility: 'hidden', opacity: 0 }}>
        <Header />

        <main>
          <Hero />
          <TVSection />
          <Proshow />
          <Leaderboard />
          <Winners />
        </main>

        <Footer />
      </div>
      <Analytics />
    </div>
  );
}

export default App;
