"use client";

import { motion } from "framer-motion";
import { Zap, Mail, MapPin, ArrowUpRight } from "lucide-react";

const footerLinks = {
  Servicios: [
    { label: "Reingeniería de Procesos", href: "#solucion" },
    { label: "Automatización Inteligente", href: "#solucion" },
    { label: "Datos para Decisiones", href: "#solucion" },
    { label: "Diagnóstico Gratuito", href: "#diagnostico" },
  ],
  Empresa: [
    { label: "Sobre Optexa", href: "#nosotros" },
    { label: "Casos de Éxito", href: "#casos" },
    { label: "Metodología", href: "#solucion" },
    { label: "Redes Sociales", href: "#redes" },
  ],
  Contacto: [
    { label: "contacto@optexa.mx", href: "mailto:contacto@optexa.mx", icon: Mail },
    { label: "Ciudad de México, MX", href: "#", icon: MapPin },
    { label: "WhatsApp", href: "https://wa.me/521XXXXXXXXXX", icon: Zap },
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
              Consultoría boutique B2B especializada en reingeniería de procesos
              y automatización industrial. Engineer the Flow.
            </p>
            <p className="text-[#F05941]/70 text-xs font-semibold tracking-widest uppercase italic mt-2">
              "Engineer the Flow"
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
          <div className="flex items-center gap-6">
            {["Privacidad", "Términos", "Cookies"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-white/20 hover:text-white/50 text-xs transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
