/* src/App.js */

import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import SkillsSection from './components/Skills';
import Contact from './components/Contact';

function App() {
    return (
        <div>
            <Navbar />
            <section id="home">
                <div class="overlay"></div>
                <h1>TIFFANY NGAI</h1>
                <p>Engineer, Researcher, Developer, Entrepreneur</p>
            </section>
            <section id="about">
                <h2>About Me</h2>
                <p>I'm born and raised in Hong Kong. 倪倩瑩(ngai4 sin3 ying4) is my Chinese name. I went to Canada for my undergraduate degree on Systems Design Engineering at University of Waterloo. I worked in different industries and places before. After all, I realize I am deeply passionate on projects that can bring positive impacts to other people's life with technology. During spare time, I enjoy bouldering, playing drums, playing Go, and taking pictures. I'm also learning music production lately!</p>
            </section>
            <SkillsSection />
            <section id="projects">
                <h2>Projects</h2>
                <p>rock paper scissors, mnist dnn, sound synthesis, personality clssification, human tracking, solar tracking, </p>
            </section>
            <section id="experiences">
                <h2>Experiences</h2>
                <p>timeline for work</p>
            </section>
            <Contact />
        </div>
    );
}

export default App;
