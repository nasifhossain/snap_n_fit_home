'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface NavbarProps {
  user?: {
    name: string;
    email: string;
  };
}

export default function Navbar({ user }: NavbarProps) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        router.push('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <nav className="bg-white border-b border-[var(--card-border)] sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[var(--primary)] rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="text-xl font-bold text-[var(--text-primary)]">
              Reading Dashboard
            </span>
          </div>

          {/* User menu */}
          {user && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[var(--primary-light)] rounded-full flex items-center justify-center">
                  <span className="text-[var(--primary)] font-semibold text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="hidden sm:block">
                  <div className="text-sm font-medium text-[var(--text-primary)]">
                    {user.name}
                  </div>
                  <div className="text-xs text-[var(--text-muted)]">
                    {user.email}
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--hover-bg)] rounded-lg transition-colors duration-[var(--animation-fast)] disabled:opacity-50"
              >
                {isLoggingOut ? (
                  <>
                    <svg className="w-4 h-4 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle>
                      <path fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75"></path>
                    </svg>
                    Signing out...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign out
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}