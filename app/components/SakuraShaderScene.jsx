'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vNormalView;
  uniform float uTime;
  void main() {
    vUv = uv;
    vec3 displaced = position;
    float wave = sin(position.y * 3.2 + uTime * 0.55) * 0.025;
    wave += cos(position.x * 4.6 - uTime * 0.35) * 0.018;
    displaced += normal * wave;
    vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
    vNormalView = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  varying vec3 vNormalView;
  uniform float uTime;
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p); f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
  }
  void main() {
    float n = noise(vUv * 8.0 + vec2(uTime * 0.06, -uTime * 0.035));
    float flow = sin(vUv.x * 7.5 + vUv.y * 4.0 + uTime * 0.18) * 0.5 + 0.5;
    vec3 sakura = vec3(0.91, 0.62, 0.72);
    vec3 lavender = vec3(0.70, 0.70, 0.88);
    vec3 sage = vec3(0.70, 0.82, 0.75);
    vec3 color = mix(sakura, lavender, smoothstep(0.12, 0.9, flow));
    color = mix(color, sage, smoothstep(0.70, 1.0, n + vUv.y * 0.12) * 0.48);
    float rim = pow(1.0 - abs(dot(normalize(vNormalView), vec3(0.0, 0.0, 1.0))), 2.1);
    color += vec3(0.17, 0.09, 0.16) * rim;
    color += (n - 0.5) * 0.045;
    gl_FragColor = vec4(color, 0.68 + rim * 0.18);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

export default function SakuraShaderScene() {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let renderer;
    let raf = 0;
    let visible = true;
    let disposed = false;
    let resizeObserver;
    let intersectionObserver;

    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
    } catch (error) {
      host.classList.add('shader-unavailable');
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setSize(host.clientWidth || 420, host.clientHeight || 420, false);
    renderer.domElement.setAttribute('aria-hidden', 'true');
    renderer.domElement.className = 'shader-canvas';
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, (host.clientWidth || 420) / (host.clientHeight || 420), 0.1, 40);
    camera.position.set(0, 0, 4.5);

    const orbMaterial = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } }, vertexShader, fragmentShader,
      transparent: true, depthWrite: false,
    });
    const orb = new THREE.Mesh(new THREE.IcosahedronGeometry(1.0, 3), orbMaterial);
    orb.scale.set(1.05, 1.17, 0.88);
    scene.add(orb);

    const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xb887a0, transparent: true, opacity: 0.45, wireframe: false });
    const ringA = new THREE.Mesh(new THREE.TorusGeometry(1.43, 0.007, 6, 96), ringMaterial);
    ringA.rotation.set(1.1, 0.18, -0.26);
    scene.add(ringA);
    const ringB = new THREE.Mesh(new THREE.TorusGeometry(1.58, 0.004, 6, 96), new THREE.MeshBasicMaterial({ color: 0x9e9bc6, transparent: true, opacity: 0.36 }));
    ringB.rotation.set(0.5, 0.7, 0.4);
    scene.add(ringB);

    const starCount = 64;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i += 1) {
      const radius = 1.75 + Math.random() * 1.6;
      const angle = Math.random() * Math.PI * 2;
      starPositions[i * 3] = Math.cos(angle) * radius;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 4.4;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 1.1;
    }
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starPoints = new THREE.Points(starGeometry, new THREE.PointsMaterial({ color: 0xc78da7, size: 0.018, transparent: true, opacity: 0.64, sizeAttenuation: true }));
    scene.add(starPoints);

    const resize = () => {
      if (!host || !renderer) return;
      const width = Math.max(1, host.clientWidth);
      const height = Math.max(1, host.clientHeight);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !prefersReducedMotion && !raf) raf = requestAnimationFrame(tick);
    }, { threshold: 0.05 });
    intersectionObserver.observe(host);

    const renderStatic = () => renderer.render(scene, camera);
    const tick = (time) => {
      raf = 0;
      if (disposed || !visible) return;
      orbMaterial.uniforms.uTime.value = time * 0.001;
      orb.rotation.y = time * 0.00007;
      orb.rotation.x = Math.sin(time * 0.00014) * 0.08;
      ringA.rotation.z = -0.26 + Math.sin(time * 0.00012) * 0.035;
      ringB.rotation.y = 0.7 + time * 0.000035;
      starPoints.rotation.y = time * 0.000012;
      renderer.render(scene, camera);
      if (!prefersReducedMotion) raf = requestAnimationFrame(tick);
    };
    renderStatic();
    if (!prefersReducedMotion) raf = requestAnimationFrame(tick);

    const handleVisibility = () => {
      if (document.hidden) {
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
      } else if (visible && !prefersReducedMotion && !raf) {
        raf = requestAnimationFrame(tick);
      } else {
        renderStatic();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      disposed = true;
      if (raf) cancelAnimationFrame(raf);
      document.removeEventListener('visibilitychange', handleVisibility);
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      orb.geometry.dispose();
      orbMaterial.dispose();
      ringA.geometry.dispose(); ringMaterial.dispose();
      ringB.geometry.dispose(); ringB.material.dispose();
      starGeometry.dispose(); starPoints.material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={hostRef} className="shader-scene" aria-hidden="true" />;
}
