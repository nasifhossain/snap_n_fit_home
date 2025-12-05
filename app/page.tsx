import PublicNavbar from "@/app/components/PublicNavbar";
import HeroSection from "@/app/components/HeroSection";
import FeaturesSection from "@/app/components/FeaturesSection";
import FeaturedBooks from "@/app/components/FeaturedBooks";
import CTASection from "@/app/components/CTASection";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <PublicNavbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <FeaturedBooks />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
