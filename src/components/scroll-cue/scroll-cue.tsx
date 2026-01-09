import { useEffect, useState } from 'react';
import './scroll-cue.css';

const ScrollCue = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate how far down the page we are
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // Distance from bottom
      const distanceToBottom = docHeight - (scrollTop + windowHeight);

      // Hide if we're near the bottom (footer visible)
      // Threshold is 100px from bottom, or if document is short
      if (distanceToBottom < 100 || docHeight <= windowHeight) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollClick = () => {
    window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
  };

  return (
    <div 
      className={`global-scroll-cue ${isVisible ? '' : 'hidden'}`}
      onClick={handleScrollClick}
    >
      <div className="cue-arrow">↓</div>
    </div>
  );
};

export default ScrollCue;
