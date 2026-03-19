import type { Metadata } from 'next';
import { getRepository } from '@/lib/repositories';
import { PlacesGrid } from '@/components/domain/PlacesGrid';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

export const runtime = 'edge';

export const metadata: Metadata = {
  title: 'Places',
  description: 'Explore California\'s most prestigious locations and neighborhoods — from coastal estates to urban luxury addresses.',
};

export default async function PlacesPage(): Promise<React.JSX.Element> {
  const repo = getRepository();
  const schema = await repo.getSchema();

  return (
    <section className="py-20 md:py-28">
      <div className="container-site">
        <AnimatedSection className="mb-16 md:mb-20">
          <p className="text-caption text-neutral-400 mb-3">Locations</p>
          <h1 className="text-display text-4xl md:text-5xl text-black max-w-2xl">
            California's Premier Addresses
          </h1>
        </AnimatedSection>

        <PlacesGrid places={schema.places} />
      </div>
    </section>
  );
}
