import './about-hero-view.css';

/**
 * Hero section for the About page - first view in the scroll cycle
 */
const AboutHeroView = () => {
  return (
    <div className="about-hero-view">
      <div className="hero-content">
        <p className="hero-label">Malique's Source Code</p>
        <h1 className="hero-title">
          The ideas,<br />
          skills, and<br />
          mindset behind<br />
          my work
        </h1>
        <p className="hero-description">
          I'm a third-year computing student with a strong interest in web development 
          and software design. I enjoy building practical, well-structured applications 
          that are easy to use and easy to maintain.
        </p>
        <div className="scroll-indicator">
          <span className="scroll-icon">❯❯</span>
        </div>
      </div>
      
      <div className="hero-image-container">
        <a
          href="https://github.com/yaadi-codes"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/assets/images/github-pfp.png"
            alt="Profile Picture"
            className="hero-profile-pic"
            title="Click to visit my GitHub Account 👨‍💻"
          />
        </a>
      </div>
    </div>
  );
};

export default AboutHeroView;
