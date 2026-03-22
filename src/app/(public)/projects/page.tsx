import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getRepository } from '@/lib/repositories';
import { ProjectsGrid } from '@/components/domain/ProjectsGrid';
import { AnimatedSection } from '@/components/ui/AnimatedSection';



export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Explore our collection of luxury California real estate developments — Active listings, sold properties, and upcoming projects.',
};

export default async function ProjectsPage(): Promise<React.JSX.Element> {
  const repo = getRepository();
  const schema = await repo.getSchema();

  return (
    <section className="py-20 md:py-28">
      <div className="container-site">
        <AnimatedSection className="mb-16 md:mb-20">
          <p className="text-caption text-neutral-400 mb-3">Development Portfolio</p>
          <h1 className="text-display text-4xl md:text-5xl text-black max-w-2xl">
            Every Address, a Statement
          </h1>
        </AnimatedSection>

        <Suspense fallback={<div className="text-center py-20 text-neutral-400">Loading...</div>}>
          <ProjectsGrid properties={schema.properties} />
        </Suspense>
      </div>
    </section>
  );
}
