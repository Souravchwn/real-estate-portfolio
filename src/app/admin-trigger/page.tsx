import { getRepository } from '@/lib/repositories';
import { AdminClient } from './AdminClient';



export default async function AdminTriggerPage(): Promise<React.JSX.Element> {
  const repo = getRepository();
  const schema = await repo.getSchema();

  return <AdminClient initialSchema={schema} />;
}
