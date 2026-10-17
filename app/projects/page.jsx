import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '../components/Reveal';
import ProjectsExplorer from '../components/ProjectsExplorer';
import { projects } from '../../lib/content';

export const metadata = {
  title: 'Projects — Khushi Builds',
  description: 'Full-stack, backend, game-logic, and AI/ML project stories by Khushi, including work in progress.',
};

export default function ProjectsPage() {
  return (
    <>
      <section className="page-hero wrap projects-page-hero">
        <Reveal><p className="eyebrow"><span className="eyebrow-line" /> PROJECTS / THE WORKSHOP</p><h1>Small builds.<br /><span className="serif-accent">Bigger questions.</span></h1><p className="page-lede">These aren’t just tiles on a resume. Each build started with something I wanted to understand: authentication flow, API data, game state, architecture, and real-time collaboration.</p><p className="page-subnote">Flip a card for the approach, the problem I ran into, and the next improvement I’d make.</p></Reveal>
        <Reveal className="page-hero-index" delay={100}><span>WORK LOG</span><strong>{projects.length.toString().padStart(2, '0')}</strong><span>PROJECT STORIES</span><div className="index-circles"><i /><i /><i /><i /><i /></div></Reveal>
      </section>
      <section className="section-tight wrap"><ProjectsExplorer projects={projects} /></section>
      <section className="section wrap project-principle-section"><Reveal className="bento-card"><p className="section-label">A NOTE ON STATUS</p><h2>Honest progress is<br /><span className="serif-accent">part of the story.</span></h2><p>“Built” means there is a working project to discuss. “In progress” means the work is actively being developed or planned in stages. The GPA AI Analyzer and collaborative code editor are intentionally not presented as finished products.</p><Link className="text-link" href="/contact">Talk about a project <ArrowUpRight size={15} /></Link></Reveal></section>
    </>
  );
}
