import type { Metadata } from 'next';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

export const metadata: Metadata = {
  title: 'Drop — SITED Development Group',
  description: 'Drop your ideas. Drop your voice. Help shape what gets built.',
};

export default function DropPage(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - Bold "DROP" statement */}
      <section className="relative min-h-[60vh] flex items-center justify-center">
        <div className="container-site max-w-5xl mx-auto px-6 md:px-8 text-center">
          <AnimatedSection>
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-black/5 text-black/50 text-xs md:text-sm font-medium tracking-wide uppercase">
              Contribute
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={0.1}>
            <h1 className="text-[15vw] md:text-[10vw] lg:text-[8rem] font-black uppercase leading-[0.9] tracking-[-0.03em] text-black">
              DROP
            </h1>
          </AnimatedSection>
          
          <AnimatedSection delay={0.15}>
            <div className="mt-6 md:mt-8 max-w-xl mx-auto">
              <p className="text-neutral-600 text-lg md:text-xl">
                Drop your ideas.
                <br />
                Drop your voice.
                <br />
                <span className="font-semibold text-black">Help shape what gets built.</span>
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-20 bg-neutral-50">
        <div className="container-site max-w-4xl mx-auto px-6 md:px-8">
          <div className="text-center mb-12">
            <AnimatedSection delay={0.2}>
              <p className="text-neutral-400 text-sm uppercase tracking-wider mb-2">
                What does &quot;Drop&quot; mean?
              </p>
              <h2 className="text-2xl md:text-3xl font-medium text-black font-serif">
                Drop your contribution into the process.
              </h2>
            </AnimatedSection>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <AnimatedSection delay={0.25}>
              <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
                <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  1
                </div>
                <p className="text-black font-medium text-lg">Drop an Idea</p>
                <p className="text-neutral-500 text-sm mt-2">
                  Share a concept, a need, or a vision for your neighborhood.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
                <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  2
                </div>
                <p className="text-black font-medium text-lg">Drop Your Voice</p>
                <p className="text-neutral-500 text-sm mt-2">
                  Join conversations that shape what gets built and how.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.35}>
              <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
                <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  3
                </div>
                <p className="text-black font-medium text-lg">Drop In</p>
                <p className="text-neutral-500 text-sm mt-2">
                  Participate in workshops, forums, and community sessions.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Call to Action - Submission Form Teaser */}
      <section className="py-20 md:py-28">
        <div className="container-site max-w-3xl mx-auto px-6 md:px-8">
          <AnimatedSection delay={0.4}>
            <div className="border-2 border-dashed border-neutral-300 rounded-3xl p-8 md:p-12 text-center bg-white">
              <p className="text-neutral-500 text-sm uppercase tracking-wider mb-4">
                Drop something here
              </p>
              <p className="text-xl md:text-2xl text-black/70 mb-6 font-serif">
                Ideas, feedback, questions — <br />
                all of it belongs here.
              </p>
              <div className="inline-block">
                <button className="px-8 py-3 bg-black text-white text-base font-medium rounded-full hover:bg-neutral-800 transition-colors">
                  Drop your message →
                </button>
              </div>
              <p className="text-neutral-400 text-xs mt-6">
                Every drop helps shape what gets built next.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Closing Statement */}
      <section className="py-12 pb-24 text-center border-t border-neutral-100">
        <div className="container-site max-w-2xl mx-auto px-6 md:px-8">
          <AnimatedSection delay={0.45}>
            <p className="text-neutral-400 text-sm">
              SITED Development Group — Built with drops from people like you.
            </p>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}