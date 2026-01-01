import type { ReactNode } from 'react';
import { useOnScreen } from '../../hooks/use-on-screen';
import './about-section.css';

interface AboutSectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  threshold?: number;
}

/**
 * A full-viewport-height section within the About page.
 * Content only mounts when the section enters the viewport.
 * @param threshold - How much of the section must be visible before content loads (0-1, default 0.6)
 */
const AboutSection = ({ 
  id, 
  children, 
  className = '', 
  threshold = 0.6 
}: AboutSectionProps) => {
  const [ref, isVisible] = useOnScreen({ threshold });

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
