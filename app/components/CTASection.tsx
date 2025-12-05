import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="bg-gradient-to-r from-pink-500 via-indigo-600 to-purple-600">
      <div className="mx-auto max-w-7xl py-12 px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Ready to start reading? ✨
          </h2>
          <div className="mt-6 flex items-center justify-center gap-x-4">
            <Link
              href="/signup"
              className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-indigo-600 shadow-lg hover:bg-indigo-50 hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Start Free
            </Link>
            <Link 
              href="/login" 
              className="text-sm font-semibold leading-6 text-white hover:text-indigo-200 transition-colors"
            >
              Sign In <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}