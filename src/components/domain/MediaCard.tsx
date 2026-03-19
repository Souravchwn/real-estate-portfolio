import Image from 'next/image';
import Link from 'next/link';
import type { MediaItem } from '@/types/domain';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { ExternalLink } from 'lucide-react';

interface MediaCardProps {
  mediaItem: MediaItem;
  delay?: number;
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

export function MediaCard({ mediaItem, delay = 0 }: MediaCardProps): React.JSX.Element {
  const isExternal = mediaItem.externalUrl !== undefined;
  const href = isExternal ? mediaItem.externalUrl! : `/media/${mediaItem.slug}`;
  const target = isExternal ? '_blank' : undefined;
  const rel = isExternal ? 'noopener noreferrer' : undefined;

  return (
    <AnimatedSection delay={delay}>
      <Link href={href} target={target} rel={rel} className="group block">
        {/* Thumbnail */}
        <div className="relative overflow-hidden aspect-video bg-neutral-100 mb-4">
          <Image
            src={mediaItem.thumbnailImage.url}
            alt={mediaItem.thumbnailImage.altText}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjVmNWY1Ii8+PC9zdmc+"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700" />
          {isExternal && (
            <div className="absolute top-3 right-3 bg-white/90 p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ExternalLink size={16} className="text-black" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <MediaTypeBadge type={mediaItem.mediaType} />
          <p className="text-xs text-neutral-400 shrink-0">
            {new Date(mediaItem.publishedDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </p>
        </div>

        {/* Title */}
        <h3 className="text-lg font-serif font-normal leading-snug text-black group-hover:opacity-60 transition-opacity duration-200 mb-2">
          {mediaItem.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-neutral-600 line-clamp-2">
          {mediaItem.description}
        </p>
      </Link>
    </AnimatedSection>
  );
}
