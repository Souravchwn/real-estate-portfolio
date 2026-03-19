// lib/repositories/index.ts
// Factory: returns the correct repository based on environment.
// - In production (Cloudflare Workers): uses CloudflareKVRepository
// - In local dev / fallback: uses LocalJsonRepository

import type { IDatabaseRepository } from './interfaces';
import { LocalJsonRepository } from './local-repository';
import { CloudflareKVRepository } from './kv-repository';

export function getRepository(): IDatabaseRepository {
  // In Cloudflare Workers/Pages, check if KV binding is available
  if (typeof process !== 'undefined' && process.env.MY_CMS_DATA) {
    return new CloudflareKVRepository(process.env.MY_CMS_DATA as unknown as KVNamespace);
  }
  
  // Fallback to local JSON for development
  return new LocalJsonRepository();
}
