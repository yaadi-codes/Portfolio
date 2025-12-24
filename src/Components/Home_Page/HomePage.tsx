import Header from "../Header";
import ScrollCue from "../ScrollCue";
import Star from "../Star";
import "../../Styles/homePage.css";
import HomeText from "./HomeText";
import githubPfp from "../../assets/githubPfp.png";

const HomePage = () => {
  return (
    <div>
      <Header />
      <ScrollCue />
      <section id="home">
        <Star />
        <div id="home-content">
          <a
            href="https://github.com/yaadi-codes"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={githubPfp}
              alt="Profile Picture"
              id="profile-pic"
              title="Click to visit my GitHub Account 👨‍💻."
            />
          </a>
          <HomeText />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
