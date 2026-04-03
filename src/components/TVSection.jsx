import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './TVSection.css';

gsap.registerPlugin(ScrollTrigger);

const TVSection = () => {
  const sectionRef = useRef(null);
  const date1Ref = useRef(null);
  const date2Ref = useRef(null);
  const tvRef = useRef(null);
  const upperBgRef = useRef(null);
  const lowerBgRef = useRef(null);
  const discoBallRef = useRef(null);

  useEffect(() => {
    // Lock initial state cleanly in center behind TV
    gsap.set('.date-slide', { xPercent: -50, yPercent: -50, opacity: 0 });

    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      // Desktop: Horizontal Slide
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%',
          end: 'top -20%',
          scrub: 1.5,
        }
      });

      tl.fromTo(tvRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        0
      );

      tl.to(date1Ref.current, { x: -450, opacity: 1, ease: 'power1.inOut' }, 0);
      tl.to(date2Ref.current, { x: 450, opacity: 1, ease: 'power1.inOut' }, 0.2);
    });

    mm.add("(max-width: 768px)", () => {
      // Mobile: Vertical Slide (April 6 Top, April 7 Bottom)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'top 10%',
          scrub: 1,
        }
      });

      tl.fromTo(tvRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1 },
        0
      );

      tl.to(date1Ref.current, {
        y: -180, // Slides UP from top
        opacity: 1,
        ease: 'power2.out'
      }, 0.1);

      tl.to(date2Ref.current, {
        y: 180, // Slides DOWN from bottom
        opacity: 1,
        ease: 'power2.out'
      }, 0.2);

      // PARALLAX EFFECT FOR MOBILE
      gsap.to(upperBgRef.current, {
        y: -100,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });

      gsap.to(lowerBgRef.current, {
        y: 100,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });

      gsap.to(discoBallRef.current, {
        y: 50,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });

    // GENERAL PARALLAX (Desktop & Background Shift)
    mm.add("(min-width: 769px)", () => {
      gsap.to(upperBgRef.current, {
        y: -150,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });

      gsap.to(lowerBgRef.current, {
        y: 150,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });

      gsap.to(discoBallRef.current, {
        y: 80,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });

    // Subtle background position parallax for the section
    gsap.to(sectionRef.current, {
      backgroundPositionY: '20%',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="dates" className="tv-section" ref={sectionRef}>

      {/* Dynamic Background Elements with Parallax Refs */}
      <img src="/images/upperBg.png" alt="Decorative Upper Left" className="bg-element upper-bg" ref={upperBgRef} />
      <img src="/images/lowerBg.png" alt="Decorative Lower Right" className="bg-element lower-bg" ref={lowerBgRef} />
      <img src="/images/disco.png" alt="Disco Ball" className="bg-element disco-ball" ref={discoBallRef} />

      <div className="tv-wrapper">
        {/* Layer 1: The texts hidden in absolute center */}
        <h2 className="date-slide date-left" ref={date1Ref}>April 6</h2>
        <h2 className="date-slide date-right" ref={date2Ref}>April 7</h2>

        {/* Layer 2: The TV Container (z-index overlaps layer 1 completely) */}
        <div className="tv-container" ref={tvRef}>
          <div className="tv-frame">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="tv-video"
              src="/video/tvvedio.mp4"
            />
            {/* The transparent PNG overlaying the back video */}
            <img src="/images/retro_tv.png" alt="Retro TV Frame" className="tv-image" />
          </div>
        </div>
      </div>

    </section>
  );
};

export default TVSection;
