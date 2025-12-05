import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-slate-100 to-blue-50 border-t border-blue-200">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Readers</span>
            </Link>
            <p className="text-sm leading-6 text-gray-600">
              Your personal reading companion. Track, organize, and discover your next favorite book.
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-900">Platform</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link href="/signup" className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                      Get Started
                    </Link>
                  </li>
                  <li>
                    <Link href="/login" className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                      Sign In
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
          <div className="text-center">
            <p className="text-xs leading-5 text-gray-500">
              &copy; 2025 Readers. Built for book enthusiasts everywhere.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}