'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, MessageCircle, Send, X } from 'lucide-react';

const starters = [
  { label: 'Full-stack projects', prompt: 'Show me Khushi’s full-stack projects.' },
  { label: 'Current learning', prompt: 'What is Khushi learning right now?' },
  { label: 'Certifications', prompt: 'Show me Khushi’s certifications.' },
  { label: 'Contact', prompt: 'How can I contact Khushi about a role?' },
];

const initialMessage = {
  role: 'assistant',
  text: 'Hi, I’m Sakura, Khushi’s portfolio guide. I can help you explore her projects, backend skills, certificates, and current builds. What would you like to know?',
  actions: [
    { label: 'Explore projects', href: '/projects' },
    { label: 'Contact Khushi', href: '/contact' },
  ],
};

export default function AssistantPanel({ pathname, onClose }) {
  const [messages, setMessages] = useState([initialMessage]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [mode, setMode] = useState('portfolio');
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const abortRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    const handleKeyDown = (event) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      abortRef.current?.abort();
    };
  }, [onClose]);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, sending]);

  async function sendMessage(rawText) {
    const message = rawText.trim().slice(0, 500);
    if (!message || sending) return;
    const currentMessages = [...messages, { role: 'user', text: message }].slice(-10);
    setMessages(currentMessages);
    setInput('');
    setSending(true);
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          history: messages.slice(-6).map(({ role, text }) => ({ role, content: text })),
        }),
        signal: controller.signal,
      });
      const data = await response.json();
      if (!response.ok && !data.reply) throw new Error(data.error || 'Assistant is temporarily unavailable.');
      setMode(data.mode === 'ai' ? 'AI responses enabled' : 'Portfolio guide');
      setMessages((previous) => [...previous, {
        role: 'assistant',
        text: data.reply || 'I can help with projects, skills, certificates, current learning, or contact details.',
        actions: Array.isArray(data.actions) ? data.actions : [],
      }].slice(-10));
    } catch (error) {
      if (error.name === 'AbortError') return;
      setMessages((previous) => [...previous, {
        role: 'assistant',
        text: 'I couldn’t reach the assistant service just now. You can still browse the project, certification, and contact pages directly.',
        actions: [
          { label: 'Projects', href: '/projects' },
          { label: 'Contact', href: '/contact' },
        ],
      }].slice(-10));
    } finally {
      setSending(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendMessage(input);
  }

  return (
    <section id="sakura-assistant-panel" className="assistant-panel" role="dialog" aria-modal="false" aria-labelledby="assistant-title">
      <header className="assistant-panel-header">
        <div className="assistant-panel-avatar"><MessageCircle size={17} aria-hidden="true" /></div>
        <div className="assistant-panel-heading">
          <h2 id="assistant-title">Sakura guide</h2>
          <p><span className="assistant-online-dot" /> {mode}</p>
        </div>
        <button type="button" className="assistant-close" onClick={onClose} aria-label="Close assistant"><X size={18} /></button>
      </header>

      <div className="assistant-context-note">Portfolio helper · currently viewing {pathname === '/' ? 'Home' : pathname.slice(1).replaceAll('-', ' ')}</div>

      <div ref={listRef} className="assistant-messages" aria-label="Conversation" aria-live="polite" aria-relevant="additions text" aria-busy={sending}>
        {messages.map((message, index) => (
          <div className={`assistant-message assistant-message-${message.role}`} key={`${index}-${message.role}`}>
            <p>{message.text}</p>
            {message.actions?.length ? (
              <div className="assistant-message-actions">
                {message.actions.map((action) => (
                  <Link href={action.href} key={`${action.href}-${action.label}`} onClick={onClose}>
                    {action.label}<ArrowUpRight size={13} aria-hidden="true" />
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        ))}
        {sending ? <div className="assistant-message assistant-message-assistant assistant-typing" role="status"><span /><span /><span /><em>Thinking…</em></div> : null}
      </div>

      {messages.length === 1 ? (
        <div className="assistant-starters" aria-label="Suggested questions">
          {starters.map((starter) => <button type="button" key={starter.label} onClick={() => sendMessage(starter.prompt)}>{starter.label}</button>)}
        </div>
      ) : null}

      <form className="assistant-input-row" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="assistant-input">Ask about Khushi’s portfolio</label>
        <input
          id="assistant-input"
          ref={inputRef}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          maxLength={500}
          placeholder="Ask about projects or skills…"
          autoComplete="off"
          disabled={sending}
        />
        <button type="submit" aria-label="Send message" disabled={sending || !input.trim()}><Send size={16} /></button>
      </form>
      <p className="assistant-disclaimer">Answers use portfolio information. Free-form AI mode can be enabled with a server-side API key.</p>
    </section>
  );
}
