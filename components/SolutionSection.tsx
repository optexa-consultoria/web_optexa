"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { GitBranch, Cpu, PieChart } from "lucide-react";

const pillars = [
  {
    icon: GitBranch,
    number: "01",
    title: "Reingeniería de Procesos",
    desc: "Mapeamos y rediseñamos cada flujo operativo de raíz. No parches, transformación estructural. Eliminamos el desperdicio y redefinimos cómo fluye el trabajo de extremo a extremo.",
    chips: ["Scrum", "Value Stream Mapping", "BPMN", "SIPOC"],
    gradient: "from-[#22092C] to-[#3d0a3d]",
  },
  {
    icon: Cpu,
    number: "02",
    title: "Automatización Inteligente",
    desc: "Convertimos los procesos rediseñados en flujos automatizados. RPA, APIs y scripts en Python para liberar a tu equipo de tareas repetitivas y escalar sin fricción.",
    chips: ["Python", "RPA", "APIs REST", "n8n"],
    gradient: "from-[#872341] to-[#22092C]",
  },
  {
    icon: PieChart,
    number: "03",
    title: "Datos para Decisiones",
    desc: "Construimos dashboards en tiempo real conectados a tus operaciones. Cada KPI importante, visible para quien lo necesita, en el momento que lo necesita.",
    chips: ["Looker", "BigQuery", "Power BI", "dbt"],
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

        {/* Description */}
        <p className="text-white/60 text-sm leading-relaxed mb-6">
          {pillar.desc}
        </p>

        {/* Tech chips */}
        <div className="flex flex-wrap gap-2">
          {pillar.chips.map((chip) => (
            <span
              key={chip}
              className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/70 border border-white/10 backdrop-blur-sm"
            >
              {chip}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function SolutionSection() {
  return (
    <section
      id="solucion"
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
            Nuestra Solución
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
            Los 3 Pilares de<br className="hidden md:block" />
            <span className="text-gradient">Optexa</span>
          </h2>
          <p className="mt-4 text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
            Una metodología integrada que transforma tu operación de adentro hacia afuera.
            Cada pilar se refuerza con los otros.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => (
            <TiltCard key={pillar.title} pillar={pillar} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
