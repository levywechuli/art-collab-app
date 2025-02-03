// src/components/ProjectCard.js
import React from 'react';
import { Link } from 'react-router-dom';

function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <Link to={`/projects/${project.id}`}>
        <h3>{project.title}</h3>
      </Link>
      <p>{project.description}</p>
      {/* ... other project details ... */}
    </div>
  );
}

export default ProjectCard;