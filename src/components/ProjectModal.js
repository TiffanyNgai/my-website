import React, { useState } from 'react';
import Linkify from 'react-linkify';

const ProjectModal = ({ project, onClose }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    if (!project) return null;

    const hasVideo = !!project.video;
    const totalImages = project.image
        ? [process.env.PUBLIC_URL + project.image, ...(project.additionalImages || []).map(img => process.env.PUBLIC_URL + img)]
        : [];

    const handleNextImage = () => {
        setCurrentImageIndex((currentImageIndex + 1) % totalImages.length);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((currentImageIndex - 1 + totalImages.length) % totalImages.length);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">{project.title}</h2>
                    <span className="modal-date">{project.date}</span>
                </div>

                <div className="modal-images">
                    {hasVideo ? (
                        <video
                            src={`${process.env.PUBLIC_URL}${project.video}`}
                            controls
                            loop
                            muted
                            playsInline
                            autoPlay
                            className="main-video"
                            style={{ width: '100%', borderRadius: '10px', objectFit: 'cover' }}
                        />
                    ) : (
                        <>
                            <button className="carousel-button left-button" onClick={handlePrevImage}>
                                &#8249;
                            </button>
                            <img
                                src={totalImages[currentImageIndex]}
                                alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                                className="main-image"
                            />
                            <button className="carousel-button right-button" onClick={handleNextImage}>
                                &#8250;
                            </button>
                        </>
                    )}
                </div>

                {!hasVideo && (
                    <div className="carousel-dots">
                        {totalImages.map((_, index) => (
                            <span
                                key={index}
                                className={`dot ${currentImageIndex === index ? 'active' : ''}`}
                                onClick={() => setCurrentImageIndex(index)}
                            ></span>
                        ))}
                    </div>
                )}

                <Linkify>
                    <p className="modal-description">{project.description}</p>
                </Linkify>
            </div>
        </div>
    );
};

export default ProjectModal;
