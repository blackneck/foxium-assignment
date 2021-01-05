import React from "react";

import "./styles.css";

const LoadingScreen = () => {
  const dots = [0, 1, 2, 3, 4, 5, 6, 7];
  return (
    <div className="loading-container">
      <span className="loading-label">Loading</span>;
      <div className="lds-roller">
        {dots.map((dot) => (
          <div key={dot}></div>
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen;
