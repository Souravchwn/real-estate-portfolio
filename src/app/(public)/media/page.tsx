import type { Metadata } from 'next';
import { getRepository } from '@/lib/repositories';
import { MediaGrid } from '@/components/domain/MediaGrid';
import { AnimatedSection } from '@/components/ui/AnimatedSection';



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
          <p className="text-sm font-bold tracking-[0.2em] uppercase mb-4" style={{ color: '#B8953F' }}>
            Media Center
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-black max-w-2xl leading-[1.1]">
            Press, Publications & Video
          </h1>
        </AnimatedSection>

        <MediaGrid media={schema.media} />
      </div>
    </section>
  );
}
