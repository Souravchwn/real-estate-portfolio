'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';

interface HeroSectionProps {
  agencyName: string;
  heroSubtitle: string;
}

const GOLD = '#B8953F';

// Phrases to cycle through — each phrase is an array of lines
const PHRASES: string[][] = [
  ['ALWAYS', 'BUILDING.'],
  ['SITED', 'IN', 'MOTION.']
];

const INTERVAL_MS = 3800;

const wordVariants = {
  enter: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      delay: i * 0.1,
    },
  }),
  initial: { y: '115%', opacity: 1 },
  exit: (i: number) => ({
    y: '-115%',
    opacity: 0,
    transition: {
      duration: 0.38,
      ease: [0.36, 0, 0.66, -0.4] as [number, number, number, number],
      delay: i * 0.04,
    },
  }),
};

export function HeroSection({ agencyName, heroSubtitle }: HeroSectionProps): React.JSX.Element {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((prev) => (prev + 1) % PHRASES.length), INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  const currentWords = PHRASES[index];

  return (
    <section className="relative flex items-center overflow-hidden bg-white" style={{ minHeight: 'calc(100vh - 6.5rem)' }}>

      {/* Grain / concrete texture */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.18] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      {/* Faint vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(255,255,255,0.55) 100%)',
        }}
      />

      {/* Left gold construction rail */}
      <motion.div
        className="absolute left-[4rem] md:left-[6rem] top-0 bottom-0 w-[1px] pointer-events-none"
        style={{ background: `linear-gradient(to bottom, transparent 5%, ${GOLD}44 40%, ${GOLD}44 60%, transparent 95%)` }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      />

      {/* Horizontal gold scan — laser level sweep */}
      <motion.div
        className="absolute left-0 right-0 h-[1px] z-20 pointer-events-none"
        style={{ background: `linear-gradient(to right, transparent 5%, ${GOLD}99 50%, transparent 95%)`, top: '48%' }}
        initial={{ scaleX: 0, opacity: 0.9 }}
        animate={{ scaleX: [0, 1, 1], opacity: [0.9, 0.9, 0] }}
        transition={{ duration: 1.1, times: [0, 0.55, 1], ease: 'easeInOut', delay: 0.25 }}
      />

      {/* Hero content */}
      <div className="container-site relative z-10">

        {/* Agency label */}
        <div className="overflow-hidden mb-10">
          <motion.p
            className="text-caption tracking-[0.5em]"
            style={{ color: GOLD }}
            initial={{ y: '120%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          >
            {agencyName}
          </motion.p>
        </div>

        {/* Rotating title — fixed height for tallest phrase (3 words) so layout never shifts */}
        <div className="mb-11" style={{ height: 'clamp(12rem, 28vw, 26rem)', overflow: 'hidden' }}>
          <AnimatePresence mode="wait" initial={false}>
            <div key={index} className="space-y-1">
              {currentWords.map((word, i) => (
                <div key={word + i} className="overflow-hidden">
                  <motion.h1
                    className="text-gray-900 leading-[0.88] tracking-tighter select-none"
                    style={{
                      fontSize: 'clamp(4rem, 10vw, 9rem)',
                      fontWeight: 900,
                    }}
                    custom={i}
                    variants={wordVariants}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                  >
                    {word}
                  </motion.h1>
                </div>
              ))}
            </div>
          </AnimatePresence>
        </div>

        {/* Gold rule — floor slab poured after words settle */}
        <motion.div
          className="h-[2px] mb-8 max-w-[100px]"
          style={{ background: GOLD, transformOrigin: 'left' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 1.0 }}
        />

        {/* Subtitle */}
        <motion.p
          className="text-gray-500 text-base md:text-lg max-w-md mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 1.15 }}
        >
          {heroSubtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 1.35 }}
        >
          <Button
            as="link"
            href="/projects"
            variant="primary"
            size="lg"
            className="bg-[#B8953F] border-[#B8953F] text-white hover:bg-[#9a7a32] hover:border-[#9a7a32]"
          >
            View Portfolio
          </Button>
          <Button
            as="link"
            href="/contact"
            variant="secondary"
            size="lg"
            className="bg-transparent text-gray-900 border-gray-900/20 hover:bg-gray-900 hover:text-white"
          >
            Inquire Now
          </Button>
        </motion.div>
      </div>

      {/* Floor line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[1px] pointer-events-none"
        style={{ background: `linear-gradient(to right, ${GOLD}80, transparent 50%)` }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.6, ease: 'easeInOut', delay: 0.1 }}
      />

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 md:right-12 z-10 flex flex-col items-center gap-3">
        <motion.div
          className="w-[1px] h-10"
          style={{ background: `${GOLD}44`, transformOrigin: 'top' }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.6, delay: 1.9 }}
        />
        <motion.p
          className="text-caption [writing-mode:vertical-rl]"
          style={{ color: `${GOLD}55` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 2.1 }}
        >
          Scroll
        </motion.p>
      </div>

      {/* Blueprint corner markers */}
      {(['top-6 left-6', 'top-6 right-6', 'bottom-20 left-6', 'bottom-20 right-6'] as const).map((pos) => (
        <motion.div
          key={pos}
          className={`absolute ${pos} w-4 h-4 pointer-events-none`}
          style={{
            borderColor: `${GOLD}28`,
            borderTopWidth: pos.includes('top') ? '1px' : 0,
            borderBottomWidth: pos.includes('bottom') ? '1px' : 0,
            borderLeftWidth: pos.includes('left') ? '1px' : 0,
            borderRightWidth: pos.includes('right') ? '1px' : 0,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.7 }}
        />
      ))}
    </section>
  );
}
