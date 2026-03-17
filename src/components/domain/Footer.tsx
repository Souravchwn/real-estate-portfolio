import Link from 'next/link';

interface FooterProps {
  agencyName: string;
  contactEmail: string;
}

export function Footer({ agencyName, contactEmail }: FooterProps): React.JSX.Element {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-100 mt-32">
      <div className="container-site py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div>
            <p className="text-caption tracking-[0.2em] text-black mb-1">{agencyName}</p>
            <p className="text-sm text-neutral-400">Luxury Real Estate Development · California</p>
          </div>

          {/* Links */}
          <nav className="flex flex-col sm:flex-row gap-4 sm:gap-10">
            <Link href="/projects" className="text-caption text-neutral-500 hover:text-black transition-colors">
              Portfolio
            </Link>
            <Link href="/about" className="text-caption text-neutral-500 hover:text-black transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-caption text-neutral-500 hover:text-black transition-colors">
              Contact
            </Link>
            <a
              href={`mailto:${contactEmail}`}
              className="text-caption text-neutral-500 hover:text-black transition-colors"
            >
              {contactEmail}
            </a>
          </nav>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-8 border-t border-neutral-100 flex flex-col sm:flex-row justify-between gap-2">
          <p className="text-xs text-neutral-400">
            © {year} {agencyName}. All rights reserved.
          </p>
          <p className="text-xs text-neutral-300">Edge-native · Built on Cloudflare</p>
        </div>
      </div>
    </footer>
  );
}
