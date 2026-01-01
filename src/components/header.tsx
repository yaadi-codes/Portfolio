import { useHeaderVisibility } from "../hooks";
import "./header.css";

const Header = () => {
  const { isHidden } = useHeaderVisibility();

  return (
    <>
      <header className={isHidden ? 'hidden' : ''}>
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
