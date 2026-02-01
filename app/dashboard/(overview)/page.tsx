import CardWrapper from '@/app/ui/dashboard/cards';
import QuoteChart from '@/app/ui/quotes/quote-chart';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { 
    CardsSkeleton, 
    QuotesChartSkeleton,
    LatestQuotesSkeleton
} from '@/app/ui/skeletons';
import { Metadata } from 'next';
import LatestQuotes from '@/app/ui/quotes/latest-quotes';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Dashboard',
};

export default async function Page() {
    
    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Dashboard
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
               <Suspense fallback={<CardsSkeleton/>}>
                    <CardWrapper />
               </Suspense>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                {/* <RevenueChart revenue={revenue}  /> */}
                <Suspense fallback={<QuotesChartSkeleton/>}>
                    <QuoteChart/>
                </Suspense>
                <Suspense fallback={<LatestQuotesSkeleton/>}>
                    <LatestQuotes/>
                </Suspense>
            </div>
        </main>
    );
}