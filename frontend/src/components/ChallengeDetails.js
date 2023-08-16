import React from 'react';
import visorAiImage from '../img/visorAi.jpg'; 
import './ChallengeDetails.css'; 

function ChallengeDetails() {
  return (
    <div className='sidebar'>
       <div className="company-profile">
            <img src={visorAiImage} alt="Visor.ai Logo" className="company-logo" />
            <h2 className="company-name">Visor.ai</h2>
            
        </div>
        <div className="footer">
            <h3 className="challenge-title">Web Code Challenge</h3>
            <h4 style={{ color:'darkgray', fontWeight:400}} className="user-name">Andreia Pereira</h4>
        </div>
        <h5 className="chat-title">Simple Chat App</h5>
    </div>
    
  );
}

export default ChallengeDetails;
