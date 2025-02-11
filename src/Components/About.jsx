import React, { useState, useEffect, useRef } from 'react';
import "../Style/about.css";

const About = () => {
    const [visibleItems, setVisibleItems] = useState([]);
    const itemRefs = useRef([]);

    const items = [
        { image: "/About/inogretion.jpg", title: "Coding Workshops", description: "Weekly workshops on various programming languages and technologies." },
        { image: "/About/inogretion.jpg", title: "Hackathons", description: "Bi-monthly hackathons to challenge and inspire our members." },
        { image: "/About/inogretion.jpg", title: "Mentorship Program", description: "One-on-one mentorship from industry professionals." },
        { image: "/About/inogretion.jpg", title: "Project Collaborations", description: "Opportunities to work on real-world projects with team members." },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisibleItems((prev) => [...prev, Number(entry.target.id)]);
                    }
                });
            },
            { threshold: 0.1 }
        );

        itemRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="about-container">
            <h1 className="about-title">About Our Coding Club</h1>
            <div className="hero-section">
                <img src="/images/logo.png" alt="CodeWave" className='home-logo' />
                <h1 className="hero-heading typewriter">Welcome to CodeWave</h1>
                <p className="hero-subheading">Wave Goodbye to Limits</p>
            </div>
            <div className="scrolling-content">
                {items.map((item, index) => (
                    <div
                        key={index}
                        id={index.toString()}
                        ref={(el) => (itemRefs.current[index] = el)}
                        className={`scroll-item ${index % 2 === 0 ? 'even' : 'odd'} ${visibleItems.includes(index) ? 'visible' : ''}`}
                    >
                        <div className="item-image-container">
                            <img src={item.image || "/placeholder.svg"} alt={item.title} className="item-image" />
                        </div>
                        <div className="item-info">
                            <h2>{item.title}</h2>
                            <p>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default About;
