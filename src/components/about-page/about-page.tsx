import { useEffect } from 'react';
import { useScrollScaleView } from '../../hooks';
import AboutSection from './about-section';
import AboutHeroView from './about-hero-view';
import AboutSkillsView from './about-skills-view';
import AboutHobbiesView from './about-hobbies-view';
import AboutCertificationsView from './about-certifications-view';
import './about-page.css';

// Images to preload for faster loading when sections become visible
const PRELOAD_IMAGES = [
  '/assets/images/github-pfp.png',
];

/**
 * About page with multiple scrollable sections.
 * Scales up when entering viewport, scales down when exiting.
 */
const AboutPage = () => {
  const { scale, borderRadius, translateY, ref } = useScrollScaleView({
    minScale: 0.7,
    scaleRange: 1300,
    borderRadiusMax: 24,
    translateYMax: 150,
  });

  // Preload images when component mounts (before sections are visible)
  useEffect(() => {
    PRELOAD_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <div
      id="about"
      className="about-page"
      ref={ref}
      style={{
        transform: `scale(${scale}) translateY(${translateY}px)`,
        borderRadius: `${borderRadius}px`,
        transformOrigin: 'center center',
      }}
    >
      <AboutSection className="about-hero" threshold={0.6}>
        <AboutHeroView />
      </AboutSection>

      <AboutSection className="about-skills" threshold={0.4}>
        <AboutSkillsView />
      </AboutSection>

      <AboutSection className="about-hobbies" threshold={0.3}>
        <AboutHobbiesView />
      </AboutSection>

      <AboutSection className="about-certifications" threshold={0.4}>
        <AboutCertificationsView />
      </AboutSection>
    </div>
  );
};

export default AboutPage;
