// lib/repositories/index.ts
// Factory: returns the correct repository based on environment.
// - In production (Cloudflare Workers): uses CloudflareKVRepository
// - In local dev / fallback: uses LocalJsonRepository

import type { IDatabaseRepository } from './interfaces';
import { LocalJsonRepository } from './local-repository';

// We use the LocalJsonRepository for local development.
// In a Cloudflare edge route, you would instantiate CloudflareKVRepository
// by passing the KV binding from process.env or the request context.
//
// Example for an edge route:
//   import { CloudflareKVRepository } from '@/lib/repositories/kv-repository';
//   const repo = new CloudflareKVRepository(process.env.MY_CMS_DATA as unknown as KVNamespace);

export function getRepository(): IDatabaseRepository {
  return new LocalJsonRepository();
}
