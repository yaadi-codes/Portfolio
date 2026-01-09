import { useAnimateOnView } from '../../hooks/use-animate-on-view';
import './contact-page.css';

/**
 * ContactPage Component
 * 
 * Compact footer section with:
 * - Profile picture and name
 * - Contact links (Email, LinkedIn, GitHub, Instagram)
 * - Copyright notice
 * 
 * Approximately 30vh in height, uses scroll-triggered animations.
 */
const ContactPage = () => {
  // Higher threshold (0.6) to prevent triggering until footer is mostly visible
  const [footerRef, footerAnimated] = useAnimateOnView({ threshold: 0.6 });

  const currentYear = new Date().getFullYear();

  return (
    <footer 
      ref={footerRef}
      className={`contact-footer ${footerAnimated ? 'animate' : ''}`}
    >
      <p className="footer-label">Let's Connect</p>
      
      <div className="footer-profile">
        <img 
          src="/assets/images/github-pfp.webp" 
          alt="Malique Edwards" 
          className="footer-avatar"
        />
        <div className="footer-info">
          <h3 className="footer-name">Malique Edwards</h3>
          <p className="footer-title">Full-Stack Developer</p>
        </div>
      </div>

      <div className="contact-links">
        <a 
          href="mailto:yaadicodes@gmail.com" 
          className="contact-link"
          title="Send me an email"
        >
          <span className="contact-link-emoji">📧</span>
          yaadicodes@gmail.com
        </a>
        
        <a 
          href="https://www.linkedin.com/in/maliqueedwards876" 
          target="_blank" 
          rel="noopener noreferrer"
          className="contact-link"
          title="Connect on LinkedIn"
        >
          <span className="contact-link-emoji">💼</span>
          LinkedIn
        </a>
        
        <a 
          href="https://github.com/yaadi-codes" 
          target="_blank" 
          rel="noopener noreferrer"
          className="contact-link"
          title="View my GitHub"
        >
          <span className="contact-link-emoji">💻</span>
          GitHub
        </a>
        
        <a 
          href="https://www.instagram.com/its.mali_/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="contact-link"
          title="Follow on Instagram"
        >
          <span className="contact-link-emoji">📸</span>
          Instagram
        </a>
      </div>

      <div className="footer-divider"></div>
      
      <p className="footer-copyright">
        © {currentYear} Malique Edwards • Made with <span className="footer-heart">❤️</span> and React
      </p>
    </footer>
  );
};

export default ContactPage;
