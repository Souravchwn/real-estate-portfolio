import type { Metadata } from 'next';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

export const metadata: Metadata = {
  title: 'Built By — SITED Development Group',
  description:
    'Terrence Large + Larry Beyince. People first. Community always. Impact through action.',
};

export default function BuiltByPage(): React.JSX.Element {
  return (
    <main className="bg-white">
      {/* ── Hero: Light background, staggered names ── */}
      {/* ── Hero: Dark background, staggered names ── */}
<section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center overflow-hidden bg-black">
  {/* Dark gradient overlay for depth */}
  <div className="absolute inset-0 bg-gradient-to-br from-black via-black/90 to-black/80" />

  <div className="relative z-10 container-site max-w-6xl mx-auto px-6 md:px-8 pb-8 md:pb-12">
    {/* Badge */}
    <AnimatedSection>
      <div className="inline-block mb-8 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white/70 text-xs md:text-sm font-medium tracking-wide uppercase border border-white/10">
        Built By
      </div>
    </AnimatedSection>

    {/* Names – each one animates separately */}
    <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6">
      <AnimatedSection delay={0.1}>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-[-0.02em]">
          Terrence Large
        </h1>
      </AnimatedSection>

      <AnimatedSection delay={0.15}>
        <span className="text-white/40 text-3xl md:text-5xl lg:text-6xl font-light block md:inline text-center">
          ★
        </span>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-[-0.02em]">
          Larry Beyince
        </h2>
      </AnimatedSection>
    </div>

    {/* Subtitle */}
    <AnimatedSection delay={0.25}>
      <p className="text-white/50 text-lg md:text-xl max-w-2xl mt-6 font-light">
        Social Impact Through Economic Development
      </p>
    </AnimatedSection>
  </div>
</section>

      {/* ── Tagline Banner ── */}
      <section className="py-8 md:py-12 border-b border-neutral-100">
        <div className="container-site max-w-4xl mx-auto px-6 md:px-8">
          <AnimatedSection delay={0.15}>
            <div className="text-center">
              <p className="text-2xl md:text-3xl lg:text-4xl font-light text-black leading-relaxed font-serif">
                People first. Community always.
                <br />
                <span className="font-semibold">Impact through action.</span>
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Narrative Story Section ── */}
      <section className="py-12 md:py-16">
        <div className="container-site max-w-4xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-16 items-start">
            <AnimatedSection delay={0.2}>
              <div>
                <div className="w-12 h-0.5 bg-black mb-6" />
                <p className="text-neutral-400 text-sm uppercase tracking-wider font-medium">
                  The Origin
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.25}>
              <div className="space-y-6">
                <p className="text-lg md:text-xl text-black/80 leading-relaxed font-serif">
                  SITED was founded on a simple belief: real development begins with people.
                </p>
                <p className="text-neutral-600 leading-relaxed">
                  Before development begins, there is community — families, neighborhoods, and
                  local voices. Growth should create opportunities for the people who live
                  there, not displacement or exclusion.
                </p>
                <p className="text-neutral-600 leading-relaxed">
                  That belief brought Terrence Large and Larry Beyince together.
                </p>
                <p className="text-neutral-600 leading-relaxed">
                  With a shared commitment to community investment, long term value, and
                  purposeful development, they founded SITED, Social Impact Through Economic
                  Development, as a platform built on principle.
                </p>
                <p className="text-neutral-600 leading-relaxed">
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
      <section className="py-20 md:py-28 bg-neutral-50">
        <div className="container-site max-w-5xl mx-auto px-6 md:px-8">
          <AnimatedSection delay={0.3}>
            <div className="text-center mb-16">
              <p className="text-neutral-400 text-sm uppercase tracking-wider font-medium mb-4">
                What SITED Means
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight tracking-[-0.02em]">
                Social Impact Through
                <br />
                Economic Development
              </h2>
              <p className="mt-6 text-lg md:text-xl text-neutral-500 max-w-2xl mx-auto leading-relaxed">
                is the framework behind every idea, partnership, and project.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.35}>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-8 md:p-10 text-center border border-neutral-100 hover:border-neutral-200 transition-colors">
                <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center mx-auto mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  </svg>
                </div>
                <p className="text-black font-semibold text-lg mb-2">Community</p>
                <p className="text-neutral-500 text-sm leading-relaxed">is the starting point.</p>
              </div>

              <div className="bg-white rounded-2xl p-8 md:p-10 text-center border border-neutral-100 hover:border-neutral-200 transition-colors">
                <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center mx-auto mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                  </svg>
                </div>
                <p className="text-black font-semibold text-lg mb-2">Economic Development</p>
                <p className="text-neutral-500 text-sm leading-relaxed">is the tool.</p>
              </div>

              <div className="bg-white rounded-2xl p-8 md:p-10 text-center border border-neutral-100 hover:border-neutral-200 transition-colors">
                <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center mx-auto mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                  </svg>
                </div>
                <p className="text-black font-semibold text-lg mb-2">Social Impact</p>
                <p className="text-neutral-500 text-sm leading-relaxed">is the purpose.</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Closing Statement ── */}
      <section className="py-16 md:py-20">
        <div className="container-site max-w-4xl mx-auto px-6 md:px-8 text-center">
          <AnimatedSection delay={0.4}>
            <div className="bg-black text-white rounded-2xl p-10 md:p-16">
              <p className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed font-serif">
                SITED demonstrates that economic growth and social responsibility
              </p>
              <p className="text-xl md:text-2xl lg:text-3xl font-bold leading-relaxed font-serif mt-4">
                can work together to build stronger communities.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}