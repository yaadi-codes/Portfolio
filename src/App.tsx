import Header from "./components/header";
import { HomePage, AboutPage, ProjectsPage, ContactPage, ScrollView } from "./components";
import "./app.css";

const App = () => {
  return (
    <>
      <Header />
      <main>
        <ScrollView id="home" height="100vh">
          <HomePage />
        </ScrollView>

        <ScrollView id="about" height="100vh">
          <AboutPage />
        </ScrollView>

        <ScrollView id="projects" height="100vh">
          <ProjectsPage />
        </ScrollView>

        <ScrollView id="contact" height="100vh">
          <ContactPage />
        </ScrollView>
      </main>
    </>
  );
};

export default App;
