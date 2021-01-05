import React from "react";

import "./styles.css";

const LoadingScreen = () => {
  return (
    <div className="loading-container">
      <span className="loading-label">Loading</span>;
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
