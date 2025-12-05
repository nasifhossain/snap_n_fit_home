import Link from 'next/link';

export default function PublicNavbar() {
  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-14 justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Readers</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-3">
            <Link
              href="/login"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              aria-label="Sign in to your account"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              aria-label="Create free account"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}