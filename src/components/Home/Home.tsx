import React from "react";
import { useTypewriter } from "../../hooks";
import ParticleBackground from "../ParticleBackground/ParticleBackground";
import GeometricBackground from "../GeometricBackground/GeometricBackground";
import profileImage from "../../assets/images/profile.jpg";
import "./Home.css";

const Home: React.FC = () => {
  const roles = ["Software Engineer", "Full Stack Developer", "Java Developer"];

  const typewriterText = useTypewriter(roles, 100, 50, 2000);

  return (
    <section id="home" className="home">
      <div className="home-container">
        <GeometricBackground />
        <ParticleBackground />
        <div className="home-content">
          <p className="home-subtitle">
            <span className="typewriter-text">
              {typewriterText}
              <span className="cursor"> </span>
            </span>
          </p>
          <p className="home-description">
            MS in Computer Science from University of South Florida | Software
            Engineer | Specializing in Java, Spring Boot, React, Python, and
            machine learning technologies. Based in Tampa, Florida.
          </p>
          <div className="home-buttons">
            <button
              className="btn btn-primary"
              onClick={() => {
                window.open(
                  "https://drive.google.com/file/d/1BJBPYrVp1MVAN-7RXEjONjzB1J-yGAIq/view?usp=sharing",
                  "_blank"
                );
              }}
            >
              Resume
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                const element = document.querySelector("#contact");
                if (element) {
                  const offsetTop =
                    element.getBoundingClientRect().top +
                    window.pageYOffset -
                    80;
                  window.scrollTo({ top: offsetTop, behavior: "smooth" });
                }
              }}
            >
              Get In Touch
            </button>
          </div>
        </div>
        <div className="home-image">
          <div className="profile-image">
            <img src={profileImage} alt="Profile" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
