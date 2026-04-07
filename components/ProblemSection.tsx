"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Clock, BarChart2, GitMerge, Users, TrendingDown } from "lucide-react";

const painPoints = [
  {
    icon: Clock,
    title: "Procesos lentos e impredecibles",
    desc: "Los tiempos de ciclo se alargan sin control. Los equipos no saben cuánto tardará cada tarea, generando retrasos en cascada y clientes frustrados.",
  },
  {
    icon: AlertTriangle,
    title: "Errores operativos recurrentes",
    desc: "El mismo error aparece una y otra vez. Sin un sistema robusto de control, el rework consume hasta el 30% de la capacidad productiva.",
  },
  {
    icon: BarChart2,
    title: "Datos sin contexto ni acción",
    desc: "Tienes datos en hojas de cálculo que nadie interpreta. Las decisiones se toman por intuición, no por evidencia. El costo oculto es enorme.",
  },
  {
    icon: GitMerge,
    title: "Silos entre departamentos",
    desc: "Ventas no habla con operaciones. Finanzas trabaja con información desactualizada. La fricción entre áreas bloquea el flujo completo del negocio.",
  },
  {
    icon: Users,
    title: "Talento atrapado en tareas manuales",
    desc: "Tu equipo más valioso dedica horas a copiar, pegar y reportar. Ese tiempo se puede automatizar y redirigir a trabajo de alto impacto.",
  },
  {
    icon: TrendingDown,
    title: "Márgenes que se comprimen con el volumen",
    desc: "Al crecer, los costos crecen más rápido que los ingresos. Sin procesos escalables, el éxito se convierte en la mayor amenaza para la rentabilidad.",
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function ProblemSection() {
  return (
    <section id="problema" className="bg-[#FCFBF5] section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#F05941]/10 border border-[#F05941]/25 text-[#F05941] text-sm font-semibold tracking-wide uppercase mb-4">
            El Problema
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#22092C] leading-tight">
            ¿Tu empresa vive alguno<br className="hidden md:block" />
            de estos síntomas?
          </h2>
          <p className="mt-4 text-lg text-[#22092C]/55 max-w-2xl mx-auto leading-relaxed">
            La fricción operativa se manifiesta de muchas formas. Todas tienen solución.
            La clave está en saber dónde está el cuello de botella real.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {painPoints.map((point) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={point.title}
                variants={cardVariants}
                whileHover={{
                  y: -6,
                  transition: { duration: 0.25, ease: "easeOut" },
                }}
                className="group bg-white rounded-2xl p-7 shadow-sm border border-[#22092C]/6 cursor-default transition-all duration-300 hover:border-[#F05941]/50 hover:shadow-lg hover:shadow-[#F05941]/8"
              >
                <div className="w-12 h-12 rounded-xl bg-[#22092C] flex items-center justify-center mb-5 group-hover:bg-gradient-to-br group-hover:from-[#F05941] group-hover:to-[#BE3144] transition-all duration-300">
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#22092C] mb-3 leading-snug">
                  {point.title}
                </h3>
                <p className="text-sm text-[#22092C]/60 leading-relaxed">
                  {point.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
