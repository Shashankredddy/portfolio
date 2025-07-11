import React, { useState, useEffect } from "react";
import "./Social.css";
import githubIcon from "../../assets/images/github.png";
import linkedinIcon from "../../assets/images/linkedin.png";
import twitterIcon from "../../assets/images/twitter.png";

const Social: React.FC = () => {
  const [isHomeSection, setIsHomeSection] = useState(true);

  useEffect(() => {
    const checkCurrentSection = () => {
      const homeSection = document.getElementById("home");
      if (homeSection) {
        const rect = homeSection.getBoundingClientRect();
        // Show social icons when home section is visible (with some buffer)
        const isVisible = rect.bottom > 200; // Show when home section is still partially visible
        setIsHomeSection(isVisible);
      }
    };

    // Check initial state
    checkCurrentSection();

    // Add scroll listener
    const handleScroll = () => {
      checkCurrentSection();
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/shashank-reddy-pasham",
      icon: (
        <img src={linkedinIcon} alt="LinkedIn" className="social-icon-img" />
      ),
    },
    {
      name: "GitHub",
      url: "https://github.com/Shashankredddy",
      icon: <img src={githubIcon} alt="GitHub" className="social-icon-img" />,
    },
    {
      name: "Twitter",
      url: "https://twitter.com/shashankpasham",
      icon: <img src={twitterIcon} alt="Twitter" className="social-icon-img" />,
    },
    {
      name: "Email",
      url: "mailto:reddypasham01@gmail.com",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h.98L12 10.34l9.384-6.519h.98c.904 0 1.636.732 1.636 1.636z" />
        </svg>
      ),
    },
  ];

  return (
    <div className={`social ${!isHomeSection ? "fade-out" : ""}`}>
      <div className="social-container">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            title={link.name}
          >
            <span className="social-icon">{link.icon}</span>
            <span className="social-name">{link.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Social;
