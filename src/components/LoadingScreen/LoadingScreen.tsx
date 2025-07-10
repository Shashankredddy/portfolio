import React, { useState, useEffect } from "react";
import "./LoadingScreen.css";

const LoadingScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="loader">
          <div className="loader-inner">
            <div className="loader-circle"></div>
            <div className="loader-circle"></div>
            <div className="loader-circle"></div>
          </div>
        </div>
        <h2>Loading Portfolio...</h2>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p>{Math.round(progress)}%</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
