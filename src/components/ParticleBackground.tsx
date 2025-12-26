import { useEffect, useRef } from 'react';

const ParticleBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles: HTMLDivElement[] = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute rounded-full pointer-events-none';
      
      const size = Math.random() * 4 + 1;
      const isPrimary = Math.random() > 0.5;
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.background = isPrimary 
        ? 'hsl(187 92% 55% / 0.6)' 
        : 'hsl(262 83% 58% / 0.4)';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animation = `particle ${20 + Math.random() * 20}s linear infinite`;
      particle.style.animationDelay = `${Math.random() * 20}s`;
      
      particles.push(particle);
      container.appendChild(particle);
    }

    return () => {
      particles.forEach(p => p.remove());
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default ParticleBackground;
