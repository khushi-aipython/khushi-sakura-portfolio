'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useRef, useState } from 'react';

/** Small launcher only; the larger chat UI is downloaded on first open. */
export default function PortfolioAssistant() {
  const pathname = usePathname() || '/';
  const [Panel, setPanel] = useState(null);
  const [open, setOpen] = useState(false);
  const [loadingPanel, setLoadingPanel] = useState(false);
  const [panelError, setPanelError] = useState(false);
  const launcherRef = useRef(null);

  async function openAssistant() {
    setOpen(true);
    if (Panel || loadingPanel) return;
    setLoadingPanel(true);
    setPanelError(false);
    try {
      const mod = await import('./AssistantPanel');
      setPanel(() => mod.default);
    } catch {
      setPanelError(true);
    } finally {
      setLoadingPanel(false);
    }
  }

  function closeAssistant() {
    setOpen(false);
    window.requestAnimationFrame(() => launcherRef.current?.focus());
  }

  return (
    <aside className="assistant-widget" aria-label="Portfolio assistant">
      {open ? (
        Panel ? <Panel key={pathname} pathname={pathname} onClose={closeAssistant} /> : panelError ? (
          <div className="assistant-loading-panel" role="alert"><p>Couldn’t load Sakura guide right now.</p><button type="button" className="assistant-retry" onClick={openAssistant}>Try again</button></div>
        ) : (
          <div id="sakura-assistant-panel" className="assistant-loading-panel" role="status">Opening Sakura guide…</div>
        )
      ) : null}
      <button
        ref={launcherRef}
        type="button"
        className={`assistant-launcher ${open ? 'assistant-launcher-open' : ''}`}
        onClick={open ? closeAssistant : openAssistant}
        aria-expanded={open}
        aria-controls={open ? "sakura-assistant-panel" : undefined}
        aria-label={open ? 'Close Sakura portfolio assistant' : 'Open Sakura portfolio assistant'}
      >
        <span className="assistant-avatar-wrap" key={pathname}>
          <Image
            src="/images/khushi-anime-assistant.webp"
            width={78}
            height={104}
            alt=""
            aria-hidden="true"
            loading="lazy"
            sizes="64px"
          />
          <span className="assistant-orbit-dot" aria-hidden="true" />
        </span>
        <span className="assistant-launcher-label">{open ? 'Close guide' : 'Ask Sakura'}</span>
        <span className="assistant-online-dot" aria-hidden="true" />
      </button>
    </aside>
  );
}
