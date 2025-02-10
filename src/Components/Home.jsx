import React, { useState, useRef, useEffect } from "react";
import "../Style/home.css";

const Home = ({ scrollToSection }) => {
  const [showButton, setShowButton] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => console.log("Autoplay blocked:", error));
    }
  }, []);

  return (
    <main className="video-container">
      {/* Background Video */}
      <video
        ref={videoRef}
        className="background-video"
        src="/video/Blue Modern Technology YouTube Intro.mp4"
        autoPlay
        muted
        loop={false}
        onEnded={() => setShowButton(true)}
      />

      {/* Explore Button (Appears After Video Ends) */}
      {showButton && (
        <div className="button">
          <button className="Explore" onClick={() => scrollToSection("aboutus")}>Explore</button>
        </div>
      )}
    </main>
  );
};

export default Home;
