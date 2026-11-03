"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Ear, Search, PenTool, Wrench, RefreshCw } from "lucide-react";

const stages = [
  { icon: Ear, name: "Conocer", desc: "Escuchamos tu negocio: objetivos, clientes, procesos y lo que hoy te quita tiempo." },
  { icon: Search, name: "Diagnosticar", desc: "Analizamos cómo funciona tu operación y priorizamos las mejoras por impacto y viabilidad." },
  { icon: PenTool, name: "Diseñar", desc: "Definimos la solución que se ajusta a tus recursos: proceso, herramientas, datos e indicadores." },
  { icon: Wrench, name: "Implementar", desc: "Ponemos en marcha las mejoras, las probamos contigo y te acompañamos a usarlas." },
  { icon: RefreshCw, name: "Evolucionar", desc: "Medimos resultados, ajustamos y encontramos nuevas oportunidades de mejora." },
];

export default function MethodSection() {
  return (
    <section id="metodo" className="relative overflow-hidden bg-[#22092C] section-padding">
      <Image
        src="/isotipo-crema.png"
        alt=""
        aria-hidden="true"
        width={800}
        height={800}
        className="absolute -left-48 top-10 w-[520px] opacity-[0.03] pointer-events-none select-none"
      />
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#F05941]/15 border border-[#F05941]/30 text-[#F05941] text-sm font-semibold tracking-wide uppercase mb-4">
            Método Optexa
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
            Cinco etapas para{" "}<br className="hidden md:block" />
            <span className="text-gradient">transformar tu negocio</span>
          </h2>
          <p className="mt-4 text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
            No implementamos soluciones sin entender primero tu negocio. Nuestro método,
            inspirado en el ciclo de mejora continua PHVA, integra optimización de procesos
            y tecnología para ayudarte a trabajar mejor.
          </p>
        </motion.div>

        <ol className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {stages.map(({ icon: Icon, name, desc }, i) => (
            <motion.li
              key={name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative glass-card rounded-2xl p-6 border border-white/8"
            >
              <span className="absolute top-4 right-5 text-5xl font-black text-white/5 select-none">
                {i + 1}
              </span>
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#F05941] to-[#BE3144] flex items-center justify-center mb-5">
                <Icon size={20} className="text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{name}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
