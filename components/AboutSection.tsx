"use client";

import { motion } from "framer-motion";
import { Zap, Target, BarChart3, ArrowRight } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="nosotros" className="bg-[#22092C] section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20 items-center">

          {/* LEFT: Visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#F05941]/20 to-[#872341]/10 rounded-3xl blur-2xl" />

            <div className="relative glass-card rounded-3xl p-10 border border-white/10 text-center">
              {/* Logo mark */}
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#F05941] to-[#BE3144] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#F05941]/30">
                <Zap size={38} className="text-white" />
              </div>

              <p className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">
                opt<span className="text-[#F05941]">exa</span>
              </p>

              <p className="text-lg font-semibold text-[#F05941] mb-8 italic tracking-wide">
                "Engineer the Flow"
              </p>

              <div className="space-y-4">
                {[
                  { icon: Target, label: "Enfoque en ROI medible" },
                  { icon: BarChart3, label: "Decisiones basadas en datos" },
                  { icon: Zap, label: "Velocidad con metodología Scrum" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-3 glass-card rounded-xl px-4 py-3">
                    <Icon size={16} className="text-[#F05941] flex-shrink-0" />
                    <span className="text-white/70 text-sm font-medium">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="flex flex-col gap-7"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#F05941]/15 border border-[#F05941]/30 text-[#F05941] text-sm font-semibold tracking-wide uppercase w-fit">
              Sobre Optexa
            </span>

            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              Ingeniería aplicada<br />
              a la <span className="text-gradient">operación real</span>
            </h2>

            <div className="space-y-5 text-white/60 leading-relaxed">
              <p className="text-lg">
                Optexa nació de una premisa simple: las empresas pierden millones
                en procesos que nadie cuestionó desde que se diseñaron. Somos una
                consultoría boutique que combina rigor de ingeniería con agilidad
                Scrum para transformar esa inercia en ventaja competitiva.
              </p>
              <p>
                Trabajamos en proyectos de alto impacto donde los resultados son
                medibles desde el primer sprint. No vendemos diagnósticos que
                acaban en cajones: implementamos, medimos y ajustamos junto a
                tu equipo hasta que el ROI sea evidente.
              </p>
              <p>
                Nuestro enfoque es <span className="text-white font-semibold">Engineer the Flow</span>:
                diseñar sistemas operativos que fluyen solos, sin fricciones,
                sin dependencias de héroes individuales y con datos que iluminan
                las decisiones correctas en el momento correcto.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-white/10">
              {[
                { value: "100%", label: "Proyectos con ROI documentado" },
                { value: "Sprint 1", label: "Primeros resultados visibles" },
                { value: "B2B", label: "Solo empresas, no individuos" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-xl font-black text-[#F05941] mb-1">{stat.value}</div>
                  <div className="text-xs text-white/40 leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>

            <a
              href="#diagnostico"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("diagnostico")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-primary w-fit text-base px-7 py-3.5 mt-2"
            >
              Iniciar diagnóstico gratuito
              <ArrowRight size={18} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
