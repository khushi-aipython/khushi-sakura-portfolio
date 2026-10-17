import Link from 'next/link';
import { ArrowDown, ArrowUpRight, Code2, GitBranch, Sparkles, Workflow } from 'lucide-react';
import HeroVisual from './components/HeroVisual';
import Reveal from './components/Reveal';
import ProjectCard from './components/ProjectCard';
import { projects, skills } from '../lib/content';

export default function HomePage() {
  const featured = projects.filter((project) => ['hunter-auth', 'hunter-weather', 'tic-tac-toe'].includes(project.id));
  return (
    <>
      <section className="hero-section wrap">
        <div className="hero-copy">
          <Reveal><p className="eyebrow"><span className="eyebrow-line" /> FULL-STACK DEVELOPMENT · AI/ML FOUNDATIONS</p></Reveal>
          <Reveal delay={80}><h1>I like turning<br />curious questions<br />into <span className="serif-accent">working software.</span></h1></Reveal>
          <Reveal delay={130}><p className="hero-lede">I’m Khushi, a BCA (AI & IoT) student building thoughtful web experiences—from interfaces that feel simple to backends that make them work.</p></Reveal>
          <Reveal delay={190} className="hero-actions">
            <Link className="button button-dark" href="/projects">Explore my work <ArrowUpRight size={16} /></Link>
            <Link className="button button-quiet" href="/about">Read my story <span>↗</span></Link>
          </Reveal>
          <Reveal delay={240} className="hero-footnote"><span className="availability-dot" /> Open to full-stack and software development opportunities <span className="footnote-jp">つくる、学ぶ。</span></Reveal>
        </div>
        <Reveal className="hero-visual-wrap" delay={120}><HeroVisual /></Reveal>
        <a className="scroll-cue" href="#first-build"><span>SCROLL TO EXPLORE</span><ArrowDown size={14} /></a>
      </section>

      <section className="intro-strip" id="first-build">
        <div className="wrap intro-strip-inner">
          <Reveal><span className="section-label">THE THROUGH-LINE</span></Reveal>
          <Reveal delay={70}><p>Not collecting technologies for a list.<br /><span className="serif-accent">Understanding what happens underneath.</span></p></Reveal>
          <Reveal delay={120}><span className="japanese-note">少しずつ、つくる。<small>Build a little. Learn a lot.</small></span></Reveal>
        </div>
      </section>

      <section className="section wrap">
        <Reveal className="section-heading"><div><p className="section-label">SELECTED BUILDS / 01</p><h2>Projects that taught<br /><span className="serif-accent">me something real.</span></h2></div><p className="section-aside">Each project started with a question. Flip a card to see the decisions, snags, and next iteration.</p></Reveal>
        <div className="project-grid project-grid-featured">{featured.map((project, index) => <Reveal key={project.id} delay={index * 80}><ProjectCard project={project} /></Reveal>)}</div>
        <Reveal className="section-bottom-link"><span>More than finished demos—these are learning logs.</span><Link className="text-link" href="/projects">All project stories <ArrowUpRight size={15} /></Link></Reveal>
      </section>

      <section className="section soft-section">
        <div className="wrap">
          <Reveal className="section-heading"><div><p className="section-label">CURRENT TOOLBOX / 02</p><h2>A practical stack,<br /><span className="serif-accent">still growing.</span></h2></div><p className="section-aside">Web development is the main lane. AI/ML is a field I’m actively building foundations in—not a claim of mastery.</p></Reveal>
          <div className="skill-grid">{skills.map((group, index) => <Reveal key={group.title} delay={index * 65} className={`skill-card skill-${group.accent}`}><div className="skill-card-icon">{index === 0 ? <Code2 /> : index === 1 ? <Workflow /> : index === 2 ? <GitBranch /> : <Sparkles />}</div><h3>{group.title}</h3><div className="tag-list">{group.items.map((skill) => <span key={skill}>{skill}</span>)}</div></Reveal>)}</div>
          <Reveal className="learning-note"><span className="learning-mark">↗</span><p><strong>Currently stretching:</strong> backend request flows and authorization concepts, alongside Python and AI/ML foundations. AWS and Docker are at fundamentals level; Yjs is planned for the collaborative-editor build.</p><Link href="/about" className="text-link">How I learn <ArrowUpRight size={15} /></Link></Reveal>
        </div>
      </section>

      <section className="section wrap story-callout">
        <Reveal className="story-callout-inner"><div className="story-callout-number">03 <span>/ THE JOURNEY</span></div><div><p className="section-label">A WORK IN PROGRESS, BY DESIGN</p><h2>I’m not trying to look<br />like I know everything.</h2><p>I’m learning to explain my choices, separate UI from logic, and keep improving the work after it first runs. That’s the developer I’m building into.</p><Link className="button button-outline" href="/about">Meet the builder <ArrowUpRight size={16} /></Link></div><div className="callout-mark" aria-hidden="true">余白<span>make space<br />to learn</span></div></Reveal>
      </section>

      <section className="contact-band"><div className="wrap contact-band-inner"><Reveal><p className="section-label">YOUR TEAM’S NEXT CURIOSITY?</p><h2>Let’s build something<br /><span className="serif-accent">useful together.</span></h2></Reveal><Reveal delay={90}><Link className="button button-dark" href="/contact">Say hello <ArrowUpRight size={16} /></Link></Reveal></div></section>
    </>
  );
}
