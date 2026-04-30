import { navLinks } from '@/data/navConfig';

/**
 * Represents a single breadcrumb item in the breadcrumb trail.
 *
 * @property label - Human-readable label for the breadcrumb (e.g., "Projects", "Sunset Villa")
 * @property href - Absolute URL path for this breadcrumb (e.g., "/projects", "/projects/sunset-villa")
 * @property isCurrent - True only for the last item (current page); false for all others
 */
export interface BreadcrumbItem {
  label: string;
  href: string;
  isCurrent: boolean;
}

/**
 * Converts a URL slug to a human-readable title.
 *
 * This function transforms URL-friendly slugs into properly formatted titles by:
 * - Stripping bracket notation used in dynamic routes (e.g., `[id]` → `id`)
 * - Replacing hyphens with spaces
 * - Applying title case (capitalizing the first letter of each word)
 *
 * @param slug - A URL slug, potentially containing hyphens or bracket notation
 * @returns A human-readable title in title case
 *
 * @throws {Error} If slug is an empty string
 *
 * @example
 * slugToTitle('sunset-villa')
 * // Returns: 'Sunset Villa'
 *
 * @example
 * slugToTitle('[id]')
 * // Returns: 'Id'
 *
 * @example
 * slugToTitle('[slug]')
 * // Returns: 'Slug'
 *
 * @example
 * slugToTitle('projects')
 * // Returns: 'Projects'
 *
 * @example
 * slugToTitle('very-long-slug-name')
 * // Returns: 'Very Long Slug Name'
 */
export function slugToTitle(slug: string): string {
  // Input validation: ensure non-empty input
  if (!slug || slug.length === 0) {
    throw new Error('slug must be a non-empty string');
  }

  // Step 1: Strip bracket notation (e.g., [id] → id)
  const cleaned = slug.replace(/[\[\]]/g, '');

  // Step 2: Split on hyphens
  const words = cleaned.split('-');

  // Step 3: Capitalize each word (title case)
  const titleCaseWords = words.map((word) => {
    if (word.length === 0) return word;
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
  });

  // Step 4: Join with spaces
  return titleCaseWords.join(' ');
}

/**
 * Resolves a breadcrumb label from either navLinks configuration or slug conversion.
 *
 * This function prioritizes labels from the shared navigation configuration (navLinks).
 * If the provided href matches an entry in navLinks, that entry's label is returned.
 * Otherwise, the function falls back to converting the segment to title case using slugToTitle.
 *
 * This ensures that configured navigation items (like "Projects", "MOVE", "BUILD") are
 * displayed with their exact labels, while dynamic or unconfigured routes are converted
 * to readable titles automatically.
 *
 * @param segment - A single URL path segment (e.g., "projects", "sunset-villa", "[id]")
 * @param href - The full accumulated path for this segment (e.g., "/projects", "/projects/sunset-villa")
 * @returns A non-empty human-readable label string
 *
 * @throws {Error} If segment is an empty string
 *
 * @example
 * resolveLabel('projects', '/projects')
 * // Returns: 'Projects' (from navLinks)
 *
 * @example
 * resolveLabel('move', '/move')
 * // Returns: 'MOVE' (from navLinks)
 *
 * @example
 * resolveLabel('sunset-villa', '/projects/sunset-villa')
 * // Returns: 'Sunset Villa' (slug conversion fallback)
 *
 * @example
 * resolveLabel('malibu', '/places/malibu')
 * // Returns: 'Malibu' (slug conversion fallback)
 *
 * @example
 * resolveLabel('[id]', '/products/[id]')
 * // Returns: 'Id' (bracket stripping + slug conversion)
 */
export function resolveLabel(segment: string, href: string): string {
  // Input validation: ensure non-empty segment
  if (!segment || segment.length === 0) {
    throw new Error('segment must be a non-empty string');
  }

  // Step 1: Search navLinks for a matching href (case-sensitive)
  for (const link of navLinks) {
    if (link.href === href) {
      return link.label;
    }
  }

  // Step 2: Fall back to slug-to-title conversion
  return slugToTitle(segment);
}

/**
 * Constructs an array of breadcrumb items from a pathname.
 *
 * This function builds a complete breadcrumb trail from the root to the current page.
 * It always includes a "Home" breadcrumb as the first item, followed by breadcrumbs
 * for each segment in the pathname. Labels are resolved using `resolveLabel()`, which
 * prioritizes configured navigation labels from navLinks and falls back to slug-to-title
 * conversion for dynamic or unconfigured routes.
 *
 * The function is pure and deterministic — it has no side effects and always returns
 * the same result for the same input.
 *
 * @param pathname - The URL pathname to convert to breadcrumbs (e.g., "/projects/sunset-villa")
 * @returns An array of BreadcrumbItem objects representing the breadcrumb trail
 *
 * @throws {Error} If pathname does not start with "/" or contains query parameters ("?") or fragments ("#")
 *
 * @example
 * buildBreadcrumbs('/projects')
 * // Returns: [
 * //   { label: 'Home', href: '/', isCurrent: false },
 * //   { label: 'Projects', href: '/projects', isCurrent: true },
 * // ]
 *
 * @example
 * buildBreadcrumbs('/projects/sunset-villa')
 * // Returns: [
 * //   { label: 'Home', href: '/', isCurrent: false },
 * //   { label: 'Projects', href: '/projects', isCurrent: false },
 * //   { label: 'Sunset Villa', href: '/projects/sunset-villa', isCurrent: true },
 * // ]
 *
 * @example
 * buildBreadcrumbs('/places/malibu')
 * // Returns: [
 * //   { label: 'Home', href: '/', isCurrent: false },
 * //   { label: 'Places', href: '/places', isCurrent: false },
 * //   { label: 'Malibu', href: '/places/malibu', isCurrent: true },
 * // ]
 *
 * @example
 * buildBreadcrumbs('/move')
 * // Returns: [
 * //   { label: 'Home', href: '/', isCurrent: false },
 * //   { label: 'MOVE', href: '/move', isCurrent: true },
 * // ]
 *
 * @invariant The returned array always has at least 2 items (Home + at least one segment)
 * @invariant The first item always has label "Home" and href "/"
 * @invariant The last item always has isCurrent === true
 * @invariant All other items have isCurrent === false
 * @invariant All items have non-empty labels
 * @invariant Array length equals the number of path segments + 1
 */
export function buildBreadcrumbs(pathname: string): BreadcrumbItem[] {
  // Input validation: ensure pathname starts with "/" and doesn't contain query params or fragments
  if (!pathname.startsWith('/')) {
    throw new Error('pathname must start with "/"');
  }

  if (pathname.includes('?') || pathname.includes('#')) {
    throw new Error('pathname must not contain query parameters ("?") or fragments ("#")');
  }

  // Initialize items array with Home breadcrumb
  const items: BreadcrumbItem[] = [
    {
      label: 'Home',
      href: '/',
      isCurrent: false,
    },
  ];

  // Split pathname into segments and filter out empty strings
  // e.g., "/projects/sunset-villa" → ["projects", "sunset-villa"]
  const segments = pathname.split('/').filter((segment) => segment.length > 0);

  // If pathname is just "/", return only the Home breadcrumb
  if (segments.length === 0) {
    return items;
  }

  // Build breadcrumbs for each segment
  let accumulatedPath = '';

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];

    // Accumulate the path: "/projects", "/projects/sunset-villa", etc.
    accumulatedPath += '/' + segment;

    // Resolve the label using navLinks or slug conversion
    const label = resolveLabel(segment, accumulatedPath);

    // Determine if this is the current (last) item
    const isCurrent = i === segments.length - 1;

    // Create and add the breadcrumb item
    items.push({
      label,
      href: accumulatedPath,
      isCurrent,
    });
  }

  return items;
}
