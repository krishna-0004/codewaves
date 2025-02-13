import React from 'react';
import membar from '../Data/member';
import "../Style/team.css";
const Team = () => {
  return (
    <div className="container">
      <h1 className="team-title">Our Team</h1>
      {membar.map((item) => {
        return (
          <div className="card">
            <div className="content">
              <div className="imgBX"><img src={item.image} alt={item.Name} /></div>
              <div className="contentBX">
                <h3>{item.Post}</h3>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Team
