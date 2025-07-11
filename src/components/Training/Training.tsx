import React from "react";
import type { Training } from "../../types";
import "./Training.css";

const TrainingComponent: React.FC = () => {
  const education: Training[] = [
    {
      id: "1",
      title: "Master of Science in Computer Science",
      institution: "University of South Florida",
      duration: "Aug 2023 - May 2025",
      description:
        "Advanced studies in computer science with coursework in Advanced Data Structures and Algorithms, Deep Learning, Fair Machine Learning, Security & Privacy in ML, and Machine Learning in Technology.",
      skills: [
        "Advanced Data Structures",
        "Deep Learning",
        "Machine Learning",
        "Security & Privacy in ML",
        "Fair Machine Learning",
        "Algorithms",
      ],
    },
    {
      id: "2",
      title: "Bachelor of Technology in Computer Science and Engineering",
      institution: "Chennai Institute of Technology",
      duration: "June 2017 - May 2021",
      description:
        "Comprehensive undergraduate program with coursework in Data Structures and Algorithms, Object-Oriented Programming, and Essentials of Machine Learning.",
      skills: [
        "Data Structures",
        "Object-Oriented Programming",
        "Machine Learning Essentials",
        "Programming Fundamentals",
        "Software Engineering",
      ],
    },
  ];

  return (
    <section id="education" className="training">
      <div className="training-container">
        <div className="section-header">
          <h2>Education</h2>
          <p>My academic background and qualifications</p>
        </div>

        <div className="training-timeline">
          {education.map((training, index) => (
            <div
              key={training.id}
              className={`training-item ${index % 2 === 0 ? "left" : "right"}`}
            >
              <div className="training-content">
                <div className="training-date">{training.duration}</div>
                <h3>{training.title}</h3>
                <h4>{training.institution}</h4>
                <p>{training.description}</p>
                {training.skills && (
                  <div className="training-skills">
                    <h5>Key Skills:</h5>
                    <div className="skills-tags">
                      {training.skills.map((skill) => (
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
    </section>
  );
};

export default TrainingComponent;
