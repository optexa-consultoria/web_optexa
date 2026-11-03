"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Sprout, TrendingUp, Cpu, Check, ArrowRight, Building2, Search } from "lucide-react";
import { waLink } from "@/lib/site";

const pillars = [
  {
    icon: Sprout,
    number: "01",
    title: "Paquete Emprendedor",
    forWho: "Para quienes empiezan o llevan su negocio de forma manual.",
    desc: "Tu emprendimiento merece crecer con orden. Te ayudamos a organizar tus productos, clientes y ventas con herramientas sencillas.",
    chips: [
      "Catálogo digital de productos",
      "Tu información en un solo lugar",
      "Base de datos sencilla",
      "Control básico de ventas",
      "Acompañamiento para aprender a usarlo",
    ],
    gradient: "from-[#22092C] to-[#3d0a3d]",
  },
  {
    icon: TrendingUp,
    number: "02",
    title: "Negocio en Crecimiento",
    forWho: "Para negocios con ventas que necesitan más control.",
    desc: "Si tu negocio ya se mueve y necesitas control real, te ayudamos a organizar pedidos, inventario y ventas para que decidas con información.",
    chips: [
      "Todo lo del Paquete Emprendedor",
      "Seguimiento de pedidos",
      "Control básico de inventario",
      "Seguimiento de clientes (CRM básico)",
      "Reportes y tableros sencillos",
      "Automatizaciones de tareas repetitivas",
    ],
    gradient: "from-[#872341] to-[#22092C]",
  },
  {
    icon: Cpu,
    number: "03",
    title: "Negocio Inteligente",
    forWho: "Para empresas e instituciones que necesitan transformar procesos.",
    desc: "Tu negocio puede funcionar mejor: analizamos tus procesos y creamos soluciones tecnológicas a tu medida para crecer de forma eficiente.",
    chips: [
      "Diagnóstico y análisis de procesos",
      "Rediseño y documentación de procesos",
      "Integración de información y herramientas",
      "Automatizaciones de mayor alcance",
      "Aplicaciones a la medida, cuando se justifiquen",
      "Cotización personalizada tras el diagnóstico",
    ],
    gradient: "from-[#22092C] to-[#872341]",
  },
];

function TiltCard({ pillar, index }: { pillar: typeof pillars[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    setTilt({
      x: ((y - cy) / cy) * -8,
      y: ((x - cx) / cx) * 8,
    });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  const Icon = pillar.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`relative h-full rounded-3xl p-8 bg-gradient-to-br ${pillar.gradient} border border-white/10 shadow-xl cursor-default`}
      >
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#F05941]/8 rounded-full blur-3xl pointer-events-none" />

        {/* Number */}
        <span className="text-7xl font-black text-white/5 absolute top-6 right-8 leading-none select-none">
          {pillar.number}
        </span>

        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F05941] to-[#BE3144] flex items-center justify-center mb-6 shadow-lg shadow-[#F05941]/30">
          <Icon size={26} className="text-white" />
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
          {pillar.title}
        </h3>

        <p className="text-[#F05941] text-xs font-semibold uppercase tracking-wide mb-3">
          {pillar.forWho}
        </p>
        <p className="text-white/60 text-sm leading-relaxed mb-6">
          {pillar.desc}
        </p>

        <ul className="space-y-2">
          {pillar.chips.map((chip) => (
            <li key={chip} className="flex gap-2 text-sm text-white/70">
              <Check size={16} className="text-[#F05941] flex-shrink-0 mt-0.5" />
              {chip}
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}

export default function SolutionSection() {
  return (
    <section
      id="servicios"
      className="section-padding"
      style={{
        background: "linear-gradient(160deg, #22092C 0%, #872341 50%, #22092C 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#F05941]/15 border border-[#F05941]/30 text-[#F05941] text-sm font-semibold tracking-wide uppercase mb-4">
            Servicios
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
            Soluciones según la etapa<br className="hidden md:block" />
            de <span className="text-gradient">tu negocio</span>
          </h2>
          <p className="mt-4 text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
            Cada paquete se ajusta a lo que tu negocio necesita después de conocerlo.
            Usamos herramientas accesibles y te acompañamos para que las mejoras se
            mantengan en el tiempo.
          </p>
        </motion.div>

        {/* Entry point */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-3xl p-6 md:p-8 border border-[#F05941]/30 mb-8 flex flex-col md:flex-row gap-6 md:items-center"
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F05941] to-[#BE3144] flex items-center justify-center flex-shrink-0">
            <Search size={26} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="text-[#F05941] text-xs font-semibold uppercase tracking-wide mb-1">
              El primer paso
            </p>
            <h3 className="text-2xl font-bold text-white mb-2">Diagnóstico Express</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Conocemos tu operación, revisamos un proceso clave y te entregamos las mejoras
              prioritarias. Así sabes qué paquete necesitas, sin comprar de más.
            </p>
          </div>
          <a
            href={waLink("Hola Optexa, quiero agendar un Diagnóstico Express para mi negocio.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-fit"
          >
            Agendar diagnóstico
            <ArrowRight size={18} />
          </a>
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => (
            <TiltCard key={pillar.title} pillar={pillar} index={i} />
          ))}
        </div>

        {/* Transversal + institutions */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="glass-card rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-2">Consultoría en procesos</h3>
            <p className="text-white/55 text-sm leading-relaxed">
              Servicios puntuales de levantamiento y documentación de procesos,
              identificación de reprocesos y tareas repetitivas, propuestas de
              optimización y seguimiento. No toda mejora requiere software: a veces
              basta con simplificar un procedimiento o aprovechar mejor lo que ya tienes.
            </p>
          </div>
          <div className="glass-card rounded-2xl p-6 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Building2 size={18} className="text-[#F05941]" />
              <h3 className="text-lg font-bold text-white">¿Empresa o institución?</h3>
            </div>
            <p className="text-white/55 text-sm leading-relaxed mb-4">
              También acompañamos proyectos de mayor alcance para organizaciones que
              necesitan analizar procesos, conectar información o contar con
              herramientas a la medida. Cada proyecto se define y cotiza tras el diagnóstico.
            </p>
            <a
              href={waLink("Hola Optexa, represento una empresa/institución y quiero conversar sobre un proyecto.")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F05941] text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all"
            >
              Conversemos <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
