import Link from 'next/link';
import { ArrowUpRight, Github, Linkedin } from 'lucide-react';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <Link className="brand" href="/" aria-label="Khushi home">
          <span className="brand-mark">k.</span><span className="brand-name">khushi<span className="brand-dot">.</span></span>
        </Link>
        <p className="footer-thought">Learning is a continuous release.</p>
        <div className="footer-links">
          <a href="https://github.com/khushi-aipython" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17} /></a>
          <a href="https://www.linkedin.com/in/khushi-aipython/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a>
          <a href="mailto:khushiaipython@gmail.com" aria-label="Email"><ArrowUpRight size={17} /></a>
        </div>
        <p className="footer-note">© {new Date().getFullYear()} KHUSHI · JAIPUR, INDIA</p>
      </div>
    </footer>
  );
}
