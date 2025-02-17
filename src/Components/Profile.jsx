import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // For capturing URL params
import membar from '../Data/member'; // Import your member data
import "../Style/profile.css"

const Profile = () => {
  const { id } = useParams(); // Get the member ID from the URL params
  const [member, setMember] = useState(null);

  useEffect(() => {
    // Find the member by matching ID
    const selectedMember = membar.find((item) => item.Id === parseInt(id));
    setMember(selectedMember); 
  }, [id]);

  // If the member is not found, display a loading or error message
  if (!member) {
    return <div>Loading...</div>;
  }

  const discr = `
    कृष्णः सदा सहायते सर्वदुःखं हरायते। 
    भक्तानामभयप्रदः कृष्णाय तुभ्यं नमो नमः॥`;

  return (
    <div className="profile">
      <div className="container">
        <main className="content">
          <section className="pro">
            <div className="main">
              <div className="rounding-sec">
                <div className="big-circle">
                  {/* Add the member's image */}
                  <div className="icon-block">
                    <img src={member.image} alt={`${member.Name}`} />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="intro">
            <div className="text">
              <h2>{member.Name}</h2>
              <h3>{member.Post}</h3>
              <pre>{discr}</pre>
              <p>{member.desc}</p>
              <div className="social-buttons">
                {member.link && (
                  <a href={`https://${member.link}`} className="social-button linkedin" target="_blank" rel="noopener noreferrer">
                    <img className="social" src="/img/limkedin.png" alt="LinkedIn" />
                  </a>
                )}
                {member.git && (
                  <a href={member.git} className="social-button github" target="_blank" rel="noopener noreferrer">
                    <img className="social" src="/img/git.png" alt="GitHub" />
                  </a>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Profile;
