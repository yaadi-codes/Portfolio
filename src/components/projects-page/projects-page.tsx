import { useState } from 'react';
import { PROJECTS, type Project } from './projects-data';
import { useAnimateOnView } from '../../hooks/use-animate-on-view';
import './projects-page.css';

/**
 * CarouselCard Component
 * Reusable card for the project carousel
 */
interface CarouselCardProps {
  project: Project;
  isSelected: boolean;
  onSelect: () => void;
}

const CarouselCard = ({ project, isSelected, onSelect }: CarouselCardProps) => (
  <button
    className={`carousel-card ${isSelected ? 'selected' : ''}`}
    onClick={onSelect}
  >
    <div className="card-thumbnail">
      {project.screenshots.length > 0 ? (
        <img 
          src={project.screenshots[0]} 
          alt={project.title}
          className="thumb-image"
        />
      ) : (
        <div className="thumb-placeholder">
          <span>🖼️</span>
        </div>
      )}
    </div>
    <div className="card-info">
      <h4 className="card-title">{project.title}</h4>
      <span className="card-category">{project.category}</span>
    </div>
  </button>
);

/**
 * ProjectsPage Component
 * 
 * Displays portfolio projects with:
 * - Introduction section (title, subtitle, description)
 * - Spotlight section (selected project with full details)
 * - Carousel section (scrollable project cards for selection)
 * 
 * First project is shown in spotlight by default.
 * Clicking a carousel card updates the spotlight.
 */
const ProjectsPage = () => {
  const [selectedId, setSelectedId] = useState<string>(PROJECTS[0]?.id || '');
  const [introRef, introAnimated] = useAnimateOnView({ threshold: 0.3 });
  const [spotlightRef, spotlightAnimated] = useAnimateOnView({ threshold: 0.2 });
  
  const selectedProject = PROJECTS.find(p => p.id === selectedId) || PROJECTS[0];

  const handleSelectProject = (project: Project) => {
    setSelectedId(project.id);
  };

  // Duplicate projects for infinite scroll effect
  const carouselProjects = [...PROJECTS, ...PROJECTS];

  return (
    <div className="projects-page">
      {/* Introduction Section */}
      <header 
        ref={introRef} 
        className={`projects-intro ${introAnimated ? 'animate' : ''}`}
      >
        <p className="intro-label">My Work</p>
        <h2 className="intro-title">Projects</h2>
        <p className="intro-description">
          A collection of projects showcasing my skills in full-stack development, 
          modern frameworks, and clean code practices. Click any project to explore.
        </p>
      </header>

      {/* Spotlight Section */}
      {selectedProject && (
        <section 
          ref={spotlightRef}
          className={`spotlight-section ${spotlightAnimated ? 'animate' : ''}`}
        >
          <div className="spotlight-container">
            {/* Screenshot Area */}
            <div className="spotlight-media">
              <div className="screenshot-display">
                {selectedProject.screenshots.length > 0 ? (
                  <img 
                    src={selectedProject.screenshots[0]} 
                    alt={`${selectedProject.title} screenshot`}
                    className="screenshot-image"
                  />
                ) : (
                  <div className="screenshot-placeholder">
                    <span className="placeholder-icon">🖼️</span>
                    <span className="placeholder-text">Preview</span>
                  </div>
                )}
              </div>
            </div>

            {/* Info Area */}
            <div className="spotlight-info">
              <span className="project-category">{selectedProject.category}</span>
              <h3 className="project-title">{selectedProject.title}</h3>
              <p className="project-subtitle">{selectedProject.subtitle}</p>
              <p className="project-description">{selectedProject.description}</p>
              
              {/* Tech Stack */}
              <div className="tech-stack">
                <span className="tech-label">Built with</span>
                <div className="tech-list">
                  {selectedProject.techStack.map((tech) => (
                    <span key={tech.name} className="tech-item">
                      {tech.icon && (
                        <img src={tech.icon} alt={tech.name} className="tech-icon" />
                      )}
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Links */}
              <div className="project-actions">
                {selectedProject.links.live && (
                  <a 
                    href={selectedProject.links.live} 
                    className="action-btn primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="btn-icon">🔗</span>
                    Live Demo
                  </a>
                )}
                {selectedProject.links.github && (
                  <a 
                    href={selectedProject.links.github} 
                    className="action-btn secondary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="btn-icon">📂</span>
                    View Code
                  </a>
                )}
                {selectedProject.links.docs && (
                  <a 
                    href={selectedProject.links.docs} 
                    className="action-btn secondary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="btn-icon">📄</span>
                    Docs
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Carousel Section */}
          <section className="carousel-section">
            <div className="carousel-header">
              <span className="carousel-label">All Projects</span>
            </div>
            <div className="carousel-track">
              <div className="carousel-slider">
                {carouselProjects.map((project, index) => (
                  <CarouselCard
                    key={`${project.id}-${index}`}
                    project={project}
                    isSelected={project.id === selectedId}
                    onSelect={() => handleSelectProject(project)}
                  />
                ))}
              </div>
            </div>
          </section>
        </section>
      )}
    </div>
  );
};

export default ProjectsPage;

