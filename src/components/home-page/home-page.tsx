import { useScrollScale } from "../../hooks";
import "./home-page.css";
import HomeText from "./home-text";

const HomePage = () => {
  const { scale, borderRadius } = useScrollScale({
    minScale: 0.65,
    maxScroll: 600,
    initialRadius: 24,
  });

  return (
    <div
      className="home-section"
      style={{
        transform: `scale(${scale})`,
        borderRadius: `${borderRadius}px`,
        transformOrigin: 'center top',
      }}
    >
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
