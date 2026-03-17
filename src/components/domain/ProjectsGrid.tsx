'use client';

import { useState } from 'react';
import type { Property, PropertyStatus } from '@/types/domain';
import { PropertyCard } from '@/components/domain/PropertyCard';
import { cn } from '@/lib/utils';

interface ProjectsGridProps {
  properties: Property[];
}

const ALL_FILTERS: Array<{ label: string; value: PropertyStatus | 'All' }> = [
  { label: 'All', value: 'All' },
  { label: 'Active', value: 'Active' },
  { label: 'Pre-Development', value: 'Pre-Development' },
  { label: 'Sold', value: 'Sold' },
];

export function ProjectsGrid({ properties }: ProjectsGridProps): React.JSX.Element {
  const [activeFilter, setActiveFilter] = useState<PropertyStatus | 'All'>('All');

  const filtered = activeFilter === 'All'
    ? properties
    : properties.filter((p) => p.status === activeFilter);

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
                ? properties.length
                : properties.filter((p) => p.status === filter.value).length}
            </span>
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {filtered.map((property, i) => (
            <PropertyCard key={property.id} property={property} delay={i * 0.08} />
          ))}
        </div>
      ) : (
        <p className="text-neutral-400 text-center py-20">No properties in this category.</p>
      )}
    </div>
  );
}
