import React from "react";
import membar from "../Data/member";
import { Link } from "react-router-dom";
import "../Style/team.css";

const Team = () => {
  const openLink = (url) => {
    const formattedUrl = url.startsWith("http") ? url : `https://${url}`;
    window.open(formattedUrl, "_blank");
  };

  return (
    <section>
      <div className="container">
        <h1 className="team-title">Our Team</h1>
        <div className="card-container">
          {membar.map((item, index) => (
            <div className="card" key={index}>
              <div className="content">
                <div className="name">{item.Name}</div>
                <div className="imgBX">
                  <img src={item.image} alt={item.Name} />
                </div>
                <div className="contentBX">
                  <h3>{item.Post}</h3>
                </div>

                <ul className="sci">
                  {item.git && (
                    <li>
                      <button className="icons" onClick={() => openLink(item.git)}>
                        <img className="git" src="/images/github.png" alt="GitHub" />
                      </button>
                    </li>
                  )}
                  {item.link && (
                    <li>
                      <button className="icons" onClick={() => openLink(item.link)}>
                        <img className="link" src="/images/linkedin.png" alt="LinkedIn" />
                      </button>
                    </li>
                  )}
                </ul>

                <Link to={`/profile/${item.Id}`} className="view">View Profile</Link> 
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
