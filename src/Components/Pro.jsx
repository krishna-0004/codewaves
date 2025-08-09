import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../Style/pro.css";
import membar from "../Data/member";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Profile = () => {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [displayText, setDisplayText] = useState("I am ");
  const [skillIndex, setSkillIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const selectedMember = membar.find((item) => item.Id === parseInt(id));
    setMember(selectedMember);
  }, [id]);

  useEffect(() => {
    if (member?.dom) {
      const currentSkill = member.dom[skillIndex];

      if (isDeleting) {
        if (charIndex > 0) {
          setTimeout(() => {
            setDisplayText("I am " + currentSkill.substring(0, charIndex - 1));
            setCharIndex(charIndex - 1);
          }, 100);
        } else {
          setIsDeleting(false);
          setSkillIndex((skillIndex + 1) % member.dom.length);
        }
      } else {
        if (charIndex < currentSkill.length) {
          setTimeout(() => {
            setDisplayText("I am " + currentSkill.substring(0, charIndex + 1));
            setCharIndex(charIndex + 1);
          }, 150);
        } else {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      }
    }
  }, [charIndex, isDeleting, skillIndex, member]);

  if (!member) {
    return <p className="loading-text">Loading...</p>;
  }

  return (
    <div className="profile">
      <div className="profile-container">
        {/* Profile Section with Circular Animation */}
        <section className="profile-pro">
          <div className="rounding-sec">
            <div className="big-circle">
              {member.tech_stack?.map((icon, index) => (
                <div className="icon-block" key={index}>
                  <img src={`/img/${icon}`} alt={icon.split(".")[0]} />
                </div>
              ))}
            </div>
            <div className="profile-images">
              <img src={member.image} alt={member.Name} className="fade-in" />
            </div>
          </div>
        </section>

        {/* Profile Details */}
        <section className="profile-text">
          <h2>{member.Name}</h2>
          <h3>{member.Post}</h3>
          <p>{member.desc}</p>

          {/* Typing Effect */}
          <h2 className="typing-text">
            {displayText}
            <span className="cursor">|</span>
          </h2>

          {/* Achievements */}
          <div className="achievements">
            <h4>Achievements</h4>
            <ul>
              {member.achievements?.map((achieve, index) => (
                <li key={index}>🏆 {achieve}</li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="social-links">
            <a href={member.link} target="_blank" rel="noopener noreferrer" className="linkedin fade-in">
              <FaLinkedin /> LinkedIn
            </a>
            <a href={member.git} target="_blank" rel="noopener noreferrer" className="github fade-in">
              <FaGithub /> GitHub
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
