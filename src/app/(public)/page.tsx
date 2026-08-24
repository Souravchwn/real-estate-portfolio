import type { Metadata } from 'next';
import Image from 'next/image';
import { getRepository } from '@/lib/repositories';
import { PropertyCard } from '@/components/domain/PropertyCard';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Button } from '@/components/ui/Button';
import { HeroSection } from '@/components/sections/HeroSection';


export const metadata: Metadata = {
  title: 'SITED Development Group — Luxury Real Estate California',
  description: 'Boutique luxury real estate development across California\'s most coveted addresses. Architectural significance meets investment excellence.',
};

export default async function HomePage(): Promise<React.JSX.Element> {
  const repo = getRepository();
  const schema = await repo.getSchema();
  const { heroSubtitle, agencyName } = schema.siteContent;
  const featuredProperties = schema.properties.filter((p) => p.featured);
  const allProperties = schema.properties;

  return (
    <>
      {/* ─── HERO ─── */}
      <HeroSection agencyName={agencyName} heroSubtitle={heroSubtitle} />

      {/* ─── STATS BAR ─── */}
      {/* <section className="border-b border-neutral-100 bg-white">
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
      </section> */}

      {/* ─── FEATURED DEVELOPMENTS ─── */}
      {/* <section className="py-24 md:py-32">
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
      </section> */}

      {/* ─── PHILOSOPHY SECTION ───
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
      </section> */}
    </>
  );
}
