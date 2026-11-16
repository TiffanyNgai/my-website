import React, { useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import MoleculeField from './MoleculeField';
import ItemDetail, { ItemHeader, TagChips } from './ItemDetail';
import { TAGS, INTERESTS, items, publications, education, contact } from '../data';

export const Nav = ({ onShowcase }) => (
    <nav className="nav">
        <a className="nav-brand" href="#home">TN</a>
        <ul className="nav-links">
            <li><a href="#about">About</a></li>
            <li><a href="#work">Work</a></li>
            <li><a href="#publications">Publications</a></li>
            <li><a href="#off-the-clock">Off the clock</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
        <button className="btn btn-ghost nav-3d" onClick={onShowcase}>
            <span className="cube" aria-hidden="true" /> 3D view
        </button>
    </nav>
);

export const Hero = ({ onShowcase }) => (
    <header id="home" className="hero">
        <MoleculeField />
        <div className="hero-inner">
            <p className="eyebrow">PhD student · Computer Science · University of Waterloo</p>
            <h1>Tiffany Ngai</h1>
            <p className="hero-lead">
                I’m a researcher in <strong>computational drug discovery</strong>, and I enjoy working on
                interesting projects along the way.
            </p>
            <div className="hero-actions">
                <a className="btn btn-primary" href="#work">See my work</a>
                <button className="btn btn-ghost" onClick={onShowcase}>
                    <span className="cube" aria-hidden="true" /> Explore in 3D
                </button>
            </div>
            <blockquote className="verse">
                “All a person’s ways seem pure to them, but motives are weighed by the LORD. Commit to the LORD
                whatever you do, and he will establish your plans.”
                <cite>Proverbs 16:2-3</cite>
            </blockquote>
        </div>
        <p className="hero-hint" aria-hidden="true">Move your cursor through the molecules. Click to scatter them.</p>
    </header>
);

export const About = ({ onPickTag }) => (
    <section id="about" className="section">
        <p className="eyebrow">01 · About</p>
        <h2>Research first, with room for side quests</h2>
        <div className="about-grid">
            <div>
                <p>
                    I’m a PhD student in Computer Science at the University of Waterloo, working in the Scientific
                    Computing Lab and MMlab under the supervision of Dr. Justin Wan and Dr. Mohammad Kohandel.
                </p>
                <p>
                    My primary research focus is computational drug discovery. I’m also interested in precision
                    medicine and health, clinical AI, and generative modeling.
                </p>
                <div className="edu">
                    {education.map((e) => (
                        <div key={e.degree} className="edu-row">
                            <span className="item-date">{e.date}</span>
                            <div>
                                <strong>{e.degree}</strong>
                                <span className="muted"> · {e.school}</span>
                                <div className="muted small">{e.notes.join(' · ')}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="interests" aria-label="Research interests">
                <p className="muted small">Pick an interest to see related work</p>
                {INTERESTS.map((i) => (
                    <button
                        key={i.tag}
                        className={`interest ${i.primary ? 'interest-primary' : ''}`}
                        style={{ '--tag': TAGS[i.tag].color }}
                        onClick={() => onPickTag(i.tag)}
                    >
                        <span className="interest-dot" aria-hidden="true" />
                        <span>
                            <strong>{TAGS[i.tag].label}</strong>
                            <span className="muted small"> {i.blurb}</span>
                        </span>
                    </button>
                ))}
            </div>
        </div>
    </section>
);

export const Work = ({ filter, setFilter, onShowcase }) => {
    const [open, setOpen] = useState(null);
    const shown = useMemo(
        () =>
            items
                .filter((it) => filter === 'all' || it.tags.includes(filter))
                .sort((a, b) => b.sort - a.sort),
        [filter]
    );

    return (
        <section id="work" className="section">
            <p className="eyebrow">02 · Work</p>
            <h2>Research and projects, newest first</h2>
            <div className="filters" role="group" aria-label="Filter work by topic">
                <button className={`filter ${filter === 'all' ? 'on' : ''}`} onClick={() => setFilter('all')}>
                    All
                </button>
                {Object.entries(TAGS).map(([key, t]) => (
                    <button
                        key={key}
                        className={`filter ${filter === key ? 'on' : ''}`}
                        style={{ '--tag': t.color }}
                        onClick={() => setFilter(key)}
                    >
                        <span className="interest-dot" aria-hidden="true" /> {t.label}
                    </button>
                ))}
                <button className="filter filter-3d" onClick={onShowcase}>
                    <span className="cube" aria-hidden="true" /> Fly through it in 3D
                </button>
            </div>
            <ol className="timeline">
                {shown.map((it) => {
                    const isOpen = open === it.id;
                    return (
                        <li key={it.id} className={`tl-item ${isOpen ? 'open' : ''}`} style={{ '--tag': TAGS[it.tags[0]].color }}>
                            <span className="tl-node" aria-hidden="true" />
                            <div className="card">
                                <button
                                    className="card-head"
                                    aria-expanded={isOpen}
                                    onClick={() => setOpen(isOpen ? null : it.id)}
                                >
                                    <ItemHeader item={it} />
                                    <p className="item-summary">{it.summary}</p>
                                    <span className="card-foot">
                                        <TagChips tags={it.tags} />
                                        <span className="card-toggle">{isOpen ? 'Close' : 'Details'}</span>
                                    </span>
                                </button>
                                {isOpen && <ItemDetail item={it} />}
                            </div>
                        </li>
                    );
                })}
            </ol>
        </section>
    );
};

export const Publications = () => (
    <section id="publications" className="section">
        <p className="eyebrow">03 · Publications</p>
        <h2>Papers</h2>
        <ul className="pubs">
            {publications.map((p) => (
                <li key={p.href}>
                    <span className="pub-year">{p.year}</span>
                    <div>
                        <a href={p.href} target="_blank" rel="noopener noreferrer" className="pub-title">
                            {p.title} <span aria-hidden="true">↗</span>
                        </a>
                        <p className="muted small">{p.authors}</p>
                        <p className="muted small"><em>{p.venue}</em></p>
                    </div>
                </li>
            ))}
        </ul>
    </section>
);

const HOLDS = [
    { x: 46, y: 176, c: '#F0997B' },
    { x: 92, y: 142, c: '#AFA9EC' },
    { x: 60, y: 104, c: '#5DCAA5' },
    { x: 118, y: 78, c: '#FAC775' },
    { x: 84, y: 42, c: '#85B7EB' },
    { x: 138, y: 20, c: '#ED93B1' },
];

const BoulderWall = () => {
    const [reached, setReached] = useState(0);
    const sent = reached === HOLDS.length;
    return (
        <div className="wall">
            <svg viewBox="0 0 180 200" role="img" aria-label="A small bouldering route with six holds">
                <rect x="1" y="1" width="178" height="198" rx="12" className="wall-bg" />
                <polyline
                    className="wall-rope"
                    points={HOLDS.slice(0, reached).map((h) => `${h.x},${h.y}`).join(' ')}
                />
                {HOLDS.map((h, i) => (
                    <g
                        key={h.y}
                        className={`hold ${i < reached ? 'done' : ''} ${i === reached ? 'next' : ''}`}
                        onClick={() => i === reached && setReached(reached + 1)}
                    >
                        <ellipse cx={h.x} cy={h.y} rx={i % 2 ? 14 : 11} ry={i % 2 ? 9 : 11} fill={h.c} />
                    </g>
                ))}
            </svg>
            <div className="wall-caption">
                {sent ? (
                    <>
                        <strong>Sent!</strong>{' '}
                        <button className="link-btn" onClick={() => setReached(0)}>Climb again</button>
                    </>
                ) : (
                    <span className="muted small">
                        {reached === 0 ? 'Tap the glowing hold to start the route.' : `Hold ${reached} of ${HOLDS.length}. Keep going.`}
                    </span>
                )}
            </div>
        </div>
    );
};

const Pot = () => (
    <svg viewBox="0 0 180 150" className="pot" role="img" aria-label="A steaming pot">
        <g className="steam" fill="none" strokeWidth="3" strokeLinecap="round">
            <path d="M62 52 q-8 -10 0 -20 q8 -10 0 -20" />
            <path d="M90 52 q-8 -10 0 -20 q8 -10 0 -20" />
            <path d="M118 52 q-8 -10 0 -20 q8 -10 0 -20" />
        </g>
        <rect x="34" y="66" width="112" height="8" rx="4" fill="#F0997B" />
        <path d="M42 78 h96 v34 a18 18 0 0 1 -18 18 h-60 a18 18 0 0 1 -18 -18 z" fill="#D85A30" />
        <rect x="22" y="84" width="20" height="8" rx="4" fill="#F0997B" />
        <rect x="138" y="84" width="20" height="8" rx="4" fill="#F0997B" />
    </svg>
);

const Bulb = () => (
    <svg viewBox="0 0 180 150" className="bulb" role="img" aria-label="A light bulb">
        <g className="rays" stroke="#FAC775" strokeWidth="3" strokeLinecap="round">
            <path d="M90 8 v12 M40 28 l9 9 M140 28 l-9 9 M22 72 h12 M146 72 h12" />
        </g>
        <path d="M90 30 a38 38 0 0 1 22 69 v11 h-44 v-11 a38 38 0 0 1 22 -69 z" fill="#FAC775" />
        <rect x="70" y="114" width="40" height="8" rx="4" fill="#B4B2A9" />
        <rect x="76" y="126" width="28" height="8" rx="4" fill="#888780" />
    </svg>
);

export const OffTheClock = () => (
    <section id="off-the-clock" className="section">
        <p className="eyebrow">04 · Off the clock</p>
        <h2>What I’m into right now</h2>
        <div className="hobbies">
            <article className="hobby">
                <BoulderWall />
                <h3>Bouldering</h3>
                <p className="muted">Problem solving, but with your whole body. Try the route.</p>
            </article>
            <article className="hobby">
                <Pot />
                <h3>Meal prepping with friends</h3>
                <p className="muted">I host weekly meal prepping sessions, and I love cooking with friends.</p>
            </article>
            <article className="hobby">
                <Bulb />
                <h3>Fun projects</h3>
                <p className="muted">
                    Building things because they’re fun, like{' '}
                    <a href="https://tiffanyngai.github.io/aha/" target="_blank" rel="noopener noreferrer">AHA!</a>,
                    a STEM learning app for solidifying the foundations, and{' '}
                    <a href="https://tiffanyngai.github.io/focus/" target="_blank" rel="noopener noreferrer">Focus</a>,
                    a minimal timer and clock dashboard for deep work.
                </p>
            </article>
        </div>
    </section>
);

export const Contact = () => (
    <section id="contact" className="section contact">
        <p className="eyebrow">05 · Contact</p>
        <h2>Let’s get in touch</h2>
        <p className="muted">I’m open to new opportunities and collaborations.</p>
        <div className="contact-links">
            <a className="btn btn-primary" href={`mailto:${contact.email}`}>{contact.email}</a>
            <a className="btn btn-ghost" href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
            </a>
            <a className="btn btn-ghost" href={contact.github} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faGithub} /> GitHub
            </a>
        </div>
    </section>
);
