import { useEffect, useState, useRef } from 'react';
import type { RefObject } from 'react';

export function useOnScreen(
    options: IntersectionObserverInit = { threshold: 0.5 }
): [RefObject<HTMLDivElement | null>, boolean] {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsVisible(entry.isIntersecting);
        }, options);

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [options.root, options.rootMargin, options.threshold]);

    return [ref, isVisible];
}
