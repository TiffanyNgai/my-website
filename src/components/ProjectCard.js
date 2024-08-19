import React from 'react';

const ProjectCard = ({ project, onClick }) => {
    return (
        <div className="project-card" onClick={() => onClick(project)}>
            <img src={`${process.env.PUBLIC_URL}${project.image}`} alt={project.title} className="project-image" />
            <div className="project-info">
                <h3>{project.title}</h3>
                <div className="project-tags">
                    {project.stack.map((tech, index) => (
                        <span key={index} className="project-tag">
                            #{tech}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
