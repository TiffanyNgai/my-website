import React, { useEffect, useRef } from 'react';

// Hero background: a drifting molecular graph. Nodes bond when close and are drawn toward the cursor.
const COLORS = ['#5DCAA5', '#5DCAA5', '#85B7EB', '#AFA9EC', '#F0997B'];

const MoleculeField = () => {
    const ref = useRef(null);

    useEffect(() => {
        const canvas = ref.current;
        const ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;
        if (!ctx) return undefined;

        const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const mouse = { x: -9999, y: -9999 };
        let w = 0;
        let h = 0;
        let nodes = [];
        let raf = 0;

        const seed = () => {
            const count = Math.max(24, Math.min(70, Math.round((w * h) / 16000)));
            nodes = Array.from({ length: count }, (_, i) => ({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.35,
                vy: (Math.random() - 0.5) * 0.35,
                r: 2 + Math.random() * 3.5,
                c: COLORS[i % COLORS.length],
            }));
        };

        const resize = () => {
            const rect = canvas.getBoundingClientRect();
            w = rect.width;
            h = rect.height;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            seed();
            if (reduce) draw();
        };

        const draw = () => {
            ctx.clearRect(0, 0, w, h);
            const LINK = 130;
            for (let i = 0; i < nodes.length; i++) {
                const a = nodes[i];
                for (let j = i + 1; j < nodes.length; j++) {
                    const b = nodes[j];
                    const d = Math.hypot(a.x - b.x, a.y - b.y);
                    if (d < LINK) {
                        ctx.strokeStyle = `rgba(93, 202, 165, ${0.38 * (1 - d / LINK)})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }
                const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y);
                if (dm < 190) {
                    ctx.strokeStyle = `rgba(175, 169, 236, ${0.7 * (1 - dm / 190)})`;
                    ctx.lineWidth = 1.2;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
            nodes.forEach((n) => {
                ctx.fillStyle = n.c;
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
                ctx.fill();
            });
        };

        const step = () => {
            nodes.forEach((n) => {
                const dx = mouse.x - n.x;
                const dy = mouse.y - n.y;
                const d = Math.hypot(dx, dy);
                if (d < 190 && d > 1) {
                    n.vx += (dx / d) * 0.012;
                    n.vy += (dy / d) * 0.012;
                }
                n.vx *= 0.995;
                n.vy *= 0.995;
                const speed = Math.hypot(n.vx, n.vy);
                if (speed < 0.12) {
                    n.vx += (Math.random() - 0.5) * 0.04;
                    n.vy += (Math.random() - 0.5) * 0.04;
                }
                n.x += n.vx;
                n.y += n.vy;
                if (n.x < -20) n.x = w + 20;
                if (n.x > w + 20) n.x = -20;
                if (n.y < -20) n.y = h + 20;
                if (n.y > h + 20) n.y = -20;
            });
            draw();
            raf = requestAnimationFrame(step);
        };

        const onMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };
        const onLeave = () => {
            mouse.x = -9999;
            mouse.y = -9999;
        };
        // A click scatters nearby atoms.
        const onDown = (e) => {
            onMove(e);
            nodes.forEach((n) => {
                const dx = n.x - mouse.x;
                const dy = n.y - mouse.y;
                const d = Math.hypot(dx, dy);
                if (d < 220 && d > 1) {
                    n.vx += (dx / d) * 2.4;
                    n.vy += (dy / d) * 2.4;
                }
            });
        };

        resize();
        window.addEventListener('resize', resize);
        const host = canvas.parentElement;
        host.addEventListener('pointermove', onMove);
        host.addEventListener('pointerleave', onLeave);
        host.addEventListener('pointerdown', onDown);
        if (!reduce) raf = requestAnimationFrame(step);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', resize);
            host.removeEventListener('pointermove', onMove);
            host.removeEventListener('pointerleave', onLeave);
            host.removeEventListener('pointerdown', onDown);
        };
    }, []);

    return <canvas ref={ref} className="molecule-field" aria-hidden="true" />;
};

export default MoleculeField;
