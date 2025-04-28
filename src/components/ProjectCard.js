import React from 'react';

const ProjectCard = ({ project, onClick }) => {
    return (
        <div className="project-card" onClick={() => onClick(project)}>
            {/* Conditional rendering: if project has a video, render video. Else, render image */}
            {project.video ? (
                <video 
                    src={`${process.env.PUBLIC_URL}${project.video}`} 
                    controls 
                    loop 
                    muted 
                    playsInline 
                    className="project-media"
                    style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '10px' }}
                />
            ) : (
                <img 
                    src={`${process.env.PUBLIC_URL}${project.image}`} 
                    alt={project.title} 
                    className="project-media" 
                    style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '10px' }}
                />
            )}
            
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

