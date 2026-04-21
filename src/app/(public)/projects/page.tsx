import type { Metadata } from 'next';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

export const metadata: Metadata = {
  title: 'Projects — SITED Development Group',
  description:
    "We don't start with buildings. We start with people. Housing is the entry point. Ownership is the outcome. Community is the multiplier.",
};

export default function ProjectsPage(): React.JSX.Element {
  return (
    <section className="py-24 md:py-36">
      <div className="container-site max-w-3xl">
        <AnimatedSection>
          <h1 className="text-display text-4xl md:text-5xl lg:text-6xl text-black mb-6 leading-[1.1]">
            We don&rsquo;t start with buildings.
            <br />
            We start with people.
          </h1>
        </AnimatedSection>

        <div className="space-y-8 mt-12 md:mt-16">
          <AnimatedSection delay={0.1}>
            <p className="text-neutral-700 text-lg md:text-xl leading-relaxed">
              Because strong communities aren&rsquo;t built from the ground up.
              They&rsquo;re built from the inside out.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <p className="text-neutral-700 text-lg md:text-xl leading-relaxed">
              The projects we&rsquo;re developing are designed to do one thing
              first: stabilize and strengthen the people who live there.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="text-black text-xl md:text-2xl font-medium leading-snug">
              Housing is the entry point. Ownership is the outcome. Community is
              the multiplier.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.25}>
            <p className="text-neutral-700 text-lg md:text-xl leading-relaxed">
              We focus on neighborhoods that have been overlooked but not lacking
              potential, on families who need access rather than just shelter, and
              on systems that create long-term stability instead of temporary
              solutions.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <p className="text-neutral-700 text-lg md:text-xl leading-relaxed">
              Every project is intentional. Every investment is human first.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.35}>
            <p className="text-display text-2xl md:text-3xl text-black mt-8">
              This is how neighborhoods reshape themselves.
              <br />
              This is how stability becomes generational.
            </p>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
