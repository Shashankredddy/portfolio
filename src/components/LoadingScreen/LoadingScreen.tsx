import React, { useState, useEffect } from "react";
import "./LoadingScreen.css";

const LoadingScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Simulate realistic loading stages
    const loadingStages = [
      { delay: 200, increment: 15 },
      { delay: 300, increment: 20 },
      { delay: 250, increment: 25 },
      { delay: 200, increment: 20 },
      { delay: 150, increment: 15 },
      { delay: 100, increment: 5 },
    ];

    let currentProgress = 0;
    let stageIndex = 0;

    const updateProgress = () => {
      if (stageIndex < loadingStages.length) {
        const stage = loadingStages[stageIndex];
        currentProgress += stage.increment;

        if (currentProgress >= 100) {
          currentProgress = 100;
        }

        setProgress(currentProgress);

        if (currentProgress >= 100) {
          // Start fade out animation
          setTimeout(() => {
            setFadeOut(true);
          }, 800);

          // Remove component after fade out
          setTimeout(() => {
            setIsLoading(false);
          }, 1300);
        } else {
          stageIndex++;
          setTimeout(updateProgress, stage.delay);
        }
      }
    };

    // Start loading after a brief delay
    setTimeout(updateProgress, 500);
  }, []);

  if (!isLoading) return null;

  return (
    <div className={`loading-screen ${fadeOut ? "fade-out" : ""}`}>
      <div className="particles-bg">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="loading-content">
        <div className="logo-container">
          <div className="logo-text">
            <span className="first-name">SHASHANK</span>
            <span className="last-name">REDDY</span>
          </div>
          <div className="logo-underline"></div>
        </div>

        <div className="spinner-container">
          <div className="spinner">
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
          </div>
        </div>

        <div className="loading-text">
          <p className="loading-subtitle">Loading Portfolio...</p>
        </div>

        <div className="progress-container">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
            <div className="progress-glow"></div>
          </div>
          <div className="progress-text">{Math.round(progress)}%</div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
