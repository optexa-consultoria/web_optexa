import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import MotionProvider from "@/components/MotionProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://web-optexa.vercel.app"),
  title: "Optexa Consultoría | Optimizamos procesos, transformamos negocios",
  description:
    "Consultoría en optimización de procesos y transformación digital para emprendedores y pequeños negocios del Cauca. Organizamos y conectamos la información de tus productos, clientes y ventas con herramientas accesibles.",
  keywords:
    "optimización de procesos, transformación digital, emprendedores, pequeños negocios, Popayán, Timbío, Cauca, Google Sheets, catálogo digital, control de ventas, inventario",
  openGraph: {
    title: "Optexa | Optimizamos procesos, transformamos negocios",
    description:
      "Ayudamos a emprendedores y pequeños negocios a organizar sus productos, clientes y ventas con herramientas digitales accesibles.",
    type: "website",
    locale: "es_CO",
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
        <MotionProvider>{children}</MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}
