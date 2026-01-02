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

const Header = () => {
  const { isHidden } = useHeaderVisibility();

  return (
    <>
      <header className={isHidden ? 'hidden' : '' /* I */}>
        <h1>My Portfolio</h1>
      </header>
      <nav className={isHidden ? 'hidden' : ''}>
        <ul>
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
