import { useEffect, useState, useRef } from 'react';
import type { RefObject } from 'react';

interface UseAnimateOnViewOptions {
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
}

/**
 * Hook to trigger animations when element enters viewport
 * Returns a ref to attach to the element and whether it's been seen
 * 
 * Usage:
 * const [ref, hasAnimated] = useAnimateOnView();
 * <div ref={ref} className={hasAnimated ? 'animate' : ''}>
 */
export function useAnimateOnView(
    options: UseAnimateOnViewOptions = {}
): [RefObject<HTMLDivElement | null>, boolean] {
    const { threshold = 0.2, rootMargin = '0px', triggerOnce = true } = options;
    const ref = useRef<HTMLDivElement>(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        const currentRef = ref.current;
        if (!currentRef) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    if (triggerOnce) {
                        observer.disconnect();
                    }
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(currentRef);

        return () => {
            observer.disconnect();
        };
    }, [threshold, rootMargin, triggerOnce, hasAnimated]);

    return [ref, hasAnimated];
}

export default useAnimateOnView;
