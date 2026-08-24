'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useCallback } from 'react';
import { MobileNav } from './MobileNav';
import { navLinks } from '@/data/navConfig';
import './Navbar.css';

const utilityLinks = [
  // { label: 'Find a Property', href: '/projects' },
  { label: 'Media', href: '/media' },
  { label: 'Contact', href: '/contact' },
];

export function Navbar(): React.JSX.Element {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseEnter = useCallback((index: number) => {
    setHoveredIndex(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null);
  }, []);

  return (
    <>
      {/* ── Desktop Navbar (hidden on mobile) ── */}
      <header className="hidden md:flex flex-col fixed top-0 left-0 right-0 z-50">

        {/* ── Top utility bar ── */}
        <div className="bg-black border-b border-neutral-100 h-8 flex items-center">
          <div className="container-site flex items-center w-full">
            {/* Right: utility links */}
            <div className="flex items-center ml-auto">
              {utilityLinks.map((link, i) => (
                <span key={link.href} className="flex items-center">
                  {i > 0 && <span className="text-neutral-300 mx-3 text-[11px]">|</span>}
                  <Link
                    href={link.href}
                    className="text-[10px] font-medium tracking-[0.08em] uppercase text-neutral-400 hover:text-white transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Main navbar ── */}
        <div className="navbar__main-bar">
          <div className="container-site">
            <div className="relative flex items-center h-[4.5rem]">

              {/* Logo — left */}
              <Link href="/" className="hover:opacity-60 transition-opacity duration-200 shrink-0">
                <Image
                  src="/logo-black.svg"
                  alt="SITED"
                  width={110}
                  height={22}
                  priority
                  unoptimized
                />
              </Link>

              {/* Nav links — absolute center */}
              <nav
                className="navbar__nav-links"
                onMouseLeave={handleMouseLeave}
              >
                {navLinks.map((link, index) => (
                  <div
                    key={link.href}
                    className="navbar__link-wrapper"
                    onMouseEnter={() => handleMouseEnter(index)}
                  >
                    <Link
                      href={link.href}
                      className={`navbar__link ${hoveredIndex === index ? 'navbar__link--active' : ''}`}
                    >
                      {link.label}
                    </Link>
                  </div>
                ))}
              </nav>

            </div>
          </div>
        </div>

        {/* ── Hover description panel ── */}
        <div
          className={`navbar__hover-panel ${hoveredIndex !== null ? 'navbar__hover-panel--open' : ''}`}
          onMouseEnter={() => {
            if (hoveredIndex !== null) setHoveredIndex(hoveredIndex);
          }}
          onMouseLeave={handleMouseLeave}
        >
          <div className="container-site">
            <div className="navbar__hover-content">
              {hoveredIndex !== null && navLinks[hoveredIndex]?.description && (
                <p className="navbar__hover-description" key={hoveredIndex}>
                  {navLinks[hoveredIndex].description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ── Backdrop overlay ── */}
        <div
          className={`navbar__backdrop ${hoveredIndex !== null ? 'navbar__backdrop--open' : ''}`}
          onMouseEnter={handleMouseLeave}
        />
      </header>

      {/* ── Mobile utility bar (hidden on desktop) ── */}
      <div className="md:hidden bg-black fixed top-0 left-0 right-0 z-50 h-8 flex items-center px-4">
        <div className="flex items-center justify-end w-full">
          {utilityLinks.map((link, i) => (
            <span key={link.href} className="flex items-center">
              {i > 0 && <span className="text-neutral-600 mx-3 text-[11px]">|</span>}
              <Link
                href={link.href}
                className="text-[12px] font-semibold tracking-[0.12em] uppercase text-neutral-400 hover:text-white transition-colors duration-150"
              >
                {link.label}
              </Link>
            </span>
          ))}
        </div>
      </div>

      {/* ── Mobile Navbar (hidden on desktop) ── */}
      <MobileNav />
    </>
  );
}
