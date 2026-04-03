'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import './GlobalLoader.css';

/**
 * GlobalLoader — Minimal full-screen loading overlay with favicon.
 * Fades out once the page has fully loaded.
 */
export function GlobalLoader(): React.JSX.Element {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const dismiss = () => {
      setFadeOut(true);
      setTimeout(() => setVisible(false), 600);
    };

    if (document.readyState === 'complete') {
      // already loaded — small delay so user sees the logo flash
      setTimeout(dismiss, 300);
    } else {
      window.addEventListener('load', () => setTimeout(dismiss, 200));
    }

    // safety timeout — never block longer than 3s
    const safety = setTimeout(dismiss, 3000);
    return () => clearTimeout(safety);
  }, []);

  if (!visible) return <></>;

  return (
    <div className={`global-loader${fadeOut ? ' global-loader--out' : ''}`}>
      {/* Favicon icon */}
      <div className="global-loader__icon-wrap">
        <Image
          src="/favicon.svg"
          alt=""
          width={36}
          height={36}
          priority
          unoptimized
          className="global-loader__icon"
        />
      </div>

      {/* Brand name beneath */}
      <span className="global-loader__brand">SITED</span>
    </div>
  );
}
