import Header from "./components/header";
import {
  HomePage,
  AboutPage,
  ProjectsPage,
  ContactPage,
  ScrollView,
  FallingStar,
} from "./components";
import "./app.css";

const App = () => {
  return (
    <>
      <FallingStar />
      <Header />
      <main>
        <ScrollView id="home">
          <HomePage />
        </ScrollView>

        {/* AboutPage has its own sections and scale effect */}
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
