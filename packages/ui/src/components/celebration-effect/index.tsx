'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useIsClient } from '../../hooks/use-is-client';
import { css } from '../../styled-system/css';

type Intensity = 'light' | 'medium' | 'heavy';

type Props = {
  intensity?: Intensity;
  onComplete?: () => void;
};

const particleCounts: Record<Intensity, number> = {
  light: 6,
  medium: 8,
  heavy: 12,
};

const generateParticles = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    angle: (360 / count) * i + Math.random() * 30 - 15,
    distance: 80 + Math.random() * 40,
    delay: Math.random() * 0.1,
    scale: 0.8 + Math.random() * 0.4,
    rotation: Math.random() * 360,
  }));
};

export const CelebrationEffect = ({
  intensity = 'medium',
  onComplete,
}: Props) => {
  const isClient = useIsClient();
  const [particles] = useState(() =>
    generateParticles(particleCounts[intensity]),
  );
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPrefersReducedMotion(
        window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      );
    }
  }, []);

  useEffect(() => {
    const duration = prefersReducedMotion ? 0 : 800;

    const timer = setTimeout(() => {
      onCompleteRef.current?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  if (!isClient || prefersReducedMotion) {
    return null;
  }

  return createPortal(
    <div
      className={css({
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 'toast',
      })}
    >
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{
              x: 0,
              y: 0,
              scale: 0,
              rotate: 0,
              opacity: 1,
            }}
            animate={{
              x: Math.cos((particle.angle * Math.PI) / 180) * particle.distance,
              y: Math.sin((particle.angle * Math.PI) / 180) * particle.distance,
              scale: particle.scale,
              rotate: particle.rotation,
              opacity: 0,
            }}
            transition={{
              duration: 0.7,
              delay: particle.delay,
              ease: 'easeOut',
            }}
            className={css({
              position: 'absolute',
              fontSize: '24px',
            })}
          >
            <Star />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>,
    window.document.body,
  );
};

const Star = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={css({ color: 'entity.quest' })}
  >
    <title>star</title>
    <polygon points="12,2 15,9 22,9 17,14 19,22 12,17 5,22 7,14 2,9 9,9" />
  </svg>
);
