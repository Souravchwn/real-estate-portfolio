import type { Metadata } from 'next';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

export const metadata: Metadata = {
  title: 'Built By — SITED Development Group',
  description:
    'Terrence Large + Larry Beyince. People first. Community always. Impact through action.',
};

export default function BuiltByPage(): React.JSX.Element {
  return (
    <main style={{ background: '#f7f6f2' }}>
      {/* ── Hero: Dark background, staggered names ── */}
      <section className="relative min-h-[70vh] md:min-h-[60vh] flex items-center overflow-hidden bg-black">
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/90 to-black/80" />

        <div className="relative z-10 container-site max-w-6xl mx-auto px-6 md:px-8 py-12 md:py-8">
          {/* Gold label */}
          <AnimatedSection>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-6 md:mb-10" style={{ color: '#B8953F' }}>
              About Us
            </p>
          </AnimatedSection>

          {/* Names – stacked on mobile, row on desktop */}
          <div className="flex flex-col items-start gap-0">
            <AnimatedSection delay={0.1}>
              <h1 className="font-serif font-bold text-white leading-[1.05] tracking-[-0.01em]"
                style={{ fontSize: 'clamp(2.8rem, 7vw, 6.5rem)' }}>
                Terrence Large
              </h1>
            </AnimatedSection>

            {/* Gold rule separator */}
            <AnimatedSection delay={0.18}>
              <div className="my-4 md:my-5" style={{ width: 56, height: 1, background: '#B8953F' }} />
            </AnimatedSection>

            <AnimatedSection delay={0.22}>
              <h2 className="font-serif font-bold text-white leading-[1.05] tracking-[-0.01em]"
                style={{ fontSize: 'clamp(2.8rem, 7vw, 6.5rem)' }}>
                Larry Beyince
              </h2>
            </AnimatedSection>
          </div>

          {/* Subtitle */}
          <AnimatedSection delay={0.3}>
            <p className="text-white/40 text-xs sm:text-sm tracking-[0.18em] uppercase mt-6 md:mt-8">
              Social Impact Through Economic Development
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Tagline Banner ── */}
      <section className="py-12 md:py-16">
        <div className="container-site max-w-4xl mx-auto px-6 md:px-8 text-center">
          <AnimatedSection delay={0.15}>
            <p className="font-serif font-semibold text-black/80 leading-snug mb-2"
              style={{ fontSize: 'clamp(1.25rem, 2.5vw, 2rem)' }}>
              People first. Community always.
            </p>
            <p className="font-serif font-bold text-black leading-[1.05]"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
              Impact through action.
            </p>
            {/* Gold divider */}
            <div className="mx-auto mt-8" style={{ width: 56, height: 2, background: '#B8953F' }} />
          </AnimatedSection>
        </div>
      </section>

      {/* ── The Origin (refined to match your image) ── */}
      <section className="py-16 md:py-24">
        <div className="container-site max-w-4xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-16 items-start">
            {/* Left: "THE ORIGIN" label */}
            <AnimatedSection delay={0.2}>
              <div>
                <div className="mb-4" style={{ width: 36, height: 2, background: '#B8953F' }} />
                <p className="text-neutral-500 text-xs uppercase tracking-[0.15em] font-bold">
                  The Origin
                </p>
              </div>
            </AnimatedSection>

            {/* Right: Narrative */}
            <AnimatedSection delay={0.25}>
              <div className="space-y-5 md:space-y-6">
                <p className="font-serif font-semibold text-black leading-relaxed"
                  style={{ fontSize: 'clamp(1.2rem, 2.2vw, 1.75rem)' }}>
                  SITED was founded on a simple belief: real development begins with people.
                </p>

                <p className="text-base md:text-lg text-neutral-900 leading-relaxed font-semibold">
                  Before development begins, there is community — families, neighborhoods, and
                  local voices. Growth should create opportunities for the people who live
                  there, not displacement or exclusion.
                </p>

                <p className="text-base md:text-lg text-neutral-900 leading-relaxed font-semibold">
                  That belief brought Terrence Large and Larry Beyince together.
                </p>

                <p className="text-base md:text-lg text-neutral-900 leading-relaxed font-semibold">
                  With a shared commitment to community investment, long term value, and
                  purposeful development, they founded SITED, Social Impact Through Economic
                  Development, as a platform built on principle.
                </p>

                <p className="text-base md:text-lg text-neutral-900 leading-relaxed font-semibold">
                  SITED exists to place community at the center of development and prove that
                  investment, when guided by responsibility, access, and vision, can create
                  lasting opportunity.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── What SITED Means ── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-site max-w-5xl mx-auto px-6 md:px-8">
          <AnimatedSection delay={0.3}>
            <div className="text-center mb-16">
              <p className="text-xs font-bold tracking-[0.2em] uppercase mb-5" style={{ color: '#B8953F' }}>
                What SITED Means
              </p>
              <h2 className="font-serif font-bold text-black leading-[1.1]"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}>
                Social Impact Through
                <br />
                <span className="font-bold">Economic Development</span>
              </h2>
              <p className="mt-6 text-base md:text-lg text-neutral-900 max-w-2xl mx-auto leading-relaxed font-semibold">
                is the framework behind every idea, partnership, and project.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.35}>
            <div className="grid grid-cols-1 md:grid-cols-3 border border-neutral-200">

              {/* Community */}
              <div className="bg-white p-8 md:p-10 flex flex-col gap-4" style={{ borderRight: '1px solid #e5e5e5' }}>
                <div style={{ width: 36, height: 2, background: '#B8953F', flexShrink: 0 }} />
                <p className="text-black text-sm font-bold tracking-[0.14em] uppercase">Community</p>
                <p className="text-neutral-900 text-base md:text-lg leading-relaxed font-medium">The starting point. Real development begins by listening to the people and families who already call these neighborhoods home.</p>
              </div>

              {/* Economic Development */}
              <div className="bg-white p-8 md:p-10 flex flex-col gap-4" style={{ borderRight: '1px solid #e5e5e5' }}>
                <div style={{ width: 36, height: 2, background: '#B8953F', flexShrink: 0 }} />
                <p className="text-black text-sm font-bold tracking-[0.14em] uppercase">Economic Development</p>
                <p className="text-neutral-900 text-base md:text-lg leading-relaxed font-medium">The tool. Purposeful investment that creates jobs, builds wealth, and opens pathways for long-term opportunity.</p>
              </div>

              {/* Social Impact */}
              <div className="bg-white p-8 md:p-10 flex flex-col gap-4">
                <div style={{ width: 36, height: 2, background: '#B8953F', flexShrink: 0 }} />
                <p className="text-black text-sm font-bold tracking-[0.14em] uppercase">Social Impact</p>
                <p className="text-neutral-900 text-base md:text-lg leading-relaxed font-medium">The purpose. Every project is measured not just in returns, but in lives improved, communities strengthened, and futures unlocked.</p>
              </div>

            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}