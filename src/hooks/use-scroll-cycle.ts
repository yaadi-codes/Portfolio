import { useEffect, useState, useRef, useCallback } from 'react';

interface UseScrollCycleOptions {
    totalViews: number;
}

/**
 * Hook for cycling through views based on scroll position within a container.
 * Uses IntersectionObserver with the container as the root viewport.
 */
export function useScrollCycle({ totalViews }: UseScrollCycleOptions) {
    const [currentView, setCurrentView] = useState(0);
    const [isReady, setIsReady] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRefs = useRef<Map<number, HTMLDivElement>>(new Map());

    // Callback ref setter - marks ready when all refs are set
    const setTriggerRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
        if (el) {
            triggerRefs.current.set(index, el);
            // Check if all refs are set
            if (triggerRefs.current.size === totalViews) {
                setIsReady(true);
            }
        }
    }, [totalViews]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container || !isReady) return;

        const triggers = Array.from(triggerRefs.current.values());

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Find the index of this trigger
                        for (const [index, trigger] of triggerRefs.current.entries()) {
                            if (trigger === entry.target) {
                                setCurrentView(index);
                                break;
                            }
                        }
                    }
                });
            },
            {
                root: container,
                rootMargin: '0px',
                threshold: 0.5,
            }
        );

        // Observe all trigger zones
        triggers.forEach((trigger) => {
            observer.observe(trigger);
        });

        return () => {
            observer.disconnect();
        };
    }, [isReady]);

    return {
        currentView,
        containerRef,
        setTriggerRef,
        totalViews,
    };
}

export default useScrollCycle;
