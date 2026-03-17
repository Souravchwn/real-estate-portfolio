import Image from 'next/image';
import Link from 'next/link';
import type { Property } from '@/types/domain';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

interface PropertyCardProps {
  property: Property;
  delay?: number;
}

export function PropertyCard({ property, delay = 0 }: PropertyCardProps): React.JSX.Element {
  return (
    <AnimatedSection delay={delay}>
      <Link href={`/projects/${property.slug}`} className="group block">
        {/* Image */}
        <div className="relative overflow-hidden aspect-[4/3] bg-neutral-100 mb-5">
          <Image
            src={property.heroImage.url}
            alt={property.heroImage.altText}
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
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-caption text-neutral-400 mb-1">{property.location}</p>
            <h3 className="text-lg font-serif font-normal leading-snug text-black group-hover:opacity-60 transition-opacity duration-200">
              {property.title}
            </h3>
          </div>
          <StatusBadge status={property.status} className="mt-1 shrink-0" />
        </div>

        {/* Price & Specs */}
        <div className="mt-3 flex items-center justify-between">
          <p className="text-sm font-medium text-black">{property.price}</p>
          <p className="text-xs text-neutral-400">
            {property.specs.sqft.toLocaleString()} sqft
            {property.specs.beds !== undefined && ` · ${property.specs.beds}bd`}
            {property.specs.baths !== undefined && ` · ${property.specs.baths}ba`}
          </p>
        </div>
      </Link>
    </AnimatedSection>
  );
}
