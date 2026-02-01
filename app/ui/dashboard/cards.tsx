import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';

const iconMap = {
  completed: BanknotesIcon,
  reviews: UserGroupIcon,
  pending: ClockIcon,
  quotes: InboxIcon,
};

export default async function CardWrapper() {

  const {
    numberOfReviews,
    numberOfQuotes,
    totalCompletedQuotes,
    totalPendingQuotes,
  } = await fetchCardData();

  return (
    <>
      {/* NOTE: Uncomment this code in Chapter 9 */}

      <Card title="Completed quotes" value={totalCompletedQuotes} type="completed" />
      <Card title="Pending quotes" value={totalPendingQuotes} type="pending" />
      <Card title="Total Quotes" value={numberOfQuotes} type="quotes" />
      <Card
        title="Total Reviews"
        value={numberOfReviews}
        type="reviews"
      />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'quotes' | 'reviews' | 'pending' | 'completed';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
