import type { Metadata } from 'next';
import { getRepository } from '@/lib/repositories';
import { Navbar } from '@/components/domain/Navbar';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Footer } from '@/components/domain/Footer';


export async function generateMetadata(): Promise<Metadata> {
  try {
    const repo = getRepository();
    const schema = await repo.getSchema();
    return { title: { template: `%s | ${schema.siteContent.agencyName}`, default: schema.siteContent.agencyName } };
  } catch {
    return {};
  }
}

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<React.JSX.Element> {
  const repo = getRepository();
  const schema = await repo.getSchema();
  const { agencyName, contactEmail } = schema.siteContent;

  return (
    <>
      <Navbar />
      <main className="pt-[5.5rem] md:pt-[6.5rem]">
        <Breadcrumbs />
        {children}
      </main>
      <Footer agencyName={agencyName} contactEmail={contactEmail} />
    </>
  );
}
