"use client";

import { motion } from "framer-motion";
import { Zap, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { EMAIL, CITY, waLink } from "@/lib/site";

const footerLinks = {
  Servicios: [
    { label: "Diagnóstico Express", href: "#servicios" },
    { label: "Paquete Emprendedor", href: "#servicios" },
    { label: "Negocio en Crecimiento", href: "#servicios" },
    { label: "Negocio Inteligente", href: "#servicios" },
  ],
  Empresa: [
    { label: "Sobre Optexa", href: "#nosotros" },
    { label: "Método Optexa", href: "#metodo" },
    { label: "Casos", href: "#casos" },
    { label: "Evalúa tu negocio", href: "#diagnostico" },
  ],
  Contacto: [
    { label: EMAIL, href: `mailto:${EMAIL}`, icon: Mail },
    { label: CITY, href: "#", icon: MapPin },
    { label: "WhatsApp +57 318 381 7518", href: waLink("Hola Optexa, quiero más información."), icon: Zap },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#1a0722] border-t border-white/6">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 mb-14"
        >
          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <a href="#" className="flex items-center gap-2 w-fit">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#F05941] to-[#BE3144] flex items-center justify-center">
                <Zap size={18} className="text-white" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">
                opt<span className="text-[#F05941]">exa</span>
              </span>
            </a>
            <p className="text-white/35 text-sm leading-relaxed max-w-xs">
              Optimizamos procesos, transformamos negocios. Consultoría en
              optimización de procesos y transformación digital para emprendedores
              y pequeños negocios.
            </p>
            <p className="text-[#F05941]/70 text-xs font-semibold tracking-widest uppercase italic mt-2">
              Engineer the flow
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="flex flex-col gap-4">
              <h4 className="text-white/70 text-xs font-bold tracking-widest uppercase">
                {title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/35 hover:text-white text-sm transition-colors duration-200 flex items-center gap-1.5 group"
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      {link.label}
                      {link.href.startsWith("http") && (
                        <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* Bottom bar */}
        <div className="border-t border-white/6 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs">
            © {new Date().getFullYear()} Optexa Consultoría. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
