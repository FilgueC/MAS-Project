import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { HeroSlider } from "../components/HeroSlider";
import { CategorySection } from "../components/CategorySection";
import { SustainabilitySection } from "../components/SustainabilitySection";
import { TrustSection } from "../components/TrustSection";

export function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSlider />
        <TrustSection />
        <CategorySection />
        <SustainabilitySection />
      </main>
      <Footer />
    </div>
  );
}
