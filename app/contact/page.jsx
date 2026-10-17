import Link from 'next/link';
import { ArrowDownRight, ArrowUpRight, Github, Linkedin, Mail, MapPin, MessageCircle } from 'lucide-react';
import Reveal from '../components/Reveal';

export const metadata = {
  title: 'Contact Khushi — Let’s Build',
  description: 'Contact Khushi about full-stack web development, software development roles, or project collaborations.',
};

export default function ContactPage() {
  return (
    <>
      <section className="page-hero wrap contact-hero">
        <Reveal><p className="eyebrow"><span className="eyebrow-line" /> CONTACT / OPEN THE CONVERSATION</p><h1>Good work starts<br />with <span className="serif-accent">a conversation.</span></h1><p className="page-lede">I’m most interested in full-stack web development and software development opportunities, especially teams where I can contribute, learn how systems work, and grow through real engineering problems.</p></Reveal>
        <Reveal className="contact-origami" delay={100}><span>こんにちは</span><div className="origami-shape"><MessageCircle size={46} strokeWidth={1.05} /></div><small>Let’s make something useful.</small></Reveal>
      </section>
      <section className="section wrap contact-layout">
        <Reveal className="contact-main-card"><p className="section-label">THE BEST WAY TO REACH ME</p><h2>Tell me what<br /><span className="serif-accent">you’re working on.</span></h2><p>I’m happy to talk about projects, internships, entry-level opportunities, and the things I’m currently learning.</p><a className="button button-dark" href="mailto:khushiaipython@gmail.com?subject=Hello%20Khushi">Email Khushi <ArrowUpRight size={16} /></a><div className="contact-email-line"><Mail size={16} /><span>khushiaipython@gmail.com</span></div></Reveal>
        <div className="contact-links-column">
          <Reveal className="contact-link-card" delay={60}><span className="contact-link-icon"><Github size={21} /></span><div><strong>GitHub</strong><p>Code, experiments, and project repositories.</p><a href="https://github.com/khushi-aipython" target="_blank" rel="noreferrer">github.com/khushi-aipython <ArrowUpRight size={15} /></a></div></Reveal>
          <Reveal className="contact-link-card" delay={120}><span className="contact-link-icon"><Linkedin size={21} /></span><div><strong>LinkedIn</strong><p>Professional updates and career conversations.</p><a href="https://www.linkedin.com/in/khushi-aipython/" target="_blank" rel="noreferrer">linkedin.com/in/khushi-aipython <ArrowUpRight size={15} /></a></div></Reveal>
          <Reveal className="contact-link-card" delay={180}><span className="contact-link-icon"><MapPin size={21} /></span><div><strong>Location</strong><p>Jaipur, Rajasthan, India</p><span className="availability-line"><i /> Open to suitable opportunities</span></div></Reveal>
        </div>
      </section>
      <section className="contact-band"><div className="wrap contact-band-inner"><Reveal><p className="section-label">ONE LAST THING</p><h2>Curious minds<br /><span className="serif-accent">are welcome here.</span></h2></Reveal><Reveal delay={80}><Link className="button button-outline" href="/projects">See the work first <ArrowDownRight size={16} /></Link></Reveal></div></section>
    </>
  );
}
