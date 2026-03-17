import type { Metadata } from 'next';
import { getRepository } from '@/lib/repositories';
import { ContactForm } from '@/components/domain/ContactForm';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Mail, MapPin } from 'lucide-react';

export const runtime = 'edge';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Reach out to discuss acquisition opportunities, joint ventures, or investment inquiries with Orgho Development Group.',
};

export default async function ContactPage(): Promise<React.JSX.Element> {
  const repo = getRepository();
  const schema = await repo.getSchema();
  const { agencyName, contactEmail } = schema.siteContent;

  return (
    <section className="py-20 md:py-28">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Left Column — Info */}
          <AnimatedSection className="lg:col-span-2">
            <p className="text-caption text-neutral-400 mb-4">Private Inquiries</p>
            <h1 className="text-display text-3xl md:text-4xl lg:text-5xl text-black mb-8">
              Let&apos;s Begin a Conversation
            </h1>
            <p className="text-neutral-600 text-base leading-relaxed mb-12">
              We work exclusively with qualified investors and high-net-worth individuals seeking
              architecturally significant real estate. All inquiries are handled directly by our
              principals.
            </p>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="border border-neutral-200 p-2.5 mt-0.5">
                  <Mail size={14} className="text-neutral-400" />
                </div>
                <div>
                  <p className="text-caption text-neutral-400 mb-1">Email</p>
                  <a href={`mailto:${contactEmail}`} className="text-sm text-black hover:opacity-60 transition-opacity">
                    {contactEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="border border-neutral-200 p-2.5 mt-0.5">
                  <MapPin size={14} className="text-neutral-400" />
                </div>
                <div>
                  <p className="text-caption text-neutral-400 mb-1">Offices</p>
                  <p className="text-sm text-black">Los Angeles · Santa Barbara</p>
                  <p className="text-xs text-neutral-400 mt-0.5">California, USA</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Right Column — Form */}
          <AnimatedSection delay={0.15} className="lg:col-span-3 border-t lg:border-t-0 lg:border-l border-neutral-100 pt-12 lg:pt-0 lg:pl-16">
            <p className="text-caption text-neutral-400 mb-8">Send an Inquiry</p>
            <ContactForm contactEmail={contactEmail} />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
