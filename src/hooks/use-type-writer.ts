import { useEffect, useRef, useState } from "react";
import type { UseTypeWriterOptions } from "../types";

export default function useTypeWriter(
  sentences: string[],
  options: UseTypeWriterOptions = {}
) {
  const {
    typingSpeed = 100,
    deletingSpeed = 30,
    pauseAtComma = 700,
    pauseAtPeriod = 1000,
    loop = true,
    startOnMount = true,
    startWhenVisible = false,
    firstWordInstant = false, // NEW: Show first word instantly
  } = options;

  const [text, setText] = useState("");
  const sentenceIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const isDeletingRef = useRef(false);
  const timerRef = useRef<number | null>(null);
  const startedRef = useRef(false);
  const elementRef = useRef<HTMLSpanElement | null>(null);
  const firstWordShownRef = useRef(false);

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

    // Get the first word end index (space or end of sentence)
    function getFirstWordEndIndex(sentence: string): number {
      const spaceIndex = sentence.indexOf(' ');
      return spaceIndex === -1 ? sentence.length : spaceIndex;
    }

    function tick() {
      const currentSentence = sentences[sentenceIndexRef.current] ?? "";

      if (!isDeletingRef.current) {
        // Typing
        if (charIndexRef.current < currentSentence.length) {
          // If firstWordInstant is enabled and first word not yet shown
          if (firstWordInstant && !firstWordShownRef.current && !isDeletingRef.current) {
            const firstWordEnd = getFirstWordEndIndex(currentSentence);
            charIndexRef.current = firstWordEnd;
            setText(currentSentence.slice(0, charIndexRef.current));
            firstWordShownRef.current = true;
            scheduleNext(typingSpeed, tick);
            return;
          }

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
        firstWordShownRef.current = false; // Reset for next sentence
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
    // Use both sentences and sentencesKey so the effect reliably updates when
    // the sentence reference or contents change.
  }, [sentencesKey, sentences, typingSpeed, deletingSpeed, pauseAtComma, pauseAtPeriod, loop, startOnMount, startWhenVisible, reduceMotion, firstWordInstant]);

  return [text, elementRef] as const;
}
