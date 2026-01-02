import { useEffect, useState, useRef } from 'react';

interface ScrollScaleViewOptions {
    minScale?: number;        // Minimum scale at edges (default 0.7)
    scaleRange?: number;      // Scroll distance for full transition (default 400px)
    borderRadiusMax?: number; // Max border radius when scaled down (default 24px)
    translateYMax?: number;   // Max vertical translation at edges (default 100px)
}

interface ScrollScaleViewResult {
    scale: number;
    borderRadius: number;
    translateY: number;
    ref: React.RefObject<HTMLDivElement | null>;
}

/**
 * Easing function for smoother transitions.
 * Uses ease-out-cubic for natural deceleration.
 */
function easeOutCubic(t: number): number {
    return 1 - Math.pow(1 - t, 3);
}

/**
 * Hook for bidirectional scale effect with smooth vertical translation.
 * Element scales UP when centered in viewport.
 * Element scales DOWN when at edges.
 * TranslateY smoothly transitions based on position relative to viewport.
 * 
 * Performance: Uses requestAnimationFrame throttling to limit updates.
 */
export function useScrollScaleView(options: ScrollScaleViewOptions = {}): ScrollScaleViewResult {
    const {
        minScale = 0.7,
        scaleRange = 500,  // Increased for smoother transition
        borderRadiusMax = 24,
        translateYMax = 100,
    } = options;

    const ref = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number | null>(null);
    const [result, setResult] = useState({
        scale: minScale,
        borderRadius: borderRadiusMax,
        translateY: 0,
    });

    useEffect(() => {
        const calculateValues = () => {
            if (!ref.current) return;

            const rect = ref.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // Element center position relative to viewport
            const elementCenter = rect.top + rect.height / 2;
            const viewportCenter = viewportHeight / 2;

            // Signed distance from viewport center (positive = below, negative = above)
            const signedDistance = elementCenter - viewportCenter;

            // Absolute distance for scale calculation
            const absDistance = Math.abs(signedDistance);

            // Linear progress: 0 = at center (full scale), 1 = at edge (min scale)
            const linearProgress = Math.min(absDistance / scaleRange, 1);

            // Apply easing for smoother transition
            const easedProgress = easeOutCubic(linearProgress);

            // Scale from 1.0 (centered) to minScale (at edges) with easing
            const scale = 1 - ((1 - minScale) * easedProgress);

            // Border radius from 0 (centered) to max (at edges) with easing
            const borderRadius = borderRadiusMax * easedProgress;

            // Smooth translateY based on signed distance
            const normalizedDistance = Math.max(-1, Math.min(1, signedDistance / scaleRange));
            const translateY = -normalizedDistance * translateYMax * easedProgress;

            setResult({ scale, borderRadius, translateY });
        };

        const handleScroll = () => {
            // Throttle with requestAnimationFrame for performance
            if (rafRef.current !== null) return;

            rafRef.current = requestAnimationFrame(() => {
                calculateValues();
                rafRef.current = null;
            });
        };

        // Initial calculation
        calculateValues();

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
            if (rafRef.current !== null) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [minScale, scaleRange, borderRadiusMax, translateYMax]);

    return { ...result, ref };
}

export default useScrollScaleView;
