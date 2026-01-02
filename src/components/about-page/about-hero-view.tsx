import './about-hero-view.css';

// Tech icons data - easily expandable
interface TechIcon {
  name: string;
  icon: string;
  ring: 1 | 2 | 3;
}

const techIcons: TechIcon[] = [
  // Ring 1 (horizontal orbit)
  { name: 'React', icon: '/assets/icons/react-2.svg', ring: 1 },
  { name: 'Node.js', icon: '/assets/icons/nodejs-icon.svg', ring: 1 },
  { name: 'MongoDB', icon: '/assets/icons/mongodb-icon.svg', ring: 1 },
  
  // Ring 2 (tilted 60° orbit, reverse direction)
  { name: 'JavaScript', icon: '/assets/icons/javascript-1.svg', ring: 2 },
  { name: 'TypeScript', icon: '/assets/icons/typescript.svg', ring: 2 },
  { name: 'SQL', icon: '/assets/icons/css-3.svg', ring: 2 },
  
  // Ring 3 (tilted -60° orbit)
  { name: 'Git', icon: '/assets/icons/git-icon.svg', ring: 3 },
  { name: 'GitHub', icon: '/assets/icons/github-icon-1.svg', ring: 3 },
  { name: 'HTML/CSS', icon: '/assets/icons/html-1.svg', ring: 3 },
];

/**
 * AboutHeroView Component
 * 
 * Hero section displaying introduction and animated tech stack:
 * - Left side: Name, headline, description, and scroll indicator
 * - Right side: 3D orbiting tech icons around profile picture
 * 
 * Orbit Animation System:
 * - Ring 1: Horizontal orbit (rotateX: 70deg)
 * - Ring 2: Tilted 60° clockwise (rotateX: 70deg, rotateZ: 60deg) - reverse direction
 * - Ring 3: Tilted 60° counter-clockwise (rotateX: 70deg, rotateZ: -60deg)
 * 
 * Icons are positioned using CSS custom properties (--i, --total) for
 * automatic distribution around each ring.
 */
const AboutHeroView = () => {
  // Group icons by ring
  const ring1Icons = techIcons.filter(icon => icon.ring === 1);
  const ring2Icons = techIcons.filter(icon => icon.ring === 2);
  const ring3Icons = techIcons.filter(icon => icon.ring === 3);

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
        <div className="orbit-container">
          {/* Orbit Ring 1 - Horizontal */}
          <div className="orbit-ring orbit-ring-1">
            {ring1Icons.map((tech, i) => (
              <div 
                key={tech.name} 
                className="orbit-icon"
                style={{ '--i': i, '--total': ring1Icons.length } as React.CSSProperties}
              >
                <img src={tech.icon} alt={tech.name} title={tech.name} />
                <span className="icon-label">{tech.name}</span>
              </div>
            ))}
          </div>

          {/* Orbit Ring 2 - Tilted 60° */}
          <div className="orbit-ring orbit-ring-2">
            {ring2Icons.map((tech, i) => (
              <div 
                key={tech.name} 
                className="orbit-icon"
                style={{ '--i': i, '--total': ring2Icons.length } as React.CSSProperties}
              >
                <img src={tech.icon} alt={tech.name} title={tech.name} />
                <span className="icon-label">{tech.name}</span>
              </div>
            ))}
          </div>

          {/* Orbit Ring 3 - Tilted -60° */}
          <div className="orbit-ring orbit-ring-3">
            {ring3Icons.map((tech, i) => (
              <div 
                key={tech.name} 
                className="orbit-icon"
                style={{ '--i': i, '--total': ring3Icons.length } as React.CSSProperties}
              >
                <img src={tech.icon} alt={tech.name} title={tech.name} />
                <span className="icon-label">{tech.name}</span>
              </div>
            ))}
          </div>

          {/* Center profile picture */}
          <a
            href="https://github.com/yaadi-codes"
            target="_blank"
            rel="noopener noreferrer"
            className="profile-center"
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
    </div>
  );
};

export default AboutHeroView;
