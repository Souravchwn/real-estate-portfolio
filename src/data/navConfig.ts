/**
 * Shared navigation configuration for the SITED Development Group application.
 *
 * This file serves as the single source of truth for navigation link labels and hrefs,
 * used across multiple components including Navbar, MobileNav, and Breadcrumbs.
 * By centralizing this configuration, we avoid duplication and ensure consistency
 * across the application.
 *
 * @module navConfig
 */

/**
 * Represents a single navigation link with a label and href.
 *
 * @interface NavLink
 * @property {string} label - The human-readable label for the navigation link (e.g., "Projects", "MOVE")
 * @property {string} href - The URL path for the navigation link, always starting with "/" and lowercase
 */
export interface NavLink {
  label: string;
  href: string;
}

/**
 * Array of primary navigation links for the application.
 *
 * This array contains all main navigation destinations and is used by:
 * - Navbar component for rendering top navigation
 * - MobileNav component for rendering mobile navigation
 * - Breadcrumbs component for resolving breadcrumb labels
 *
 * All hrefs are lowercase and start with "/" for consistency.
 *
 * @type {NavLink[]}
 */
export const navLinks: NavLink[] = [
  { label: 'Projects', href: '/projects' },
  { label: 'MOVE', href: '/move' },
  { label: 'BUILD', href: '/build' },
  { label: 'OWN', href: '/own' },
  { label: 'DROP', href: '/drop' },
  { label: 'Places', href: '/places' },
];
