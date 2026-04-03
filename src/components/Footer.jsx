import React from 'react';
import './Footer.css';

const InstagramIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
);

const FacebookIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
);

const LinkedinIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
);

const MailIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
);

const PhoneIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
);

const GlobeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" x2="22" y1="12" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
);

const Footer = () => {
  return (
    <footer id="contact" className="site-footer">
      <div className="footer-big-text-container">
        <h1 className="footer-big-text">
          <span>S</span>
          <span>A</span>
          <span>R</span>
          <span>G</span>
          <span>A</span>
          <span>M</span>
        </h1>
      </div>

      <div className="footer-content">
        <div className="footer-left">
          <img src="/images/Sargam logo.svg" alt="Sargam Logo" className="footer-main-logo" />
          <div className="footer-socials-list">
            <a href="https://www.instagram.com/sargamgecb?igsh=MWc3b3FoOWJ2MjJibg==" target="_blank" rel="noreferrer"><InstagramIcon /> Sargam</a>
            <a href="https://www.instagram.com/yukti_college_union?igsh=MWpqNnFzMWFpb2JkcA==" target="_blank" rel="noreferrer"><InstagramIcon /> Yukthi Union</a>
            <a href="mailto:yukticollegeuniongecb@gmail.com"><MailIcon /> yukticollegeuniongecb</a>
            <a href="tel:+917025567759"><PhoneIcon /> CHAIRMAN GECB</a>
            <a href="tel:+916238673467"><PhoneIcon /> ARTS CLUB SECRETARY GECB</a>
            <a href="https://gecbh.ac.in" target="_blank" rel="noreferrer"><GlobeIcon /> GEC Barton Hill</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 Sargam Arts Festival. All Rights Reserved. | Yukthi College Union GECB</p>
      </div>
    </footer>
  );
};

export default Footer;
