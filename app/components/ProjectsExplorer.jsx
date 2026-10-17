'use client';

import { useMemo, useState } from 'react';
import ProjectCard from './ProjectCard';
import Reveal from './Reveal';

const filters = [
  { id: 'all', label: 'All stories' },
  { id: 'web', label: 'Web apps' },
  { id: 'backend', label: 'Backend' },
  { id: 'aiml', label: 'AI / ML' },
  { id: 'inprogress', label: 'In progress' },
];

export default function ProjectsExplorer({ projects }) {
  const [active, setActive] = useState('all');
  const filtered = useMemo(() => active === 'all' ? projects : projects.filter((project) => project.tags.includes(active)), [active, projects]);
  return (
    <>
      <Reveal className="filter-row" as="div">
        <div className="filter-chips" role="group" aria-label="Filter project cards">
          {filters.map((filter) => <button key={filter.id} className={`filter-chip ${active === filter.id ? 'is-selected' : ''}`} aria-pressed={active === filter.id} type="button" onClick={() => setActive(filter.id)}>{filter.label}</button>)}
        </div>
        <span className="filter-count">{filtered.length.toString().padStart(2, '0')} / {projects.length.toString().padStart(2, '0')}</span>
      </Reveal>
      <div className="project-grid">
        {filtered.map((project, index) => <Reveal key={project.id} delay={(index % 3) * 70} className="project-reveal"><ProjectCard project={project} /></Reveal>)}
      </div>
    </>
  );
}
