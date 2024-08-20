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
                <p>I'm born and raised in Hong Kong, and my Chinese name is 倪倩瑩 (ngai4 sin3 ying4). I am currently studying Systems Design Engineering at University of Waterloo. I've worked in different industries and places, and I've discovered my true passion is to work on projects that use technology to make a positive difference in people's lives. When I'm not working, you'll find me bouldering, playing drums, enjoying a game of Go, or snapping photos. Lately, I've also been diving into music production!</p>
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
