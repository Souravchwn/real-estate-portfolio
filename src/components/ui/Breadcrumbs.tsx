'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { buildBreadcrumbs } from '@/lib/breadcrumbs';

/**
 * BackButton Component
 *
 * A simple button that navigates to the previous page using browser history.
 * Uses the Next.js useRouter hook to access router.back().
 *
 * @returns A button element with "← Back" label
 */
function BackButton(): React.JSX.Element {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="breadcrumb-back"
      aria-label="Go back to previous page"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="15 18 9 12 15 6" />
      </svg>
      Back
    </button>
  );
}

/**
 * Breadcrumbs Component
 *
 * Renders a breadcrumb navigation trail for the current route, automatically
 * constructed from the pathname. Returns null on the homepage ("/").
 *
 * The component reads the current pathname via usePathname(), builds breadcrumb
 * items using buildBreadcrumbs(), and renders them as an ordered list with
 * "/" separators. All items except the last are rendered as clickable links;
 * the last item (current page) is rendered as a non-interactive span with
 * aria-current="page".
 *
 * A "← Back" button is rendered alongside the breadcrumb trail for quick
 * navigation to the previous page.
 *
 * @returns A nav element containing the breadcrumb trail and back button, or null on homepage
 *
 * @example
 * // On route /projects/sunset-villa
 * // Renders: ← Back | Home / Projects / Sunset Villa
 *
 * @example
 * // On route /
 * // Returns: null (renders nothing)
 */
export function Breadcrumbs(): React.JSX.Element | null {
  const pathname = usePathname();

  // Guard: return null on homepage
  if (!pathname || pathname === '/') {
    return null;
  }

  // Strip query parameters and fragments (safety guard)
  const cleanPath = pathname.split('?')[0].split('#')[0];

  // Guard: if clean path is still "/", return null
  if (cleanPath === '/') {
    return null;
  }

  // Build breadcrumb items
  const items = buildBreadcrumbs(cleanPath);

  return (
    <nav aria-label="Breadcrumb" className="breadcrumb-bar">
      <div className="container-site breadcrumb-inner">
        {/* Back Button */}
        <BackButton />

        {/* Separator between back button and trail */}
        <span className="breadcrumb-divider" aria-hidden="true">|</span>

        {/* Breadcrumb Trail */}
        <ol className="breadcrumb-trail">
          {items.map((item) => (
            <li key={item.href} className="breadcrumb-item">
              {item.isCurrent ? (
                // Last item: non-interactive span with aria-current="page"
                <span className="breadcrumb-current" aria-current="page">
                  {item.label}
                </span>
              ) : (
                // All other items: clickable links
                <>
                  <Link href={item.href} className="breadcrumb-link">
                    {item.label}
                  </Link>
                  <span className="breadcrumb-sep" aria-hidden="true">/</span>
                </>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
