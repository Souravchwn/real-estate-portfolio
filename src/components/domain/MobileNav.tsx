'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { navLinks } from '@/data/navConfig';
// @ts-ignore: CSS side-effect import without module declarations
import './MobileNav.css';

function HamburgerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <line x1="3" y1="7" x2="21" y2="7" />
      <line x1="3" y1="17" x2="21" y2="17" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function ArrowUpRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

const GOLD = '#B8953F';

const primaryNav = [
  { label: 'Home', href: '/' },
  ...navLinks,
];

const secondaryNav = [
  { label: 'Media & News', href: '/media' },
  { label: 'Contact Us', href: '/contact' },
];

export function MobileNav(): React.JSX.Element {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

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
        {/* Left — hamburger button */}
        <div className="mobile-topbar__left">
          <button
            className="mobile-topbar__btn"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <HamburgerIcon />
            <span className="text-[11px] font-medium tracking-[0.14em] uppercase ml-2 text-black">
              Menu
            </span>
          </button>
        </div>

        {/* Center — SITED logo */}
        <div className="mobile-topbar__center">
          <Link href="/" aria-label="Home" onClick={close}>
            <Image
              src="/logo-black.svg"
              alt="SITED"
              width={84}
              height={17}
              priority
              unoptimized
            />
          </Link>
        </div>

        {/* Right — Contact button */}
        {/* <div className="mobile-topbar__right">
          <Link
            href="/contact"
            className="text-[10px] font-semibold tracking-[0.12em] uppercase border border-black/80 px-2.5 py-1 text-black hover:bg-black hover:text-white transition-all duration-200"
          >
            Contact
          </Link>
        </div> */}
      </div>

      {/* ── Backdrop ── */}
      <div
        className={`mobile-nav-backdrop${open ? ' mobile-nav-backdrop--open' : ''}`}
        onClick={close}
        aria-hidden="true"
      />

      {/* ── Matte Dark Luxury Drawer ── */}
      <nav
        className={`mobile-drawer${open ? ' mobile-drawer--open' : ''}`}
        aria-label="Mobile navigation"
      >
        {/* Header — logo white + close */}
        <div className="mobile-drawer__header">
          <Link href="/" className="mobile-drawer__logo" onClick={close}>
            <Image
              src="/logo-white.svg"
              alt="SITED"
              width={88}
              height={18}
              priority
              unoptimized
            />
          </Link>
          <button className="mobile-drawer__close" onClick={close} aria-label="Close menu">
            <CloseIcon />
          </button>
        </div>

        {/* Drawer body */}
        <div className="mobile-drawer__body">
          {/* Main Navigation */}
          <div className="px-6 pt-6 pb-2">
            <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-neutral-500 mb-4">
              Navigation
            </p>
            <div className="flex flex-col gap-1">
              {primaryNav.map((link, i) => (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  className="mobile-drawer__nav-item group"
                  onClick={close}
                >
                  <span className="text-[11px] font-mono text-[#B8953F] mr-3">
                    0{i + 1}
                  </span>
                  <span className="text-[14px] font-medium tracking-[0.08em] uppercase text-white group-hover:text-[#B8953F] transition-colors">
                    {link.label}
                  </span>
                  <span className="ml-auto text-neutral-500 group-hover:text-white transition-colors">
                    <ArrowUpRight />
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Gold Accent Divider */}
          <div className="px-6 py-4">
            <div style={{ width: 32, height: 2, background: GOLD }} />
          </div>

          {/* Secondary / Utility Links */}
          <div className="px-6 pb-6">
            <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-neutral-500 mb-3">
              Explore
            </p>
            <div className="flex flex-col gap-2.5">
              {secondaryNav.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[13px] font-medium tracking-[0.05em] text-neutral-400 hover:text-white transition-colors flex items-center justify-between py-1"
                  onClick={close}
                >
                  <span>{link.label}</span>
                  <ArrowUpRight />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="mobile-drawer__footer">
          <p className="text-[9px] font-semibold tracking-[0.22em] uppercase text-neutral-500">
            SITED DEVELOPMENT GROUP — CALIFORNIA
          </p>
        </div>
      </nav>
    </>
  );
}
