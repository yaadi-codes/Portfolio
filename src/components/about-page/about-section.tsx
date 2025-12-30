import type { ReactNode } from 'react';
import { useOnScreen } from '../../hooks/use-on-screen';
import './about-section.css';

interface AboutSectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
}

/**
 * A full-viewport-height section within the About page.
 * Content only mounts when the section enters the viewport.
 */
const AboutSection = ({ id, children, className = '' }: AboutSectionProps) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.3 });

  return (
    <section
      id={id}
      ref={ref}
      className={`about-section ${className}`}
    >
      {isVisible && (
        <div className="about-section-content fade-in">
          {children}
        </div>
      )}
    </section>
  );
};

export default AboutSection;
