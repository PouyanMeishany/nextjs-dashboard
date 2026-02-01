import { ReviewStatus } from '@/app/ui/invoices/status';
import { UpdateReview } from '@/app/ui/reviews/buttons';
import { fetchFilteredReviews } from '@/app/lib/data';

export default async function CustomersTable({
  query,
  currentPage,
}: {
  query: string,
  currentPage: number;
}) {

  const reviews = await fetchFilteredReviews(query, currentPage);
  return (
    <div className="w-full">
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <div className="wide:hidden">
                {reviews?.map((review) => (
                  <div
                    key={review.id}
                    className="mb-2 w-full rounded-md bg-white p-4"
                  >
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <div className="mb-2 flex items-center">
                          <div className="flex items-center gap-3">
                           
                            <p>{review.name}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">
                          {review.city}
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-between border-b py-5">
                      <div className="flex w-1/2 flex-col">
                        <p className="font-medium">{review.review_text}</p>
                      </div>
                      <div className="flex w-1/2 items-center flex-col">
                        <p className="text-xs">Rating</p>
                        <p className="font-medium">{review.rating}</p>
                      </div>
                    </div>
                    <div className='flex w-full items-center justify-between border-b py-5'>
                      <div className="text-xl font-medium">
                        <ReviewStatus status = {review.status}/>                
                      </div>
                      <div className='flex justify-end gap-2'>
                        <UpdateReview id={review.id}/>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <table className="hidden min-w-full rounded-md text-gray-900 wide:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      City
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Review Text
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Rating
                    </th>
                    <th scope="col" className="px-4 py-5 font-medium">
                      Status
                    </th>
                    <th scope="col" className="relative py-3 pl-6 pr-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {reviews.map((review) => (
                    <tr key={review.id} className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        <div className="flex items-center gap-3">
                          <p>{review.name}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {review.city}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {review.review_text}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {review.rating}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                        <ReviewStatus status = {review.status}/>
                      </td>
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                          <div className="flex justify-end gap-3">
                            <UpdateReview id={review.id} />                   
                          </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
