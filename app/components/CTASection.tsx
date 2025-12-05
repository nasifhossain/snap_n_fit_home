import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="bg-gradient-to-r from-pink-500 via-indigo-600 to-purple-600">
      <div className="mx-auto max-w-7xl py-8 px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Ready to start reading? ✨
          </h2>
          <p className="mt-2 text-indigo-100 text-base">Join our community of book lovers today</p>
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/signup"
              className="w-full sm:w-auto rounded-lg bg-white px-6 py-3 text-base font-semibold text-indigo-600 shadow-lg hover:bg-indigo-50 hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
              aria-label="Start your free reading journey"
            >
              Start Free
            </Link>
            <Link 
              href="/login" 
              className="w-full sm:w-auto text-center px-4 py-2 text-base font-semibold text-white hover:text-indigo-200 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 rounded-lg"
              aria-label="Sign in to existing account"
            >
              Sign In <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}