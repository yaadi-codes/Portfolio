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
  height = "calc(100vh - var(--header-height))",
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
      {isVisible && (
        <div className="scroll-view-content fade-in">
          {children}
        </div>
      )}
    </section>
  );
};

export default ScrollView;
