import { QuotesStatus } from '@/app/ui/invoices/status';
import { formatDateToLocal } from '@/app/lib/utils';
import { fetchFilteredQuotes } from '@/app/lib/data';
import { DeleteQuote, UpdateQuote } from './buttons';

export default async function QuotesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const quotes = await fetchFilteredQuotes(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {quotes?.map((quote) => (
              <div
                key={quote.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{quote.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{quote.email}</p>
                  </div>
                  <QuotesStatus status={quote.status} /> 
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {quote.address}
                    </p>
                    <p>{formatDateToLocal(quote.created_at)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateQuote id={quote.id} />
                    <DeleteQuote id={quote.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Customer
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  City
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Comment
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {quotes?.map((quote) => (
                <tr
                  key={quote.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{quote.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {quote.email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {quote.city}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {quote.help_with}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(quote.created_at)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <QuotesStatus status={quote.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateQuote id={quote.id} />
                      <DeleteQuote id={quote.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
