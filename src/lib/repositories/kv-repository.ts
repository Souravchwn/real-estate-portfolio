// lib/repositories/kv-repository.ts
// PRODUCTION: Reads/writes to Cloudflare KV via the MY_CMS_DATA binding.

import type { IDatabaseRepository } from './interfaces';
import type { DatabaseSchema, Property, Place, MediaItem } from '@/types/domain';

const KV_KEY = 'site-schema-v1';

export class CloudflareKVRepository implements IDatabaseRepository {
  private kv: KVNamespace;

  constructor(kv: KVNamespace) {
    this.kv = kv;
  }

  async getSchema(): Promise<DatabaseSchema> {
    const raw = await this.kv.get(KV_KEY);
    if (!raw) throw new Error('Schema not found in KV. Please run the admin sync.');
    return JSON.parse(raw) as DatabaseSchema;
  }

  async getProperty(slug: string): Promise<Property | null> {
    const schema = await this.getSchema();
    return schema.properties.find((p) => p.slug === slug) ?? null;
  }

  async getPlaces(): Promise<Place[]> {
    const schema = await this.getSchema();
    return schema.places;
  }

  async getPlace(slug: string): Promise<Place | null> {
    const schema = await this.getSchema();
    return schema.places.find((p) => p.slug === slug) ?? null;
  }

  async getMedia(): Promise<MediaItem[]> {
    const schema = await this.getSchema();
    return schema.media;
  }

  async getMediaItem(slug: string): Promise<MediaItem | null> {
    const schema = await this.getSchema();
    return schema.media.find((m) => m.slug === slug) ?? null;
  }

  async updateSchema(data: DatabaseSchema): Promise<void> {
    await this.kv.put(KV_KEY, JSON.stringify(data));
  }
}
