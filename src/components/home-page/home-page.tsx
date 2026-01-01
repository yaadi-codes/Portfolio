import { useScrollScale } from "../../hooks";
import "./home-page.css";
import HomeText from "./home-text";
import FallingStar from "../falling-star";

const HomePage = () => {
  const { scale, borderRadius, isInitialized } = useScrollScale({
    minScale: 0.65,
    maxScroll: 600,
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
            src="/assets/images/github-pfp.png"
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
