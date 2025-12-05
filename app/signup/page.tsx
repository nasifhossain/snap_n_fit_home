import Link from 'next/link';
import SignupForm from '@/app/components/SignupForm';

export default function SignUp() {

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--background)' }}>
      {/* Left Side - Signup Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'var(--primary)' }}>
                <svg className="w-6 h-6" style={{ color: 'var(--text-inverse)' }} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Snap & Fit</h1>
            </div>
          </div>

          <div className="card p-8">
            <div className="text-center mb-8">
              <h2 className="text-heading mb-2" style={{ color: 'var(--text-primary)' }}>
                Create your account
              </h2>
              <p className="text-body" style={{ color: 'var(--text-secondary)' }}>
                Start your reading journey with our professional platform
              </p>
            </div>
            
            <SignupForm />
            
            <div className="divider"></div>
            
            <div className="text-center">
              <p className="text-body" style={{ color: 'var(--text-secondary)' }}>
                Already have an account?{' '}
                <Link 
                  href="/login" 
                  className="font-semibold hover:underline"
                  style={{ color: 'var(--primary)' }}
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--status-completed) 0%, var(--primary) 100%)' }}>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h1 className="text-2xl font-bold">Snap & Fit</h1>
            </div>
            <h2 className="text-4xl font-bold mb-4 leading-tight">
              Start your reading journey today
            </h2>
            <p className="text-lg text-white/80 leading-relaxed">
              Join thousands of readers who are already using our platform to manage their reading queues efficiently and track their progress.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <span className="text-white/90">Professional queue management</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <span className="text-white/90">Detailed reading insights</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <span className="text-white/90">Live status updates</span>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-white/10 backdrop-blur"></div>
        <div className="absolute bottom-20 left-32 w-20 h-20 rounded-full bg-white/5 backdrop-blur"></div>
        <div className="absolute top-40 left-40 w-16 h-16 rounded-full bg-white/15 backdrop-blur"></div>
      </div>
    </div>
  );
}