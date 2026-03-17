import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getRepository } from '@/lib/repositories';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Button } from '@/components/ui/Button';
import { MapPin, Maximize2, BedDouble, Bath } from 'lucide-react';

export const runtime = 'edge';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const repo = getRepository();
  const property = await repo.getProperty(slug);
  if (!property) return {};
  return {
    title: property.title,
    description: property.description.slice(0, 155),
    openGraph: { images: [property.heroImage.url] },
  };
}

export default async function ProjectDetailPage({ params }: PageProps): Promise<React.JSX.Element> {
  const { slug } = await params;
  const repo = getRepository();
  const property = await repo.getProperty(slug);

  if (!property) notFound();

  return (
    <>
      {/* Hero Image */}
      <section className="relative h-[55vh] min-h-[400px] overflow-hidden bg-neutral-100">
        <Image
          src={property.heroImage.url}
          alt={property.heroImage.altText}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI4MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2YwZjBmMCIvPjwvc3ZnPg=="
        />
        <div className="absolute inset-0 bg-black/20" />
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Main */}
            <div className="lg:col-span-2">
              <AnimatedSection>
                <div className="flex items-center gap-3 mb-4">
                  <StatusBadge status={property.status} />
                  <span className="text-neutral-300">·</span>
                  <p className="text-caption text-neutral-400 flex items-center gap-1.5">
                    <MapPin size={11} />
                    {property.location}
                  </p>
                </div>
                <h1 className="text-display text-3xl md:text-4xl lg:text-5xl text-black mb-6">
                  {property.title}
                </h1>
                <p className="text-neutral-600 text-base leading-relaxed max-w-2xl">
                  {property.description}
                </p>
              </AnimatedSection>

              {/* Gallery */}
              {property.gallery.length > 0 && (
                <AnimatedSection delay={0.2} className="mt-14">
                  <p className="text-caption text-neutral-400 mb-6">Gallery</p>
                  <div className="grid grid-cols-2 gap-3">
                    {property.gallery.map((img, i) => (
                      <div key={i} className={`relative overflow-hidden bg-neutral-100 ${i === 0 ? 'col-span-2 aspect-[16/9]' : 'aspect-[4/3]'}`}>
                        <Image
                          src={img.url}
                          alt={img.altText}
                          fill
                          sizes="(max-width: 1024px) 100vw, 66vw"
                          className="object-cover hover:scale-105 transition-transform duration-700"
                          placeholder="blur"
                          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjVmNWY1Ii8+PC9zdmc+"
                        />
                      </div>
                    ))}
                  </div>
                </AnimatedSection>
              )}
            </div>

            {/* Sidebar */}
            <AnimatedSection delay={0.15} className="lg:col-span-1">
              <div className="border border-neutral-100 p-8 sticky top-28">
                {/* Price */}
                <p className="text-caption text-neutral-400 mb-2">Asking Price</p>
                <p className="text-display text-2xl text-black mb-8">{property.price}</p>

                {/* Specs */}
                <div className="border-t border-neutral-100 pt-6 mb-8">
                  <p className="text-caption text-neutral-400 mb-5">Property Specifications</p>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm text-neutral-500">
                        <Maximize2 size={14} /> Square Footage
                      </span>
                      <span className="text-sm font-medium text-black">{property.specs.sqft.toLocaleString()} sqft</span>
                    </div>
                    {property.specs.beds !== undefined && (
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-sm text-neutral-500">
                          <BedDouble size={14} /> Bedrooms
                        </span>
                        <span className="text-sm font-medium text-black">{property.specs.beds}</span>
                      </div>
                    )}
                    {property.specs.baths !== undefined && (
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-sm text-neutral-500">
                          <Bath size={14} /> Bathrooms
                        </span>
                        <span className="text-sm font-medium text-black">{property.specs.baths}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* CTA */}
                <Button as="link" href="/contact" variant="primary" size="md" className="w-full justify-center mb-3">
                  Inquire About This Property
                </Button>
                <Button as="link" href="/projects" variant="ghost" size="md" className="w-full justify-center text-neutral-400 hover:text-black">
                  ← Back to Portfolio
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
