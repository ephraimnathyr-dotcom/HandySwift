import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { Services } from "../components/Services";
import { HowItWorks } from "../components/HowItWorks";
import { FeaturedProviders } from "../components/FeaturedProviders";
import { PostJobBanner } from "../components/PostJobBanner";
import { SafetyTips } from "../components/SafetyTips";
import { WhyChooseUs } from "../components/WhyChooseUs";
import { Testimonials } from "../components/Testimonials";
import { FinalCTA } from "../components/FinalCTA";
import { Footer } from "../components/Footer";
import { PageTransition } from "../components/PageTransition";

export function LandingPage() {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <Navbar />
        <Hero />
        <div className="space-y-24">
          <HowItWorks />
          <Services />
          <FeaturedProviders />
          <PostJobBanner />
          <SafetyTips />
          <WhyChooseUs />
          <Testimonials />
          <FinalCTA />
        </div>
        <Footer />
      </div>
    </PageTransition>
  );
}