import React from 'react';
import "../Style/about.css";

const About = () => {
    return (
        <div className='main'>
            <div className="about-container">
                <h1 className="about-title">About Our Coding Club</h1>
                <div className="hero-section">
                    <img src="/images/logo.png" alt="CodeWave" className='home-logo' />
                    <h1 className="hero-heading typewriter">Welcome to CodeWave</h1>
                    <p className="hero-subheading">Wave Goodbye to Limits</p>
                </div>
                <p className="about-description">
                    Welcome to our Coding Club. Here we foster growth and learning in the world of programming!
                </p>
            </div>
        </div>
    )
}

export default About
