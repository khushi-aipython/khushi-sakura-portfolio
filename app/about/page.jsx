import Link from 'next/link';
import { ArrowUpRight, BookOpen, Boxes, BrainCircuit, CheckCircle2, Code2, GitBranch, GraduationCap, MessageSquareText } from 'lucide-react';
import Reveal from '../components/Reveal';
import { skills } from '../../lib/content';

export const metadata = {
  title: 'About Khushi — How I Build',
  description: 'Khushi’s learning story, education, experience, and full-stack development skills.',
};

const timeline = [
  { period: '2024 — 2027', title: 'BCA · Artificial Intelligence & IoT', place: 'The ICFAI University, Jaipur', detail: 'Building a broad computer-science foundation while exploring web development and machine learning. Current CGPA: 8.00/10.', icon: GraduationCap },
  { period: 'JUN — AUG 2026', title: 'Content Writer', place: 'AVS Vishal Pvt. Ltd. · Jaipur', detail: 'Created customer-facing content, researched audience interests, and learned to make information clear and useful for the person reading it.', icon: MessageSquareText },
  { period: 'JAN — MAR 2026', title: 'AI for Bharat Hackathon · Team Leader', place: 'AWS / Hack2Skill', detail: 'Helped coordinate team responsibilities, communication, and deadlines while contributing to a prototype-focused hackathon project.', icon: Boxes },
];

const principles = [
  { title: 'Understand the flow', body: 'I want to know what moves from the browser to the server, how data is stored, and why a request succeeds or fails.', icon: GitBranch },
  { title: 'Reason before reach', body: 'I try to break a problem into states and edge cases before jumping to a library or copy-pasting an implementation.', icon: BrainCircuit },
  { title: 'Explain the trade-off', body: 'A project is more useful when I can explain what I chose, what was difficult, and what I would improve next.', icon: BookOpen },
];

export default function AboutPage() {
  return (
    <>
      <section className="page-hero wrap">
        <Reveal><p className="eyebrow"><span className="eyebrow-line" /> ABOUT / THE PERSON BEHIND THE BUILDS</p><h1>I’m learning to build<br /><span className="serif-accent">with intention.</span></h1><p className="page-lede">I’m Khushi—a BCA student focused on full-stack web development, with AI/ML as a growing second track. My portfolio is a record of how I learn, not a claim that the learning is finished.</p></Reveal>
        <Reveal className="about-quote-card" delay={90}><span className="quote-mark">“</span><p>Make the logic clear enough that the interface can change without breaking the idea.</p><span className="quote-credit">A PRINCIPLE I’M PRACTISING</span></Reveal>
      </section>

      <section className="section wrap story-section">
        <Reveal className="section-heading"><div><p className="section-label">THE STORY SO FAR / 01</p><h2>From “make it work”<br />to <span className="serif-accent">“why does it work?”</span></h2></div><p className="section-aside">The shift I care about most is moving from just seeing a result to understanding the system behind it.</p></Reveal>
        <div className="story-columns"><Reveal><p className="story-lead">I started with visible things: a page, a button, a weather result. The more I built, the more interesting the hidden parts became.</p><p className="story-questions">How does a login become an authenticated request? How do I represent a game without depending on the order of the buttons? What should an app do while an API is loading—or when it fails?</p><p>Those questions now shape how I approach projects. I lean toward small, testable steps, learn by building, and treat each rough edge as a clue for the next iteration.</p></Reveal><Reveal delay={90} className="process-card"><span className="section-label">MY LOOP</span><div className="process-step"><i>01</i><div><strong>Ask a question</strong><span>Define what I want to understand.</span></div></div><div className="process-arrow">↓</div><div className="process-step"><i>02</i><div><strong>Build a small version</strong><span>Keep the scope concrete.</span></div></div><div className="process-arrow">↓</div><div className="process-step"><i>03</i><div><strong>Find the weak point</strong><span>Test edge cases and explain what failed.</span></div></div><div className="process-arrow">↓</div><div className="process-step"><i>04</i><div><strong>Refine and document</strong><span>Make the next pass more deliberate.</span></div></div></Reveal></div>
      </section>

      <section className="section soft-section"><div className="wrap"><Reveal className="section-heading"><div><p className="section-label">EDUCATION & EXPERIENCE / 02</p><h2>Where the practice<br /><span className="serif-accent">is happening.</span></h2></div></Reveal><div className="timeline">{timeline.map((item, index) => { const Icon = item.icon; return <Reveal key={item.title} delay={index * 70} className="timeline-item"><div className="timeline-marker"><Icon size={19} /></div><div className="timeline-body"><span className="timeline-period">{item.period}</span><h3>{item.title}</h3><p className="timeline-place">{item.place}</p><p>{item.detail}</p></div></Reveal>; })}</div></div></section>

      <section className="section wrap"><Reveal className="section-heading"><div><p className="section-label">WHAT I VALUE / 03</p><h2>My process is part<br /><span className="serif-accent">of the product.</span></h2></div></Reveal><div className="principle-grid">{principles.map((item, index) => { const Icon = item.icon; return <Reveal className="principle-card" key={item.title} delay={index * 65}><span className="principle-icon"><Icon size={21} /></span><h3>{item.title}</h3><p>{item.body}</p></Reveal>; })}</div></section>

      <section className="section soft-section"><div className="wrap"><Reveal className="section-heading"><div><p className="section-label">SKILLS / 04</p><h2>The toolkit I’m<br /><span className="serif-accent">using and growing.</span></h2></div><p className="section-aside">My current direction is backend development, especially authentication, authorization, APIs, and data flow. Next.js and SCSS are used in this portfolio, while AWS and Docker are infrastructure fundamentals I’m building up. The Three.js/GLSL scene is a visual experiment for this site—not my main learning focus. Python and AI/ML remain a second learning track.</p></Reveal><div className="skill-grid">{skills.map((group, index) => <Reveal key={group.title} delay={index * 60} className={`skill-card skill-${group.accent}`}><div className="skill-card-icon">{index === 0 ? <Code2 /> : index === 1 ? <GitBranch /> : index === 2 ? <Boxes /> : <BrainCircuit />}</div><h3>{group.title}</h3><div className="tag-list">{group.items.map((skill) => <span key={skill}>{skill}</span>)}</div></Reveal>)}</div><Reveal className="section-bottom-link"><span>Want to see these skills in context?</span><Link href="/projects" className="text-link">Read the project stories <ArrowUpRight size={15} /></Link></Reveal></div></section>
    </>
  );
}
