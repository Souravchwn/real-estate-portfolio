'use client';

// app/admin-trigger/AdminClient.tsx
// The Client Component for the Admin CMS portal.
// Has a fullscreen secret-entry gate before showing the CMS editor.

import { useState, useTransition, useRef, useEffect } from 'react';
import { updateSiteSchema, verifyAdminSecret } from '@/lib/actions/admin-actions';
import type { DatabaseSchema } from '@/types/domain';

interface AdminClientProps {
  initialSchema: DatabaseSchema;
}

/* ─────────────────────────────────────────────
   Lock Screen
───────────────────────────────────────────── */
function LockScreen({ onUnlock }: { onUnlock: () => void }) {
  const [secret, setSecret] = useState('');
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!secret.trim()) return;
    setError('');

    startTransition(async () => {
      const ok = await verifyAdminSecret(secret);
      if (ok) {
        onUnlock();
      } else {
        setError('Invalid secret. Access denied.');
        setSecret('');
        inputRef.current?.focus();
      }
    });
  }

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-6">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          background:
            'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(255,255,255,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          border: '1px solid rgba(255,255,255,0.1)',
          background: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(24px)',
          borderRadius: '4px',
          padding: '48px 40px',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
        }}
      >
        {/* Icon */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.15)',
              background: 'rgba(255,255,255,0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
        </div>

        {/* Header */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '10px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.25)', marginBottom: '8px', textTransform: 'uppercase' }}>
            SITED Dev
          </p>
          <h1 style={{ fontSize: '18px', fontWeight: 500, color: 'rgba(255,255,255,0.9)', marginBottom: '8px' }}>
            Admin CMS
          </h1>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.6 }}>
            Enter your admin secret to access the Edge Sync Portal.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ position: 'relative' }}>
            <input
              ref={inputRef}
              id="admin-secret-input"
              type="password"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              placeholder="••••••••••••••••"
              autoComplete="current-password"
              disabled={isPending}
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.05)',
                border: error ? '1px solid rgba(248,113,113,0.6)' : '1px solid rgba(255,255,255,0.12)',
                borderRadius: '3px',
                padding: '12px 16px',
                fontSize: '14px',
                color: 'white',
                outline: 'none',
                fontFamily: 'monospace',
                letterSpacing: '0.08em',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {error && (
            <p style={{ fontSize: '12px', color: 'rgba(248,113,113,0.9)', textAlign: 'center' }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending || !secret.trim()}
            style={{
              background: isPending ? 'rgba(255,255,255,0.5)' : 'white',
              color: 'black',
              border: 'none',
              borderRadius: '3px',
              padding: '12px 24px',
              fontSize: '13px',
              fontWeight: 500,
              cursor: isPending || !secret.trim() ? 'not-allowed' : 'pointer',
              opacity: !secret.trim() ? 0.4 : 1,
              transition: 'opacity 0.2s, background 0.2s',
              letterSpacing: '0.03em',
            }}
          >
            {isPending ? 'Verifying...' : 'Unlock Portal →'}
          </button>
        </form>

        {/* Footer hint */}
        <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)', textAlign: 'center' }}>
          Set <code style={{ background: 'rgba(255,255,255,0.08)', padding: '1px 4px', borderRadius: '2px' }}>ADMIN_SECRET</code> in Cloudflare Dashboard
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CMS Editor
───────────────────────────────────────────── */
function CMSEditor({ initialSchema }: { initialSchema: DatabaseSchema }) {
  const [jsonInput, setJsonInput] = useState(JSON.stringify(initialSchema, null, 2));
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  function handleSubmit(e: React.FormEvent): void {
    e.preventDefault();
    setResult(null);

    startTransition(async () => {
      const res = await updateSiteSchema(jsonInput);
      setResult({
        success: res.success,
        message: res.success
          ? '✓ Schema deployed to Edge successfully. All nodes are now updated.'
          : `✗ ${res.error}`,
      });
    });
  }

  function handleReset(): void {
    setJsonInput(JSON.stringify(initialSchema, null, 2));
    setResult(null);
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-white/10 px-8 py-5 flex items-center justify-between">
        <div>
          <p className="text-caption text-white/30 tracking-[0.2em] mb-0.5">SITED Dev</p>
          <h1 className="text-sm font-medium text-white">Admin CMS — Edge Sync Portal</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '11px',
              color: 'rgba(74,222,128,0.8)',
              background: 'rgba(74,222,128,0.08)',
              border: '1px solid rgba(74,222,128,0.2)',
              borderRadius: '20px',
              padding: '3px 10px',
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(74,222,128,0.8)', display: 'inline-block' }} />
            Authenticated
          </span>
          <span className="text-caption text-white/20 text-xs">Protected Route</span>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-3">
        {/* Instructions Sidebar */}
        <aside className="lg:col-span-1 border-b lg:border-b-0 lg:border-r border-white/10 p-8 space-y-8">
          <div>
            <p className="text-caption text-white/30 mb-3">How This Works</p>
            <ol className="space-y-3 text-sm text-white/50 leading-relaxed list-decimal list-inside">
              <li>The editor is pre-loaded with the <strong>current live data</strong>.</li>
              <li>Edit the <code className="text-white/80 bg-white/10 px-1 rounded text-xs">DatabaseSchema</code> JSON.</li>
              <li>Click <strong className="text-white/80">Deploy to Edge</strong>.</li>
              <li>The Server Action validates the schema, writes to KV, and purges the cache.</li>
            </ol>
          </div>

          <div>
            <p className="text-caption text-white/30 mb-3">Schema Structure</p>
            <pre className="text-xs text-white/40 leading-relaxed overflow-x-auto">
              {`{
  version: string
  siteContent: {
    agencyName
    heroTitle
    heroSubtitle
    aboutText
    contactEmail
  }
  properties: Property[]
  places: Place[]
  media: MediaItem[]
}`}
            </pre>
          </div>

          <button
            onClick={handleReset}
            className="text-caption border border-white/20 px-4 py-2 text-white/50 hover:text-white hover:border-white/50 transition-all text-xs w-full"
          >
            Reset to Current Live Data
          </button>
        </aside>

        {/* Editor Area */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 flex flex-col">
          <div className="flex items-center justify-between px-6 py-3 border-b border-white/10 bg-white/5">
            <p className="text-xs text-white/30 font-mono">database-schema.json</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500/50" />
              <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
              <div className="w-2 h-2 rounded-full bg-green-500/50" />
            </div>
          </div>

          <textarea
            id="admin-json-input"
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            className="flex-1 min-h-[50vh] lg:min-h-0 w-full bg-neutral-900 text-green-400 font-mono text-sm p-6 resize-none focus:outline-none focus:ring-1 focus:ring-white/20"
            spellCheck={false}
          />

          {/* Footer Actions */}
          <div className="border-t border-white/10 px-6 py-4 flex items-center justify-between gap-4 bg-neutral-950">
            {result && (
              <p className={`text-sm font-mono ${result.success ? 'text-green-400' : 'text-red-400'}`}>
                {result.message}
              </p>
            )}
            {!result && <span />}
            <button
              type="submit"
              disabled={isPending || !jsonInput.trim()}
              className="text-caption bg-white text-black px-6 py-2.5 hover:bg-neutral-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {isPending ? 'Deploying...' : 'Deploy to Edge →'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Root Export — manages lock/unlock state
───────────────────────────────────────────── */
export function AdminClient({ initialSchema }: AdminClientProps): React.JSX.Element {
  const [unlocked, setUnlocked] = useState(false);

  if (!unlocked) {
    return <LockScreen onUnlock={() => setUnlocked(true)} />;
  }

  return <CMSEditor initialSchema={initialSchema} />;
}
