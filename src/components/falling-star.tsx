/**
 * FallingStar Component
 * 
 * Creates an animated starfield background effect:
 * - Generates SVG stars at random horizontal positions
 * - Stars fall from top to bottom with varying durations (10-30s)
 * - Stars have randomized sizes (width: 4-10px, height: 10-20px)
 * - New stars are created every 1500ms (optimized from 500ms)
 * - Stars are automatically cleaned up after their animation completes
 * - Disabled on mobile for performance
 * 
 * Used as a decorative background element on the HomePage.
 * Has aria-hidden="true" for accessibility.
 */
import { useEffect, useRef, useState } from "react";
import "./falling-star.css";

// Mobile detection for performance
const MOBILE_BREAKPOINT = 768;

const Star = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' && window.innerWidth <= MOBILE_BREAKPOINT
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Skip star generation on mobile for performance
    if (isMobile) {
      container.innerHTML = '';
      return;
    }

    const createStar = () => {
      const star = document.createElement("div");
      star.classList.add("star");
      star.style.left = `${Math.random() * 100}%`; // love
      
      // Shorter duration for fewer concurrent stars (10-30s instead of 15-65s)
      const durationSeconds = 10 + Math.random() * 20;
      star.style.animationDuration = `${durationSeconds}s`;

      const width = 4 + Math.random() * 6; // 4px - 10px
      const height = 10 + Math.random() * 10; // 10px - 20px

      star.innerHTML = `
        <svg 
          viewBox="0 0 10 16" 
          xmlns="http://www.w3.org/2000/svg"
          style="width: ${width}px; height: ${height}px;"
        >
          <polygon 
            points="5,0 5.8,5 9,8 5.8,11 5,16 4.2,11 1,8 4.2,5"
            fill="#EEE8AA" 
          />
        </svg>
      `;

      container.appendChild(star);

      // Remove star after animation completes (add 500ms buffer)
      const cleanupMs = (durationSeconds * 1000) + 500;
      setTimeout(() => {
        if (container.contains(star)) {
          container.removeChild(star);
        }
      }, cleanupMs);
    };

    // Create an initial star immediately
    createStar();

    // Reduced frequency: 1500ms instead of 500ms for fewer DOM operations
    const intervalId = setInterval(createStar, 1500);

    return () => {
      clearInterval(intervalId);
      // Clear existing stars on unmount
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [isMobile]);

  return <div ref={containerRef} className="falling-stars" aria-hidden="true"></div>;
};

export default Star;
