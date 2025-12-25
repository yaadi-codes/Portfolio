export type UseTypeWriterOptions = {
    typingSpeed?: number; // ms per char
    deletingSpeed?: number; // ms per char
    pauseAtComma?: number; // ms
    pauseAtPeriod?: number; // ms
    initialDelay?: number; // ms before starting
    loop?: boolean;
    startOnMount?: boolean;
    startWhenVisible?: boolean;
};
