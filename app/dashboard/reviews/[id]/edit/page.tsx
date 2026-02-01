import Form from '@/app/ui/reviews/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { notFound } from 'next/navigation';
import { fetchReviewsById } from '@/app/lib/data';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'edit',
}
 
export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const [reviews] = await Promise.all([
        fetchReviewsById(id),
    ]);
  if(!reviews) {
    notFound();
  }
  return (
      <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Reviews', href: '/dashboard/reviews' },
          {
            label: 'Edit Review',
            href: `/dashboard/reviews/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form reviews={reviews}/>
    </main>
  );
}