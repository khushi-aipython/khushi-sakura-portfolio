'use client';

import { useState } from 'react';
import { Orbit, Sparkles } from 'lucide-react';

/**
 * Keep Three.js/GLSL out of the initial page load. Users can opt into the
 * GPU shader; CSS orbit animations stay active without downloading Three.js.
 */
export default function DeferredShaderScene() {
  const [Scene, setScene] = useState(null);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  async function enableShader() {
    if (Scene || loading) return;
    setLoading(true);
    setFailed(false);
    try {
      const sceneModule = await import('./SakuraShaderScene');
      setScene(() => sceneModule.default);
    } catch {
      setFailed(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className={`shader-enhancement ${Scene ? 'shader-enhancement-active' : ''}`} aria-hidden="true">
        {Scene ? <Scene /> : <div className="shader-static-ambient" />}
      </div>
      <button className="shader-enable" type="button" onClick={enableShader} disabled={loading || Boolean(Scene)} aria-label={Scene ? '3D shader is active' : 'Load optional 3D shader animation'}>
        {Scene ? <Sparkles size={13} aria-hidden="true" /> : <Orbit size={13} aria-hidden="true" />}
        <span>{Scene ? '3D mode on' : loading ? 'Loading 3D…' : failed ? 'Try 3D again' : 'Enable 3D'}</span>
      </button>
      {failed ? <span className="shader-error" role="status">The 3D effect could not load. The rest of the page still works.</span> : null}
    </>
  );
}
