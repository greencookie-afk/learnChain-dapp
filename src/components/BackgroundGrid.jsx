import React from 'react';
import './BackgroundGrid.css';

const BackgroundGrid = () => {
  return (
    <div className="background-grid">
      <div className="grid-container">
        <div className="grid-lines horizontal"></div>
        <div className="grid-lines vertical"></div>
      </div>
    </div>
  );
};

export default BackgroundGrid;
