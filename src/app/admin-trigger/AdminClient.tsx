'use client';

// app/admin-trigger/AdminClient.tsx
// The Client Component for the Admin CMS portal.
// Receives the current live schema from the Server Component to pre-populate the editor.

import { useState, useTransition } from 'react';
import { updateSiteSchema } from '@/lib/actions/admin-actions';
import type { DatabaseSchema } from '@/types/domain';

interface AdminClientProps {
  initialSchema: DatabaseSchema;
}

export function AdminClient({ initialSchema }: AdminClientProps): React.JSX.Element {
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
          ? '✓ Schema deployed to Edge successfully. All 300+ nodes are now updated.'
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
        <span className="text-caption text-white/20 text-xs">Protected Route</span>
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
