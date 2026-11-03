"use client";

import { motion } from "framer-motion";
import { Building2, Sparkles, ArrowRight } from "lucide-react";
import { waLink } from "@/lib/site";

// Solo casos reales y autorizados. Al cerrar un proyecto, agrega aquí su ficha
// (pestaña Casos de la Hoja Maestra) con Permiso_Publicar = Sí.
const cases = [
  {
    icon: Building2,
    sector: "Salud · Sector público",
    place: "Popayán, Cauca",
    title: "Control y seguimiento de contratos",
    problem:
      "La supervisión de contratos dependía de registros manuales y de revisar varias fuentes para conocer el estado de cada contrato.",
    solution:
      "Aplicación web sobre Google Sheets y Apps Script que centraliza la información de los contratos y su seguimiento, alineada con el procedimiento interno de la entidad.",
    stage: "En entrega · Etapa Implementar",
    tags: ["Google Sheets", "Apps Script", "App web"],
  },
];

export default function CasesSection() {
  return (
    <section id="casos" className="bg-[#FCFBF5] section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#F05941]/10 border border-[#F05941]/25 text-[#F05941] text-sm font-semibold tracking-wide uppercase mb-4">
            Casos
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#22092C] leading-tight">
            Proyectos reales,{" "}<br className="hidden md:block" />
            contados con honestidad
          </h2>
          <p className="mt-4 text-lg text-[#22092C]/70 max-w-2xl mx-auto leading-relaxed">
            Mostramos solo trabajos reales y con autorización. Cuando cada proyecto cierre,
            publicaremos su antes y después.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {cases.map(({ icon: Icon, ...c }) => (
            <motion.article
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-7 shadow-sm border border-[#22092C]/6"
            >
              <div className="flex items-start justify-between mb-5 gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#22092C] flex items-center justify-center">
                  <Icon size={22} className="text-white" />
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-[#22092C]/70 uppercase tracking-wider">{c.sector}</p>
                  <p className="text-xs text-[#22092C]/70">{c.place}</p>
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#22092C] mb-4">{c.title}</h3>
              <p className="text-sm text-[#22092C]/70 leading-relaxed mb-3">
                <span className="font-semibold text-[#22092C]">Antes: </span>{c.problem}
              </p>
              <p className="text-sm text-[#22092C]/70 leading-relaxed mb-5">
                <span className="font-semibold text-[#22092C]">Solución: </span>{c.solution}
              </p>
              <p className="text-xs font-semibold text-[#F05941] mb-4">{c.stage}</p>
              <div className="flex flex-wrap gap-1.5">
                {c.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-0.5 rounded-full text-xs bg-[#22092C]/5 text-[#22092C]/60 border border-[#22092C]/10">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl p-7 bg-[#22092C] flex flex-col justify-between gap-6"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F05941] to-[#BE3144] flex items-center justify-center mb-5">
                <Sparkles size={22} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Tu negocio puede ser el próximo caso</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Estamos abriendo proyectos piloto de 2 a 4 semanas con emprendedores y
                pequeños negocios del Cauca: un problema concreto, alcance por escrito,
                condiciones claras desde el inicio y resultados medibles.
              </p>
            </div>
            <a
              href={waLink("Hola Optexa, me interesa participar en un proyecto piloto para mi negocio.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-fit"
            >
              Quiero participar
              <ArrowRight size={18} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
