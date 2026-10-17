'use client';

import { useMemo, useState } from 'react';
import CertificateCard from './CertificateCard';
import Reveal from './Reveal';

const options = [
  { id: 'all', label: 'All certificates' },
  { id: 'Python', label: 'Python' },
  { id: 'AI / Learning', label: 'AI & learning' },
  { id: 'Internship', label: 'Internship' },
  { id: 'Hackathon', label: 'Hackathon' },
  { id: 'Cybersecurity', label: 'Cybersecurity' },
];

export default function CertificateShelf({ certificates }) {
  const [filter, setFilter] = useState('all');
  const filtered = useMemo(() => filter === 'all' ? certificates : certificates.filter((certificate) => certificate.category === filter), [filter, certificates]);
  return (
    <>
      <Reveal className="filter-row">
        <div className="filter-chips" role="group" aria-label="Filter certificates">
          {options.map((option) => <button className={`filter-chip ${filter === option.id ? 'is-selected' : ''}`} type="button" key={option.id} aria-pressed={filter === option.id} onClick={() => setFilter(option.id)}>{option.label}</button>)}
        </div>
        <span className="filter-count">{filtered.length.toString().padStart(2, '0')} credentials</span>
      </Reveal>
      <div className="certificate-grid">
        {filtered.map((certificate, index) => <Reveal key={certificate.id} delay={(index % 3) * 65}><CertificateCard certificate={certificate} /></Reveal>)}
      </div>
    </>
  );
}
