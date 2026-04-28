import type { Metadata } from 'next';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

export const metadata: Metadata = {
  title: 'Own — SITED Development Group',
  description: 'Own your future. Own your community. Own what you help build.',
};

export default function OwnPage(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - Monumental "OWN" */}
      <section className="relative min-h-[65vh] flex items-center justify-center">
        <div className="container-site max-w-5xl mx-auto px-6 md:px-8 text-center">
          <AnimatedSection>
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-black/5 text-black/50 text-xs md:text-sm font-medium tracking-wide uppercase">
              The Ultimate Outcome
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={0.1}>
            <h1 className="text-[16vw] md:text-[11vw] lg:text-[9rem] font-black uppercase leading-[0.85] tracking-[-0.03em] text-black">
              OWN
            </h1>
          </AnimatedSection>
          
          <AnimatedSection delay={0.15}>
            <div className="mt-6 md:mt-10 max-w-xl mx-auto">
              <p className="text-neutral-600 text-lg md:text-xl">
                Own your future.
                <br />
                Own your community.
                <br />
                <span className="font-semibold text-black">Own what you help build.</span>
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Core Philosophy Section */}
      <section className="py-16 md:py-20 bg-neutral-50">
        <div className="container-site max-w-4xl mx-auto px-6 md:px-8">
          <AnimatedSection delay={0.2}>
            <div className="text-center mb-12">
              <p className="text-neutral-400 text-sm uppercase tracking-wider mb-3">
                Our belief
              </p>
              <p className="text-2xl md:text-3xl lg:text-4xl font-light text-black/80 leading-relaxed">
                "Ownership isn't just a document.
                <br />
                It's a stake in what comes next."
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <AnimatedSection delay={0.25}>
              <div className="bg-white p-8 rounded-2xl shadow-sm">
                <div className="w-12 h-0.5 bg-black mb-6"></div>
                <h3 className="text-xl font-bold text-black mb-3">Homeownership</h3>
                <p className="text-neutral-600 leading-relaxed">
                  We create pathways to ownership, not just tenancy. Equity builds wealth. Wealth builds futures.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="bg-white p-8 rounded-2xl shadow-sm">
                <div className="w-12 h-0.5 bg-black mb-6"></div>
                <h3 className="text-xl font-bold text-black mb-3">Community Ownership</h3>
                <p className="text-neutral-600 leading-relaxed">
                  Residents help shape decisions. When people have a voice, they have a stake.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.35}>
              <div className="bg-white p-8 rounded-2xl shadow-sm md:col-span-2">
                <div className="w-12 h-0.5 bg-black mb-6"></div>
                <h3 className="text-xl font-bold text-black mb-3">Generational Stability</h3>
                <p className="text-neutral-600 leading-relaxed">
                  Ownership creates a foundation. From that foundation, everything else grows — education, careers, health, and opportunity.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Powerful Statement Block */}
      <section className="py-20 md:py-28">
        <div className="container-site max-w-4xl mx-auto px-6 md:px-8">
          <AnimatedSection delay={0.4}>
            <div className="border-l-4 border-black pl-6 md:pl-8 py-4">
              <p className="text-neutral-500 text-sm uppercase tracking-wider mb-3">
                The outcome we're building toward
              </p>
              <p className="text-2xl md:text-3xl lg:text-4xl font-medium text-black leading-tight">
                When families own, communities thrive.
                <br />
                When communities thrive, everyone wins.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 md:py-28 bg-black text-white">
        <div className="container-site max-w-3xl mx-auto px-6 md:px-8 text-center">
          <AnimatedSection delay={0.45}>
            <p className="text-white/60 text-sm uppercase tracking-wider mb-4">
              Ready to own your piece of the future?
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ownership starts here.
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-md mx-auto">
              Learn about our pathways to homeownership and community equity.
            </p>
            <div>
              <a
                href="/contact"
                className="inline-block px-8 py-4 bg-white text-black text-lg font-medium rounded-full hover:bg-neutral-100 transition-colors"
              >
                Start your journey →
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Closing */}
      <section className="py-12 text-center border-t border-neutral-100">
        <div className="container-site max-w-2xl mx-auto px-6 md:px-8">
          <AnimatedSection delay={0.5}>
            <p className="text-neutral-400 text-sm">
              SITED Development Group — Building ownership, one family at a time.
            </p>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}