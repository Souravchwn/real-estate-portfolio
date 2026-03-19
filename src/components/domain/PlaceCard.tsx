import Image from 'next/image';
import Link from 'next/link';
import type { Place } from '@/types/domain';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

interface PlaceCardProps {
  place: Place;
  delay?: number;
}

export function PlaceCard({ place, delay = 0 }: PlaceCardProps): React.JSX.Element {
  return (
    <AnimatedSection delay={delay}>
      <Link href={`/places/${place.slug}`} className="group block">
        {/* Image */}
        <div className="relative overflow-hidden aspect-4/3 bg-neutral-100 mb-5">
          <Image
            src={place.heroImage.url}
            alt={place.heroImage.altText}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjVmNWY1Ii8+PC9zdmc+"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700" />
        </div>

        {/* Meta */}
        <div>
          <p className="text-caption text-neutral-400 mb-1">{place.location}</p>
          <h3 className="text-lg font-serif font-normal leading-snug text-black group-hover:opacity-60 transition-opacity duration-200">
            {place.name}
          </h3>
        </div>

        {/* Description & Stats */}
        <div className="mt-3">
          <p className="text-sm text-neutral-600 line-clamp-2 mb-3">
            {place.description}
          </p>
          <div className="flex flex-wrap gap-3 text-xs text-neutral-400">
            {place.stats.properties !== undefined && (
              <span>{place.stats.properties} properties</span>
            )}
            {place.stats.avgPrice !== undefined && (
              <span>Avg. {place.stats.avgPrice}</span>
            )}
            {place.stats.neighborhoods !== undefined && (
              <span>{place.stats.neighborhoods} neighborhoods</span>
            )}
          </div>
        </div>
      </Link>
    </AnimatedSection>
  );
}
