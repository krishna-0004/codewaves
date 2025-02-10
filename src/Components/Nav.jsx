import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Style/navbar.css";

const Nav = ({ scrollToSection }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("home");

  const handelNavClick = (section) => {
    if (location.pathname === "/") {
      scrollToSection(section);
    } else {
      navigate("/", { replace: true });
      setTimeout(() => {
        scrollToSection(section);
      }, 300);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (scrollTop / scrollHeight) * 100;
      setScrollProgress(progress);

      // Detect which section is currently in view
      const sections = document.querySelectorAll("section");
      let currentSection = "home"; // Default to home

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100; // Adjust based on navbar height
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header>
      <nav className="Navbar">
        <div className="club">CodeWave</div>
        <ul className="nav-menu">
          <li className={activeSection === "home" ? "active" : ""} onClick={() => handelNavClick("home")}>Home</li>
          <li className={activeSection === "aboutus" ? "active" : ""} onClick={() => handelNavClick("aboutus")}>About Us</li>
          <li className={activeSection === "team" ? "active" : ""} onClick={() => handelNavClick("team")}>Our Team</li>
        </ul>
        <div className="contact">
          <button className={`contact-us ${activeSection === "contact" ? "active" : ""}`} onClick={() => handelNavClick("contact")}>Contact Us</button>
        </div>
        <div className="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>
      </nav>
    </header>
  );
};

export default Nav;
