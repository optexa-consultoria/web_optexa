"use client";

import { motion } from "framer-motion";
import { FolderOpen, Link2, MessageCircle, BarChart2, Repeat, Package } from "lucide-react";

const painPoints = [
  {
    icon: FolderOpen,
    title: "Información dispersa",
    desc: "Productos en un cuaderno, clientes en el celular, ventas en chats. Encontrar un dato toma más tiempo del que debería.",
  },
  {
    icon: Link2,
    title: "Nada está conectado",
    desc: "Lo que vendes no se cruza con tu inventario ni con tus clientes. Cada registro se hace a mano y por separado.",
  },
  {
    icon: Package,
    title: "Catálogo desactualizado",
    desc: "Precios, tallas y existencias cambian, pero el catálogo que envías por WhatsApp o Instagram no se actualiza a tiempo.",
  },
  {
    icon: MessageCircle,
    title: "Pedidos y atención en desorden",
    desc: "Los pedidos llegan por varios canales y se pierden entre mensajes. Hacer seguimiento a cada cliente depende de tu memoria.",
  },
  {
    icon: BarChart2,
    title: "No sabes cuánto ganas",
    desc: "Sin un tablero sencillo es difícil ver ventas, ganancias y pérdidas. Las decisiones se toman por intuición.",
  },
  {
    icon: Repeat,
    title: "Tareas que se repiten todos los días",
    desc: "Copiar datos, sacar cuentas y armar reportes a mano. Son horas que podrías dedicar a vender y crecer.",
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const cardVariants: any = {
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
            ¿Te pasa esto?
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#22092C] leading-tight">
            Tu negocio crece, pero<br className="hidden md:block" />
            el orden no lo acompaña
          </h2>
          <p className="mt-4 text-lg text-[#22092C]/55 max-w-2xl mx-auto leading-relaxed">
            Son situaciones comunes en emprendimientos y pequeños negocios que venden
            por redes sociales. Todas se pueden mejorar, y no siempre hace falta
            invertir en tecnología costosa.
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
