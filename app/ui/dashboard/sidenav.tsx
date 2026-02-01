import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 md:bg-gray-50 md:w-20 wide:w-64 wide:bg-gray-50">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-20 md:items-center md:justify-center wide:h-40 wide:items-start wide:justify-start"
        href="/"
      >
        <div className="w-32 h-12 text-white md:flex md:w-12 md:h-12 md:items-center md:justify-center wide:w-40">
          <AcmeLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-7 md:justify-center md:items-center wide:justify-start wide:items-start wide:space-y-0">
        <NavLinks />
        <div className="hidden h-full w-full grow rounded-md bg-gray-50 md:block"></div>
        <form className='wide:w-full'
          action={async () => {
            'use server';
              await signOut({ redirectTo: '/' });
          }}>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:justify-center md:items-center md:p-2 md:px-3 wide:justify-start wide:gap-3 wide:flex-none">
            <PowerIcon className="w-6" />
            <div className="hidden wide:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
