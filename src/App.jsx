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

// ✅ Custom hook to detect desktop screen
const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = React.useState(window.innerWidth >= 1024);

  React.useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isDesktop;
};

const App = () => {
  const isDesktop = useIsDesktop();
  const location = useLocation();

  // Refs for scrolling
  const homeRef = useRef(null);
  const aboutusRef = useRef(null);
  const teamRef = useRef(null);
  const contactusRef = useRef(null);

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

  // Scroll to top when at "/"
  useEffect(() => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  if (!isDesktop) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          textAlign: "center",
          backgroundColor: "#111",
          color: "#fff",
          fontSize: "1.5rem",
          padding: "20px",
        }}
      >
        🚫 This site is only available on Desktop/Laptop
      </div>
    );
  }

  return (
    <>
      <Bground />
      <Routes>
        <Route
          path="/"
          element={
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
          }
        />
        <Route path="/profile/:id" element={<Pro />} />
      </Routes>
    </>
  );
};

export default App;
