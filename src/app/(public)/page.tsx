import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getRepository } from '@/lib/repositories';
import { PropertyCard } from '@/components/domain/PropertyCard';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Button } from '@/components/ui/Button';


export const metadata: Metadata = {
  title: 'SITED Development Group — Luxury Real Estate California',
  description: 'Boutique luxury real estate development across California\'s most coveted addresses. Architectural significance meets investment excellence.',
};

export default async function HomePage(): Promise<React.JSX.Element> {
  const repo = getRepository();
  const schema = await repo.getSchema();
  const { heroTitle, heroSubtitle, agencyName } = schema.siteContent;
  const featuredProperties = schema.properties.filter((p) => p.featured);
  const allProperties = schema.properties;

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative h-screen min-h-[600px] flex items-end overflow-hidden bg-neutral-900">
        {/* Background Image */}
        <Image
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=2400&q=90"
          alt="Luxury California property at golden hour"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI4MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzFhMWExYSIvPjwvc3ZnPg=="
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Hero Content */}
        <div className="container-site relative z-10 pb-16 md:pb-24">
          <AnimatedSection delay={0.2}>
            <p className="text-caption text-white/50 tracking-[0.3em] mb-6">{agencyName}</p>
            <h1 className="text-display text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl max-w-3xl mb-6">
              {heroTitle}
            </h1>
            <p className="text-white/70 text-base md:text-lg max-w-xl mb-10 leading-relaxed">
              {heroSubtitle}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button as="link" href="/projects" variant="primary" size="lg">
                View Portfolio
              </Button>
              <Button as="link" href="/contact" variant="secondary" size="lg"
                className="bg-transparent text-white border-white/50 hover:bg-white hover:text-black"
              >
                Inquire Now
              </Button>
            </div>
          </AnimatedSection>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-8 md:right-12 z-10 flex flex-col items-center gap-2">
          <div className="w-px h-12 bg-white/30 animate-pulse" />
          <p className="text-caption text-white/30 [writing-mode:vertical-rl]">Scroll</p>
        </div>
      </section>

      {/* ─── STATS BAR ─── */}
      <section className="border-b border-neutral-100 bg-white">
        <div className="container-site">
          <div className="grid grid-cols-3 divide-x divide-neutral-100">
            {[
              { value: '$2B+', label: 'Portfolio Value' },
              { value: '20+', label: 'Years Active' },
              { value: allProperties.length.toString(), label: 'Developments' },
            ].map((stat, i) => (
              <AnimatedSection key={stat.label} delay={i * 0.1} className="py-8 md:py-10 px-4 md:px-8 text-center">
                <p className="text-display text-2xl md:text-3xl text-black mb-1">{stat.value}</p>
                <p className="text-caption text-neutral-400">{stat.label}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED DEVELOPMENTS ─── */}
      <section className="py-24 md:py-32">
        <div className="container-site">
          <AnimatedSection className="mb-16">
            <p className="text-caption text-neutral-400 mb-3">Featured Developments</p>
            <h2 className="text-display text-3xl md:text-4xl text-black">Signature Properties</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {featuredProperties.map((property, i) => (
              <PropertyCard key={property.id} property={property} delay={i * 0.1} />
            ))}
          </div>

          <AnimatedSection delay={0.3} className="mt-14 text-center">
            <Button as="link" href="/projects" variant="secondary">
              View All Developments
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── PHILOSOPHY SECTION ─── */}
      <section className="py-24 md:py-32 bg-neutral-50">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <AnimatedSection>
              <p className="text-caption text-neutral-400 mb-4">Our Approach</p>
              <h2 className="text-display text-3xl md:text-4xl text-black mb-8">
                Architecture as Investment
              </h2>
              <p className="text-neutral-600 text-base leading-relaxed mb-6">
                We develop properties at the intersection of architectural significance and investment
                excellence. Every project is selected for its land quality, view corridor, and
                long-term value appreciation potential.
              </p>
              <p className="text-neutral-600 text-base leading-relaxed mb-10">
                Our portfolio spans coastal estates, hillside compounds, and urban penthouses — each
                developed with a meticulous attention to material quality that ensures lasting premium.
              </p>
              <Button as="link" href="/about" variant="ghost" className="border-b border-black rounded-none px-4 py-2">
                About the Firm →
              </Button>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1000&q=85"
                alt="Luxury interior architecture"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjEwMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2YwZjBmMCIvPjwvc3ZnPg=="
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─── CTA SECTION ─── */}
      <section className="py-24 md:py-32 bg-black text-white">
        <div className="container-site text-center">
          <AnimatedSection>
            <p className="text-caption text-white/40 mb-4 tracking-[0.3em]">Private Inquiries</p>
            <h2 className="text-display text-3xl md:text-5xl text-white mb-6 max-w-2xl mx-auto">
              Ready to Discuss Acquisition Opportunities?
            </h2>
            <p className="text-white/60 text-base max-w-lg mx-auto mb-10">
              We work exclusively with qualified investors and high-net-worth individuals. Contact us to
              explore off-market opportunities and upcoming developments.
            </p>
            <Button
              as="link"
              href="/contact"
              variant="secondary"
              size="lg"
              className="bg-white text-black border-white hover:bg-neutral-100"
            >
              Begin a Conversation
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
