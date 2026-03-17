# Meridian Development Group — Premium Real Estate Edge Portfolio

A **high-performance, edge-native** luxury real estate portfolio website for a California development firm. Built on Next.js 16 + Cloudflare Pages/KV/R2 with a California Minimalism design aesthetic.

> Sub-200ms page loads globally · Zero WordPress bloat · Fully managed via JSON

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) + TypeScript (strict) |
| Styling | Tailwind CSS v4 · Framer Motion |
| Hosting | Cloudflare Pages (edge-native) |
| Database | Cloudflare KV (JSON schema store) |
| Media Storage | Cloudflare R2 (4K images & video) |
| Adapter | `@opennextjs/cloudflare` |

---

## Project Structure

```
src/
├── app/
│   ├── (public)/               # All public-facing pages
│   │   ├── page.tsx            # Homepage — cinematic hero
│   │   ├── projects/
│   │   │   ├── page.tsx        # Filterable portfolio grid
│   │   │   └── [slug]/page.tsx # Dynamic property detail
│   │   ├── about/page.tsx
│   │   └── contact/page.tsx
│   ├── admin-trigger/page.tsx  # Admin CMS portal
│   ├── robots.ts               # SEO: disallows /admin-trigger
│   ├── sitemap.ts              # Dynamic sitemap from KV data
│   └── globals.css             # California Minimalism design system
├── components/
│   ├── ui/                     # Generic: Button, Input, StatusBadge, AnimatedSection
│   └── domain/                 # Real-estate: Navbar, Footer, PropertyCard, ContactForm
├── lib/
│   ├── repositories/
│   │   ├── interfaces.ts       # IDatabaseRepository contract
│   │   ├── kv-repository.ts    # Production: Cloudflare KV
│   │   ├── local-repository.ts # Dev / disaster-recovery fallback
│   │   └── index.ts            # Factory
│   ├── actions/
│   │   ├── admin-actions.ts    # CMS: validate + write to KV + revalidate edge cache
│   │   └── contact-actions.ts  # Inquiry form handler
│   └── utils.ts
├── types/domain.d.ts           # Strict TypeScript domain contracts
├── data/seed.json              # Sample properties for local dev
└── proxy.ts                    # Edge auth guard for /admin-trigger
```

---

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The site runs on the **local JSON repository** (`src/data/seed.json`) — no Cloudflare account needed for development.

---

## Cloudflare Deployment (First-Time Setup)

### 1. Create Infrastructure

```bash
# KV Namespace (the JSON database)
npx wrangler kv namespace create MY_CMS_DATA

# R2 Bucket (images & videos)
npx wrangler r2 bucket create real-estate-assets
```

### 2. Update `wrangler.jsonc`

Paste the KV namespace ID returned by the command above:

```jsonc
"kv_namespaces": [
  {
    "binding": "MY_CMS_DATA",
    "id": "PASTE_YOUR_KV_NAMESPACE_ID_HERE"  // ← replace this
  }
]
```

### 3. Set the Admin Secret

```bash
npx wrangler secret put ADMIN_SECRET
# Enter a strong random string when prompted (e.g. a UUID)
```

### 4. Seed the KV Store

Go to your **Cloudflare Dashboard → KV → your namespace → Add entry**:
- **Key:** `site-schema-v1`
- **Value:** paste the contents of `src/data/seed.json`

Or use the Wrangler CLI:
```bash
npx wrangler kv key put --namespace-id=<YOUR_KV_ID> "site-schema-v1" --path src/data/seed.json
```

### 5. Deploy

```bash
npm run deploy
```

---

## Admin CMS — Updating Site Content

The entire website is controlled by a single JSON object stored in Cloudflare KV. To update properties, prices, status, or site content — you edit and deploy this JSON.

### How to Access

Navigate to:
```
https://yourdomain.com/admin-trigger
```

> **Local dev:** No password required (the admin secret check is skipped for `dev-secret-change-me`).  
> **Production:** Pass the secret as a header: `x-admin-secret: your-secret` or query param `?secret=your-secret`.

### Step-by-Step: Update a Property

1. Open `/admin-trigger` in your browser
2. Click **"Load Example Schema"** to populate the editor (or paste your existing schema)
3. Edit the JSON — update a price, change a status, add a new property, etc.
4. Click **"Deploy to Edge"**
5. The Server Action will:
   - ✅ Parse and validate the JSON schema
   - ✅ Write to Cloudflare KV
   - ✅ Call `revalidatePath('/', 'layout')` to purge all 300+ global edge caches instantly
6. Your changes are live worldwide within seconds

### JSON Schema Reference

```json
{
  "version": "1.0",
  "siteContent": {
    "agencyName": "Your Firm Name",
    "heroTitle": "Your Hero Headline",
    "heroSubtitle": "Your subheadline copy",
    "aboutText": "Your about/story paragraph",
    "contactEmail": "acquisitions@yourfirm.com"
  },
  "properties": [
    {
      "id": "uuid-v4",
      "slug": "property-url-slug",
      "title": "Property Name",
      "location": "City, California",
      "price": "$12,500,000",
      "status": "Active",
      "featured": true,
      "specs": {
        "sqft": 8200,
        "beds": 6,
        "baths": 7
      },
      "heroImage": {
        "url": "https://your-r2-domain.com/property-hero.jpg",
        "altText": "Description of the image"
      },
      "gallery": [
        { "url": "https://your-r2-domain.com/img1.jpg", "altText": "Room description" },
        { "url": "https://your-r2-domain.com/img2.jpg", "altText": "Room description" }
      ],
      "description": "Full property description paragraph."
    }
  ]
}
```

### Property Status Values

| Status | Badge Color | Use When |
|---|---|---|
| `"Active"` | 🟢 Green | Currently for sale |
| `"Sold"` | ⚫ Gray | Completed sale (show as portfolio proof) |
| `"Pre-Development"` | 🟡 Amber | In entitlement / design phase |

### Featured Properties

Set `"featured": true` on up to 3 properties to show them in the **Homepage hero grid**.

---

## Uploading Media to R2

### Using the Cloudflare Dashboard

1. Go to **Cloudflare Dashboard → R2 → real-estate-assets**
2. Click **Upload**
3. Upload your images/videos
4. Copy the public URL (format: `https://pub-<hash>.r2.dev/filename.jpg`)
5. Paste that URL into the `heroImage.url` or `gallery[].url` fields in your admin JSON

### Using Wrangler CLI

```bash
# Upload a single file
npx wrangler r2 object put real-estate-assets/malibu-hero.jpg --file ./path/to/malibu-hero.jpg

# The public URL will be:
# https://pub-<your-account-hash>.r2.dev/malibu-hero.jpg
```

### Recommended Image Specs

| Asset | Size | Format |
|---|---|---|
| Hero Image | 2400 × 1600px | JPEG (85% quality) or WebP |
| Gallery Images | 1200 × 900px | JPEG (80% quality) or WebP |
| Property Card | 800 × 600px | JPEG (80% quality) |
| Videos | 4K (3840×2160) | MP4 (H.264) |

> R2 serves all media from Cloudflare's global CDN with zero egress fees.

---

## Adding the Contact Form Email (SendGrid / Postmark)

The contact form is stubbed in `src/lib/actions/contact-actions.ts`. To enable live emails:

### SendGrid

```bash
npx wrangler secret put SENDGRID_API_KEY
```

Then in `src/lib/actions/contact-actions.ts`, replace the `console.log` with:

```typescript
await fetch('https://api.sendgrid.com/v3/mail/send', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    personalizations: [{ to: [{ email: 'acquisitions@yourfirm.com' }] }],
    from: { email: 'noreply@yourfirm.com' },
    subject: `New inquiry from ${name}`,
    content: [{ type: 'text/plain', value: `Name: ${name}\nEmail: ${email}\n\n${message}` }],
  }),
});
```

---

## Disaster Recovery

If Cloudflare has an outage, switch the repository to the local JSON fallback in under 15 minutes:

1. Open `src/lib/repositories/index.ts`
2. The `LocalJsonRepository` is already imported — it serves from `src/data/seed.json`
3. Ensure `seed.json` contains your latest exported schema
4. Redeploy: `npm run deploy`

**RTO (Recovery Time Objective): ~15 minutes** per PRD §7.

---

## Maintenance — Weekly KV Backup

Export your live KV schema to the `/backups` directory:

```bash
npx wrangler kv key get --namespace-id=<YOUR_KV_ID> "site-schema-v1" > backups/schema-$(Get-Date -Format 'yyyy-MM-dd').json
```

---

## Environment Variables Reference

| Variable | Where | Purpose |
|---|---|---|
| `MY_CMS_DATA` | `wrangler.jsonc` KV binding | The JSON database namespace |
| `ASSET_BUCKET` | `wrangler.jsonc` R2 binding | Media storage bucket |
| `ADMIN_SECRET` | Cloudflare secret | Guards `/admin-trigger` |
| `SENDGRID_API_KEY` | Cloudflare secret | Contact form emails (optional) |

---

## Commands

```bash
npm run dev        # Local development (localhost:3000)
npm run build      # TypeScript + edge compatibility check
npm run preview    # Run on local Cloudflare runtime (wrangler)
npm run deploy     # Build + deploy to Cloudflare Pages
npm run cf-typegen # Regenerate Cloudflare env types
```

---

## Links

- [OpenNext Cloudflare Docs](https://opennext.js.org/cloudflare)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Cloudflare KV](https://developers.cloudflare.com/kv/)
- [Cloudflare R2](https://developers.cloudflare.com/r2/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)
