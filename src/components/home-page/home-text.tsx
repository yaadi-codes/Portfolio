import "./home-text.css";
import useTypeWriter from "../../hooks/use-type-writer";

/*
 * This script creates a typewriter effect for the sentences in the portfolio.
 * It types out each sentence character by character, pauses at commas and periods,
 * and deletes the text before moving on to the next sentence.
 * It starts with an initial delay of 3 seconds before the first sentence begins typing.
 * The sentences are cycled through in a loop, creating a dynamic introduction.
 * The text is displayed in an HTML element with the ID 'typed-text'.
 * The typing speed and pause durations can be adjusted as needed.
 */

const sentences: string[] = [
  "Hi, I’m Malique Edwards — a Junior Full-Stack Web Developer.",
  "I love crafting modern, responsive web experiences with clean, effective design.",
  "This portfolio highlights the projects I’ve worked on and the skills I’ve gained along the way.",
  "Take a look around, and feel free to reach out — I’d love to connect!",
];

const HomeText = () => {
  // Use the hook and start when the typed-text span scrolls into view.
  const [typedText, typedRef] = useTypeWriter(sentences, {
    startWhenVisible: true,
  });

  return (
    <div id="home-text">
      <p id="helloWorld">
        Hello,{" "}
        <span>
          World{" "}
          <span className="wave" role="img" aria-label="waving hand">
            👋
          </span>
        </span>
      </p>
      <p id="introduction">
        <span id="typed-text" ref={typedRef}>
          {typedText}
        </span>
        <span className="cursor" aria-hidden>
          |
        </span>
      </p>
      <p id="cta">
        <a id="viewProject" href="#projects">
          View Projects
        </a>{" "}
        |
        <a id="contactMe" href="#contact">
          Contact Me
        </a>
      </p>
    </div>
  );
};

export default HomeText;
