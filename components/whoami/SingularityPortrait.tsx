'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

export function SingularityPortrait() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sceneRef.current) return;

    // Subtle mouse parallax for portrait and accretion disk
    const handleMouseMove = (e: MouseEvent) => {
      if (typeof window === 'undefined') return;
      const rect = sceneRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

      // Portrait subtle tilt (very constrained)
      const portrait = sceneRef.current?.querySelector('[data-portrait]') as HTMLElement;
      if (portrait) {
        portrait.style.transform = `translateZ(120px) rotateX(${y * 2}deg) rotateY(${x * 2}deg) scale(1.02)`;
      }

      // Accretion disk subtle tilt response
      const disk = sceneRef.current?.querySelector('[data-accretion]') as HTMLElement;
      if (disk) {
        disk.style.transform = `rotateX(65deg) rotateZ(${x * 3}deg)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={sceneRef}
      className="relative w-full min-h-[600px] sm:min-h-[700px] flex items-center justify-center overflow-hidden bg-black"
      style={{
        perspective: '1200px',
        backgroundColor: '#050507',
      }}
    >
      {/* ========================================================
          LAYER -300: FAR BACKGROUND PARTICLES (Distant Stars)
      ======================================================== */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: 'translateZ(-300px)',
        }}
      >
        <div className="absolute w-full h-full bg-gradient-to-b from-zinc-950 via-black to-black opacity-40" />
        {/* Distant particle field */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`distant-${i}`}
            className="absolute rounded-full bg-zinc-400/20"
            style={{
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 2 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 60 + '%',
              animation: `drift ${20 + Math.random() * 30}s linear infinite`,
            }}
          />
        ))}
      </div>

      {/* ========================================================
          LAYER -150: BACKGROUND ATMOSPHERIC HAZE
      ======================================================== */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: 'translateZ(-150px)',
          background:
            'radial-gradient(ellipse at center, rgba(16,185,129,0.08) 0%, transparent 70%)',
        }}
      />

      {/* ========================================================
          LAYER -100 → +50: VOLUMETRIC RAY FIELD
      ======================================================== */}
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none overflow-visible h-[500px]"
        style={{
          transform: 'translateZ(-80px)',
          background:
            'radial-gradient(ellipse 100% 200% at 50% 100%, rgba(16,185,129,0.35) 0%, rgba(16,185,129,0.15) 25%, rgba(16,185,129,0.05) 50%, transparent 100%)',
          filter: 'blur(40px)',
          animation: 'volumePulse 6s ease-in-out infinite',
        }}
      />

      {/* Secondary ray diffusion (softer, wider) */}
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none h-[400px]"
        style={{
          transform: 'translateZ(-60px)',
          background:
            'radial-gradient(ellipse 120% 180% at 50% 100%, rgba(20,184,166,0.25) 0%, rgba(16,185,129,0.08) 40%, transparent 100%)',
          filter: 'blur(60px)',
          opacity: 0.6,
        }}
      />

      {/* Atmospheric fog (between rays and portrait) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: 'translateZ(0px)',
          background:
            'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.2) 80%, rgba(0,0,0,0.4) 100%)',
        }}
      />

      {/* ========================================================
          LAYER +100: THE PORTRAIT (Center Focal Point)
      ======================================================== */}
      <div
        data-portrait
        className="relative z-30 w-[280px] sm:w-[320px] aspect-[4/5] pointer-events-none select-none"
        style={{
          transform: 'translateZ(120px) scale(1)',
          transition: 'transform 0.4s cubic-bezier(0.23, 1, 0.320, 1)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Portrait container with subtle feathering */}
        <div className="relative w-full h-full">
          {/* Rim lighting (green illumination from below) */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at 50% 110%, rgba(16,185,129,0.4) 0%, rgba(16,185,129,0.2) 20%, transparent 60%)',
              zIndex: 10,
            }}
          />

          {/* The actual image */}
          <Image
            src="/images/founder.jpeg"
            alt="Wisdom Kinoti — Technical Identity"
            fill
            priority
            sizes="(max-width: 640px) 280px, 320px"
            className="object-contain object-center filter brightness-95 contrast-110 saturate-110"
            style={{
              filter: 'drop-shadow(0 0 30px rgba(16,185,129,0.25))',
            }}
          />

          {/* Bottom illumination gradient (green light from void) */}
          <div
            className="absolute bottom-0 inset-x-0 h-[40%] pointer-events-none"
            style={{
              background:
                'linear-gradient(to top, rgba(16,185,129,0.3) 0%, rgba(16,185,129,0.1) 50%, transparent 100%)',
              mixBlendMode: 'screen',
              zIndex: 5,
            }}
          />

          {/* Holographic effect (extremely subtle scanlines) */}
          <div
            className="absolute inset-0 pointer-events-none opacity-10"
            style={{
              backgroundImage:
                'linear-gradient(0deg, transparent 24%, rgba(16,185,129,0.15) 25%, rgba(16,185,129,0.15) 26%, transparent 27%, transparent 74%, rgba(16,185,129,0.15) 75%, rgba(16,185,129,0.15) 76%, transparent 77%, transparent)',
              backgroundSize: '100% 4px',
              zIndex: 8,
            }}
          />
        </div>

        {/* Soft halo behind portrait */}
        <div
          className="absolute -inset-8 bg-emerald-500/25 rounded-full blur-3xl -z-10 pointer-events-none"
          style={{
            animation: 'haloPulse 4s ease-in-out infinite',
          }}
        />
      </div>

      {/* ========================================================
          LAYER +150: MID-FIELD PARTICLES (Orbiting around portrait)
      ======================================================== */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: 'translateZ(150px)',
        }}
      >
        {[...Array(12)].map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const radius = 180 + Math.random() * 80;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius * 0.4;

          return (
            <div
              key={`particle-${i}`}
              className="absolute rounded-full bg-emerald-300/60"
              style={{
                width: Math.random() * 4 + 2 + 'px',
                height: Math.random() * 4 + 2 + 'px',
                left: '50%',
                top: '50%',
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                filter: 'blur(1px)',
                animation: `particleDrift ${30 + Math.random() * 20}s linear infinite`,
                opacity: 0.5 + Math.random() * 0.5,
              }}
            />
          );
        })}
      </div>

      {/* ========================================================
          LAYER +180: FOREGROUND FOG (Passes partially in front)
      ======================================================== */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: 'translateZ(180px)',
          background:
            'radial-gradient(ellipse at center 40%, transparent 20%, rgba(0,0,0,0.15) 80%)',
        }}
      />

      {/* ========================================================
          LAYER 0: THE SINGULARITY (Beneath everything conceptually)
      ======================================================== */}
      <div
        className="absolute bottom-0 inset-x-0 w-full h-[300px] flex items-center justify-center pointer-events-none"
        style={{
          transform: 'translateZ(0px)',
        }}
      >
        {/* Ambient gravitational glow field */}
        <div
          className="absolute inset-0 rounded-[100%]"
          style={{
            width: '500px',
            height: '180px',
            background:
              'radial-gradient(ellipse at center, rgba(16,185,129,0.3) 0%, rgba(16,185,129,0.15) 30%, transparent 70%)',
            filter: 'blur(50px)',
            left: '50%',
            top: '50%',
            transform: 'translateX(-50%) translateY(-50%)',
            animation: 'void-pulse 5s ease-in-out infinite',
          }}
        />

        {/* ── ACCRETION DISK (Tilted, rotating) ── */}
        <div
          data-accretion
          className="absolute pointer-events-none"
          style={{
            width: '480px',
            height: '280px',
            left: '50%',
            top: '50%',
            transform:
              'translateX(-50%) translateY(-50%) rotateX(65deg) rotateZ(0deg)',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.320, 1)',
            animation: 'diskRotate 40s linear infinite',
          }}
        >
          {/* Outer orbital ring (asymmetrical brightness) */}
          <div
            className="absolute w-full h-full rounded-[100%] border border-emerald-400/40"
            style={{
              boxShadow:
                '0 0 60px rgba(16,185,129,0.45), inset 0 0 40px rgba(16,185,129,0.15)',
              background:
                'conic-gradient(from 0deg, rgba(16,185,129,0.4) 0%, rgba(16,185,129,0.2) 50%, rgba(16,185,129,0.5) 100%)',
              filter: 'blur(8px)',
            }}
          />

          {/* Photon ring (glowing edge) */}
          <div
            className="absolute w-[90%] h-[85%] rounded-[100%] left-[5%] top-[7.5%] border-2 border-emerald-300/60"
            style={{
              boxShadow:
                '0 0 40px rgba(52,211,153,0.8), inset 0 0 30px rgba(16,185,129,0.35)',
              background:
                'radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 70%)',
            }}
          />

          {/* Event horizon (deep black center) */}
          <div
            className="absolute w-[60%] h-[60%] rounded-[100%] left-[20%] top-[20%]"
            style={{
              background:
                'radial-gradient(circle, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.8) 60%, transparent 100%)',
              boxShadow:
                'inset 0 0 50px rgba(0,0,0,1), 0 0 50px rgba(16,185,129,0.3)',
            }}
          />

          {/* Core emitter (tiny bright spark) */}
          <div
            className="absolute w-8 h-5 rounded-full left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
            style={{
              background:
                'radial-gradient(circle, rgba(16,185,129,0.9) 0%, rgba(16,185,129,0.4) 60%, transparent 100%)',
              boxShadow: '0 0 20px rgba(16,185,129,0.8)',
              animation: 'corePulse 3s ease-in-out infinite',
            }}
          />
        </div>

        {/* Void shadow on ground/floor */}
        <div
          className="absolute -bottom-12 w-4/5 h-16 rounded-full"
          style={{
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'radial-gradient(circle, rgba(0,0,0,0.9) 0%, transparent 100%)',
            filter: 'blur(40px)',
          }}
        />
      </div>

      {/* ========================================================
          GLOBAL ANIMATIONS (CSS Keyframes)
      ======================================================== */}
      <style>{`
        @keyframes volumePulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.8; }
        }

        @keyframes haloPulse {
          0%, 100% { transform: scale(1); opacity: 0.25; }
          50% { transform: scale(1.1); opacity: 0.35; }
        }

        @keyframes diskRotate {
          from { transform: translateX(-50%) translateY(-50%) rotateX(65deg) rotateZ(0deg); }
          to { transform: translateX(-50%) translateY(-50%) rotateX(65deg) rotateZ(360deg); }
        }

        @keyframes corePulse {
          0%, 100% { 
            box-shadow: 0 0 15px rgba(16,185,129,0.6), inset 0 0 10px rgba(16,185,129,0.4);
            transform: translate(-50%, -50%) scale(1);
          }
          50% { 
            box-shadow: 0 0 25px rgba(16,185,129,0.9), inset 0 0 15px rgba(16,185,129,0.6);
            transform: translate(-50%, -50%) scale(1.1);
          }
        }

        @keyframes drift {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.5; }
        }

        @keyframes particleDrift {
          0% { opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.5; }
          100% { opacity: 0; }
        }

        @keyframes void-pulse {
          0%, 100% { transform: translateX(-50%) translateY(-50%) scale(1); opacity: 0.3; }
          50% { transform: translateX(-50%) translateY(-50%) scale(1.1); opacity: 0.45; }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}
