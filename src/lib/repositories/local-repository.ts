// lib/repositories/local-repository.ts
// LOCAL DEV / DISASTER RECOVERY: Reads from seed.json. 15-minute RTO fallback per PRD §7.
// Switch to this implementation by changing getRepository() in lib/repositories/index.ts

import type { IDatabaseRepository } from './interfaces';
import type { DatabaseSchema, Property } from '@/types/domain';
import seedData from '@/data/seed.json';

export class LocalJsonRepository implements IDatabaseRepository {
  private schema: DatabaseSchema;

  constructor() {
    this.schema = seedData as DatabaseSchema;
  }

  async getSchema(): Promise<DatabaseSchema> {
    return this.schema;
  }

  async getProperty(slug: string): Promise<Property | null> {
    return this.schema.properties.find((p) => p.slug === slug) ?? null;
  }

  async updateSchema(data: DatabaseSchema): Promise<void> {
    // In local dev, we just update in-memory.
    // In production, switch to CloudflareKVRepository.
    this.schema = data;
    console.warn('[LocalJsonRepository] updateSchema called — data is in-memory only. Switch to CloudflareKVRepository for production persistence.');
  }
}
