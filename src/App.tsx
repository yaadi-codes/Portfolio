/**
 * App.tsx - Main Application Component
 * 
 * Root component that assembles the portfolio structure:
 * - Header: Fixed navigation with scroll-aware visibility
 * - HomePage: Landing section with falling stars animation
 * - AboutPage: Multi-section page with scroll-scale effects (Hero, Skills, Hobbies, Certifications)
 * - ProjectsPage: Showcase of development projects
 * - ContactPage: Contact form and social links
 * 
 * The AboutPage manages its own internal sections and scroll animations,
 * while other pages use ScrollView for consistent fade-in/out behavior.
 */
import Header from "./components/header";
import {
  HomePage,
  AboutPage,
  ProjectsPage,
  ContactPage,
  ScrollView,
} from "./components";
import "./app.css";

const App = () => {
  return (
    <>
      <Header />
      <main>
        <ScrollView id="home">
          <HomePage />
        </ScrollView>

        {/* AboutPage has its own sections and scale effect - coding */}
        <AboutPage />

        <ScrollView id="projects">
          <ProjectsPage />
        </ScrollView>

        <ScrollView id="contact">
          <ContactPage />
        </ScrollView>
      </main>
    </>
  );
};

export default App;
