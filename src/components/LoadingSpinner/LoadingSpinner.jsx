import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ size = 'medium', text = 'Loading...' }) => {
  return (
    <div className={`loading-spinner-container ${size}`}>
      <div className="loading-spinner"></div>
      {text && <p className="loading-text">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
