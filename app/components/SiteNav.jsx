'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight, Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/certifications', label: 'Certifications' },
  { href: '/contact', label: 'Contact' },
];

export default function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    let saved = document.documentElement.dataset.theme || 'light';
    try {
      saved = window.localStorage.getItem('khushi-theme') || saved;
    } catch {
      // Keep the document theme if storage is blocked by browser settings.
    }
    const safeTheme = saved === 'dark' ? 'dark' : 'light';
    document.documentElement.dataset.theme = safeTheme;
    setTheme(safeTheme);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  function toggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = nextTheme;
    try {
      window.localStorage.setItem('khushi-theme', nextTheme);
    } catch {
      // Theme still works for this visit when browser storage is unavailable.
    }
    setTheme(nextTheme);
  }

  return (
    <header className="site-header">
      <nav className="nav wrap" aria-label="Main navigation">
        <Link className="brand" href="/" aria-label="Khushi home">
          <span className="brand-mark">k.</span>
          <span className="brand-name">khushi<span className="brand-dot">.</span><small>少しずつ、つくる。</small></span>
        </Link>
        <button className="menu-toggle" aria-expanded={open} aria-controls="nav-links" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} onClick={() => setOpen(!open)} type="button">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
        <div className={`nav-links ${open ? 'is-open' : ''}`} id="nav-links">
          {links.map((link) => (
            <Link key={link.href} href={link.href} aria-current={pathname === link.href ? 'page' : undefined} className={pathname === link.href ? 'is-active' : ''}>
              {link.label}
            </Link>
          ))}
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            aria-pressed={theme === 'dark'}
            title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
          <a className="nav-cta" href="mailto:khushiaipython@gmail.com?subject=Hello%20Khushi">Let’s connect <ArrowUpRight size={15} /></a>
        </div>
      </nav>
    </header>
  );
}
