import AboutPageHero from "./about-page-hero";
import "./about-page.css";

const AboutPage = () => {
  return (
    <div>
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
      <AboutPageHero />
    </div>
  );
};

export default AboutPage;
