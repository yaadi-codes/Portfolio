import { useEffect, useRef } from "react";
import "./falling-star.css";

const Star = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createStar = () => {
      const star = document.createElement("div");
      star.classList.add("star");
      star.style.left = `${Math.random() * 100}%`;
      star.style.animationDuration = `${15 + Math.random() * 50}s`;

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

      // Remove star after animation completes to avoid DOM buildup
      setTimeout(() => {
        if (container.contains(star)) {
          container.removeChild(star);
        }
      }, 15000);
    };

    // Create an initial star immediately so we don't wait for the first interval
    createStar();

    const intervalId = setInterval(createStar, 500);

    return () => {
      clearInterval(intervalId);
      // Optional: clear existing stars on unmount if desired
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return <div ref={containerRef} className="falling-stars" aria-hidden="true"></div>;
};

export default Star;
