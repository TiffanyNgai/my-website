/* src/App.js */

import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import SkillsSection from './components/Skills';
import Contact from './components/Contact';
import ProjectsSection from './components/ProjectSection';
import ExperienceSection from './components/ExperienceSection';

function App() {
    return (
        <div>
            <Navbar />
            <section id="home">
                <div class="overlay"></div>
                <h1>TIFFANY NGAI</h1>
                <p>Engineer | Developer | Researcher | Entrepreneur</p>
                <p class="subtext">"All a person's ways seem pure to them, but motives are weighed by the LORD. Commit to the LORD whatever you do, and he will establish your plans." - Proverbs 16:2-3</p>
            </section>
            <section id="about">
                <h2>About Me</h2>
                <p>I am passionate about applying AI, machine learning, and 3D modeling technologies to solve real-world problems. My experience spans research, industry, and entrepreneurship, where I have developed scalable ML models, full-stack web applications, and 3D simulation pipelines. I enjoy working on complex technical challenges that are impactful to bring user focused solutions to life. Feel free to check out some of my projects below!</p>
            </section>
            <SkillsSection />
            <ProjectsSection />
            <ExperienceSection />
            <Contact />
            <footer class="footer">
                <p>&copy; 2024 Tiffany Ngai</p>
            </footer>
        </div>
    );
}

export default App;
