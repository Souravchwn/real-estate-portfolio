import type { Metadata } from 'next';
import { getRepository } from '@/lib/repositories';
import { ContactForm } from '@/components/domain/ContactForm';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Users, Building2, Handshake } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Reach out to discuss acquisition opportunities, joint ventures, or investment inquiries with SITED Development Group.',
};

export default async function ContactPage(): Promise<React.JSX.Element> {
  const repo = getRepository();
  const schema = await repo.getSchema();
  const { contactEmail } = schema.siteContent;

  const FEATURES = [
    {
      icon: Users,
      title: 'PEOPLE FIRST',
      description: 'We invest in people, neighborhoods, and the future.',
    },
    {
      icon: Building2,
      title: 'STRONGER COMMUNITIES',
      description: 'Every project is an opportunity to create lasting impact.',
    },
    {
      icon: Handshake,
      title: 'BUILT TOGETHER',
      description: 'We collaborate with partners who share our mission and values.',
    },
  ];

  return (
    <section className="py-20 md:py-28">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Left Column — Info */}
          <AnimatedSection className="lg:col-span-2">
            <p className="text-sm font-bold tracking-[0.2em] uppercase mb-4" style={{ color: '#B8953F' }}>
              LET&apos;S CONNECT
            </p>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-black mb-6 leading-[1.08] font-bold">
              Let&apos;s Build
              <br />
              What Matters.
            </h1>

            {/* Gold rule */}
            <div className="mb-6" style={{ width: 56, height: 2, background: '#B8953F' }} />

            <p className="text-neutral-700 text-base md:text-lg leading-relaxed mb-10 font-medium">
              We bring together the right partners, capital, and opportunities to create real estate that
              strengthens communities and expands opportunity.
            </p>

            {/* 3 Feature Items */}
            <div className="space-y-6">
              {FEATURES.map((item, index) => {
                const IconComponent = item.icon;
                const isLast = index === FEATURES.length - 1;
                return (
                  <div
                    key={item.title}
                    className={`flex items-start gap-5 ${!isLast ? 'border-b border-neutral-100 pb-6' : ''}`}
                  >
                    {/* Circle Icon Badge */}
                    <div
                      className="w-13 h-13 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: '#F4EFE6' }}
                    >
                      <IconComponent size={22} style={{ color: '#B8953F' }} />
                    </div>

                    <div>
                      <p className="text-sm font-bold tracking-[0.12em] uppercase text-black mb-1">
                        {item.title}
                      </p>
                      <p className="text-neutral-600 text-sm md:text-base font-medium leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </AnimatedSection>

          {/* Right Column — Form */}
          <AnimatedSection delay={0.15} className="lg:col-span-3 border-t lg:border-t-0 lg:border-l border-neutral-100 pt-12 lg:pt-0 lg:pl-16">
            <p className="text-sm font-bold tracking-[0.2em] uppercase mb-8" style={{ color: '#B8953F' }}>
              Send an Inquiry
            </p>
            <ContactForm contactEmail={contactEmail} />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
