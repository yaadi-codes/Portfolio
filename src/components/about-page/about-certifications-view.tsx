/**
 * AboutCertificationsView Component
 * 
 * Displays professional certifications organized by status:
 * - ✅ Completed: Earned certifications with year
 * - 🔄 In Progress: Currently pursuing
 * - 🎯 Interested In: Future certification goals
 * 
 * Each certification card shows:
 * - Certification name
 * - Issuing organization
 * - Colored left border indicating status (green/yellow/blue)
 */
import { useAnimateOnView } from '../../hooks/use-animate-on-view';
import './about-certifications-view.css';

interface Certification {
  name: string;
  issuer: string;
  status: 'completed' | 'in-progress' | 'planned';
  year?: string;
  link?: string;
}

/**
 * Certification Data
 * 
 * Examples for each category:
 * 
 * COMPLETED:
 * { name: 'Certification Name', issuer: 'Issuing Organization', status: 'completed', year: '2024', link: 'https://credential-url.com' }
 * 
 * IN-PROGRESS:
 * { name: 'Certification Name', issuer: 'Issuing Organization', status: 'in-progress', link: 'https://course-url.com' }
 * 
 * PLANNED:
 * { name: 'Certification Name', issuer: 'Issuing Organization', status: 'planned' }
 */
const certifications: Certification[] = [
  // ✅ COMPLETED 
  {
    name: 'Getting Started with Microsoft Azure',
    issuer: 'Microsoft Press - LinkedIn',
    status: 'completed',
    year: '2025',
    link: 'https://www.linkedin.com/posts/maliqueedwards876_certificate-of-completion-activity-7405328352695480321-xdI3?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFdRbpoBVDbGmqm_HRKa64-VgjirQ1-Zrrg'
  },

  // 🔄 IN-PROGRESS
  {
    name: 'CompTIA Network+ (N10-009)',
    issuer: 'CompTIA',
    status: 'in-progress',
    link: 'https://www.comptia.org/certifications/network',
  },

  // 🎯 PLANNED
  {
    name: 'Microsoft Power BI Data Analyst Professional Certificate',
    issuer: 'Microsoft',
    status: 'planned',
  },
  {
    name: 'Meta Front-End Developer',
    issuer: 'Meta',
    status: 'planned',
  },
  {
    name: 'Google IT Support',
    issuer: 'Google (Coursera)',
    status: 'planned',
  },
];

/**
 * Reusable Certification Card Component
 * Renders as a link if cert has URL, otherwise as a div
 */
interface CertCardProps {
  cert: Certification;
}

const CertCard = ({ cert }: CertCardProps) => {
  const content = (
    <>
      <div className="cert-content">
        <h4 className="cert-name">{cert.name}</h4>
        <p className="cert-issuer">{cert.issuer}</p>
        {cert.year && <span className="cert-year">{cert.year}</span>}
      </div>
      {cert.link && <span className="cert-link-icon">🔗</span>}
    </>
  );

  const className = `cert-card ${cert.status}`;

  if (cert.link) {
    return (
      <a href={cert.link} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    );
  }

  return <div className={className}>{content}</div>;
};

const AboutCertificationsView = () => {
  const [certRef, certAnimated] = useAnimateOnView({ threshold: 0.2 });
  
  const completed = certifications.filter(c => c.status === 'completed');
  const inProgress = certifications.filter(c => c.status === 'in-progress');
  const planned = certifications.filter(c => c.status === 'planned');

  return (
    <div 
      ref={certRef}
      className={`about-certifications-view ${certAnimated ? 'animate' : ''}`}
    >
      <p className="view-label">Professional Growth</p>
      <h1 className="view-title">Certifications</h1>
      <p className="view-description">
        Credentials I've earned and certifications I'm pursuing
      </p>
      
      <div className="certifications-container">
        {completed.length > 0 && (
          <div className="cert-section">
            <h3 className="cert-section-title">✅ Completed</h3>
            <div className="cert-list">
              {completed.map((cert, index) => (
                <CertCard key={index} cert={cert} />
              ))}
            </div>
          </div>
        )}

        {inProgress.length > 0 && (
          <div className="cert-section">
            <h3 className="cert-section-title">🔄 In Progress</h3>
            <div className="cert-list">
              {inProgress.map((cert, index) => (
                <CertCard key={index} cert={cert} />
              ))}
            </div>
          </div>
        )}

        {planned.length > 0 && (
          <div className="cert-section">
            <h3 className="cert-section-title">🎯 Interested In</h3>
            <div className="cert-list">
              {planned.map((cert, index) => (
                <CertCard key={index} cert={cert} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutCertificationsView;

