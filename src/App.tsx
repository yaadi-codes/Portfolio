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
