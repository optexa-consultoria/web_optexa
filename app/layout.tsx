import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Optexa Consultoría | Engineer the Flow",
  description:
    "Optexa es una consultoría boutique B2B especializada en reingeniería de procesos y automatización industrial. Eliminamos la fricción operativa y aceleramos tus resultados con metodología Scrum y datos en tiempo real.",
  keywords:
    "reingeniería de procesos, automatización industrial, consultoría B2B, Scrum, Python, Looker, optimización operativa",
  openGraph: {
    title: "Optexa | Engineer the Flow",
    description:
      "Tu operación tiene fricción. Nosotros la eliminamos. Consultoría boutique en reingeniería de procesos y automatización.",
    type: "website",
    locale: "es_MX",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
