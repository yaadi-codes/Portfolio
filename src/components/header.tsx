/**
 * Header Component
 * 
 * Fixed navigation header that auto-hides on scroll:
 * - Hides when scrolled > 300px from top
 * - Reappears when mouse moves within 130px of top edge
 * - Contains site title and navigation links to all sections
 * 
 * Uses useHeaderVisibility hook for scroll/mouse-based visibility logic.
 */
import { useHeaderVisibility } from "../hooks";
import "./header.css";

// Navigation links data - add/modify sections here
const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
] as const;

const Header = () => {
  const { isHidden } = useHeaderVisibility();

  return (
    <>
      <header className={isHidden ? 'hidden' : '' /* I */}>
        <h1>My Portfolio</h1>
      </header>
      <nav className={isHidden ? 'hidden' : ''}>
        <ul>
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <a href={href}>{label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Header;

