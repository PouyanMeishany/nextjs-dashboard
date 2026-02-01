import { generateYAxisForCount } from "@/app/lib/utils";
import { CalendarIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchQuotesByMonth } from '@/app/lib/data';

export default async function QuoteChart() {
    const quotes = await fetchQuotesByMonth();

    const charHeight = 350;

    const { yAxisLabels, topLabel } = generateYAxisForCount(quotes);

    if (!quotes || quotes.length === 0) {
        return <p className="mt-4 text-gray-400"> No quote data availbale.</p>
    }

    return (
        <div className="w-full md:col-span-4">
            <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Quote Submissions
            </h2>

            <div className="rounded-xl bg-gray-50 p-4">
                <div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
                    <div className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
                    style={{ height: `${charHeight}px` }}
                    >
                        {yAxisLabels.map((label) => (
                            <p key={label}>{label}</p>
                        ))}
                    </div>

                    {quotes.map((monthdata) => (
                        <div key={monthdata.month} className="flex flex-col items-center gap-2">
                            <div className="w-full rounded-md bg-blue-300"
                            style={{
                                height: monthdata.count === 0
                                ? '2px' 
                                :`${(charHeight / topLabel) * monthdata.count}px`,
                                opacity: monthdata.count === 0 ? 0.3 : 1,
                            }}>
                            </div>
                            <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
                                {monthdata.month}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="flex items-center pb-2 pt-6">
                    <CalendarIcon className="h-5 w-5 text-gray-500"/>
                    <h3 className="ml-2 text-sm text-gray-500">Last 12 months</h3>
                </div>
            </div>
        </div>
    );
}