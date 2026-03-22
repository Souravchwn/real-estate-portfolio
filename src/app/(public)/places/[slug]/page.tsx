import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getRepository } from '@/lib/repositories';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Button } from '@/components/ui/Button';
import { MapPin, Building2 } from 'lucide-react';



interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const repo = getRepository();
  const place = await repo.getPlace(slug);
  if (!place) return {};
  return {
    title: place.name,
    description: place.description.slice(0, 155),
    openGraph: { images: [place.heroImage.url] },
  };
}

export default async function PlaceDetailPage({ params }: PageProps): Promise<React.JSX.Element> {
  const { slug } = await params;
  const repo = getRepository();
  const place = await repo.getPlace(slug);

  if (!place) notFound();

  return (
    <>
      {/* Hero Image */}
      <section className="relative h-[55vh] min-h-[400px] overflow-hidden bg-neutral-100">
        <Image
          src={place.heroImage.url}
          alt={place.heroImage.altText}
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
                  <p className="text-caption text-neutral-400 flex items-center gap-1.5">
                    <MapPin size={11} />
                    {place.location}
                  </p>
                </div>
                <h1 className="text-display text-3xl md:text-4xl lg:text-5xl text-black mb-6">
                  {place.name}
                </h1>
                <p className="text-neutral-600 text-base leading-relaxed max-w-2xl">
                  {place.description}
                </p>
              </AnimatedSection>

              {/* Gallery */}
              {place.gallery.length > 0 && (
                <AnimatedSection delay={0.2} className="mt-14">
                  <p className="text-caption text-neutral-400 mb-6">Gallery</p>
                  <div className="grid grid-cols-2 gap-3">
                    {place.gallery.map((img, i) => (
                      <div key={i} className={`relative overflow-hidden bg-neutral-100 ${i === 0 ? 'col-span-2 aspect-video' : 'aspect-4/3'}`}>
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
                {/* Location */}
                <p className="text-caption text-neutral-400 mb-2">Location</p>
                <p className="text-display text-2xl text-black mb-8">{place.location}</p>

                {/* Stats */}
                <div className="border-t border-neutral-100 pt-6 mb-8">
                  <p className="text-caption text-neutral-400 mb-5">Location Statistics</p>
                  <div className="space-y-4">
                    {place.stats.properties !== undefined && (
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-sm text-neutral-500">
                          <Building2 size={14} /> Properties
                        </span>
                        <span className="text-sm font-medium text-black">{place.stats.properties}</span>
                      </div>
                    )}
                    {place.stats.avgPrice !== undefined && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-neutral-500">Average Price</span>
                        <span className="text-sm font-medium text-black">{place.stats.avgPrice}</span>
                      </div>
                    )}
                    {place.stats.neighborhoods !== undefined && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-neutral-500">Neighborhoods</span>
                        <span className="text-sm font-medium text-black">{place.stats.neighborhoods}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* CTA */}
                <Button as="link" href="/contact" variant="primary" size="md" className="w-full justify-center mb-3">
                  Inquire About This Location
                </Button>
                <Button as="link" href="/places" variant="ghost" size="md" className="w-full justify-center text-neutral-400 hover:text-black">
                  ← Back to Places
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
