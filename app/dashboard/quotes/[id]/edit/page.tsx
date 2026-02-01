import Form from '@/app/ui/quotes/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { notFound } from 'next/navigation';
import { fetchQuotes, fetchQuotesById } from '@/app/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'edit',
}
 
export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const [quotes] = await Promise.all([
        fetchQuotesById(id),
    ]);
  if(!quotes) {
    notFound();
  }
  return (
      <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Quotes', href: '/dashboard/quotes' },
          {
            label: 'Edit Quote',
            href: `/dashboard/quotes/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form quote={quotes}/>
    </main>
  );
}