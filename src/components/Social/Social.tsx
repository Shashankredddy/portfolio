import React from "react";
import "./Social.css";

const Social: React.FC = () => {
  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/shashank-reddy-pasham",
      icon: "💼",
    },
    {
      name: "GitHub",
      url: "https://github.com/shashankpasham",
      icon: "🐙",
    },
    {
      name: "Twitter",
      url: "https://twitter.com/shashankpasham",
      icon: "🐦",
    },
    {
      name: "Email",
      url: "mailto:reddypasham2@gmail.com",
      icon: "✉️",
    },
  ];

  return (
    <div className="social">
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
