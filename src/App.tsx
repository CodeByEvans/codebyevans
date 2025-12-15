import AboutSection from "./components/about-section";
import { CTASection } from "./components/cta-section";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { HeroSection } from "./components/hero-section";
import { ProjectsSection } from "./components/projects-section.js";

import Stack from "./components/stack-section";
import { TestimonialsSection } from "./components/testimonials-section";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ProjectsSection />
        <AboutSection />
        <Stack />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
