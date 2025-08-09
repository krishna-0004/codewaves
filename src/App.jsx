import React, { useRef, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Nav from "./Components/Nav";
import Bground from "./Components/Bground";
import Home from "./Components/Home";
import About from "./Components/About";
import Team from "./Components/Team";
import Contact from "./Components/Contact";
import Pro from "./Components/Pro";
import "./App.css";

const MainContent = () => {
  const homeRef = useRef(null);
  const aboutusRef = useRef(null);
  const teamRef = useRef(null);
  const contactusRef = useRef(null);
  const location = useLocation();

  const sectionRefs = {
    home: homeRef,
    aboutus: aboutusRef,
    team: teamRef,
    contact: contactusRef,
  };

  const scrollToSection = (section) => {
    if (sectionRefs[section]?.current) {
      sectionRefs[section].current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  return (
    <>
      <Nav scrollToSection={scrollToSection} />
      <main>
        <section ref={homeRef} id="home">
          <Home scrollToSection={scrollToSection} />
        </section>
        <section ref={aboutusRef} id="aboutus">
          <About />
        </section>
        <section ref={teamRef} id="team">
          <Team />
        </section>
        <section ref={contactusRef} id="contact">
          <Contact />
        </section>
      </main>
    </>
  );
};

const App = () => {
  return (
    <>
      <Bground />
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/profile/:id" element={<Pro />} />
      </Routes>
    </>
  );
};

export default App;
