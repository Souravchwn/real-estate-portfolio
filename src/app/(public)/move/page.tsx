import type { Metadata } from 'next';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

export const metadata: Metadata = {
  title: 'Move — SITED Development Group',
  description: 'Move now. Shape what comes next.',
};

export default function MovePage(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - Bold, commanding presence */}
      <section className="relative min-h-[70vh] flex items-center justify-center border-b border-neutral-100">
        <div className="container-site max-w-5xl mx-auto px-6 md:px-8 py-20 md:py-28 text-center">
          {/* <AnimatedSection>
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-black/5 text-black/60 text-xs md:text-sm font-medium tracking-wide uppercase">
              SITED Development Group
            </div>
          </AnimatedSection> */}
          
          <AnimatedSection delay={0.1}>
            <h1 className="text-[15vw] md:text-[8vw] lg:text-[7rem] font-black uppercase leading-[0.9] tracking-[-0.02em] text-black mb-8">
              MOVE
            </h1>
          </AnimatedSection>
          
          <AnimatedSection delay={0.15}>
            <p className="text-xl md:text-2xl lg:text-3xl text-black/70 max-w-3xl mx-auto leading-relaxed font-medium font-serif">
              Move now. Shape what comes next.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Message Section - Layered, impactful statements */}
      <section className="py-24 md:py-32">
        <div className="container-site max-w-4xl mx-auto px-6 md:px-8">
          <div className="space-y-16 md:space-y-20">
            <AnimatedSection delay={0.1}>
              <p className="text-3xl md:text-5xl lg:text-6xl font-bold text-black leading-[1.2] tracking-[-0.01em] font-serif">
                Don&apos;t wait for it.
                <br />
                <span className="text-neutral-400">Don&apos;t watch it happen.</span>
                <br />
                Change how it happens.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 border-l-4 border-black pl-6 md:pl-8">
                <p className="text-neutral-600 text-lg md:text-xl leading-relaxed">
                  We don&apos;t build for communities.
                </p>
                <p className="text-black text-xl md:text-2xl font-semibold leading-relaxed">
                  We build with them.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="bg-neutral-50 p-8 md:p-12 rounded-3xl">
                <p className="text-neutral-800 text-xl md:text-2xl lg:text-3xl leading-relaxed font-light italic font-serif">
                  “SITED brings people in before anything exists—<br />
                  shaping what gets built, together.”
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <div className="text-right">
                <div className="inline-block">
                  <p className="text-2xl md:text-3xl lg:text-4xl font-black text-black leading-[1.2] tracking-tight uppercase">
                    Not later.
                    <br />
                    <span className="text-5xl md:text-6xl lg:text-7xl block my-3">Now.</span>
                    Step in.
                    <br />
                    <span className="bg-black text-white px-3 py-1 inline-block mt-2">Help shape what gets built.</span>
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Closing Action Section */}
      <section className="py-20 md:py-28 bg-black text-white">
        <div className="container-site max-w-4xl mx-auto px-6 md:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight mb-6">
              Ready to move?
            </h2>
            <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto">
              Join us in shaping the future of development.
              <br />
              The next chapter starts with you.
            </p>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}