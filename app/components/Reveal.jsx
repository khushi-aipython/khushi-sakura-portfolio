/**
 * Server-rendered reveal wrapper. One shared observer in RevealObserver.jsx
 * handles animation in the browser; this component adds no client hydration.
 */
export default function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }) {
  return (
    <Tag className={`reveal ${className}`.trim()} style={{ '--reveal-delay': `${delay}ms` }}>
      {children}
    </Tag>
  );
}
