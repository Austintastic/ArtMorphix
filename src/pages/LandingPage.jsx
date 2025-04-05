import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles.css';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <h1>ArtMorphix</h1>
      <button onClick={() => navigate('/app')}>Launch App</button>
      <p>Not built for mobile browsers</p>
    </div>
  );
}

export default LandingPage;