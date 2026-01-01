export type UseTypeWriterOptions = {
    typingSpeed?: number; // ms per char
    deletingSpeed?: number; // ms per char
    pauseAtComma?: number; // ms
    pauseAtPeriod?: number; // ms
    loop?: boolean;
    startOnMount?: boolean;
    startWhenVisible?: boolean;
};
