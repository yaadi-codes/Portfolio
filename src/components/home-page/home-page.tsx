/**
 * HomePage Component
 * 
 * Landing section of the portfolio featuring:
 * - Animated falling stars background
 * - Profile picture linking to GitHub
 * - Typewriter text introduction via HomeText component
 * - Scroll-based scale effect (shrinks as user scrolls away)
 * 
 * Configuration:
 * - minScale: 0.65 (shrinks to 65% when scrolled)
 * - maxScroll: 600px (full scale reduction occurs over 600px scroll)
 * - initialRadius: 24px (border radius when shrunk)
 */
import { useScrollScale } from "../../hooks";
import "./home-page.css";
import HomeText from "./home-text";
import FallingStar from "../falling-star";

const HomePage = () => {
  const { scale, borderRadius, isInitialized } = useScrollScale({
    minScale: 0.65,
    maxScroll: 600, // love
    initialRadius: 24,
  });

  return (
    <div
      className={`home-section ${isInitialized ? '' : 'no-transition'}`}
      style={{
        transform: `scale(${scale})`,
        borderRadius: `${borderRadius}px`,
        transformOrigin: 'center top',
      }}
    >
      <FallingStar />
      <div id="home-content">
        <a
          href="https://github.com/yaadi-codes"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/assets/images/github-pfp.webp"
            alt="Profile Picture"
            id="profile-pic"
            title="Click to visit my GitHub Account 👨‍💻."
          />
        </a>
        <HomeText />
      </div>
    </div>
  );
};

export default HomePage;
