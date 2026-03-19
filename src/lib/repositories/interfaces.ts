// lib/repositories/interfaces.ts
// The abstract contract. Next.js UI never knows which implementation is running.

import type { DatabaseSchema, Property, Place, MediaItem } from '@/types/domain';

export interface IDatabaseRepository {
  getSchema(): Promise<DatabaseSchema>;
  getProperty(slug: string): Promise<Property | null>;
  getPlaces(): Promise<Place[]>;
  getPlace(slug: string): Promise<Place | null>;
  getMedia(): Promise<MediaItem[]>;
  getMediaItem(slug: string): Promise<MediaItem | null>;
  updateSchema(data: DatabaseSchema): Promise<void>;
}
