import { useEffect, useState, useCallback } from 'react';

interface HeaderVisibilityResult {
    isHidden: boolean;
}

/**
 * Hook to control header visibility based on scroll position and mouse movement.
 * - Hides header when scrolled > 300px
 * - Shows header when mouse is within 130px from top
 * - Hides header when mouse moves away from top (> 130px) and scrolled > 300px
 */
export function useHeaderVisibility(): HeaderVisibilityResult {
    const [isHidden, setIsHidden] = useState(false);

    const handleScroll = useCallback(() => {
        if (window.scrollY > 300) {
            setIsHidden(true);
        } else {
            setIsHidden(false);
        }
    }, []);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        const nearTop = e.clientY < 130;
        const farDown = e.clientY > 130 && window.scrollY > 300;

        if (nearTop) {
            setIsHidden(false);
        } else if (farDown) {
            setIsHidden(true);
        }
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, [handleScroll, handleMouseMove]);

    return { isHidden };
}

export default useHeaderVisibility;
