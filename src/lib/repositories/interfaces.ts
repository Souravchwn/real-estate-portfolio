// lib/repositories/interfaces.ts
// The abstract contract. Next.js UI never knows which implementation is running.

import type { DatabaseSchema, Property } from '@/types/domain';

export interface IDatabaseRepository {
  getSchema(): Promise<DatabaseSchema>;
  getProperty(slug: string): Promise<Property | null>;
  updateSchema(data: DatabaseSchema): Promise<void>;
}
