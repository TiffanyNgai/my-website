import React from 'react';
import { TAGS, KINDS } from '../data';

export const TagChips = ({ tags }) => (
    <span className="tag-chips">
        {tags.map((t) => (
            <span key={t} className="tag-chip" style={{ '--tag': TAGS[t].color }}>
                {TAGS[t].label}
            </span>
        ))}
    </span>
);

export const ItemHeader = ({ item }) => (
    <>
        <div className="item-meta">
            <span className="item-date">{item.date}</span>
            <span className="item-kind">{KINDS[item.kind]}</span>
        </div>
        <h3 className="item-title">{item.title}</h3>
        <p className="item-org">{item.org}</p>
    </>
);

// The expanded body of a timeline item. Shared by the classic view and the 3D showcase.
const ItemDetail = ({ item }) => (
    <div className="item-detail">
        {item.people && <p className="item-people">{item.people}</p>}
        <ul>
            {item.points.map((p) => (
                <li key={p}>{p}</li>
            ))}
        </ul>
        {item.video && (
            <video className="item-video" src={item.video} controls preload="metadata" playsInline />
        )}
        {item.images && (
            <div className="item-images">
                {item.images.map((src) => (
                    <a key={src} href={src} target="_blank" rel="noopener noreferrer">
                        <img src={src} alt={`${item.title} illustration`} loading="lazy" />
                    </a>
                ))}
            </div>
        )}
        {item.tools && (
            <div className="item-tools">
                {item.tools.map((t) => (
                    <span key={t}>{t}</span>
                ))}
            </div>
        )}
        {item.links && (
            <div className="item-links">
                {item.links.map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
                        {l.label} <span aria-hidden="true">↗</span>
                    </a>
                ))}
            </div>
        )}
    </div>
);

export default ItemDetail;
