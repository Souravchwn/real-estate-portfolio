'use server';

// lib/actions/admin-actions.ts
// Server Action for the Admin CMS data injection portal.
// Validates JSON against DatabaseSchema, writes to KV, and revalidates the global edge cache.

import { revalidatePath } from 'next/cache';
import { getRepository } from '@/lib/repositories';
import type { DatabaseSchema } from '@/types/domain';

/**
 * Verifies the provided secret against the ADMIN_SECRET env var.
 * Returns true if correct (or if no real secret is set — dev mode).
 */
export async function verifyAdminSecret(provided: string): Promise<boolean> {
  const secret = process.env.ADMIN_SECRET;
  // In dev mode (no secret or placeholder), bypass the check
  if (!secret || secret === 'dev-secret-change-me') return true;
  return provided === secret;
}

interface AdminActionResult {
  success: boolean;
  error?: string;
}

function isValidSchema(data: unknown): data is DatabaseSchema {
  if (!data || typeof data !== 'object') return false;
  const d = data as Record<string, unknown>;
  if (typeof d.version !== 'string') return false;
  if (!d.siteContent || typeof d.siteContent !== 'object') return false;
  if (!Array.isArray(d.properties)) return false;
  if (!Array.isArray(d.places)) return false;
  if (!Array.isArray(d.media)) return false;
  return true;
}

export async function updateSiteSchema(rawJson: string): Promise<AdminActionResult> {
  // 1. Parse JSON
  let parsed: unknown;
  try {
    parsed = JSON.parse(rawJson);
  } catch {
    return { success: false, error: 'Invalid JSON. Please check your syntax.' };
  }

  // 2. Validate shape against DatabaseSchema
  if (!isValidSchema(parsed)) {
    return {
      success: false,
      error: 'Schema validation failed. Ensure the JSON has "version", "siteContent", and "properties" fields.',
    };
  }

  // 3. Write to repository (KV in production, in-memory in local dev)
  try {
    const repo = getRepository();
    await repo.updateSchema(parsed);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return { success: false, error: `Failed to write to store: ${message}` };
  }

  // 4. Purge the global edge cache so changes propagate immediately
  revalidatePath('/', 'layout');

  return { success: true };
}
