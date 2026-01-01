import { useEffect, useState, useLayoutEffect } from 'react';

interface ScrollScaleOptions {
    minScale?: number;      // Minimum scale when scrolled away (default 0.85)
    maxScroll?: number;     // Scroll distance for minimum scale (default 300px)
    initialRadius?: number; // Border radius when shrunk (default 24px)
}

interface ScrollScaleResult {
    scale: number;
    borderRadius: number;
    progress: number;
    isInitialized: boolean; // True after first calculation, use to control transition
}

/**
 * Easing function for smoother transitions.
 * Uses ease-out-cubic for a natural deceleration feel.
 */
function easeOutCubic(t: number): number {
    return 1 - Math.pow(1 - t, 3);
}

/**
 * Calculate scale values based on scroll position.
 */
function calculateScale(scrollY: number, maxScroll: number, minScale: number, initialRadius: number) {
    const linearProgress = Math.min(scrollY / maxScroll, 1);
    const easedProgress = easeOutCubic(linearProgress);
    const scale = 1 - ((1 - minScale) * easedProgress);
    const borderRadius = initialRadius * easedProgress;
    return { scale, borderRadius, progress: easedProgress };
}

/**
 * Hook that returns scale and border-radius values based on scroll position.
 * Section starts at 100% and SHRINKS as user scrolls down (exits viewport).
 * Uses easing for smooth, natural transitions.
 */
export function useScrollScale(options: ScrollScaleOptions = {}): ScrollScaleResult {
    const {
        minScale = 0.85,
        maxScroll = 300,
        initialRadius = 24
    } = options;

    // Calculate initial values immediately based on current scroll position
    const initialValues = calculateScale(
        typeof window !== 'undefined' ? window.scrollY : 0,
        maxScroll,
        minScale,
        initialRadius
    );

    const [result, setResult] = useState<ScrollScaleResult>({
        ...initialValues,
        isInitialized: false,
    });

    // Use layoutEffect to set initialized before paint
    useLayoutEffect(() => {
        const values = calculateScale(window.scrollY, maxScroll, minScale, initialRadius);
        setResult({ ...values, isInitialized: true });
    }, [maxScroll, minScale, initialRadius]);

    useEffect(() => {
        const handleScroll = () => {
            const values = calculateScale(window.scrollY, maxScroll, minScale, initialRadius);
            setResult(prev => ({ ...values, isInitialized: prev.isInitialized }));
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [minScale, maxScroll, initialRadius]);

    return result;
}

export default useScrollScale;
