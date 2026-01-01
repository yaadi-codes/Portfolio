import { useEffect, useState, useRef } from 'react';

interface ScrollScaleViewOptions {
    minScale?: number;        // Minimum scale at edges (default 0.7)
    scaleRange?: number;      // Scroll distance for full transition (default 400px)
    borderRadiusMax?: number; // Max border radius when scaled down (default 24px)
    translateYMax?: number;   // Max upward translation when entering (default 100px)
}

interface ScrollScaleViewResult {
    scale: number;
    borderRadius: number;
    translateY: number;
    ref: React.RefObject<HTMLDivElement | null>;
}

/**
 * Easing function for smoother transitions.
 * Uses ease-in-out-cubic for symmetrical smooth entry and exit.
 */
function easeInOutCubic(t: number): number {
    return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Hook for bidirectional scale effect with vertical translation.
 * Element scales UP and moves UP when entering viewport.
 * Element scales DOWN when exiting.
 * Uses easing for smooth, natural transitions.
 */
export function useScrollScaleView(options: ScrollScaleViewOptions = {}): ScrollScaleViewResult {
    const {
        minScale = 0.7,
        scaleRange = 400,
        borderRadiusMax = 24,
        translateYMax = 150,
    } = options;

    const ref = useRef<HTMLDivElement>(null);
    const [result, setResult] = useState({
        scale: minScale,
        borderRadius: borderRadiusMax,
        translateY: -translateYMax,
    });

    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return;

            const rect = ref.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // Element center position relative to viewport
            const elementCenter = rect.top + rect.height / 2;
            const viewportCenter = viewportHeight / 2;

            // Distance from viewport center (0 = perfectly centered)
            const distanceFromCenter = Math.abs(elementCenter - viewportCenter);

            // Linear progress: 0 = at center (full scale), 1 = at edge (min scale)
            const linearProgress = Math.min(distanceFromCenter / scaleRange, 1);

            // Apply easing for smoother transition
            const easedProgress = easeInOutCubic(linearProgress);

            // Scale from 1.0 (centered) to minScale (at edges) with easing
            const scale = 1 - ((1 - minScale) * easedProgress);

            // Border radius from 0 (centered) to max (at edges) with easing
            const borderRadius = borderRadiusMax * easedProgress;

            // Translate upward when entering from below with easing
            const isBelow = elementCenter > viewportCenter;
            const translateY = isBelow ? -translateYMax * easedProgress : 0;

            setResult({ scale, borderRadius, translateY });
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, [minScale, scaleRange, borderRadiusMax, translateYMax]);

    return { ...result, ref };
}

export default useScrollScaleView;
