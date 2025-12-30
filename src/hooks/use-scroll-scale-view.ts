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
 * Hook for bidirectional scale effect with vertical translation.
 * Element scales UP and moves UP when entering viewport.
 * Element scales DOWN when exiting.
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

            // Progress: 0 = at center (full scale), 1 = at edge (min scale)
            const progress = Math.min(distanceFromCenter / scaleRange, 1);

            // Scale from 1.0 (centered) to minScale (at edges)
            const scale = 1 - ((1 - minScale) * progress);

            // Border radius from 0 (centered) to max (at edges)
            const borderRadius = borderRadiusMax * progress;

            // Translate upward when entering from below (positive top = below center)
            // At center: 0px, at edges: -translateYMax (moves up)
            const isBelow = elementCenter > viewportCenter;
            const translateY = isBelow ? -translateYMax * progress : 0;

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
