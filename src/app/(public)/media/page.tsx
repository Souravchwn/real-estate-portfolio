import type { Metadata } from 'next';
import { getRepository } from '@/lib/repositories';
import { MediaGrid } from '@/components/domain/MediaGrid';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

export const runtime = 'edge';

export const metadata: Metadata = {
  title: 'Media',
  description: 'Videos, press coverage, and publications about our luxury real estate developments and market insights.',
};

export default async function MediaPage(): Promise<React.JSX.Element> {
  const repo = getRepository();
  const schema = await repo.getSchema();

  return (
    <section className="py-20 md:py-28">
      <div className="container-site">
        <AnimatedSection className="mb-16 md:mb-20">
          <p className="text-caption text-neutral-400 mb-3">Media Center</p>
          <h1 className="text-display text-4xl md:text-5xl text-black max-w-2xl">
            Press, Publications & Video
          </h1>
        </AnimatedSection>

        <MediaGrid media={schema.media} />
      </div>
    </section>
  );
}
