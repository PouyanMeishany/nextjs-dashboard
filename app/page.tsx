import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from './ui/fonts';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="flex flex-col items-center gap-8 rounded-2xl bg-white p-12 shadow-2xl">
        <div className="flex items-center justify-center rounded-xl bg-blue-500 p-6 shadow-lg">
          <AcmeLogo />
        </div>
        
        <div className="flex flex-col items-center gap-4">
          <h1 className={`${lusitana.className} text-4xl font-bold text-gray-800 md:text-5xl`}>
            Admin Portal
          </h1>
          <p className="text-center text-gray-600 md:text-lg">
            Welcome back! Please log in to continue.
          </p>
        </div>

        <Link
          href="/login"
          className="group flex items-center gap-3 rounded-lg bg-blue-500 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-blue-600 hover:shadow-xl hover:scale-105 md:text-lg"
        >
          <span>Log in</span> 
          <ArrowRightIcon className="w-5 transition-transform group-hover:translate-x-1 md:w-6" />
        </Link>
      </div>
    </main>
  );
}
