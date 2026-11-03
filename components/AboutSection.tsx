"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { scrollTo } from "@/lib/site";

const principles = [
  "Comprender antes de proponer",
  "Mejorar con sentido práctico",
  "Tecnología accesible",
  "Acompañamiento cercano",
  "Resultados sostenibles",
  "Trabajo honesto: solo prometemos lo que podemos cumplir",
];

export default function AboutSection() {
  return (
    <section id="nosotros" className="bg-[#22092C] section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative max-w-sm mx-auto lg:mx-0 w-full"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#F05941]/25 to-[#872341]/10 rounded-3xl blur-2xl" />
            <div className="relative rounded-3xl overflow-hidden border border-white/10">
              <Image
                src="/fundador.jpg"
                alt="E. Camilo Urbano Burbano, fundador de Optexa"
                width={640}
                height={640}
                className="w-full h-auto"
              />
              <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-[#22092C] to-transparent">
                <p className="text-white font-bold">E. Camilo Urbano Burbano</p>
                <p className="text-[#F05941] text-sm">Fundador · Ingeniero industrial</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="flex flex-col gap-7"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#F05941]/15 border border-[#F05941]/30 text-[#F05941] text-sm font-semibold tracking-wide uppercase w-fit">
              Quién está detrás
            </span>

            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              Ingeniería industrial<br />
              al servicio de <span className="text-gradient">tu negocio</span>
            </h2>

            <div className="space-y-5 text-white/60 leading-relaxed">
              <p className="text-lg">
                Soy Camilo, ingeniero industrial. En mi experiencia profesional he acompañado
                equipos y procesos para entender cómo se hace el trabajo, encontrar maneras
                de hacerlo mejor, reducir pasos innecesarios y evaluar qué se puede automatizar.
              </p>
              <p>
                Lo que más me motiva es ver a las personas trabajar con menos carga y más
                claridad. Me apasiona la tecnología y aprendo de forma continua, pero la uso
                como un medio: primero entiendo tu negocio y luego elijo la herramienta que
                de verdad te sirve.
              </p>
              <p>
                Creé Optexa para llevar esa forma de trabajar a emprendedores y negocios del
                Cauca, empezando desde abajo y creciendo junto a ellos. Mi visión es construir
                una consultora cercana, que ayude a muchos negocios a ordenarse, conectar su
                información y evolucionar. <span className="text-white font-semibold">Engineer the flow.</span>
              </p>
            </div>

            <ul className="grid sm:grid-cols-2 gap-3 pt-4 border-t border-white/10">
              {principles.map((p) => (
                <li key={p} className="flex gap-2 text-sm text-white/70">
                  <Check size={16} className="text-[#F05941] flex-shrink-0 mt-0.5" />
                  {p}
                </li>
              ))}
            </ul>

            <a
              href="#diagnostico"
              onClick={scrollTo("diagnostico")}
              className="btn-primary w-fit text-base px-7 py-3.5 mt-2"
            >
              Evalúa tu negocio
              <ArrowRight size={18} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
