'use client';

import { useEffect, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, ImageIcon } from 'lucide-react';
import Image from 'next/image';

// ─── Types ──────────────────────────────────────────────────────────────────

interface ScreenshotGalleryProps {
  screenshots: string[];
  projectName: string;
}

interface LightboxProps {
  screenshots: string[];
  projectName: string;
  initialIndex: number;
  onClose: () => void;
}

// ─── Lightbox ────────────────────────────────────────────────────────────────

function Lightbox({ screenshots, projectName, initialIndex, onClose }: LightboxProps) {
  const [current, setCurrent] = useState(initialIndex);
  const [direction, setDirection] = useState(0); // -1 = prev, 1 = next

  const goTo = useCallback(
    (idx: number, dir: number) => {
      setDirection(dir);
      setCurrent((idx + screenshots.length) % screenshots.length);
    },
    [screenshots.length]
  );

  const prev = useCallback(() => goTo(current - 1, -1), [current, goTo]);
  const next = useCallback(() => goTo(current + 1, 1), [current, goTo]);

  // Keyboard navigation
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [onClose, prev, next]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all"
        aria-label="Close gallery"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/50">
        {current + 1} / {screenshots.length} — {projectName}
      </div>

      {/* Main image */}
      <div
        className="relative z-10 w-full max-w-5xl px-4 flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Prev */}
        {screenshots.length > 1 && (
          <button
            onClick={prev}
            className="absolute left-4 md:left-8 z-20 p-3 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all"
            aria-label="Previous screenshot"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <Image
                src={screenshots[current]}
                alt={`${projectName} screenshot ${current + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 1280px) 90vw, 1024px"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Next */}
        {screenshots.length > 1 && (
          <button
            onClick={next}
            className="absolute right-4 md:right-8 z-20 p-3 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all"
            aria-label="Next screenshot"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Thumbnail strip */}
      {screenshots.length > 1 && (
        <div
          className="relative z-10 flex gap-2 mt-5 px-4 overflow-x-auto max-w-5xl"
          onClick={(e) => e.stopPropagation()}
        >
          {screenshots.map((src, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? 1 : -1)}
              className={`relative flex-shrink-0 w-16 h-10 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                i === current
                  ? 'border-emerald-400/70 opacity-100 scale-105'
                  : 'border-white/10 opacity-40 hover:opacity-70'
              }`}
              aria-label={`Go to screenshot ${i + 1}`}
            >
              <Image
                src={src}
                alt={`Thumbnail ${i + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Keyboard hint */}
      {screenshots.length > 1 && (
        <p className="relative z-10 mt-4 text-[10px] font-mono text-white/20">
          ← → to navigate · ESC to close
        </p>
      )}
    </motion.div>
  );
}

// ─── Gallery Strip (shown on the card) ──────────────────────────────────────

export function ScreenshotGallery({ screenshots, projectName }: ScreenshotGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!screenshots || screenshots.length === 0) return null;

  const preview = screenshots.slice(0, 3);
  const remaining = screenshots.length - preview.length;

  return (
    <>
      {/* Gallery strip */}
      <div className="relative mb-5 -mx-6 md:-mx-8 px-6 md:px-8">
        {/* Top fade */}
        <div className="absolute inset-x-0 top-0 h-px bg-border-subtle/50" />

        <div className="flex gap-2 py-3">
          {preview.map((src, i) => (
            <button
              key={i}
              onClick={() => setLightboxIndex(i)}
              className="relative flex-1 aspect-video rounded-lg overflow-hidden border border-border-subtle bg-surface/30 group/shot hover:border-emerald-500/30 transition-all duration-200"
              aria-label={`View ${projectName} screenshot ${i + 1}`}
            >
              <Image
                src={src}
                alt={`${projectName} screenshot ${i + 1}`}
                fill
                className="object-cover transition-transform duration-300 group-hover/shot:scale-105"
                sizes="(max-width: 768px) 33vw, 20vw"
              />
              {/* Overlay on last item if there are more */}
              {i === preview.length - 1 && remaining > 0 && (
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-1">
                  <ImageIcon className="w-4 h-4 text-white/70" />
                  <span className="text-xs font-mono text-white/70">+{remaining} more</span>
                </div>
              )}
              {/* Zoom hint on hover */}
              {!(i === preview.length - 1 && remaining > 0) && (
                <div className="absolute inset-0 bg-black/0 group-hover/shot:bg-black/30 flex items-center justify-center transition-all duration-200">
                  <ZoomIn className="w-5 h-5 text-white opacity-0 group-hover/shot:opacity-100 transition-opacity duration-200" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-border-subtle/50" />
      </div>

      {/* Lightbox portal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            screenshots={screenshots}
            projectName={projectName}
            initialIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
