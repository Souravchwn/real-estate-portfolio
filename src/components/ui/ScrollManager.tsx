'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

/**
 * ScrollManager Component
 * 
 * Manages scroll restoration and page transition scroll behavior:
 * - On forward tab / page navigation: scrolls to the top of the page (0, 0).
 * - On back button navigation (popstate / router.back()): restores the exact scroll position where the user was previously on that page.
 */
export function ScrollManager(): null {
  const pathname = usePathname();
  const isPopState = useRef(false);

  useEffect(() => {
    // Enable manual scroll restoration to prevent browser / Next.js default scroll conflicts
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const handlePopState = () => {
      isPopState.current = true;
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Save scroll position continuously per pathname
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      if (pathname) {
        sessionStorage.setItem(`scroll_pos_${pathname}`, window.scrollY.toString());
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  // Handle route change scroll behavior
  useEffect(() => {
    if (!pathname || typeof window === 'undefined') return;

    if (isPopState.current) {
      // Back button triggered -> restore scroll position
      isPopState.current = false;
      const savedPos = sessionStorage.getItem(`scroll_pos_${pathname}`);
      const targetY = savedPos ? parseInt(savedPos, 10) : 0;

      // Small frame delay to allow Next.js route component mounting
      const timer = setTimeout(() => {
        window.scrollTo({ top: targetY, left: 0, behavior: 'instant' as ScrollBehavior });
      }, 20);

      return () => clearTimeout(timer);
    } else {
      // Forward tab / link click -> scroll to top
      const timer = setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      }, 20);

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return null;
}
