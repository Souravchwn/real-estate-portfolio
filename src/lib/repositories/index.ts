// lib/repositories/index.ts
// Factory: returns the correct repository based on environment.
// - In production (Cloudflare Workers): uses CloudflareKVRepository
// - In local dev / fallback: uses LocalJsonRepository

import type { IDatabaseRepository } from './interfaces';
import { LocalJsonRepository } from './local-repository';

export function getRepository(): IDatabaseRepository {
  // Use local JSON repository to act statelessly on Netlify Serverless Functions
  return new LocalJsonRepository();
}
