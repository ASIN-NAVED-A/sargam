import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flame, Music, Film, BookOpen, Palette, LayoutGrid, Search, ChevronDown } from 'lucide-react';
import './Winners.css';

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  { id: 'dance', label: 'Dance', icon: Flame },
  { id: 'music', label: 'Music & Instrumental', icon: Music },
  { id: 'theatrical', label: 'Theatrical', icon: Film },
  { id: 'literature', label: 'Literature', icon: BookOpen },
  { id: 'art', label: 'Art', icon: Palette },
  { id: 'misc', label: 'Miscellaneous', icon: LayoutGrid },
];

const Winners = () => {
  const [winnersData, setWinnersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedEvent, setExpandedEvent] = useState(null);
  
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);
  
  // Categorize raw data
  const processData = (rawData) => {
    return rawData.map((item, index) => {
      const rawCat = (item.Category || '').trim().toUpperCase();
      const rawCatLower = rawCat.toLowerCase();
      let assignedId = 'misc';
      
      if (rawCat === 'D' || rawCatLower.includes('dance')) {
        assignedId = 'dance';
      } else if (rawCat === 'MI' || rawCatLower.includes('music') || rawCatLower.includes('instrument') || rawCatLower.includes('song')) {
        assignedId = 'music';
      } else if (rawCat === 'T' || rawCatLower.includes('theat') || rawCatLower.includes('drama') || rawCatLower.includes('mime')) {
        assignedId = 'theatrical';
      } else if (rawCat === 'L' || rawCatLower.includes('lit') || rawCatLower.includes('poem') || rawCatLower.includes('essay') || rawCatLower.includes('writ')) {
        assignedId = 'literature';
      } else if (rawCat === 'A' || rawCat === 'ARTS' || rawCat === 'ART' || rawCatLower.includes('paint') || rawCatLower.includes('draw')) {
        assignedId = 'art';
      } else if (rawCat === 'M') {
        assignedId = 'misc';
      }
      
      return { ...item, categoryId: assignedId, uniqueId: `${assignedId}-${index}` };
    });
  };

  const fetchWinners = async () => {
    try {
      const res = await fetch('https://opensheet.elk.sh/1iBNMZ_BYWTryB7imh2Vv53lPa_r30PRDZB_YldOWHKQ/winners');
      const json = await res.json();
      setWinnersData(processData(json));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching winners:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWinners();
    const interval = setInterval(fetchWinners, 30000);
    return () => clearInterval(interval);
  }, []);

  // Scroll Entrance Animation
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.winners-header-anim', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Category or Search change animation
  useEffect(() => {
    if (!loading && cardsRef.current) {
      // Reset expansion when switching categories or typing search
      setExpandedEvent(null);
      
      let ctx = gsap.context(() => {
        gsap.fromTo('.winners-card', 
          { y: 30, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.4, stagger: 0.05, ease: "back.out(1.2)" }
        );
      }, cardsRef);
      return () => ctx.revert();
    }
  }, [activeCategory, searchQuery, loading]);

  const toggleAccordion = (id) => {
    setExpandedEvent(prev => prev === id ? null : id);
  };

  // Filter events
  const displayedEvents = winnersData.filter(event => {
    // If there's an active search query, search globally (ignore category tabs).
    const isSearching = searchQuery.trim().length > 0;
    const matchesCategory = isSearching ? true : event.categoryId === activeCategory;
    const matchesSearch = (event.Event || '').toLowerCase().includes(searchQuery.toLowerCase().trim());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="winners" className="winners-section" ref={sectionRef}>
      <div className="winners-container">
        
        <div className="winners-header-anim">
          <h2 className="winners-main-title neon-white-text">WINNERS</h2>
        </div>
        
        <div className="winners-header-anim winners-categories-nav">
          {CATEGORIES.map(cat => (
            <button 
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id); setSearchQuery(''); }}
              className={`winners-category-tab ${activeCategory === cat.id ? 'active' : ''}`}
            >
              <cat.icon className="winners-category-icon" size={18} />
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        <div className="winners-header-anim winners-search-container">
          <div className="winners-search-wrapper">
            <Search className="winners-search-icon" size={20} />
            <input 
              type="text" 
              placeholder="Search for an event..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="winners-event-search-input"
            />
          </div>
        </div>

        <div className="winners-content-area" ref={cardsRef}>
          {loading ? (
            <div className="winners-loading-spinner">
              <div className="winners-glow-orb"></div>
              Loading Results...
            </div>
          ) : displayedEvents.length === 0 ? (
            <div className="winners-empty-state">
              <p>
                {searchQuery 
                  ? "No events match your search." 
                  : activeCategory === null 
                    ? "Please select a category above to view the winners."
                    : "No results have been announced yet for this category."
                }
              </p>
            </div>
          ) : (
            <div className="winners-grid">
              {displayedEvents.map((item) => (
                <div 
                  key={item.uniqueId} 
                  className={`winners-card glass blur-effect ${expandedEvent === item.uniqueId ? 'expanded' : ''}`}
                >
                  
                  <div 
                    className="winners-accordion-trigger"
                    onClick={() => toggleAccordion(item.uniqueId)}
                  >
                    <div className="winners-header-text">
                      <h3 className="winners-event-name">{item.Event}</h3>
                      <div className="winners-category-badge">
                        {CATEGORIES.find(c => c.id === item.categoryId)?.label || item.Category}
                      </div>
                    </div>
                    <button className="winners-expand-btn">
                      <ChevronDown size={24} className="winners-chevron" />
                    </button>
                  </div>
                  
                  <div className="winners-accordion-content">
                    <div className="winners-list-wrapper">
                      <div className="winners-row-item winners-first">
                        <div className="winners-medal-wrapper">🥇</div>
                        <div className="winners-info-box">
                          <span className="winners-rank-label">1st Place</span>
                          <span className="winners-participant-name">{item.First || '-'}</span>
                        </div>
                      </div>
                      
                      <div className="winners-row-item winners-second">
                        <div className="winners-medal-wrapper">🥈</div>
                        <div className="winners-info-box">
                          <span className="winners-rank-label">2nd Place</span>
                          <span className="winners-participant-name">{item.Second || '-'}</span>
                        </div>
                      </div>

                      <div className="winners-row-item winners-third">
                        <div className="winners-medal-wrapper">🥉</div>
                        <div className="winners-info-box">
                          <span className="winners-rank-label">3rd Place</span>
                          <span className="winners-participant-name">{item.Third || '-'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </div>
              ))}
            </div>
          )}
        </div>
        
      </div>
    </section>
  );
};

export default Winners;
