import Star from "../falling-star";
import "./home-page.css";
import HomeText from "./home-text";

const HomePage = () => {
  return (
    <div className="home-section">
        <Star />
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
