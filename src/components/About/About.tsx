import React, { useEffect, useRef, useState } from "react";
import type { Skill, Training } from "../../types";
import "./About.css";

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<"about" | "experience" | "skills">(
    "about"
  );
  const aboutRef = useRef<HTMLElement>(null);

  const skills: Skill[] = [
    { name: "Java", level: 95, category: "Programming" },
    { name: "Python", level: 90, category: "Programming" },
    { name: "C++", level: 85, category: "Programming" },
    { name: "JavaScript", level: 85, category: "Programming" },
    { name: "TypeScript", level: 80, category: "Programming" },
    { name: "HTML/CSS", level: 85, category: "Frontend" },
    { name: "React", level: 85, category: "Frameworks" },
    { name: "Flask", level: 80, category: "Frameworks" },
    { name: "TensorFlow", level: 85, category: "ML/AI" },
    { name: "Spring Boot", level: 90, category: "Frameworks" },
    { name: "RESTful APIs", level: 90, category: "Backend" },
    { name: "MVC", level: 85, category: "Architecture" },
    { name: "AWS", level: 80, category: "Cloud" },
    { name: "Azure", level: 75, category: "Cloud" },
    { name: "MySQL", level: 85, category: "Database" },
    { name: "PostgreSQL", level: 80, category: "Database" },
    { name: "MongoDB", level: 75, category: "Database" },
    { name: "Apache Kafka", level: 80, category: "Tools" },
    { name: "Docker", level: 75, category: "DevOps" },
    { name: "Figma", level: 70, category: "Design" },
    { name: "Git", level: 90, category: "Tools" },
    { name: "Postman", level: 85, category: "Tools" },
  ];

  const experiences: Training[] = [
    {
      id: "1",
      title: "Wipro Technologies (Software Engineer)",
      institution: "Hyderabad, India",
      duration: "July 2021 - July 2023",
      description:
        "Delivered high-quality software in an Agile environment by creating and maintaining multiple production-level projects using Java, Spring Boot, REST APIs, and enhanced Kafka-based event processing pipelines.",
      skills: [
        "Java",
        "Spring Boot",
        "REST APIs",
        "Apache Kafka",
        "Agile Development",
        "Microservices",
      ],
    },
    {
      id: "2",
      title: "Smart Internz (ML Intern)",
      institution: "Hyderabad, India",
      duration: "June 2020 - July 2020",
      description:
        "Developed a Sentiment Analysis model on Twitter data using Deep Learning techniques (LSTM, CNN), achieving high accuracy in classifying positive, negative, and neutral tweets.",
      skills: [
        "Deep Learning",
        "LSTM",
        "CNN",
        "Python",
        "Twitter API",
        "Sentiment Analysis",
      ],
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Separate useEffect for handling tab change events
  useEffect(() => {
    const handleTabChange = (
      event: CustomEvent<"about" | "experience" | "skills">
    ) => {
      console.log("Tab change event received:", event.detail);
      setActiveTab(event.detail);
    };

    window.addEventListener("setAboutTab", handleTabChange as EventListener);

    return () => {
      window.removeEventListener(
        "setAboutTab",
        handleTabChange as EventListener
      );
    };
  }, []);

  return (
    <section id="about" className="about" ref={aboutRef}>
      <div className="about-container">
        <div className="section-header">
          <h2>About Me</h2>
          <p>Get to know me better</p>
        </div>

        <div className="about-content">
          <div className="tab-navigation">
            <button
              className={`tab-btn ${activeTab === "about" ? "active" : ""}`}
              onClick={() => setActiveTab("about")}
            >
              About Me
            </button>
            <button
              className={`tab-btn ${
                activeTab === "experience" ? "active" : ""
              }`}
              onClick={() => setActiveTab("experience")}
            >
              Experience
            </button>
            <button
              className={`tab-btn ${activeTab === "skills" ? "active" : ""}`}
              onClick={() => setActiveTab("skills")}
            >
              Technical Skills
            </button>
          </div>

          {activeTab === "about" && (
            <div className="tab-content about-tab" id="about-me">
              <div className="about-text">
                <h3>Software Engineer</h3>
                <p>
                  I'm a passionate software engineer currently pursuing a
                  Master's degree in Computer Science from the University of
                  South Florida. With professional experience as both a Software
                  Engineer and Machine Learning Engineer, I bring a unique blend
                  of traditional software development and cutting-edge AI/ML
                  expertise.
                </p>
                <p>
                  My technical skills span across multiple domains including
                  Java, Python, Spring Boot, React, and machine learning
                  frameworks like TensorFlow. I have hands-on experience with
                  cloud platforms (AWS, Azure), databases (MySQL, PostgreSQL,
                  MongoDB), and modern development tools and practices.
                </p>
                <p>
                  I've worked on diverse projects ranging from production-level
                  software systems using Java and Spring Boot to advanced
                  machine learning models for sentiment analysis using deep
                  learning techniques. My experience includes working with
                  microservices, RESTful APIs, and event-driven architectures
                  using Apache Kafka.
                </p>
                <p>
                  I'm passionate about leveraging technology to solve real-world
                  problems and am always excited to explore new technologies and
                  methodologies in software engineering and machine learning.
                </p>
              </div>
            </div>
          )}

          {activeTab === "skills" && (
            <div className="tab-content skills-tab" id="technical-skills">
              <div className="skills-section">
                <h3>Technical Skills</h3>
                <div className="skills-grid">
                  {skills.map((skill) => (
                    <div key={skill.name} className="skill-item">
                      <div className="skill-header">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-level">{skill.level}%</span>
                      </div>
                      <div className="skill-bar">
                        <div
                          className={`skill-progress ${
                            isVisible ? "animate" : ""
                          }`}
                          style={
                            {
                              "--target-width": `${skill.level}%`,
                            } as React.CSSProperties
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "experience" && (
            <div className="tab-content experience-tab" id="experience">
              <div className="experience-section">
                <h3>Professional Experience</h3>
                <div className="experience-timeline">
                  {experiences.map((experience) => (
                    <div key={experience.id} className="experience-item">
                      <div className="experience-content">
                        <div className="experience-date">
                          {experience.duration}
                        </div>
                        <h4>{experience.title}</h4>
                        <h5>{experience.institution}</h5>
                        <p>{experience.description}</p>
                        {experience.skills && (
                          <div className="experience-skills">
                            <h6>Key Skills:</h6>
                            <div className="skills-tags">
                              {experience.skills.map((skill) => (
                                <span key={skill} className="skill-tag">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;
