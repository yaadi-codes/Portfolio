import { useState, useEffect, type ReactNode } from 'react';
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
 * Content mounts when section enters viewport and STAYS mounted.
 * Uses CSS opacity/visibility to hide without layout shift.
 * @param threshold - How much of the section must be visible before content loads (0-1, default 0.6)
 */
const AboutSection = ({ 
  id, 
  children, 
  className = '', 
  threshold = 0.6 
}: AboutSectionProps) => {
  const [ref, isVisible] = useOnScreen({ threshold });
  
  // Once visible, stay mounted (prevents flutter from rapid visibility toggles)
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  
  useEffect(() => {
    if (isVisible && !hasBeenVisible) {
      setHasBeenVisible(true);
    }
  }, [isVisible, hasBeenVisible]);

  return (
    <section
      id={id}
      ref={ref}
      className={`about-section ${className}`}
    >
      {hasBeenVisible && (
        <div 
          className={`about-section-content ${isVisible ? 'visible' : 'hidden'}`}
        >
          {children}
        </div>
      )}
    </section>
  );
};

export default AboutSection;
