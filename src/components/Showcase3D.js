import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import ItemDetail, { ItemHeader, TagChips } from './ItemDetail';
import { TAGS, KINDS, items as allItems } from '../data';

// A fly-through timeline: every piece of work is an atom on a long molecular backbone,
// oldest first. Scroll, drag, or use the arrow keys to travel along it.
const GAP = 9; // distance between stops along the backbone
const BG = 0x070b14;

const pathX = (z) => Math.sin(z * 0.09) * 1.6;
const pathY = (z) => Math.cos(z * 0.07) * 0.6;

const wrapText = (ctx, text, maxWidth, maxLines) => {
    const words = text.split(' ');
    const lines = [];
    let line = '';
    words.forEach((word) => {
        const test = line ? `${line} ${word}` : word;
        if (ctx.measureText(test).width > maxWidth && line) {
            lines.push(line);
            line = word;
        } else {
            line = test;
        }
    });
    if (line) lines.push(line);
    if (lines.length > maxLines) {
        lines.length = maxLines;
        lines[maxLines - 1] = `${lines[maxLines - 1].replace(/[\s,.;:]+$/, '')}…`;
    }
    return lines;
};

const drawCard = (canvas, item) => {
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    const color = TAGS[item.tags[0]].color;
    ctx.clearRect(0, 0, W, H);

    ctx.beginPath();
    ctx.roundRect(6, 6, W - 12, H - 12, 28);
    ctx.fillStyle = 'rgba(13, 22, 40, 0.94)';
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = color;
    ctx.stroke();

    ctx.fillStyle = color;
    ctx.fillRect(48, 52, 56, 6);

    ctx.textBaseline = 'top';
    ctx.font = '500 30px "JetBrains Mono", monospace';
    ctx.fillStyle = color;
    ctx.fillText(item.date.toUpperCase(), 48, 78);
    ctx.textAlign = 'right';
    ctx.fillStyle = '#8b96ab';
    ctx.fillText(KINDS[item.kind].toUpperCase(), W - 48, 78);
    ctx.textAlign = 'left';

    ctx.font = '600 52px "Space Grotesk", system-ui, sans-serif';
    ctx.fillStyle = '#f1efe8';
    let y = 140;
    wrapText(ctx, item.title, W - 96, 3).forEach((l) => {
        ctx.fillText(l, 48, y);
        y += 62;
    });

    ctx.font = '400 30px "Space Grotesk", system-ui, sans-serif';
    ctx.fillStyle = '#b4b2a9';
    y += 10;
    wrapText(ctx, item.summary, W - 96, 2).forEach((l) => {
        ctx.fillText(l, 48, y);
        y += 40;
    });

    ctx.font = '500 26px "JetBrains Mono", monospace';
    ctx.fillStyle = color;
    ctx.fillText('OPEN  →', 48, H - 74);
};

const labelSprite = (text) => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    ctx.font = '700 170px "Space Grotesk", system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(133, 183, 235, 0.32)';
    ctx.fillText(text, 256, 128);
    const tex = new THREE.CanvasTexture(canvas);
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false }));
    sprite.scale.set(6, 3, 1);
    return sprite;
};

const Showcase3D = ({ onExit }) => {
    const items = useMemo(() => [...allItems].sort((a, b) => a.sort - b.sort), []);
    const mount = useRef(null);
    const api = useRef({ goTo: () => {} });
    const selectedRef = useRef(null);
    const [index, setIndex] = useState(0);
    const [selected, setSelected] = useState(null);
    const [failed, setFailed] = useState(false);

    selectedRef.current = selected;

    useEffect(() => {
        const el = mount.current;
        let renderer;
        try {
            renderer = new THREE.WebGLRenderer({ antialias: true });
        } catch (e) {
            setFailed(true);
            return undefined;
        }
        const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setSize(el.clientWidth, el.clientHeight);
        el.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(BG);
        scene.fog = new THREE.Fog(BG, 10, 44);
        const camera = new THREE.PerspectiveCamera(60, el.clientWidth / el.clientHeight, 0.1, 300);

        scene.add(new THREE.AmbientLight(0xffffff, 0.75));
        const lamp = new THREE.PointLight(0xffffff, 40, 40);
        scene.add(lamp);

        const disposables = [];
        const track = (o) => {
            disposables.push(o);
            return o;
        };

        // Backbone
        const LEN = (items.length - 1) * GAP;
        const pts = [];
        for (let z = 14; z >= -(LEN + 16); z -= 1) pts.push(new THREE.Vector3(pathX(z), pathY(z), z));
        const curve = new THREE.CatmullRomCurve3(pts);
        const tube = new THREE.Mesh(
            track(new THREE.TubeGeometry(curve, pts.length * 3, 0.05, 8, false)),
            track(new THREE.MeshBasicMaterial({ color: 0x1d9e75 }))
        );
        scene.add(tube);

        // Background particles
        const starCount = 1400;
        const starPos = new Float32Array(starCount * 3);
        for (let i = 0; i < starCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = 7 + Math.random() * 30;
            starPos[i * 3] = Math.cos(angle) * radius;
            starPos[i * 3 + 1] = Math.sin(angle) * radius * 0.7;
            starPos[i * 3 + 2] = 20 - Math.random() * (LEN + 60);
        }
        const starGeo = track(new THREE.BufferGeometry());
        starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
        const stars = new THREE.Points(
            starGeo,
            track(new THREE.PointsMaterial({ color: 0x85b7eb, size: 0.09, transparent: true, opacity: 0.8 }))
        );
        scene.add(stars);

        // Stops
        const atomGeo = track(new THREE.SphereGeometry(0.42, 32, 32));
        const smallGeo = track(new THREE.SphereGeometry(0.16, 16, 16));
        const cardGeo = track(new THREE.PlaneGeometry(4.6, 2.76));
        const pickables = [];
        const cards = [];
        const atoms = [];
        const stops = [];
        let lastYear = null;

        items.forEach((item, i) => {
            const z = -i * GAP;
            const side = i % 2 ? 1 : -1;
            const color = new THREE.Color(TAGS[item.tags[0]].color);
            const centre = new THREE.Vector3(pathX(z), pathY(z), z);
            const stop = new THREE.Group();
            stop.userData.z = z;
            scene.add(stop);
            stops.push(stop);

            const atomMat = track(
                new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.55, roughness: 0.35 })
            );
            const atom = new THREE.Mesh(atomGeo, atomMat);
            atom.position.copy(centre);
            atom.userData.index = i;
            stop.add(atom);
            atoms.push(atom);
            pickables.push(atom);

            // Side atoms, so each stop reads as a small functional group.
            const lineMat = track(new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.7 }));
            [[-side * 1.1, 0.8, 0.5], [-side * 0.9, -0.8, -0.6]].forEach(([dx, dy, dz]) => {
                const s = new THREE.Mesh(smallGeo, atomMat);
                s.position.set(centre.x + dx, centre.y + dy, centre.z + dz);
                stop.add(s);
                const g = track(new THREE.BufferGeometry().setFromPoints([centre, s.position]));
                stop.add(new THREE.Line(g, lineMat));
            });

            const canvas = document.createElement('canvas');
            canvas.width = 920;
            canvas.height = 552;
            drawCard(canvas, item);
            const tex = track(new THREE.CanvasTexture(canvas));
            tex.colorSpace = THREE.SRGBColorSpace;
            tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
            const card = new THREE.Mesh(cardGeo, track(new THREE.MeshBasicMaterial({ map: tex, transparent: true })));
            const bond = track(new THREE.BufferGeometry());
            card.userData = { index: i, canvas, tex, item, base: 0, scale: 1, centre, side, bond };
            stop.add(card);
            cards.push(card);
            pickables.push(card);
            stop.add(new THREE.Line(bond, lineMat));

            if (item.year && item.year !== lastYear) {
                const label = labelSprite(String(item.year));
                label.position.set(centre.x - side * 4.6, centre.y + 2.4, z - 3);
                scene.add(label);
                track(label.material.map);
                track(label.material);
                lastYear = item.year;
            }
        });

        // Cards sit beside their atom on wide screens and above it on portrait ones,
        // and the camera pulls back just far enough to keep the nearest card in frame.
        let pullBack = 0;
        const layout = () => {
            const portrait = camera.aspect < 1;
            cards.forEach((c) => {
                const { centre, side, bond } = c.userData;
                if (portrait) {
                    c.position.set(centre.x + side * 0.5, centre.y + 2.2, centre.z);
                    c.rotation.y = -side * 0.1;
                } else {
                    c.position.set(centre.x + side * 3.5, centre.y + 0.75, centre.z);
                    c.rotation.y = -side * 0.3;
                }
                c.userData.base = c.position.y;
                bond.setFromPoints([centre, centre.clone().lerp(c.position, 0.38)]);
            });
            const halfFov = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
            const reach = portrait ? 3.3 : 6.4; // how far from centre the card's outer edge sits
            pullBack = Math.max(0, reach / (halfFov * camera.aspect) - 7.5);
        };
        layout();

        // Web fonts may land after the first draw; redraw the cards once they are ready.
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(() => {
                cards.forEach((c) => {
                    drawCard(c.userData.canvas, c.userData.item);
                    c.userData.tex.needsUpdate = true;
                });
            });
        }

        // Travel state
        let target = 0;
        let current = -10; // start a little before the first stop and glide in
        let shownIndex = 0;
        const mouse = new THREE.Vector2(0, 0);
        const pointer = new THREE.Vector2(0, 0);
        const ray = new THREE.Raycaster();
        let hovered = null;
        let drag = null;
        let raf = 0;

        const clamp = (v) => Math.max(0, Math.min(LEN, v));
        api.current.goTo = (i) => {
            target = clamp(i * GAP);
        };

        const pick = (e) => {
            const rect = renderer.domElement.getBoundingClientRect();
            pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
            ray.setFromCamera(pointer, camera);
            const hit = ray.intersectObjects(pickables, false)[0];
            return hit && hit.distance < 30 && hit.object.parent.visible ? hit.object : null;
        };

        const onWheel = (e) => {
            e.preventDefault();
            target = clamp(target + e.deltaY * 0.012);
        };
        const onDown = (e) => {
            drag = { x: e.clientX, y: e.clientY, start: target, moved: false };
        };
        const onMove = (e) => {
            mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
            if (drag) {
                const dy = e.clientY - drag.y;
                const dx = e.clientX - drag.x;
                if (Math.abs(dx) + Math.abs(dy) > 6) drag.moved = true;
                if (drag.moved) target = clamp(drag.start + dy * 0.05 - dx * 0.03);
                return;
            }
            const obj = pick(e);
            hovered = obj ? obj.userData.index : null;
            renderer.domElement.style.cursor = obj ? 'pointer' : 'grab';
        };
        const onUp = (e) => {
            const wasDrag = drag && drag.moved;
            drag = null;
            if (wasDrag) return;
            const obj = pick(e);
            if (obj) {
                target = clamp(obj.userData.index * GAP);
                setSelected(obj.userData.index);
            }
        };
        const onKey = (e) => {
            const here = Math.round(target / GAP);
            if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(e.key)) {
                e.preventDefault();
                target = clamp((here + 1) * GAP);
            } else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) {
                e.preventDefault();
                target = clamp((here - 1) * GAP);
            } else if (e.key === 'Enter') {
                setSelected(here);
            } else if (e.key === 'Escape') {
                if (selectedRef.current !== null) setSelected(null);
                else onExit();
            }
        };
        const onResize = () => {
            camera.aspect = el.clientWidth / el.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(el.clientWidth, el.clientHeight);
            layout();
        };

        const dom = renderer.domElement;
        dom.style.touchAction = 'none';
        dom.style.cursor = 'grab';
        dom.addEventListener('wheel', onWheel, { passive: false });
        dom.addEventListener('pointerdown', onDown);
        window.addEventListener('pointermove', onMove);
        dom.addEventListener('pointerup', onUp);
        window.addEventListener('keydown', onKey);
        window.addEventListener('resize', onResize);

        const clock = new THREE.Clock();
        const look = new THREE.Vector3();
        const frame = () => {
            const t = clock.getElapsedTime();
            current += (target - current) * (reduce ? 1 : 0.07);

            const z = 7.5 - current;
            camera.position.set(pathX(z) * 0.4 + mouse.x * 0.7, pathY(z) * 0.4 + 1.7 - mouse.y * 0.4, z + pullBack);
            look.set(pathX(z - 9) * 0.7, pathY(z - 9) * 0.6 + 0.5, z - 9);
            camera.lookAt(look);
            lamp.position.copy(camera.position);
            // Hide stops the camera has reached, so nothing looms right in front of the lens.
            stops.forEach((g) => {
                g.visible = camera.position.z - g.userData.z > 3.5;
            });

            atoms.forEach((a, i) => {
                const pulse = 1 + Math.sin(t * 2 + i) * 0.06 + (hovered === i ? 0.25 : 0);
                a.scale.setScalar(pulse);
            });
            cards.forEach((c, i) => {
                const want = hovered === i ? 1.08 : 1;
                c.userData.scale += (want - c.userData.scale) * 0.15;
                c.scale.setScalar(c.userData.scale);
                c.position.y = c.userData.base + (reduce ? 0 : Math.sin(t * 0.9 + i * 1.7) * 0.08);
            });
            stars.rotation.z = reduce ? 0 : t * 0.01;

            const now = Math.max(0, Math.min(items.length - 1, Math.round(current / GAP)));
            if (now !== shownIndex) {
                shownIndex = now;
                setIndex(now);
            }

            renderer.render(scene, camera);
            raf = requestAnimationFrame(frame);
        };
        raf = requestAnimationFrame(frame);

        return () => {
            cancelAnimationFrame(raf);
            dom.removeEventListener('wheel', onWheel);
            dom.removeEventListener('pointerdown', onDown);
            window.removeEventListener('pointermove', onMove);
            dom.removeEventListener('pointerup', onUp);
            window.removeEventListener('keydown', onKey);
            window.removeEventListener('resize', onResize);
            disposables.forEach((d) => d.dispose && d.dispose());
            renderer.dispose();
            if (dom.parentNode) dom.parentNode.removeChild(dom);
        };
    }, [items, onExit]);

    const go = (i) => {
        const next = Math.max(0, Math.min(items.length - 1, i));
        api.current.goTo(next);
    };
    const item = selected !== null ? items[selected] : null;

    return (
        <div className="showcase" role="dialog" aria-label="3D timeline showcase">
            <div ref={mount} className="showcase-canvas" />

            <div className="showcase-top">
                <div>
                    <p className="eyebrow">3D view · timeline</p>
                    <p className="showcase-now">
                        {items[index].year || 'Now'} <span className="muted">· {index + 1} of {items.length}</span>
                    </p>
                </div>
                <button className="btn btn-ghost" onClick={onExit}>Back to classic view</button>
            </div>

            {failed && (
                <div className="showcase-failed">
                    <p>Your browser couldn’t start WebGL, so the 3D view isn’t available here.</p>
                    <button className="btn btn-primary" onClick={onExit}>Back to classic view</button>
                </div>
            )}

            {!failed && (
                <div className="showcase-bottom">
                    <p className="showcase-hint muted small">Scroll or drag to travel · click a card to open it</p>
                    <div className="rail">
                        <button className="rail-step" onClick={() => go(index - 1)} disabled={index === 0} aria-label="Previous stop">←</button>
                        <div className="rail-dots">
                            {items.map((it, i) => (
                                <button
                                    key={it.id}
                                    className={`rail-dot ${i === index ? 'on' : ''}`}
                                    style={{ '--tag': TAGS[it.tags[0]].color }}
                                    onClick={() => go(i)}
                                    aria-label={`${it.title}, ${it.date}`}
                                    title={`${it.title} · ${it.date}`}
                                />
                            ))}
                        </div>
                        <button className="rail-step" onClick={() => go(index + 1)} disabled={index === items.length - 1} aria-label="Next stop">→</button>
                    </div>
                </div>
            )}

            {item && (
                <aside className="showcase-panel" style={{ '--tag': TAGS[item.tags[0]].color }}>
                    <button className="panel-close" onClick={() => setSelected(null)} aria-label="Close details">×</button>
                    <ItemHeader item={item} />
                    <TagChips tags={item.tags} />
                    <ItemDetail item={item} />
                </aside>
            )}
        </div>
    );
};

export default Showcase3D;
