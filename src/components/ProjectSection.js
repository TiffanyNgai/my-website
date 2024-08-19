import React, { useState } from 'react';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';

const projects = [
    // Add more projects here
    {
        title: 'AI Call Center Summarization Model @ Gridspace',
        image: '/summarization.jpg',
        stack: ['python', 'pytorch', 'transformers', 'natural language processing', 'nltk', 'linux', 'large language model'],
        date: 'Jan - Apr 2023',
        description: 'The goal of this project is to summarize conversations between call center agent and the caller. The summaries consist of the contextual and performance summaries. The former tells you what happened in the call, and within the contextual summary, there are different types of summaries, they differ by the length and granularity of the conversation. The latter tells you how the agent performed and how the caller feels about the conversation. I worked on data preparation, model training, and deployment (with minimal involvement in deployment, mainly on testsing) for this project. See demo here: https://youtu.be/Hf2RkgHq01c?si=T9v2FUOS8DRbLEIe',
        additionalImages: ['/summarization2.jpg']
    },
    {
        title: 'Solar Tracking',
        image: '/solar_tracking.jpg',
        stack: ['C', 'arduino', 'EEPROM', 'arduino', 'pyserial', 'firmware', 'system integration', 'data analysis', 'data visualization'],
        date: 'Jun - Jul 2023',
        description: 'The goal of this project is to create an intelligent solar tracking system to light up road signs in remote areas. We built a prototype to test for feasibility, and to see whether single axis rotation is indeed better than fixed axis rotation system. I worked on the firmware, system integration, and data analysis parts of this project. The microcontroller software for a solar panel system assists in calibrating the panel\'s orientation and performing single-axis tracking. The user manually adjusts the azimuth using a digital compass, while the microcontroller controls the tilt and rotation angles. Once the firmware is flashed, the microcontroller sets up the necessary hardware components, including the accelerometer and motor. The system captures the absolute tilt angle for calibration, after which critical data like time, location, and calibration parameters are sent from a laptop to the microcontroller via serial communication. The microcontroller then calculates the optimal rotation angle based on this data, moving the motor every 25 minutes during daylight hours, while using EEPROM to store motor position for precise movements. Additionally, the microcontroller controls LED states based on the time and continuously monitors solar panel performance, sending data back to the laptop for analysis. Code available: https://github.com/TiffanyNgai/solar_tracking',
        additionalImages: ['/solar_tracking2.PNG', '/solar_tracking3.PNG', '/solar_tracking4.PNG', '/solar_tracking5.PNG', '/solar_tracking6.jpg', '/solar_tracking7.jpg']
    },
    {
        title: 'Human Tracking',
        image: '/human_tracking.png',
        stack: ['python', 'computer vision', 'cv2', 'unsupervised learning', 'pytorch', 'clustering'],
        date: 'Nov 2022',
        description: 'The goal of this project is to determine number of frames in a video where human is found within the region of interest. We used ResNet to generate feature vector for the images and used KMeans clustering to perform classification. This project is done during a half day Hackathon event. Code available: https://github.com/TiffanyNgai/Human-tracking/blob/main/Human_tracking.ipynb',
        additionalImages: []
    },
    {
        title: 'Sound Synthesis',
        image: '/sound_synthesis.jpg',
        stack: ['python', 'numpy', 'matplotlib'],
        date: 'Sep 2022',
        description: 'Synthesize NBC chimes using audacity and python. Audacity is used to perform Fourier analysis to determine the frequency components of the chimes. Python is used to synthesize the chimes using the Fourier analysis results. Code available: https://github.com/TiffanyNgai/Sound_synthesis',
        additionalImages: []
    },
    {
        title: 'MNIST DNN',
        image: '/mnist_dnn.png',
        stack: ['python', 'numpy', 'matplotlib'],
        date: 'Sep 2022',
        description: 'First ever AI project. Created a deep neural network from scratch to classify handwritten digits from the MNIST dataset. Supports mini-batch gradient descent. Code available: https://github.com/TiffanyNgai/MNIST_dnn',
        additionalImages: []
    },
];

const ProjectsSection = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    const handleCardClick = (project) => {
        setSelectedProject(project);
    };

    const handleCloseModal = () => {
        setSelectedProject(null);
    };

    return (
        <section id="projects">
            <h2>Projects</h2>
            <div className="projects-grid">
                {projects.map((project, index) => (
                    <ProjectCard key={index} project={project} onClick={handleCardClick} />
                ))}
            </div>
            <ProjectModal project={selectedProject} onClose={handleCloseModal} />
        </section>
    );
};

export default ProjectsSection;
