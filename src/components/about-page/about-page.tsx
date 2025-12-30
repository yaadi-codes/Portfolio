import { useScrollScaleView } from '../../hooks';
import AboutSection from './about-section';
import AboutHeroView from './about-hero-view';
import AboutSkillsView from './about-skills-view';
import AboutHobbiesView from './about-hobbies-view';
import AboutCertificationsView from './about-certifications-view';
import './about-page.css';

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
      <AboutSection className="about-hero">
        <AboutHeroView />
      </AboutSection>

      <AboutSection className="about-skills">
        <AboutSkillsView />
      </AboutSection>

      <AboutSection className="about-hobbies">
        <AboutHobbiesView />
      </AboutSection>

      <AboutSection className="about-certifications">
        <AboutCertificationsView />
      </AboutSection>
    </div>
  );
};

export default AboutPage;
