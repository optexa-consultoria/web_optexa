import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import CasesSection from "@/components/CasesSection";
import SurveySection from "@/components/SurveySection";
import AboutSection from "@/components/AboutSection";
import SocialSection from "@/components/SocialSection";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <CasesSection />
        <SurveySection />
        <AboutSection />
        <SocialSection />
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}
