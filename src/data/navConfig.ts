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
 * Represents a single navigation link with a label, href, and optional description.
 *
 * @interface NavLink
 * @property {string} label - The human-readable label for the navigation link
 * @property {string} href - The URL path for the navigation link, always starting with "/" and lowercase
 * @property {string} [description] - Optional hover description shown on hover
 */
export interface NavLink {
  label: string;
  href: string;
  description?: string;
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
  {
    label: "What's Taking Shape",
    href: '/projects',
    description: 'Projects, ideas, and systems in motion.',
  },
  {
    label: 'Move',
    href: '/move',
    description: 'Step into the movement.',
  },
  {
    label: 'Join',
    href: '/build',
    description: 'Be part of what gets built.',
  },
  {
    label: 'Signal',
    href: '/drop',
    description: 'Follow updates, momentum, and activity in real time.',
  },
  {
    label: 'Built By',
    href: '/places',
    description: 'The people, partners, and vision behind the movement.',
  },
];
