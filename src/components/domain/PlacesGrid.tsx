'use client';

import type { Place } from '@/types/domain';
import { PlaceCard } from '@/components/domain/PlaceCard';

interface PlacesGridProps {
  places: Place[];
}

export function PlacesGrid({ places }: PlacesGridProps): React.JSX.Element {
  return (
    <div>
      {places.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {places.map((place, i) => (
            <PlaceCard key={place.id} place={place} delay={i * 0.08} />
          ))}
        </div>
      ) : (
        <p className="text-neutral-400 text-center py-20">No places available.</p>
      )}
    </div>
  );
}
