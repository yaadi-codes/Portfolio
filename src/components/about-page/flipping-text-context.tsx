import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

// Animation phase type
type AnimationPhase = 'visible' | 'flipping-up' | 'revealing';

// Context type
interface FlippingTextContextType {
  rotationOffset: number;
  animationPhase: AnimationPhase;
  words: readonly string[];
  getWordForSlot: (slotIndex: number) => string;
}

// Create context with undefined default
const FlippingTextContext = createContext<FlippingTextContextType | undefined>(undefined);

// Default words for the animation
const DEFAULT_WORDS = ['ideas', 'skills', 'mindset'] as const;

interface FlippingTextProviderProps {
  words?: readonly string[];
  intervalMs?: number;
  flipDurationMs?: number;
  children: ReactNode;
}

/**
 * FlippingTextProvider
 * 
 * Provides synchronized state for all FlippingText components.
 * Uses O(1) space with rotation offset and modular arithmetic.
 */
export const FlippingTextProvider = ({
  words = DEFAULT_WORDS,
  intervalMs = 3000,
  flipDurationMs = 300,
  children,
}: FlippingTextProviderProps) => {
  const [rotationOffset, setRotationOffset] = useState(0);
  const [animationPhase, setAnimationPhase] = useState<AnimationPhase>('visible');

  // O(1) word lookup using modular arithmetic
  const getWordForSlot = useCallback(
    (slotIndex: number) => words[(slotIndex + rotationOffset) % words.length],
    [words, rotationOffset]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      // Phase 1: Start flipping up
      setAnimationPhase('flipping-up');

      // Phase 2: At midpoint, update content and start revealing
      setTimeout(() => {
        setRotationOffset((prev) => (prev + 1) % words.length);
        setAnimationPhase('revealing');
      }, flipDurationMs);

      // Phase 3: Return to visible state
      setTimeout(() => {
        setAnimationPhase('visible');
      }, flipDurationMs * 2);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [intervalMs, flipDurationMs, words.length]);

  return (
    <FlippingTextContext.Provider
      value={{
        rotationOffset,
        animationPhase,
        words,
        getWordForSlot,
      }}
    >
      {children}
    </FlippingTextContext.Provider>
  );
};

/**
 * Hook to access FlippingText context
 */
export const useFlippingText = (): FlippingTextContextType => {
  const context = useContext(FlippingTextContext);
  if (!context) {
    throw new Error('useFlippingText must be used within a FlippingTextProvider');
  }
  return context;
};

export default FlippingTextProvider;
