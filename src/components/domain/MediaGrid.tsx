'use client';

import { useState } from 'react';
import type { MediaItem, MediaType } from '@/types/domain';
import { MediaCard } from '@/components/domain/MediaCard';
import { cn } from '@/lib/utils';

interface MediaGridProps {
  media: MediaItem[];
}

const ALL_FILTERS: Array<{ label: string; value: MediaType | 'All' }> = [
  { label: 'All', value: 'All' },
  { label: 'Videos', value: 'Video' },
  { label: 'Press', value: 'Press' },
  { label: 'Publications', value: 'Publication' },
];

export function MediaGrid({ media }: MediaGridProps): React.JSX.Element {
  const [activeFilter, setActiveFilter] = useState<MediaType | 'All'>('All');

  const filtered = activeFilter === 'All'
    ? media
    : media.filter((m) => m.mediaType === activeFilter);

  return (
    <div>
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-1 mb-14 border-b border-neutral-100 pb-0">
        {ALL_FILTERS.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setActiveFilter(filter.value)}
            className={cn(
              'text-caption px-4 py-3 border-b-2 transition-all duration-200 -mb-px',
              activeFilter === filter.value
                ? 'border-black text-black'
                : 'border-transparent text-neutral-400 hover:text-black',
            )}
          >
            {filter.label}
            <span className="ml-2 text-neutral-300">
              {filter.value === 'All'
                ? media.length
                : media.filter((m) => m.mediaType === filter.value).length}
            </span>
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {filtered.map((item, i) => (
            <MediaCard key={item.id} mediaItem={item} delay={i * 0.08} />
          ))}
        </div>
      ) : (
        <p className="text-neutral-400 text-center py-20">No media items in this category.</p>
      )}
    </div>
  );
}
