import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SurveySection from "@/components/SurveySection";
import WhatsAppFAB from "@/components/WhatsAppFAB";

// Página directa a la evaluación: es el enlace de la bio y de las publicaciones en redes.
export const metadata: Metadata = {
  title: "Evalúa tu negocio en 2 minutos | Optexa",
  description:
    "Responde 6 preguntas y descubre qué tan organizado está tu negocio. Gratis y con recomendaciones para tu caso.",
};

export default function Diagnostico() {
  return (
    <>
      <header className="bg-[#22092C]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <Link href="/" aria-label="Ir al inicio de Optexa">
            <Image src="/logo-optexa.png" alt="Optexa" width={480} height={122} className="h-8 w-auto" priority />
          </Link>
          <Link href="/" className="text-sm text-white/80 hover:text-white">
            Conoce Optexa →
          </Link>
        </div>
      </header>
      <main>
        <SurveySection />
      </main>
      <WhatsAppFAB />
    </>
  );
}
