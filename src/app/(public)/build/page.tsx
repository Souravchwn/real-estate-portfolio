import type { Metadata } from 'next';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

export const metadata: Metadata = {
  title: 'Build — SITED Development Group',
  description: 'Build with purpose. Build with community. Build what lasts.',
};

export default function BuildPage(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - Monumental "BUILD" */}
      <section className="relative min-h-[70vh] flex items-center justify-center">
        <div className="container-site max-w-7xl mx-auto px-6 md:px-8 text-center">
          <AnimatedSection>
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-black/5 text-black/50 text-xs md:text-sm font-medium tracking-wide uppercase">
              Take Action
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={0.1}>
            <h1 className="text-[18vw] md:text-[12vw] lg:text-[10rem] font-black uppercase leading-[0.85] tracking-[-0.03em] text-black">
              BUILD
            </h1>
          </AnimatedSection>
          
          <AnimatedSection delay={0.15}>
            <div className="mt-8 md:mt-12 max-w-2xl mx-auto">
              <p className="text-neutral-500 text-sm md:text-base uppercase tracking-wider mb-4">
                Not just structures
              </p>
              <p className="text-xl md:text-2xl lg:text-3xl text-black/80 font-light font-serif">
                Build what lasts.
                <br />
                Build with purpose.
                <br />
                <span className="font-semibold text-black">Build together.</span>
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Core Message Section */}
      <section className="py-20 md:py-28 bg-neutral-50">
        <div className="container-site max-w-4xl mx-auto px-6 md:px-8">
          <div className="space-y-12">
            <AnimatedSection delay={0.2}>
              <p className="text-2xl md:text-3xl lg:text-4xl font-light text-black/70 leading-relaxed text-center font-serif">
                &ldquo;Building isn&apos;t just about what goes into the ground.
                <br />
                It&apos;s about what grows from it.&rdquo;
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.25}>
              <div className="grid md:grid-cols-3 gap-6 pt-8">
                <div className="text-center p-6">
                  <div className="w-12 h-0.5 bg-black mx-auto mb-4"></div>
                  <p className="text-black font-medium">Purpose</p>
                  <p className="text-neutral-500 text-sm mt-2">Build with intention</p>
                </div>
                <div className="text-center p-6">
                  <div className="w-12 h-0.5 bg-black mx-auto mb-4"></div>
                  <p className="text-black font-medium">People</p>
                  <p className="text-neutral-500 text-sm mt-2">Build with community</p>
                </div>
                <div className="text-center p-6">
                  <div className="w-12 h-0.5 bg-black mx-auto mb-4"></div>
                  <p className="text-black font-medium">Legacy</p>
                  <p className="text-neutral-500 text-sm mt-2">Build what lasts</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 md:py-32">
        <div className="container-site max-w-3xl mx-auto px-6 md:px-8 text-center">
          <AnimatedSection delay={0.3}>
            <p className="text-neutral-400 text-sm uppercase tracking-wider mb-6">
              The foundation is ready
            </p>
            <p className="text-2xl md:text-3xl lg:text-4xl text-black font-light leading-relaxed font-serif">
              The question isn&apos;t <span className="line-through text-neutral-300">if</span>.
              <br />
              The question is <span className="font-bold">who builds with us</span>.
            </p>
            <div className="mt-12">
              <a
                href="/contact"
                className="inline-block px-8 py-4 bg-black text-white text-lg font-medium rounded-full hover:bg-neutral-800 transition-colors"
              >
                Join the build →
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}