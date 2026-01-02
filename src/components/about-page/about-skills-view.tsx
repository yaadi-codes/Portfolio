/**
 * AboutSkillsView Component
 * 
 * Displays technical skills organized into categories:
 * - Frontend Development: React, TypeScript, CSS, HTML5
 * - Backend & API: Node.js, Java, REST APIs, SQL
 * - Tools & Workflow: Git, VS Code, Vite, npm
 * 
 * Each category is displayed as a card with icon, title,
 * description, and skill tags. Cards have gradient border
 * hover effects.
 */
import './about-skills-view.css';

interface SkillCategory {
  icon: string;
  title: string;
  description: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    icon: '🎨',
    title: 'Frontend Development',
    description: 'Building responsive, accessible user interfaces', // love
    skills: ['React', 'TypeScript', 'CSS', 'HTML5'],
  },
  {
    icon: '⚙️',
    title: 'Backend & API',
    description: 'Creating robust server-side logic and data flows',
    skills: ['Node.js', 'Java', 'REST APIs', 'SQL'],
  },
  {
    icon: '🛠️',
    title: 'Tools & Workflow',
    description: 'Version control and development environment',
    skills: ['Git', 'VS Code', 'Vite', 'npm'],
  },
];

const AboutSkillsView = () => {
  return (
    <>
    <div className="about-skills-view">
      <p className="view-label">Technical Arsenal</p>
      <h1 className="view-title">Skills & Technologies</h1>
      <p className="view-description">
        A look at the tools, languages and frameworks I work with to build modern web applications
      </p>
    </div>
      
      <div className="skills-grid">
        {skillCategories.map((category, index) => (
          <div key={index} className="skill-card">
            <span className="skill-icon">{category.icon}</span>
            <h3 className="skill-card-title">{category.title}</h3>
            <p className="skill-card-description">{category.description}</p>
            <div className="skill-tags">
              {category.skills.map((skill, skillIndex) => (
                <span key={skillIndex} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      </>
    
  );
};

export default AboutSkillsView;
