import { Metadata } from 'next';
import PublicNavbar from "@/app/components/PublicNavbar";
import HeroSection from "@/app/components/HeroSection";
import FeaturesSection from "@/app/components/FeaturesSection";
import FeaturedBooks from "@/app/components/FeaturedBooks";
import CTASection from "@/app/components/CTASection";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: 'Readers - Your Personal Reading Journey | Book Tracking & Organization',
  description: 'Track, organize, and discover your next favorite book with Readers. Create your personal reading list, mark progress, and join a community of book lovers. Start free today!',
  keywords: ['reading list', 'book tracker', 'personal library', 'book organization', 'reading progress', 'book discovery'],
  authors: [{ name: 'Readers Team' }],
  openGraph: {
    title: 'Readers - Your Personal Reading Journey',
    description: 'Track, organize, and discover your next favorite book in one beautiful place.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Readers - Your Personal Reading Journey',
    description: 'Track, organize, and discover your next favorite book in one beautiful place.',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <PublicNavbar />
      <main role="main" className="focus:outline-none" tabIndex={-1}>
        <HeroSection />
        <FeaturesSection />
        <FeaturedBooks />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
