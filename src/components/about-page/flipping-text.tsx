import { useFlippingText } from './flipping-text-context';
import './flipping-text.css';

interface FlippingTextProps {
  slotIndex: number;
}

/**
 * FlippingText Component
 * 
 * Displays a single word slot that participates in the synchronized
 * drum rotation animation. Uses shared context for state.
 */
const FlippingText = ({ slotIndex }: FlippingTextProps) => {
  const { animationPhase, getWordForSlot } = useFlippingText();

  const word = getWordForSlot(slotIndex);

  // Build class name based on animation phase
  const className = `flip-word ${animationPhase !== 'visible' ? animationPhase : ''}`.trim();

  return (
    <span className={className}>
      {word}
    </span>
  );
};

export default FlippingText;
