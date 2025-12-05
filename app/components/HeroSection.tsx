'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-6xl lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-center">
          {/* Text Content */}
          <div className="mx-auto max-w-2xl text-center lg:text-left lg:mx-0">
            <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl" role="banner">
              Your Personal{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Reading
              </span>{' '}
              Journey
            </h1>
            <p className="mt-3 text-lg leading-7 text-gray-600 max-w-2xl mx-auto">
              Track, organize, and discover your next favorite book in one beautiful place. Join thousands of readers managing their personal libraries.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/signup"
                className="w-full sm:w-auto rounded-lg bg-indigo-600 px-8 py-3 text-base font-semibold text-white shadow-lg hover:bg-indigo-500 hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                aria-label="Create free account to start tracking your books"
              >
                Get Started Free
              </Link>
              <Link 
                href="/login" 
                className="w-full sm:w-auto text-center px-4 py-2 text-base font-semibold text-gray-900 hover:text-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 rounded-lg"
                aria-label="Sign in to your existing account"
              >
                Sign In <span aria-hidden="true">→</span>
              </Link>
            </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className={`mt-8 lg:mt-0 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative">
              <Image
                src="/images/hero.png"
                alt="Book discovery and reading community illustration"
                width={600}
                height={400}
                className="w-full h-auto rounded-2xl shadow-2xl"
                priority
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-indigo-200 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-purple-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"></div>
      </div>
    </section>
  );
}