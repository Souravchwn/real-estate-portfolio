import type { Metadata } from 'next';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

export const metadata: Metadata = {
  title: "What's Taking Shape — SITED Development Group",
  description:
    "From real estate development to workforce training and community partnerships, we're creating opportunities that drive economic mobility and long-term impact in the communities we serve.",
};

const GOLD = '#B8953F';

const PILLARS = [
  {
    title: 'REAL ESTATE\nIN DEVELOPMENT',
    body: 'Thoughtfully planned projects that bring quality housing, commercial spaces, and essential amenities to underserved communities.',
    highlight: null,
  },
  {
    title: 'YOUTH JOB TRAINING\n& WORKFORCE PATHWAYS',
    body: 'Hands-on training, mentorship, and real-world experience preparing young people for careers in construction and skilled trades.',
    highlight: 'Training today.\nBuilding leaders tomorrow.',
  },
  {
    title: 'COMMUNITY\nPARTNERSHIPS',
    body: 'Collaborating with local organizations, residents, and leaders to co-create solutions that reflect community needs and drive lasting change.',
    highlight: null,
  },
  {
    title: 'ECONOMIC MOBILITY\nTHROUGH OPPORTUNITY',
    body: 'Creating pathways to stable jobs, entrepreneurship, and wealth-building opportunities that strengthen individuals, families, and neighborhoods.',
    highlight: null,
  },
];

export default function WhatsTakingShapePage(): React.JSX.Element {
  return (
    <main className="min-h-screen" style={{ background: '#f7f6f2' }}>

      {/* ── Hero ── */}
      <section className="pt-16 pb-10 md:pt-20 md:pb-14 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto text-center">
        <AnimatedSection>
          <p
            className="text-sm font-bold tracking-[0.2em] uppercase mb-5"
            style={{ color: GOLD }}
          >
            What&apos;s Taking Shape
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.08}>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-black mb-6">
            Building today.
            <br />
            Strengthening tomorrow.
          </h1>
        </AnimatedSection>

        {/* Gold divider */}
        <AnimatedSection delay={0.14}>
          <div
            className="mx-auto mb-8"
            style={{ width: 56, height: 2, background: GOLD }}
          />
        </AnimatedSection>

        <AnimatedSection delay={0.18}>
          <p className="text-neutral-700 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-medium">
            From real estate development to workforce training and community partnerships,
            we&apos;re creating opportunities that drive economic mobility and long-term impact
            in the communities we serve.
          </p>
        </AnimatedSection>
      </section>

      {/* ── Four Pillars ── */}
      <section className="px-6 md:px-12 lg:px-16 pb-14 md:pb-18 max-w-[1380px] mx-auto">
        <AnimatedSection delay={0.22}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-neutral-200 bg-white shadow-sm">
            {PILLARS.map((pillar, i) => (
              <div
                key={i}
                className="p-8 md:p-10 lg:p-12 flex flex-col gap-5 border-b sm:border-b-0 lg:border-r border-neutral-200 last:border-b-0 lg:last:border-r-0"
              >
                {/* Gold rule */}
                <div style={{ width: 36, height: 2, background: GOLD, flexShrink: 0 }} />

                {/* Title */}
                <p className="text-black text-xs md:text-sm font-bold tracking-[0.12em] uppercase leading-snug whitespace-pre-line">
                  {pillar.title}
                </p>

                {/* Body */}
                <p className="text-neutral-800 text-sm md:text-base leading-relaxed flex-1 font-medium">
                  {pillar.body}
                </p>

                {/* Gold highlight text */}
                {pillar.highlight && (
                  <p
                    className="text-sm font-bold leading-snug whitespace-pre-line pt-2"
                    style={{ color: GOLD }}
                  >
                    {pillar.highlight}
                  </p>
                )}
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* ── Community Statement ── */}
      <section className="px-6 md:px-12 lg:px-20 pb-20 md:pb-28 max-w-5xl mx-auto">
        <AnimatedSection delay={0.28}>
          <div style={{ width: 56, height: 2, background: GOLD }} className="mb-10" />
          <p className="text-black text-xl md:text-2xl lg:text-3xl font-light leading-relaxed font-serif">
            We believe strong communities are built by investing in{' '}
            <span className="font-semibold" style={{ color: GOLD }}>
              people
            </span>
            , creating{' '}
            <span className="font-semibold" style={{ color: GOLD }}>
              jobs
            </span>
            , and developing{' '}
            <span className="font-semibold" style={{ color: GOLD }}>
              places
            </span>{' '}
            where everyone can thrive.
          </p>
        </AnimatedSection>
      </section>

    </main>
  );
}