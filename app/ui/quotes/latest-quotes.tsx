import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { lusitana } from '@/app/ui/fonts';
import { fetchLatestQuotes } from '@/app/lib/data';

export default async function LatestQuotes() {
  const latestQuotes = await fetchLatestQuotes();

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Latest Quotes
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          {latestQuotes.map((quote, i) => {
            return (
              <div
                key={quote.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {quote.name}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {quote.email}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <p className="truncate text-sm font-medium md:text-base">
                    {quote.help_with}
                  </p>
                  <p
                    className={clsx(
                      'text-xs',
                      quote.status === 'pending' && 'text-gray-500',
                      quote.status === 'approved' && 'text-blue-500',
                      quote.status === 'completed' && 'text-green-500',
                    )}
                  >
                    {quote.status}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}