'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MobileNav } from './MobileNav';

const utilityLinks = [
  { label: 'Find a Property', href: '/projects' },
  { label: 'Media', href: '/media' },
  { label: 'Contact', href: '/contact' },
];

const navLinks = [
  { label: 'Projects', href: '/projects' },
  { label: 'MOVE', href: '/projects?filter=MOVE' },
  { label: 'BUILD', href: '/projects?filter=BUILD' },
  { label: 'OWN', href: '/projects?filter=OWN' },
  { label: 'DROP', href: '/projects?filter=DROP' },
  { label: 'Places', href: '/places' },
  { label: 'Media', href: '/media' },
];

export function Navbar(): React.JSX.Element {
  return (
    <>
      {/* ── Desktop Navbar (hidden on mobile) ── */}
      <header className="hidden md:flex flex-col fixed top-0 left-0 right-0 z-50">

        {/* ── Top utility bar ── */}
        <div className="bg-black border-b border-neutral-100 h-8 flex items-center">
          <div className="container-site flex items-center justify-between w-full">
            {/* Right: utility links with dividers */}
            <div className="flex items-center">
              {utilityLinks.map((link, i) => (
                <span key={link.href} className="flex items-center">
                  {i > 0 && <span className="text-neutral-300 mx-3 text-[10px]">|</span>}
                  <Link
                    href={link.href}
                    className="text-[10px] font-medium tracking-[0.12em] uppercase text-neutral-400 hover:text-white transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Main navbar ── */}
        <div className="bg-white/[0.97] backdrop-blur-sm border-b border-neutral-100/80">
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
              <nav className="absolute left-1/2 -translate-x-1/2 flex items-center gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-caption text-neutral-500 hover:text-black transition-colors duration-200 whitespace-nowrap"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Inquire — right */}
              <div className="ml-auto shrink-0">
                <Link
                  href="/contact"
                  className="text-caption border border-black px-5 py-2 hover:bg-black hover:text-white transition-all duration-200"
                >
                  Inquire
                </Link>
              </div>

            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile Navbar (hidden on desktop) ── */}
      <MobileNav />
    </>
  );
}
