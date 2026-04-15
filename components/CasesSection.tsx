"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Clock, DollarSign, Users, Zap, Award } from "lucide-react";

const cases = [
  {
    icon: Clock,
    metric: "-65",
    suffix: "%",
    label: "Tiempo de ciclo",
    industry: "Manufactura",
    desc: "Empresa de manufactura automotriz redujo su tiempo de ciclo de ensamble de 18 a 6.3 horas mediante VSM y automatización de reportes.",
    tags: ["VSM", "RPA", "Python"],
  },
  {
    icon: DollarSign,
    metric: "3.2",
    suffix: "x",
    label: "ROI en 5 meses",
    industry: "Logística",
    desc: "Operador logístico triplicó su margen al rediseñar la planificación de rutas e implementar dashboards de KPIs en tiempo real.",
    tags: ["Looker", "BigQuery", "Scrum"],
  },
  {
    icon: TrendingUp,
    metric: "Tiempo",
    suffix: "",
    label: "real",
    industry: "Retail",
    desc: "Cadena retail automatizó su pipeline de inventario: de reportes semanales con 48h de delay a visibilidad en tiempo real por tienda.",
    tags: ["Power BI", "APIs", "dbt"],
  },
  {
    icon: Users,
    metric: "-40",
    suffix: "%",
    label: "Rework operativo",
    industry: "Servicios",
    desc: "Empresa de servicios financieros eliminó el 40% del rework en su proceso de onboarding rediseñando el flujo con BPMN y automatizando validaciones.",
    tags: ["BPMN", "n8n", "Scrum"],
  },
  {
    icon: Zap,
    metric: "12x",
    suffix: "",
    label: "Velocidad de reporte",
    industry: "Salud",
    desc: "Clínica de especialidades aceleró su ciclo de reportes mensuales de 5 días a 5 horas con automatización de extracción y transformación de datos.",
    tags: ["Python", "BigQuery", "dbt"],
  },
  {
    icon: Award,
    metric: "+95",
    suffix: "%",
    label: "Satisfacción de equipo",
    industry: "Tecnología",
    desc: "Empresa tecnológica mejoró el índice de satisfacción interno al liberar a ingenieros de tareas manuales repetitivas mediante automatización RPA.",
    tags: ["RPA", "APIs", "Scrum"],
  },
];

function useCountUp(end: number, duration: number, trigger: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger || isNaN(end)) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [trigger, end, duration]);
  return count;
}

function MetricCard({ c, index }: { c: typeof cases[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const Icon = c.icon;
  const numericEnd = parseInt(c.metric.replace(/[^0-9]/g, "")) || 0;
  const isNumeric = /^[-+]?\d+$/.test(c.metric.replace("%", "").replace("x", ""));
  const countVal = useCountUp(numericEnd, 1800, visible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const displayMetric = isNumeric
    ? (c.metric.startsWith("-") ? `-${countVal}` : c.metric.startsWith("+") ? `+${countVal}` : `${countVal}`)
    : c.metric;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="glass-card rounded-2xl p-7 border border-white/8 group hover:border-[#F05941]/30 transition-colors duration-300 cursor-default"
    >
      <div className="flex items-start justify-between mb-5">
        <div className="w-11 h-11 rounded-xl bg-[#F05941]/10 border border-[#F05941]/20 flex items-center justify-center group-hover:bg-[#F05941]/20 transition-colors duration-300">
          <Icon size={20} className="text-[#F05941]" />
        </div>
        <span className="text-xs font-semibold text-white/30 uppercase tracking-wider px-3 py-1 bg-white/5 rounded-full">
          {c.industry}
        </span>
      </div>

      <div className="mb-1">
        <span className="text-5xl font-black text-[#F05941] leading-none tabular-nums">
          {displayMetric}{c.suffix}
        </span>
      </div>
      <p className="text-white font-semibold text-sm mb-3">{c.label}</p>
      <p className="text-white/45 text-xs leading-relaxed mb-5">{c.desc}</p>

      <div className="flex flex-wrap gap-1.5">
        {c.tags.map((tag) => (
          <span key={tag} className="px-2.5 py-0.5 rounded-full text-xs bg-white/6 text-white/50 border border-white/8">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function CasesSection() {
  return (
    <section id="casos" className="bg-[#22092C] section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#F05941]/15 border border-[#F05941]/30 text-[#F05941] text-sm font-semibold tracking-wide uppercase mb-4">
            Casos de Éxito
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
            Resultados que hablan<br className="hidden md:block" />
            por sí solos
          </h2>
          <p className="mt-4 text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
            Números reales de proyectos reales. Cada caso comenzó con un diagnóstico gratuito.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cases.map((c, i) => (
            <MetricCard key={c.label} c={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
