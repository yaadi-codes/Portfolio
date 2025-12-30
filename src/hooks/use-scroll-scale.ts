import { useEffect, useState } from 'react';

interface ScrollScaleOptions {
    minScale?: number;      // Minimum scale when scrolled away (default 0.85)
    maxScroll?: number;     // Scroll distance for minimum scale (default 300px)
    initialRadius?: number; // Border radius when shrunk (default 24px)
}

interface ScrollScaleResult {
    scale: number;
    borderRadius: number;
    progress: number;
}

/**
 * Hook that returns scale and border-radius values based on scroll position.
 * Section starts at 100% and SHRINKS as user scrolls down (exits viewport).
 */
export function useScrollScale(options: ScrollScaleOptions = {}): ScrollScaleResult {
    const {
        minScale = 0.85,
        maxScroll = 300,
        initialRadius = 24
    } = options;

    const [result, setResult] = useState<ScrollScaleResult>({
        scale: 1,
        borderRadius: 0,
        progress: 0,
    });

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const progress = Math.min(scrollY / maxScroll, 1);

            // Scale from 1.0 DOWN to minScale as user scrolls
            const scale = 1 - ((1 - minScale) * progress);

            // Border radius from 0 UP to initialRadius as user scrolls
            const borderRadius = initialRadius * progress;

            setResult({ scale, borderRadius, progress });
        };

        // Initial calculation
        handleScroll();

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [minScale, maxScroll, initialRadius]);

    return result;
}

export default useScrollScale;
