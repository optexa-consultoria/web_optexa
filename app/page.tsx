import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import MethodSection from "@/components/MethodSection";
import SolutionSection from "@/components/SolutionSection";
import CasesSection from "@/components/CasesSection";
import SurveySection from "@/components/SurveySection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <MethodSection />
        <SolutionSection />
        <CasesSection />
        <AboutSection />
        <SurveySection />
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}
