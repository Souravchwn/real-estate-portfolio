import type { Metadata } from 'next';
import Image from 'next/image';
import { getRepository } from '@/lib/repositories';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Button } from '@/components/ui/Button';

export const runtime = 'edge';

export const metadata: Metadata = {
  title: 'About',
  description: 'Meridian Development Group — A boutique real estate development firm crafting architecturally significant properties across California.',
};

export default async function AboutPage(): Promise<React.JSX.Element> {
  const repo = getRepository();
  const schema = await repo.getSchema();
  const { agencyName, aboutText } = schema.siteContent;

  const competencies = [
    { title: 'Site Acquisition', description: 'Identifying undervalued land with outsized appreciation potential in prime California corridors.' },
    { title: 'Entitlement', description: 'Expert navigation of California\'s complex permitting landscape to maximize buildable area.' },
    { title: 'Design Direction', description: 'Partnerships with leading architectural firms to create landmark buildings that define their neighborhoods.' },
    { title: 'Capital Formation', description: 'Structuring joint ventures and equity partnerships with institutional and high-net-worth investors.' },
  ];

  return (
    <>
      {/* Page Header */}
      <section className="pt-16 pb-20 md:pt-20 md:pb-28 border-b border-neutral-100">
        <div className="container-site">
          <AnimatedSection>
            <p className="text-caption text-neutral-400 mb-4">The Firm</p>
            <h1 className="text-display text-4xl md:text-5xl lg:text-6xl text-black max-w-2xl">
              Crafting California&apos;s Next Landmark Addresses
            </h1>
          </AnimatedSection>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 md:py-28">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <AnimatedSection className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=900&q=85"
                alt="Architectural detail of a luxury California residence"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjEwMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2YwZjBmMCIvPjwvc3ZnPg=="
              />
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="text-caption text-neutral-400 mb-6">Our Story</p>
              <h2 className="text-display text-2xl md:text-3xl text-black mb-8">{agencyName}</h2>
              <p className="text-neutral-600 text-base leading-relaxed mb-6">{aboutText}</p>
              <p className="text-neutral-600 text-base leading-relaxed mb-10">
                We believe that a property is more than a financial instrument — it is a legacy. Every
                development we undertake is designed to stand as a cultural marker of its time,
                delivering both beauty and long-term wealth creation for our partners.
              </p>
              <Button as="link" href="/contact" variant="primary">
                Work With Us
              </Button>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Competencies */}
      <section className="py-20 md:py-28 bg-neutral-50">
        <div className="container-site">
          <AnimatedSection className="mb-16">
            <p className="text-caption text-neutral-400 mb-3">Core Competencies</p>
            <h2 className="text-display text-3xl md:text-4xl text-black">How We Create Value</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-neutral-200">
            {competencies.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.1} className="bg-white p-8 md:p-10">
                <p className="text-caption text-neutral-300 mb-3">0{i + 1}</p>
                <h3 className="text-lg font-serif font-normal text-black mb-3">{item.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{item.description}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
