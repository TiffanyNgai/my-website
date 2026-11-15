import React, { Suspense, lazy, useCallback, useEffect, useState } from 'react';
import './App.css';
import { Nav, Hero, About, Work, Publications, OffTheClock, Contact } from './components/Sections';

// three.js is only downloaded when someone opens the 3D view.
const Showcase3D = lazy(() => import('./components/Showcase3D'));

function App() {
    const [view, setView] = useState('classic');
    const [filter, setFilter] = useState('all');

    const openShowcase = useCallback(() => setView('3d'), []);
    const closeShowcase = useCallback(() => setView('classic'), []);

    useEffect(() => {
        document.body.style.overflow = view === '3d' ? 'hidden' : '';
    }, [view]);

    const pickTag = (tag) => {
        setFilter(tag);
        const el = document.getElementById('work');
        if (el && el.scrollIntoView) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="app">
            <Nav onShowcase={openShowcase} />
            <Hero onShowcase={openShowcase} />
            <main>
                <About onPickTag={pickTag} />
                <Work filter={filter} setFilter={setFilter} onShowcase={openShowcase} />
                <Publications />
                <OffTheClock />
                <Contact />
            </main>
            <footer className="footer">© 2026 Tiffany Ngai</footer>
            {view === '3d' && (
                <Suspense fallback={<div className="showcase showcase-loading">Loading the 3D view…</div>}>
                    <Showcase3D onExit={closeShowcase} />
                </Suspense>
            )}
        </div>
    );
}

export default App;
