/**
 * a section component designed to introduce the about page
 */

const AboutPageHero = () => {
  return (
    <>
      <section className="aboutPageIntroduction">
        <h2 id="AP-Hero-Header">Malique's Source Code</h2>
        <h1 id="AP-Hero-SubTitle">
          The ideas, {/*Typewriter effect will be triggered here*/}skills, and
          mindset behind my work
        </h1>
        <p id="AP-Hero-Paragraph">
          A <em>Web Developer</em> in his third year at the{" "}
          <em>University of Technology, Jamaica</em> pursuing a Bachelor's
          Degree In <em>Computer Science</em>. I enjoy the art of building
          practical, scaleable, and well-structured web solutions that are easy
          to use and maintain. Get to know more about me.
        </p>
      </section>
    </>
  );
};

export default AboutPageHero;
