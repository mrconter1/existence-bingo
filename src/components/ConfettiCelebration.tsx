"use client";

import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiCelebrationProps {
  active: boolean;
  duration?: number;
  particleCount?: number;
}

export function ConfettiCelebration({ 
  active, 
  duration = 3000, 
  particleCount = 200 
}: ConfettiCelebrationProps) {
  const confettiRef = useRef<HTMLCanvasElement>(null);
  const confettiInstanceRef = useRef<confetti.CreateTypes | null>(null);

  useEffect(() => {
    // Create confetti instance when component mounts
    if (confettiRef.current && !confettiInstanceRef.current) {
      confettiInstanceRef.current = confetti.create(confettiRef.current, {
        resize: true,
        useWorker: true
      });
    }

    return () => {
      // Clean up confetti instance when component unmounts
      if (confettiInstanceRef.current) {
        confettiInstanceRef.current.reset();
      }
    };
  }, []);

  useEffect(() => {
    if (active && confettiInstanceRef.current) {
      // Fire multiple confetti bursts for a more exciting effect
      const end = Date.now() + duration;
      const colors = ['#FF577F', '#FF884B', '#FFBD9B', '#F9F871', '#7ED7C1', '#DC84F3', '#A6FF96'];
      
      const frame = () => {
        const myConfetti = confettiInstanceRef.current as unknown as (options?: confetti.Options) => Promise<null>;
        myConfetti({
          particleCount: particleCount / 10,
          angle: Math.random() * 360,
          spread: Math.random() * 100 + 50,
          origin: {
            x: Math.random(),
            y: Math.random() * 0.5
          },
          colors: colors,
          shapes: ['circle', 'square', 'star'],
          scalar: Math.random() * 1.5 + 0.5,
          drift: Math.random() * 2 - 1,
          ticks: 200,
          gravity: 1.2,
          decay: 0.94,
          startVelocity: Math.random() * 45 + 15
        });
        
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      
      frame();
      
      // Add a big burst at the beginning
      const myConfetti = confettiInstanceRef.current as unknown as (options?: confetti.Options) => Promise<null>;
      myConfetti({
        particleCount: particleCount,
        spread: 100,
        origin: { y: 0.6 },
        colors: colors,
        shapes: ['circle', 'square', 'star'],
        scalar: 1.2,
        ticks: 300,
        gravity: 1,
        decay: 0.95,
        startVelocity: 30
      });
    }
  }, [active, duration, particleCount]);

  return (
    <canvas 
      ref={confettiRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ width: '100%', height: '100%' }}
    />
  );
} 