// types/domain.d.ts
// The strict domain contract for the entire application.
// All data flowing through this site must conform to these types.

export type PropertyStatus = 'Active' | 'Sold' | 'Pre-Development';

export interface MediaAsset {
  url: string;
  altText: string;
}

export interface Property {
  id: string; // UUID v4
  slug: string;
  title: string;
  location: string;
  price: string; // Formatted string e.g. "$12,500,000"
  status: PropertyStatus;
  specs: {
    sqft: number;
    beds?: number;
    baths?: number;
  };
  heroImage: MediaAsset;
  gallery: MediaAsset[];
  description: string;
  featured?: boolean;
}

export interface SiteContent {
  agencyName: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  contactEmail: string;
}

export interface DatabaseSchema {
  version: string;
  siteContent: SiteContent;
  properties: Property[];
}
