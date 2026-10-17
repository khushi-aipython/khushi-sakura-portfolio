'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, ArrowLeft, RotateCcw, FileBadge } from 'lucide-react';

export default function CertificateCard({ certificate }) {
  const [flipped, setFlipped] = useState(false);
  const [imageReady, setImageReady] = useState(false);
  return (
    <article className={`flip-card certificate-card ${flipped ? 'is-flipped' : ''}`}>
      <div className="flip-card-inner">
        <section className="flip-face flip-front">
          <div className="certificate-front-art">
            <span className="certificate-index">CERTIFICATE / {certificate.number}</span>
            <div className="certificate-stamp"><FileBadge size={31} strokeWidth={1.1} /><span>verified<br />learning</span></div>
            <span className="certificate-lines" aria-hidden="true"><i /><i /><i /><i /></span>
            <span className="certificate-corner">花</span>
          </div>
          <div className="certificate-copy">
            <div className="card-kicker">{certificate.category.toUpperCase()}</div>
            <h3>{certificate.title}</h3>
            <p className="certificate-issuer">{certificate.issuer}</p>
            <div className="flip-card-footer">
              <span className="flip-hint"><RotateCcw size={14} /> Turn to preview</span>
              <button type="button" className="flip-action" onClick={() => { setFlipped(true); setImageReady(true); }} aria-expanded={flipped}>Flip card <ArrowUpRight size={14} /></button>
            </div>
          </div>
        </section>
        <section className="flip-face flip-back certificate-back" aria-hidden={!flipped}>
          <button type="button" className="back-close" onClick={() => setFlipped(false)}><ArrowLeft size={15} /> Back to card</button>
          <p className="eyebrow">{certificate.issuer}</p>
          <h3>{certificate.title}</h3>
          <div className="certificate-preview-wrap">
            {imageReady && <Image src={certificate.image} alt={`${certificate.title} certificate preview`} width={900} height={650} loading="lazy" sizes="(max-width: 680px) 80vw, 420px" />}
          </div>
          <p className="certificate-detail">{certificate.detail}</p>
          {certificate.date ? <p className="certificate-date">{certificate.date}</p> : null}
          <a className="text-link" href={certificate.pdf} target="_blank" rel="noreferrer">Open original certificate PDF <ArrowUpRight size={15} /></a>
        </section>
      </div>
    </article>
  );
}
