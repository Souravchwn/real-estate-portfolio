import type { Metadata } from 'next';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

export const metadata: Metadata = {
  title: 'Join — SITED Development Group',
  description:
    'Join SITED and help build communities that last. We are looking for investors, partners, community leaders, and skilled tradespeople.',
};

const GOLD = '#B8953F';

const WAYS_TO_JOIN = [
  {
    role: 'INVESTOR',
    description:
      'Partner with us to fund projects that create lasting economic opportunity. We prioritize long-term community value over short-term returns.',
  },
  {
    role: 'COMMUNITY PARTNER',
    description:
      'Bring your local knowledge and networks. We collaborate with organizations that are already doing the work on the ground.',
  },
  {
    role: 'SKILLED TRADESPERSON',
    description:
      'Be part of building the physical projects. We hire locally, pay fairly, and invest in the development of our workforce.',
  },
  {
    role: 'MENTOR / ADVISOR',
    description:
      'Share your expertise to shape our youth workforce programs, real estate strategy, and community engagement approach.',
  },
];

export default function JoinPage(): React.JSX.Element {
  return (
    <main className="min-h-screen" style={{ background: '#f7f6f2' }}>

      {/* ── Hero ── */}
      <section className="pt-16 pb-10 md:pt-20 md:pb-14 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto text-center">
        <AnimatedSection>
          <p
            className="text-sm font-bold tracking-[0.2em] uppercase mb-5"
            style={{ color: GOLD }}
          >
            Join
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.08}>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.08] text-black mb-6">
            Build something
            <br />
            that matters.
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
            SITED is built on the belief that community comes first. We are always looking for
            people who share that belief — investors, partners, tradespeople, and leaders who
            want to create lasting impact together.
          </p>
        </AnimatedSection>
      </section>

      {/* ── Ways to Join ── */}
      <section className="px-6 md:px-12 lg:px-20 pb-14 md:pb-18 max-w-6xl mx-auto">
        <AnimatedSection delay={0.22}>
          <div className="grid grid-cols-1 sm:grid-cols-2 border border-neutral-200 bg-white">
            {WAYS_TO_JOIN.map((item, i) => {
              const isLastRow = i >= WAYS_TO_JOIN.length - 2;
              const isRightCol = i % 2 === 1;
              return (
                <div
                  key={i}
                  className="p-8 md:p-10 flex flex-col gap-4"
                  style={{
                    borderRight: !isRightCol ? '1px solid #e5e5e5' : undefined,
                    borderBottom: !isLastRow ? '1px solid #e5e5e5' : undefined,
                  }}
                >
                  {/* Gold rule */}
                  <div style={{ width: 36, height: 2, background: GOLD, flexShrink: 0 }} />

                  {/* Role */}
                  <p className="text-black text-sm font-bold tracking-[0.14em] uppercase">
                    {item.role}
                  </p>

                  {/* Description */}
                  <p className="text-neutral-900 text-base md:text-lg leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </AnimatedSection>
      </section>

      {/* ── Closing Statement + CTA ── */}
      <section className="px-6 md:px-12 lg:px-20 pb-24 md:pb-32 max-w-5xl mx-auto">
        <AnimatedSection delay={0.3}>
          {/* Gold rule */}
          <div style={{ width: 56, height: 2, background: GOLD }} className="mb-10" />

          <p className="text-black text-xl md:text-2xl lg:text-3xl font-normal leading-relaxed font-serif mb-10">
            The foundation is ready. The community is waiting.{' '}
            <span className="italic font-normal" style={{ color: GOLD }}>The question is — who builds with us?</span>
          </p>

          <a
            href="/contact"
            className="inline-block text-sm font-semibold tracking-[0.12em] uppercase py-3 px-8 border border-black text-black hover:bg-black hover:text-white transition-colors duration-200"
          >
            Get in touch
          </a>
        </AnimatedSection>
      </section>

    </main>
  );
}