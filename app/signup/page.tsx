import Link from 'next/link';
import SignupForm from '@/app/components/SignupForm';

export default function SignUp() {

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Back to Home Link */}
      <Link 
        href="/" 
        className="absolute top-6 left-6 text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Home
      </Link>
      
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-block mb-4 hover:opacity-80 transition-opacity">
            <h1 className="text-3xl font-bold text-gray-900">Readers</h1>
          </Link>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Create your account
          </h2>
          <p className="text-gray-600">
            Start organizing your reading list and discover new books
          </p>
        </div>

        {/* Signup Form */}
        <div className="bg-white py-8 px-6 shadow-sm rounded-lg border border-gray-200">
          <SignupForm />
          
          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link 
                href="/login" 
                className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}