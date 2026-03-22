import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getRepository } from '@/lib/repositories';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Button } from '@/components/ui/Button';
import { ExternalLink, Calendar } from 'lucide-react';



interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const repo = getRepository();
  const mediaItem = await repo.getMediaItem(slug);
  if (!mediaItem) return {};
  return {
    title: mediaItem.title,
    description: mediaItem.description.slice(0, 155),
    openGraph: { images: [mediaItem.thumbnailImage.url] },
  };
}

function MediaTypeBadge({ type }: { type: string }): React.JSX.Element {
  const colors: Record<string, string> = {
    Video: 'bg-blue-100 text-blue-700',
    Press: 'bg-purple-100 text-purple-700',
    Publication: 'bg-green-100 text-green-700',
  };

  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded ${colors[type] || 'bg-neutral-100 text-neutral-700'}`}>
      {type}
    </span>
  );
}

export default async function MediaDetailPage({ params }: PageProps): Promise<React.JSX.Element> {
  const { slug } = await params;
  const repo = getRepository();
  const mediaItem = await repo.getMediaItem(slug);

  if (!mediaItem) notFound();

  const publishedDate = new Date(mediaItem.publishedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      {/* Hero Image */}
      <section className="relative h-[55vh] min-h-[400px] overflow-hidden bg-neutral-100">
        <Image
          src={mediaItem.thumbnailImage.url}
          alt={mediaItem.thumbnailImage.altText}
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
                  <MediaTypeBadge type={mediaItem.mediaType} />
                  <span className="text-neutral-300">·</span>
                  <p className="text-caption text-neutral-400 flex items-center gap-1.5">
                    <Calendar size={11} />
                    {publishedDate}
                  </p>
                </div>
                <h1 className="text-display text-3xl md:text-4xl lg:text-5xl text-black mb-6">
                  {mediaItem.title}
                </h1>
                <p className="text-neutral-600 text-base leading-relaxed max-w-2xl">
                  {mediaItem.description}
                </p>
              </AnimatedSection>
            </div>

            {/* Sidebar */}
            <AnimatedSection delay={0.15} className="lg:col-span-1">
              <div className="border border-neutral-100 p-8 sticky top-28">
                {/* Media Type */}
                <p className="text-caption text-neutral-400 mb-2">Media Type</p>
                <p className="text-display text-2xl text-black mb-8">{mediaItem.mediaType}</p>

                {/* Details */}
                <div className="border-t border-neutral-100 pt-6 mb-8">
                  <p className="text-caption text-neutral-400 mb-5">Details</p>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-neutral-500 mb-1">Published</p>
                      <p className="text-sm font-medium text-black">{publishedDate}</p>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                {mediaItem.externalUrl && (
                  <Link
                    href={mediaItem.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button variant="primary" size="md" className="w-full justify-center mb-3">
                      <ExternalLink size={16} className="mr-2" />
                      View Full Content
                    </Button>
                  </Link>
                )}
                <Button as="link" href="/media" variant="ghost" size="md" className="w-full justify-center text-neutral-400 hover:text-black">
                  ← Back to Media
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
