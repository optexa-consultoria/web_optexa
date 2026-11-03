import Image from "next/image";
import Link from "next/link";

// Plantilla simple para páginas legales (texto largo, fondo claro, buena legibilidad).
export default function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FCFBF5] text-[#22092C]">
      <header className="bg-[#22092C]">
        <div className="max-w-3xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" aria-label="Volver al inicio de Optexa">
            <Image src="/logo-optexa.png" alt="Optexa" width={480} height={122} className="h-8 w-auto" />
          </Link>
          <Link href="/" className="text-sm text-white/80 hover:text-white">
            ← Volver al inicio
          </Link>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-6 py-14">
        <h1 className="text-3xl md:text-4xl font-black mb-2">{title}</h1>
        <p className="text-sm text-[#22092C]/70 mb-10">Última actualización: {updated}</p>
        <div className="space-y-5 leading-relaxed text-[#22092C]/85 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-[#22092C] [&_h2]:mt-10 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1 [&_a]:text-[#BE3144] [&_a]:underline">
          {children}
        </div>
      </main>
    </div>
  );
}
