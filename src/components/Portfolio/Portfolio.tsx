import React, { useState } from "react";
import type { Project } from "../../types";
import ProjectModal from "../ProjectModal/ProjectModal";
import "./Portfolio.css";

const Portfolio: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const projects: Project[] = [
    {
      id: "1",
      title: "Task Tree Generation for Automated Cooking",
      description:
        "Designed structured robotic task trees using Gemini LLM to translate complex cooking instructions into actionable Input, Output, and Motion nodes. Evaluated Zero-Shot, One-Shot, and Chain-of-Thought prompting techniques, achieving highest accuracy and structure with CoT-based task generation. Enabled robust knowledge representation for robotic cooking tasks, improving execution reliability and advancing automation in unstructured environments.",
      technologies: [
        "Python",
        "Gemini LLM",
        "Gemini API",
        "TensorFlow",
        "Neural Networks",
      ],
      imageUrl: "/api/placeholder/300/200",
      githubUrl: "https://github.com/shashankpasham",
      category: "ml",
    },
    {
      id: "2",
      title: "Full Stack Recipe Application",
      description:
        "Developed a full-stack platform using React, Node.js, Express, and PostgreSQL with user management features. The project connects the frontend to robust back-end infrastructure hosted on AWS EC2 instances. Tools Used: Tailwind, React.js, Node.js, PostgreSQL, AWS",
      technologies: ["Tailwind", "React.js", "Node.js", "PostgreSQL", "AWS"],
      imageUrl: "/api/placeholder/300/200",
      githubUrl: "https://github.com/shashankpasham",
      category: "web",
    },
    {
      id: "3",
      title: "Sentiment Analysis of Twitter Data Using Deep Learning",
      description:
        "Developed a sentiment classification model using a 3-layer Artificial Neural Network to categorize tweets as positive or negative. Preprocessed and vectorized Twitter data for training, achieving high accuracy through iterative tuning with TensorFlow and Keras. Tools Used: Python, Keras, and TensorFlow",
      technologies: ["Python", "Keras", "TensorFlow"],
      imageUrl: "/api/placeholder/300/200",
      githubUrl: "https://github.com/shashankpasham",
      category: "ml",
    },
  ];

  return (
    <section id="projects" className="portfolio">
      <div className="portfolio-container">
        <div className="section-header">
          <h2>My Projects</h2>
          <p>Here are some of my recent projects</p>
        </div>

        <div className="projects-grid">
          {projects.length > 0 ? (
            projects.map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-content">
                  <h3
                    onClick={() => openModal(project)}
                    className="project-title-clickable"
                  >
                    {project.title}
                  </h3>
                  <div className="project-technologies">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="project-links">
                    <button
                      className="project-link details"
                      onClick={() => openModal(project)}
                    >
                      View Details
                    </button>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        GitHub
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <h3>No projects found</h3>
              <p>Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>

        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      </div>
    </section>
  );
};

export default Portfolio;
