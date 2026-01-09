import type { ReactNode } from "react";
import { useOnScreen } from "../../hooks/use-on-screen";
import "./scroll-view.css";

interface ScrollViewProps {
  id?: string;
  height?: string;
  children: ReactNode;
  threshold?: number;
}

const ScrollView = ({
  id,
  height = "auto",
  children,
  threshold = 0.5,
}: ScrollViewProps) => {
  const [ref, isVisible] = useOnScreen({ threshold });

  return (
    <section
      id={id}
      ref={ref}
      style={{ minHeight: height }}
      className="scroll-view-section"
    >
      {/* Always render children to preserve layout, use CSS to control visibility */}
      <div className={`scroll-view-content ${isVisible ? 'fade-in' : 'fade-out'}`}>
        {children}
      </div>
    </section>
  );
};

export default ScrollView;
