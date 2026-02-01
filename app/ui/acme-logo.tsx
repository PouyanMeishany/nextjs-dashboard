import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <GlobeAltIcon className="h-12 w-12 flex-shrink-0 md:w-10 md:h-10 wide:h-12 wide:w-12 rotate-[15deg]" />
      <p className="text-[44px] flex-shrink-0 md:hidden wide:block">Admin</p>
    </div>
  );
}
