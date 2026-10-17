'use client';

import { useEffect } from 'react';

/** One shared observer replaces one IntersectionObserver/useEffect per Reveal. */
export default function RevealObserver() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const root = document.querySelector('#main');
    if (!root) return undefined;

    const pending = new Set();
    let observer;

    const revealImmediately = (node, skipAnimation = false) => {
      node.classList.add('is-visible');
      if (skipAnimation) node.classList.add('reveal-no-animate');
      pending.delete(node);
    };

    if (reducedMotion || !('IntersectionObserver' in window)) {
      root.querySelectorAll('.reveal').forEach((node) => revealImmediately(node, true));
      return undefined;
    }

    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        revealImmediately(entry.target, false);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });

    const observeNode = (node) => {
      if (!(node instanceof HTMLElement) || !node.classList.contains('reveal') || node.classList.contains('is-visible') || pending.has(node)) return;
      const rect = node.getBoundingClientRect();
      // Don't animate above-the-fold content after first paint; this protects Speed Index.
      if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
        revealImmediately(node, true);
        return;
      }
      pending.add(node);
      observer.observe(node);
    };

    root.querySelectorAll('.reveal').forEach(observeNode);
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          observeNode(node);
          node.querySelectorAll?.('.reveal').forEach(observeNode);
        });
      });
    });
    mutationObserver.observe(root, { subtree: true, childList: true });

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
      pending.clear();
    };
  }, []);

  return null;
}
