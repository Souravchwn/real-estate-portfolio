'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import './MobileNav.css';

/* ── Icon helpers (inline SVG — no extra deps) ── */

function HamburgerIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}



function ChevronRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mobile-drawer__chevron">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

/* ── Data ── */

const primaryLinks = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'MOVE', href: '/projects?filter=MOVE' },
  { label: 'BUILD', href: '/projects?filter=BUILD' },
  { label: 'OWN', href: '/projects?filter=OWN' },
  { label: 'DROP', href: '/projects?filter=DROP' },
  { label: 'Places', href: '/places' },
  { label: 'Media', href: '/media' },
];

const utilLinks = [
  { label: 'Contact Us', href: '/contact' },
  { label: 'Inquire', href: '/contact' },
];

/* ── Component ── */

export function MobileNav(): React.JSX.Element {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  /* lock body scroll when drawer is open */
  useEffect(() => {
    if (open) {
      document.body.classList.add('body--drawer-open');
    } else {
      document.body.classList.remove('body--drawer-open');
    }
    return () => document.body.classList.remove('body--drawer-open');
  }, [open]);

  return (
    <>
      {/* ── Top Bar (visible only on mobile) ── */}
      <div className="mobile-topbar md:hidden" role="banner">
        {/* Left — hamburger */}
        <div className="mobile-topbar__left">
          <button
            className="mobile-topbar__btn"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <HamburgerIcon />
          </button>
        </div>

        {/* Center — full SITED logo with text */}
        <div className="mobile-topbar__center">
          <Link href="/" aria-label="Home">
            <Image
              src="/logo-black.svg"
              alt="SITED"
              width={90}
              height={18}
              priority
              unoptimized
            />
          </Link>
        </div>

        {/* Right — inquire link */}
        <div className="mobile-topbar__right">
          <Link
            href="/contact"
            className="mobile-topbar__inquire"
          >
            Inquire
          </Link>
        </div>
      </div>

      {/* ── Backdrop ── */}
      <div
        className={`mobile-nav-backdrop${open ? ' mobile-nav-backdrop--open' : ''}`}
        onClick={close}
        aria-hidden="true"
      />

      {/* ── Drawer ── */}
      <nav
        className={`mobile-drawer${open ? ' mobile-drawer--open' : ''}`}
        aria-label="Mobile navigation"
      >
        {/* Header — centered logo + close */}
        <div className="mobile-drawer__header">
          <Link href="/" className="mobile-drawer__logo" onClick={close}>
            <Image
              src="/logo-black.svg"
              alt="SITED"
              width={90}
              height={20}
              priority
              unoptimized
            />
          </Link>
          <button className="mobile-drawer__close" onClick={close} aria-label="Close menu">
            <CloseIcon />
          </button>
        </div>

        {/* Primary links */}
        <div className="mobile-drawer__nav">
          {primaryLinks.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              className="mobile-drawer__link"
              onClick={close}
            >
              {link.label}
              <ChevronRight />
            </Link>
          ))}
        </div>

        {/* Utility links */}
        <div className="mobile-drawer__utils">
          {utilLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="mobile-drawer__util-link"
              onClick={close}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
