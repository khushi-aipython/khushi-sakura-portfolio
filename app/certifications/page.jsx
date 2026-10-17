import Link from 'next/link';
import { ArrowUpRight, Award } from 'lucide-react';
import Reveal from '../components/Reveal';
import CertificateShelf from '../components/CertificateShelf';
import { certificates } from '../../lib/content';

export const metadata = {
  title: 'Certifications — Khushi',
  description: 'Verified certificate previews in Python, generative AI, hackathons, internship experience, and cybersecurity learning.',
};

export default function CertificationsPage() {
  return (
    <>
      <section className="page-hero wrap certifications-hero">
        <Reveal><p className="eyebrow"><span className="eyebrow-line" /> CERTIFICATIONS / RECEIPTS OF LEARNING</p><h1>Learning, then<br /><span className="serif-accent">putting it to work.</span></h1><p className="page-lede">Certificates capture a milestone. I like pairing them with the projects where I can explain what I practised, what stuck, and where I still need more depth.</p></Reveal>
        <Reveal className="credential-total" delay={100}><span className="credential-total-icon"><Award size={25} /></span><strong>{certificates.length.toString().padStart(2, '0')}</strong><span>SUPPLIED CREDENTIALS</span><small>Flip a card to preview the original certificate.</small></Reveal>
      </section>
      <section className="section-tight wrap"><CertificateShelf certificates={certificates} /></section>
      <section className="section wrap"><Reveal className="certificate-note"><div><p className="section-label">WHAT COMES NEXT</p><h2>Proof of learning<br /><span className="serif-accent">plus proof of practice.</span></h2></div><div><p>My main focus is full-stack development. Python and AI/ML are still part of my learning path, and I want the practical projects to show how those concepts turn into working software.</p><Link className="text-link" href="/projects">Explore the project stories <ArrowUpRight size={15} /></Link></div></Reveal></section>
    </>
  );
}
