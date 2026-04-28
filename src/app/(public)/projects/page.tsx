import type { Metadata } from 'next';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

export const metadata: Metadata = {
  title: 'Projects — SITED Development Group',
  description:
    "We don't start with buildings. We start with people. Housing is the entry point. Ownership is the outcome. Community is the multiplier.",
};

export default function ProjectsPage(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - Bold thesis statement */}
      <section className="relative min-h-[60vh] flex items-center justify-center border-b border-neutral-100">
        <div className="container-site max-w-5xl mx-auto px-6 md:px-8 py-20 md:py-28">
          <AnimatedSection>
            <div className="inline-block mb-8 px-4 py-1.5 rounded-full bg-black/5 text-black/50 text-xs md:text-sm font-medium tracking-wide uppercase">
              Our Approach
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={0.1}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-black leading-[1.2] tracking-[-0.02em] max-w-4xl">
              We don't start with buildings.
              <br />
              <span className="text-neutral-400">We start with people.</span>
            </h1>
          </AnimatedSection>
        </div>
      </section>

      {/* The Principle - Core philosophy block */}
      <section className="py-16 md:py-20">
        <div className="container-site max-w-4xl mx-auto px-6 md:px-8">
          <AnimatedSection delay={0.15}>
            <div className="bg-neutral-50 rounded-2xl p-8 md:p-12">
              <p className="text-neutral-600 text-base md:text-lg uppercase tracking-wide mb-4">
                The principle
              </p>
              <p className="text-2xl md:text-3xl lg:text-4xl font-medium text-black leading-relaxed">
                Strong communities aren't built from the ground up.
                <br />
                <span className="font-bold">They're built from the inside out.</span>
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Mission Statement - Bold tagline */}
      <section className="py-12 md:py-16">
        <div className="container-site max-w-4xl mx-auto px-6 md:px-8">
          <AnimatedSection delay={0.2}>
            <div className="border-l-4 border-black pl-6 md:pl-8 py-2">
              <p className="text-black text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                Housing is the entry point.
                <br />
                Ownership is the outcome.
                <br />
                <span className="text-neutral-500">Community is the multiplier.</span>
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Detailed Explanation - Layered insights */}
      <section className="py-20 md:py-28">
        <div className="container-site max-w-4xl mx-auto px-6 md:px-8">
          <div className="space-y-16">
            <AnimatedSection delay={0.25}>
              <div className="grid gap-8">
                <p className="text-neutral-700 text-lg md:text-xl leading-relaxed">
                  We focus on neighborhoods that have been overlooked but not lacking potential.
                </p>
                <p className="text-neutral-700 text-lg md:text-xl leading-relaxed">
                  On families who need access rather than just shelter.
                </p>
                <p className="text-neutral-700 text-lg md:text-xl leading-relaxed border-l-2 border-neutral-200 pl-6">
                  And on systems that create long-term stability instead of temporary solutions.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="text-center py-8">
                <p className="text-neutral-500 text-base uppercase tracking-wider mb-3">
                  Our commitment
                </p>
                <p className="text-black text-xl md:text-2xl font-medium">
                  Every project is intentional.
                  <br />
                  <span className="text-neutral-600">Every investment is human first.</span>
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.35}>
              <div className="bg-black text-white rounded-2xl p-8 md:p-12 text-center">
                <p className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed">
                  This is how neighborhoods reshape themselves.
                  <br />
                  <span className="font-bold block mt-4">This is how stability becomes generational.</span>
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Projects Preview - Subtle teaser for what's next */}
      <section className="py-16 md:py-20 border-t border-neutral-100">
        <div className="container-site max-w-4xl mx-auto px-6 md:px-8 text-center">
          <AnimatedSection delay={0.4}>
            <p className="text-neutral-400 text-sm uppercase tracking-wider mb-4">
              Coming soon
            </p>
            <p className="text-neutral-600 text-lg">
              Active project listings and case studies will appear here.
            </p>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}