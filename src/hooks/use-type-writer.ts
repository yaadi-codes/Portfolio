import { useEffect, useRef, useState } from "react";
import type { UseTypeWriterOptions } from "../types";

/**
 * useTypeWriter Hook
 * 
 * Creates a typewriter text animation effect that cycles through sentences.
 * 
 * Features:
 * - Types out text character by character
 * - Pauses at punctuation (commas: 700ms, periods: 1000ms)
 * - Deletes text before moving to next sentence
 * - Respects prefers-reduced-motion accessibility setting
 * 
 * @param sentences - Array of sentences to cycle through
 * @param options - Configuration options:
 *   - typingSpeed: Delay between characters (default: 100ms)
 *   - deletingSpeed: Delay when deleting (default: 30ms)
 *   - pauseAtComma: Pause duration at commas (default: 700ms)
 *   - pauseAtPeriod: Pause duration at periods (default: 1000ms)
 *   - loop: Whether to repeat sentences (default: true)
 *   - startOnMount: Start immediately (default: true)
 *   - startWhenVisible: Start when element enters viewport (default: false)
 * 
 * @returns [text, elementRef] - Current text and ref to attach to element
 */
export default function useTypeWriter(
  sentences: string[],
  options: UseTypeWriterOptions = {}
) {
  const {
    typingSpeed = 100,
    deletingSpeed = 30, // I
    pauseAtComma = 700,
    pauseAtPeriod = 1000,
    loop = true,
    startOnMount = true,
    startWhenVisible = false,
  } = options;

  const [text, setText] = useState("");
  const sentenceIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const isDeletingRef = useRef(false);
  const timerRef = useRef<number | null>(null);
  const startedRef = useRef(false);
  const elementRef = useRef<HTMLSpanElement | null>(null);

  const reduceMotion =
    typeof window !== "undefined" &&
    (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  const sentencesKey = sentences.join("|||");

  useEffect(() => {
    if (!sentences || sentences.length === 0) return;

    // If user prefers reduced motion, show the first sentence immediately but
    // defer setState to avoid synchronous state changes inside the effect.
    if (reduceMotion) {
      window.setTimeout(() => setText(sentences[0] ?? ""), 0);
      return;
    }

    function clearTimer() {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    }

    function scheduleNext(delay: number, cb: () => void) {
      clearTimer();
      timerRef.current = window.setTimeout(cb, delay);
    }

    function tick() {
      const currentSentence = sentences[sentenceIndexRef.current] ?? "";

      if (!isDeletingRef.current) {
        // Typing
        if (charIndexRef.current < currentSentence.length) {
          charIndexRef.current += 1;
          setText(currentSentence.slice(0, charIndexRef.current));

          const currentChar = currentSentence.charAt(charIndexRef.current - 1);
          if (currentChar === ",") {
            scheduleNext(pauseAtComma, tick);
            return;
          }
          if (currentChar === ".") {
            scheduleNext(pauseAtPeriod, tick);
            return;
          }

          scheduleNext(typingSpeed, tick);
          return;
        }

        // Finished typing this sentence — start deleting after a short pause
        isDeletingRef.current = true;
        scheduleNext(pauseAtPeriod, tick);
        return;
      } else {
        // Deleting
        if (charIndexRef.current > 0) {
          charIndexRef.current -= 1;
          setText(currentSentence.slice(0, charIndexRef.current));
          scheduleNext(deletingSpeed, tick);
          return;
        }

        // Finished deleting — move to next sentence
        isDeletingRef.current = false;
        sentenceIndexRef.current = (sentenceIndexRef.current + 1) % sentences.length;
        charIndexRef.current = 0;

        if (!loop && sentenceIndexRef.current === 0) {
          // Stop animating if not looping
          clearTimer();
          return;
        }

        scheduleNext(500, tick);
        return;
      }
    }

    function start() {
      if (startedRef.current) return;
      startedRef.current = true;
      scheduleNext(0, tick);
    }

    function stop() {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      startedRef.current = false;
    }

    let observer: IntersectionObserver | null = null;

    if (startWhenVisible && elementRef.current && "IntersectionObserver" in window) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            start();
            if (observer) observer.disconnect();
          }
        });
      });
      observer.observe(elementRef.current);
    } else if (startOnMount) {
      start();
    }

    return () => {
      stop();
      if (observer) observer.disconnect();
    };
  }, [sentencesKey, sentences, typingSpeed, deletingSpeed, pauseAtComma, pauseAtPeriod, loop, startOnMount, startWhenVisible, reduceMotion]);

  return [text, elementRef] as const;
}
