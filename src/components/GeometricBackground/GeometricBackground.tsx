import React from "react";
import "./GeometricBackground.css";

const GeometricBackground: React.FC = () => {
  return (
    <div className="geometric-background">
      <div className="geometric-shapes">
        <div className="shape circle-1"></div>
        <div className="shape circle-2"></div>
        <div className="shape circle-3"></div>
        <div className="shape circle-4"></div>
        <div className="shape circle-5"></div>
        <div className="shape hexagon-1"></div>
        <div className="shape hexagon-2"></div>
        <div className="shape triangle-1"></div>
        <div className="shape triangle-2"></div>
        <div className="shape square-1"></div>
        <div className="shape square-2"></div>
      </div>
    </div>
  );
};

export default GeometricBackground;
