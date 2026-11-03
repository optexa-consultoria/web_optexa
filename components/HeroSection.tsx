"use client";

import { useEffect, useRef } from "react";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Play, Zap } from "lucide-react";

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let animationId: number;
    const particles: Array<{
      x: number; y: number; vx: number; vy: number;
      radius: number; opacity: number; color: string;
    }> = [];

    const colors = ["#F05941", "#BE3144", "#872341", "#ffffff"];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.05,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      });

      // draw connecting lines
      particles.forEach((p, i) => {
        particles.slice(i + 1).forEach((q) => {
          const dist = Math.hypot(p.x - q.x, p.y - q.y);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = "#F05941";
            ctx.globalAlpha = (1 - dist / 130) * 0.07;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        });
      });
      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const handleDiagnostico = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById("diagnostico")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen bg-[#22092C] flex items-center overflow-hidden"
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Isotipo de marca como marca de agua */}
      <Image
        src="/isotipo-crema.png"
        alt=""
        aria-hidden="true"
        width={800}
        height={800}
        priority
        className="absolute -right-40 -bottom-40 w-[560px] lg:w-[720px] opacity-[0.04] pointer-events-none select-none"
      />

      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#F05941]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#872341]/15 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pt-28 pb-16 lg:pt-32">
        <div className="grid lg:grid-cols-[55%_45%] gap-12 lg:gap-8 items-center">
          {/* LEFT: Text */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-6"
          >
            {/* Badge */}
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F05941]/10 border border-[#F05941]/25 text-[#F05941] text-sm font-semibold tracking-wide uppercase">
                <Zap size={13} />
                Consultoría en procesos · Cauca
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="text-[2.5rem] sm:text-5xl md:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight text-white"
            >
              Optimizamos{" "}
              <span className="text-gradient">procesos</span>,<br />
              transformamos{" "}
              <span className="text-gradient">negocios.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl text-white/60 leading-relaxed max-w-xl"
            >
              Ayudamos a emprendedores y pequeños negocios a organizar y conectar
              la información de sus productos, clientes y ventas, con herramientas
              digitales accesibles. Menos tiempo en tareas operativas, más tiempo
              para hacer crecer tu negocio.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4 mt-2 [&>a]:justify-center"
            >
              <a
                href="#diagnostico"
                onClick={handleDiagnostico}
                className="btn-primary text-base px-7 py-3.5"
              >
                Evalúa tu negocio gratis
                <ArrowRight size={18} />
              </a>
              <a href="#metodo" className="btn-outline text-base px-7 py-3.5">
                <Play size={16} />
                Cómo trabajamos
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-3 gap-4 sm:gap-8 mt-4 pt-6 border-t border-white/10 sm:flex"
            >
              {[
                { value: "Primero", label: "entendemos tu negocio" },
                { value: "Accesible", label: "herramientas a tu medida" },
                { value: "Contigo", label: "acompañamiento real" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-0.5">
                  <span className="text-lg sm:text-2xl font-black text-[#F05941]">
                    {stat.value}
                  </span>
                  <span className="text-xs text-white/60 leading-tight">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT: Visual card */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
            className="hidden lg:flex justify-center items-center"
          >
            <div className="relative w-full max-w-md">
              {/* Main card */}
              <div className="glass-card rounded-3xl p-8 border border-white/10 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <Image src="/isotipo.png" alt="" aria-hidden="true" width={40} height={40} className="w-10 h-10" />
                  <div>
                    <p className="text-white font-bold text-sm">Método Optexa</p>
                    <p className="text-white/60 text-xs">Engineer the flow</p>
                  </div>
                </div>

                {/* Flow diagram */}
                <div className="space-y-3">
                  {[
                    { label: "1. Conocer", pct: 100, color: "#F05941" },
                    { label: "2. Diagnosticar", pct: 80, color: "#BE3144" },
                    { label: "3. Diseñar", pct: 60, color: "#872341" },
                    { label: "4. Implementar", pct: 40, color: "#F05941" },
                    { label: "5. Evolucionar", pct: 20, color: "#BE3144" },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-white/60">{item.label}</span>
                      </div>
                      <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.pct}%` }}
                          transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
                          className="h-full rounded-full"
                          style={{ background: item.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 rounded-2xl bg-[#F05941]/10 border border-[#F05941]/20">
                  <p className="text-[#F05941] font-bold text-sm">
                    No implementamos sin entender
                  </p>
                  <p className="text-white/50 text-xs mt-0.5">
                    Cinco etapas para transformar tu negocio
                  </p>
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-5 -right-5 bg-gradient-to-br from-[#F05941] to-[#BE3144] rounded-2xl px-4 py-3 shadow-xl shadow-[#F05941]/30"
              >
                <p className="text-white text-xs font-bold">Basado en</p>
                <p className="text-white text-2xl font-black leading-none">PHVA</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
      >
        <span className="text-white/60 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-0.5 h-6 bg-gradient-to-b from-[#F05941] to-transparent rounded-full"
        />
      </motion.div>
    </section>
  );
}
