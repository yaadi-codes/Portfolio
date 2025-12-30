import './about-certifications-view.css';

interface Certification {
  name: string;
  issuer: string;
  status: 'completed' | 'in-progress' | 'planned';
  year?: string;
}

const certifications: Certification[] = [
  {
    name: 'AWS Cloud Practitioner',
    issuer: 'Amazon Web Services',
    status: 'planned',
  },
  {
    name: 'Meta Front-End Developer',
    issuer: 'Meta (Coursera)',
    status: 'planned',
  },
  {
    name: 'Google IT Support',
    issuer: 'Google (Coursera)',
    status: 'planned',
  },
];

const AboutCertificationsView = () => {
  const completed = certifications.filter(c => c.status === 'completed');
  const inProgress = certifications.filter(c => c.status === 'in-progress');
  const planned = certifications.filter(c => c.status === 'planned');

  return (
    <div className="about-certifications-view">
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
                <div key={index} className="cert-card completed">
                  <h4 className="cert-name">{cert.name}</h4>
                  <p className="cert-issuer">{cert.issuer}</p>
                  {cert.year && <span className="cert-year">{cert.year}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {inProgress.length > 0 && (
          <div className="cert-section">
            <h3 className="cert-section-title">🔄 In Progress</h3>
            <div className="cert-list">
              {inProgress.map((cert, index) => (
                <div key={index} className="cert-card in-progress">
                  <h4 className="cert-name">{cert.name}</h4>
                  <p className="cert-issuer">{cert.issuer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {planned.length > 0 && (
          <div className="cert-section">
            <h3 className="cert-section-title">🎯 Interested In</h3>
            <div className="cert-list">
              {planned.map((cert, index) => (
                <div key={index} className="cert-card planned">
                  <h4 className="cert-name">{cert.name}</h4>
                  <p className="cert-issuer">{cert.issuer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutCertificationsView;
