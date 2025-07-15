import React, { useEffect, useRef } from 'react';
import styles from './Background.module.css';

const Background = ({ children }) => {
  const particlesRef = useRef(null);

  useEffect(() => {
    const createParticles = () => {
      const container = particlesRef.current;
      if (!container) return;

      // Clear existing particles
      container.innerHTML = '';

      // Create particles
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = styles.particle;
        
        // Random size and position
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 20}s`;
        particle.style.animationDuration = `${Math.random() * 10 + 15}s`;
        
        container.appendChild(particle);
      }
    };

    createParticles();
  }, []);

  return (
    <div className={styles.background}>
      <div className={styles.particles} ref={particlesRef}></div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default Background;