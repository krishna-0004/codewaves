import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Style/navbar.css";

const Nav = ({ scrollToSection }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
  const [visible, setVisible] = useState(true);

  const handleNavClick = (section) => {
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
      const currentScrollPos = window.scrollY;
      setScrollProgress((currentScrollPos / (document.documentElement.scrollHeight - document.documentElement.clientHeight)) * 100);

      // Show navbar when scrolling up, hide when scrolling down
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);

      // Detect which section is currently in view
      const sections = document.querySelectorAll("section");
      let currentSection = "home";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        if (currentScrollPos >= sectionTop && currentScrollPos < sectionBottom) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <header className={`nav-container ${visible ? "visible" : "hidden"}`}>
      <nav className="Navbar">
        <div className="club">CodeWave</div>
        <ul className="nav-menu">
          <li className={activeSection === "home" ? "active" : ""} onClick={() => handleNavClick("home")}>
            Home
          </li>
          <li className={activeSection === "aboutus" ? "active" : ""} onClick={() => handleNavClick("aboutus")}>
            About Us
          </li>
          <li className={activeSection === "team" ? "active" : ""} onClick={() => handleNavClick("team")}>
            Our Team
          </li>
        </ul>
        <div className="contact">
          <button className={`contact-us ${activeSection === "contact" ? "active" : ""}`} onClick={() => handleNavClick("contact")}>
            Contact Us
          </button>
        </div>
        <div className="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>
      </nav>
    </header>
  );
};

export default Nav;
