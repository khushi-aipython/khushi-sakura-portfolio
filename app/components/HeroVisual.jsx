import Image from 'next/image';
import DeferredShaderScene from './DeferredShaderScene';

export default function HeroVisual() {
  return (
    <div className="hero-visual" aria-label="Anime-style portrait illustration of Khushi">
      <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
      <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
      <DeferredShaderScene />
      <div className="portrait-wash" aria-hidden="true" />
      <Image
        src="/images/khushi-anime.webp"
        alt="Anime-style illustration of Khushi wearing a pale lavender shirt and navy tie"
        fill
        priority
        sizes="(max-width: 780px) 80vw, 42vw"
        className="hero-portrait"
      />
      <div className="hero-stamp"><span>BUILD / LEARN</span><strong>少しずつ</strong><span>ONE ITERATION AT A TIME</span></div>
      <div className="floating-note floating-note-top"><span className="note-pip" /> Full-stack in focus</div>
      <div className="floating-note floating-note-bottom"><span>01</span> Curious by default</div>
    </div>
  );
}
