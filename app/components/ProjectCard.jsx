'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ArrowLeft, RotateCcw, Code2, CloudSun, Grid2X2, Link2, BrainCircuit, UsersRound, GraduationCap, Layers3 } from 'lucide-react';

const artIcons = { auth: Code2, weather: CloudSun, game: Grid2X2, link: Link2, knn: BrainCircuit, gpa: GraduationCap, collab: UsersRound, portfolio: Layers3 };

export default function ProjectCard({ project }) {
  const [flipped, setFlipped] = useState(false);
  const Icon = artIcons[project.visual] || Code2;
  return (
    <article className={`flip-card project-card ${flipped ? 'is-flipped' : ''} ${project.status === 'In progress' ? 'is-in-progress' : ''}`} id={project.id}>
      <div className="flip-card-inner">
        <section className="flip-face flip-front">
          <div className={`project-art project-art-${project.visual}`}>
            <div className="project-art-top"><span>{project.number} / {project.category.toUpperCase()}</span><span className={`status-dot ${project.status === 'In progress' ? 'status-dot-pulse' : ''}`} /></div>
            <div className="project-art-orbit" aria-hidden="true" />
            <div className="project-art-icon"><Icon size={39} strokeWidth={1.2} /></div>
            <div className="project-art-window" aria-hidden="true"><i /><i /><i /><span /><span /><span /></div>
            <span className="project-art-caption">{project.eyebrow}</span>
          </div>
          <div className="project-card-copy">
            <div className="card-kicker">{project.status.toUpperCase()}</div>
            <h3>{project.title}</h3>
            <p>{project.short}</p>
            <div className="tag-list">{project.stack.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}</div>
            <div className="flip-card-footer">
              <span className="flip-hint"><RotateCcw size={14} /> Turn for the story</span>
              <button type="button" className="flip-action" onClick={() => setFlipped(true)} aria-expanded={flipped}>Flip card <ArrowUpRight size={14} /></button>
            </div>
          </div>
        </section>
        <section className="flip-face flip-back" aria-hidden={!flipped}>
          <button type="button" className="back-close" onClick={() => setFlipped(false)}><ArrowLeft size={15} /> Back to card</button>
          <p className="eyebrow">{project.eyebrow}</p>
          <h3>{project.question}</h3>
          <div className="project-story-block"><span className="story-label">MY APPROACH</span><ul>{project.approach.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div className="project-story-block"><span className="story-label">THE CHALLENGE</span><p>{project.challenge}</p></div>
          <div className="project-story-block"><span className="story-label">WHAT I’D IMPROVE NEXT</span><p>{project.next}</p></div>
          <div className="tag-list back-tags">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div>
          <div className="project-back-actions">
            {project.href ? <a href={project.href} target="_blank" rel="noreferrer">{project.linkLabel} <ArrowUpRight size={15} /></a> : <span className="repo-pending">Repository link will be added when this project is public.</span>}
            {project.status === 'In progress' && <span className="status-pill"><i /> In progress</span>}
          </div>
        </section>
      </div>
    </article>
  );
}
