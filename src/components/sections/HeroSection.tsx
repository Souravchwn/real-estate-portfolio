'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface HeroSectionProps {
  agencyName: string;
  heroSubtitle: string;
}

const GOLD = '#B8953F';

const PHRASES: string[][] = [
  ['ALWAYS', 'BUILDING.'],
  ['SITED', 'IN', 'MOTION.'],
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

// Buildings are positioned within the right panel (52% of viewport)
// l values pushed right so nothing appears before 22% of the panel
// maskImage on the panel fades first 22% transparent → no text overlap
const BUILDINGS = [
  { w: '30%', h: '52%', l: '10%', delay: 0.70, dur: 5.3, floors: [0.22, 0.44, 0.63, 0.80] },
  { w: '14%', h: '64%', l: '48%', delay: 0.85, dur: 6.0, floors: [0.18, 0.35, 0.52, 0.68, 0.82] },
  { w: '11%', h: '37%', l: '36%', delay: 1.00, dur: 4.9, floors: [0.30, 0.60] },
  { w: '10%', h: '56%', l: '65%', delay: 1.15, dur: 5.6, floors: [0.20, 0.40, 0.60, 0.78] },
];

// CSS 3D wireframe box using transform-style: preserve-3d
function WireBox({
  size,
  speed = 18,
  tiltX = 12,
  tiltYOffset = 0,
  opacity = 1,
}: {
  size: number;
  speed?: number;
  tiltX?: number;
  tiltYOffset?: number;
  opacity?: number;
}) {
  const h = size / 2;
  const faces = [
    `translateZ(${h}px)`,
    `rotateY(180deg) translateZ(${h}px)`,
    `rotateY(90deg) translateZ(${h}px)`,
    `rotateY(-90deg) translateZ(${h}px)`,
    `rotateX(-90deg) translateZ(${h}px)`,
    `rotateX(90deg) translateZ(${h}px)`,
  ];

  return (
    <div style={{ perspective: size * 3.5, opacity }}>
      <motion.div
        style={{ width: size, height: size, transformStyle: 'preserve-3d', position: 'relative' }}
        animate={{ rotateX: [tiltX, tiltX + 360], rotateY: [tiltYOffset, tiltYOffset + 360] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >
        {faces.map((t, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: size,
              height: size,
              border: `1px solid ${GOLD}${i < 2 ? '60' : '35'}`,
              background: i === 4 ? `${GOLD}0C` : 'transparent',
              transform: t,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}

export function HeroSection({ agencyName }: HeroSectionProps): React.JSX.Element {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((prev) => (prev + 1) % PHRASES.length), INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  const currentWords = PHRASES[index];

  return (
    <section
      className="relative flex items-center overflow-hidden bg-white"
      style={{ minHeight: 'calc(100vh - 6.5rem)' }}
    >
      {/* Grain texture */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.16] pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(255,255,255,0.5) 100%)',
        }}
      />

      {/* ─────────────────────────────────────────
          MOBILE 3D — hidden on desktop
      ───────────────────────────────────────── */}

      {/* Ambient glow behind cubes */}
      <div
        className="absolute md:hidden pointer-events-none"
        style={{
          top: 0,
          right: '-5%',
          width: '65%',
          height: '50%',
          background: `radial-gradient(ellipse at 70% 30%, ${GOLD}12 0%, transparent 70%)`,
        }}
      />

      {/* Large cube — top right, partially off-screen for drama */}
      <motion.div
        className="absolute md:hidden pointer-events-none"
        style={{ top: '5%', right: '-2%' }}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <WireBox size={100} speed={20} tiltX={18} tiltYOffset={0} />
      </motion.div>

      {/* Small orbiting cube — offset so it peeks from behind the large one */}
      <motion.div
        className="absolute md:hidden pointer-events-none"
        style={{ top: '17%', right: '22%' }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <WireBox size={42} speed={13} tiltX={-8} tiltYOffset={45} opacity={0.7} />
      </motion.div>

      {/* Tiny accent cube */}
      <motion.div
        className="absolute md:hidden pointer-events-none"
        style={{ top: '10%', right: '38%' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
      >
        <WireBox size={22} speed={9} tiltX={30} tiltYOffset={90} opacity={0.45} />
      </motion.div>

      {/* Mobile perspective grid floor */}
      <div
        className="absolute bottom-0 left-0 right-0 md:hidden pointer-events-none"
        style={{ height: '32%', perspective: '460px', perspectiveOrigin: '50% 100%' }}
      >
        <motion.div
          style={{
            position: 'absolute',
            bottom: 0,
            left: '-30%',
            right: '-30%',
            height: '100%',
            rotateX: 68,
            transformOrigin: 'bottom center',
            backgroundImage: [
              `linear-gradient(${GOLD}18 1px, transparent 1px)`,
              `linear-gradient(90deg, ${GOLD}18 1px, transparent 1px)`,
            ].join(', '),
            backgroundSize: '34px 34px',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.9 }}
        />
        {/* Ground rule */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: '0',
            left: 0,
            right: 0,
            height: '1px',
            background: `linear-gradient(to right, transparent, ${GOLD}60, transparent)`,
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, delay: 1.3 }}
        />
      </div>

      {/* ─────────────────────────────────────────
          DESKTOP 3D SCENE — hidden on mobile
          Panel is 52% wide from right edge.
          maskImage fades 0→22% transparent so
          buildings never overlap text.
      ───────────────────────────────────────── */}
      <div
        className="absolute top-0 right-0 bottom-0 hidden md:block pointer-events-none"
        style={{
          width: '52%',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 24%)',
          maskImage: 'linear-gradient(to right, transparent 0%, black 24%)',
        }}
      >
        {/* Perspective floor grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            perspective: '700px',
            perspectiveOrigin: '50% 98%',
          }}
        >
          <motion.div
            style={{
              position: 'absolute',
              bottom: '17%',
              left: '-20%',
              right: '-20%',
              height: '58%',
              rotateX: 63,
              transformOrigin: 'bottom center',
              backgroundImage: [
                `linear-gradient(${GOLD}1A 1px, transparent 1px)`,
                `linear-gradient(90deg, ${GOLD}1A 1px, transparent 1px)`,
              ].join(', '),
              backgroundSize: '50px 50px',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3, delay: 0.6, ease: 'easeInOut' }}
          />
        </div>

        {/* Ground plane rule */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: '17%',
            left: 0,
            right: 0,
            height: '1px',
            background: `linear-gradient(to right, transparent 0%, ${GOLD}50 30%, ${GOLD}50 70%, transparent 100%)`,
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.6, delay: 1.2, ease: 'easeInOut' }}
        />

        {/* Building wireframe silhouettes */}
        {BUILDINGS.map((b, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              bottom: '17%',
              left: b.l,
              width: b.w,
              height: b.h,
              transformOrigin: 'bottom center',
              borderLeft: `1px solid ${GOLD}30`,
              borderRight: `1px solid ${GOLD}30`,
              borderTop: `1px solid ${GOLD}60`,
              background: `linear-gradient(to top, ${GOLD}0E 0%, transparent 55%)`,
              boxShadow: `0 -8px 24px 0 ${GOLD}18`,
            }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1, y: [0, -7, 0] }}
            transition={{
              scaleY: { duration: 1.4, delay: b.delay, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.7, delay: b.delay },
              y: { duration: b.dur, delay: b.delay + 1.8, repeat: Infinity, ease: 'easeInOut' },
            }}
          >
            {b.floors.map((frac) => (
              <div
                key={frac}
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: `${(1 - frac) * 100}%`,
                  height: '1px',
                  background: `${GOLD}1A`,
                }}
              />
            ))}
          </motion.div>
        ))}
      </div>

      {/* Left gold construction rail — desktop only */}
      <motion.div
        className="absolute hidden md:block md:left-[6rem] top-0 bottom-0 w-[1px] pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, transparent 5%, ${GOLD}44 40%, ${GOLD}44 60%, transparent 95%)`,
        }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      />

      {/* Horizontal scan line — plays once on load */}
      {/* <motion.div
        className="absolute left-0 right-0 h-[1px] z-20 pointer-events-none"
        style={{
          background: `linear-gradient(to right, transparent 5%, ${GOLD}90 50%, transparent 95%)`,
          top: '48%',
        }}
        initial={{ scaleX: 0, opacity: 0.9 }}
        animate={{ scaleX: [0, 1, 1], opacity: [0.9, 0.9, 0] }}
        transition={{ duration: 1.1, times: [0, 0.55, 1], ease: 'easeInOut', delay: 0.25 }}
      /> */}

      {/* ─── Hero text content ─── */}
      <div className="container-site relative z-10 w-full">
        {/* On desktop, text lives in the left ~50% naturally.
            No hard constraint needed — the panel mask handles separation. */}

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

        {/* Rotating headline */}
        <div
          className="mb-8 md:mb-11"
          style={{ height: 'clamp(10rem, 30vw, 28rem)', overflow: 'hidden' }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <div key={index} className="space-y-0">
              {currentWords.map((word, i) => (
                <div key={word + i} className="overflow-hidden">
                  <motion.h1
                    className="text-gray-900 tracking-tighter select-none font-serif"
                    style={{ fontSize: 'clamp(3rem, 10vw, 9rem)', fontWeight: 900, lineHeight: 0.9 }}
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

        {/* Gold rule */}
        <motion.div
          className="h-[2px] mb-8 max-w-[100px]"
          style={{ background: GOLD, transformOrigin: 'left' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 1.0 }}
        />
      </div>

      {/* Floor line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[1px] pointer-events-none"
        style={{ background: `linear-gradient(to right, ${GOLD}80, transparent 50%)` }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.6, ease: 'easeInOut', delay: 0.1 }}
      />

      {/* Scroll indicator — desktop only */}
      <div className="absolute bottom-8 right-12 z-10 hidden md:flex flex-col items-center gap-3">
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

      {/* Blueprint corner markers — desktop only */}
      {(['top-6 left-6', 'top-6 right-6', 'bottom-20 left-6', 'bottom-20 right-6'] as const).map(
        (pos) => (
          <motion.div
            key={pos}
            className={`absolute ${pos} w-4 h-4 pointer-events-none hidden md:block`}
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
        ),
      )}
    </section>
  );
}
