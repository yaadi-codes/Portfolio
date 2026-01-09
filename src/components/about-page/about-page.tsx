import { useEffect, useState } from 'react';
import { useScrollScaleView } from '../../hooks';
import AboutSection from './about-section';
import AboutHeroView from './about-hero-view';
import AboutSkillsView from './about-skills-view';
import AboutHobbiesView from './about-hobbies-view';
import AboutCertificationsView from './about-certifications-view';
import './about-page.css';

// Images to preload for faster loading when sections become visible
const PRELOAD_IMAGES = [
  '/assets/images/github-pfp.webp',
];

// Breakpoint for mobile threshold adjustment
const MOBILE_BREAKPOINT = 768;

/**
 * Hook to get responsive threshold values and mobile detection.
 * Returns lower thresholds on mobile screens for better visibility.
 */
function useResponsiveThresholds() {
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

  // Return both isMobile and thresholds
  return {
    isMobile,
    thresholds: {
      hero: isMobile ? 0.54 : 0.6,
      skills: isMobile ? 0.46 : 0.53,
      hobbies: isMobile ? 0.3 : 0.6,
      certifications: isMobile ? 0.5 : 0.49,
    }
  };
}

/**
 * AboutPage Component
 * 
 * Multi-section scrollable page containing:
 * - Hero: Introduction with orbiting tech icons around profile picture
 * - Skills: Technical skills organized by category (Frontend, Backend, Tools)
 * - Hobbies: Personal interests with hover-reveal details
 * - Certifications: Professional certifications by status
 * 
 * Features:
 * - Bidirectional scroll-scale effect (scales up when entering, down when exiting)
 * - Each section has threshold-based visibility for content fade-in
 * - Responsive thresholds (lower on mobile for taller sections)
 * - Image preloading for smoother experience
 * 
 * Configuration:
 * - minScale: 0.7 (shrinks to 70% at edges)
 * - scaleRange: 1300px (distance for full scale transition)
 * - borderRadiusMax: 24px (rounded corners when scaled)
 * - translateYMax: 150px (vertical shift during transition)
 */
const AboutPage = () => {
  const { scale, borderRadius, translateY, ref } = useScrollScaleView({
    minScale: 0.7,
    scaleRange: 1300,
    borderRadiusMax: 24,
    translateYMax: 150,
  });

  // Single source of truth for mobile detection and thresholds
  const { isMobile, thresholds } = useResponsiveThresholds();

  // Preload images when component mounts (before sections are visible)
  useEffect(() => {
    PRELOAD_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Disable scale effect on mobile
  const mobileStyle = isMobile ? {} : {
    transform: `scale(${scale}) translateY(${translateY}px)`,
    borderRadius: `${borderRadius}px`,
    transformOrigin: 'center center',
  };

  return (
    <div
      id="about"
      className="about-page"
      ref={ref}
      style={mobileStyle}
    >
      <AboutSection className="about-hero" threshold={thresholds.hero}>
        <AboutHeroView />
      </AboutSection>

      <AboutSection className="about-skills" threshold={thresholds.skills}>
        <AboutSkillsView />
      </AboutSection>

      <AboutSection className="about-hobbies" threshold={thresholds.hobbies}>
        <AboutHobbiesView />
      </AboutSection>

      <AboutSection className="about-certifications" threshold={thresholds.certifications}>
        <AboutCertificationsView />
      </AboutSection>
    </div>
  );
};

export default AboutPage;
