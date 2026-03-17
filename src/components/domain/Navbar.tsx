'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Portfolio', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function Navbar(): React.JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-100">
      <div className="container-site">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="text-caption tracking-[0.2em] text-black hover:opacity-60 transition-opacity"
          >
            Meridian<span className="text-neutral-400"> · </span>Dev Group
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-caption text-neutral-500 hover:text-black transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="text-caption border border-black px-5 py-2 hover:bg-black hover:text-white transition-all duration-200"
            >
              Inquire
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 -mr-2"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={cn(
          'md:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-neutral-100',
          menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <nav className="container-site py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-caption text-neutral-500 hover:text-black transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="text-caption border border-black px-5 py-3 text-center hover:bg-black hover:text-white transition-all duration-200"
          >
            Inquire
          </Link>
        </nav>
      </div>
    </header>
  );
}
