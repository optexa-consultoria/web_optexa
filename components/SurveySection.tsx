"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, CheckCircle, BookOpen, MessageCircle, RotateCcw } from "lucide-react";

const WHATSAPP_NUMBER = "521XXXXXXXXXX"; // Replace with real number

const questions = [
  {
    id: 1,
    question: "¿Cómo describirías la previsibilidad de tus tiempos de entrega o producción?",
    options: [
      { text: "Muy baja: los retrasos son la norma y nadie los predice", score: 3 },
      { text: "Media: hay variación pero parcialmente controlada", score: 2 },
      { text: "Alta: los plazos se cumplen con consistencia", score: 1 },
    ],
  },
  {
    id: 2,
    question: "¿Cuánto tiempo dedica tu equipo a tareas repetitivas y manuales (copiar datos, reportes, validaciones)?",
    options: [
      { text: "Más del 40% de su jornada semanal", score: 3 },
      { text: "Entre el 20% y 40%", score: 2 },
      { text: "Menos del 20%, el resto es trabajo de valor", score: 1 },
    ],
  },
  {
    id: 3,
    question: "¿Cómo toma decisiones clave tu dirección hoy?",
    options: [
      { text: "Por instinto o experiencia, sin datos confiables en tiempo real", score: 3 },
      { text: "Con reportes periódicos que llegan con días de retraso", score: 2 },
      { text: "Con dashboards en tiempo real y KPIs bien definidos", score: 1 },
    ],
  },
  {
    id: 4,
    question: "¿Qué tan integradas están tus áreas operativas (ventas, ops, finanzas, logística)?",
    options: [
      { text: "Trabajan en silos: poca comunicación y datos inconsistentes entre áreas", score: 3 },
      { text: "Hay integración parcial, pero existen brechas importantes", score: 2 },
      { text: "Alta integración: todas las áreas comparten datos y flujos en tiempo real", score: 1 },
    ],
  },
  {
    id: 5,
    question: "¿Cuál es el nivel de rework (reproceso o corrección de errores) en tus operaciones?",
    options: [
      { text: "Alto: gastamos mucho tiempo corrigiendo errores recurrentes", score: 3 },
      { text: "Moderado: sucede, pero no es crítico aún", score: 2 },
      { text: "Bajo: los procesos tienen controles de calidad sólidos", score: 1 },
    ],
  },
  {
    id: 6,
    question: "Si duplicaras tu volumen de operaciones mañana, ¿qué pasaría?",
    options: [
      { text: "Colapsaríamos: nuestros procesos no escalan sin sumar personas o caos", score: 3 },
      { text: "Tendríamos problemas serios pero sobreviviríamos con esfuerzo extra", score: 2 },
      { text: "Escalaríamos sin mayor problema: tenemos sistemas y procesos para ello", score: 1 },
    ],
  },
];

const MAX_SCORE = questions.length * 3;
const HIGH_THRESHOLD = 0.65;

export default function SurveySection() {
  const [step, setStep] = useState(0); // 0 = intro, 1-6 = questions, 7 = result
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);

  const currentQuestion = step >= 1 && step <= 6 ? questions[step - 1] : null;
  const progress = step === 0 ? 0 : step === 7 ? 100 : ((step - 1) / questions.length) * 100;
  const totalScore = answers.reduce((a, b) => a + b, 0);
  const scoreRatio = totalScore / MAX_SCORE;
  const isHighFriction = scoreRatio >= HIGH_THRESHOLD;

  const waTextHigh = encodeURIComponent(
    `Hola Optexa! 👋 Completé el diagnóstico de fricción operativa y obtuve un puntaje alto (${totalScore}/${MAX_SCORE}). Me gustaría agendar una sesión para explorar cómo pueden ayudarnos. ¿Cuándo tienen disponibilidad?`
  );
  const waTextLow = encodeURIComponent(
    `Hola Optexa! Completé el diagnóstico y me gustaría recibir la guía gratuita de optimización de procesos. Mi puntaje fue ${totalScore}/${MAX_SCORE}.`
  );
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${isHighFriction ? waTextHigh : waTextLow}`;

  const handleStart = () => { setDirection(1); setStep(1); };

  const handleSelect = (score: number) => setSelected(score);

  const handleNext = () => {
    if (selected === null) return;
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    setSelected(null);
    setDirection(1);
    setStep((s) => (s < 6 ? s + 1 : 7));
  };

  const handleBack = () => {
    if (step <= 1) return;
    setAnswers((a) => a.slice(0, -1));
    setSelected(null);
    setDirection(-1);
    setStep((s) => s - 1);
  };

  const handleReset = () => {
    setStep(0);
    setAnswers([]);
    setSelected(null);
    setDirection(1);
  };

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <section id="diagnostico" className="bg-[#FCFBF5] section-padding">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#F05941]/10 border border-[#F05941]/30 text-[#F05941] text-sm font-semibold tracking-wide uppercase mb-4">
            Diagnóstico Gratuito
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#22092C] leading-tight">
            ¿Cuánta fricción tiene<br className="hidden md:block" />
            tu operación?
          </h2>
          <p className="mt-4 text-lg text-[#22092C]/55 max-w-xl mx-auto leading-relaxed">
            6 preguntas. 3 minutos. Un diagnóstico honesto del estado de tu operación.
          </p>
        </motion.div>

        {/* Survey container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[#22092C] rounded-3xl overflow-hidden shadow-2xl shadow-[#22092C]/30"
        >
          {/* Progress bar */}
          <div className="h-1.5 bg-white/10 w-full">
            <motion.div
              className="h-full bg-gradient-to-r from-[#F05941] to-[#BE3144] rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>

          <div className="p-8 md:p-12 min-h-[460px] flex flex-col justify-between">
            <AnimatePresence mode="wait" custom={direction}>
              {/* INTRO */}
              {step === 0 && (
                <motion.div
                  key="intro"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="flex flex-col gap-6 items-center text-center flex-1 justify-center"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#F05941] to-[#BE3144] flex items-center justify-center shadow-lg shadow-[#F05941]/30">
                    <BookOpen size={36} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      Diagnóstico de Fricción Operativa
                    </h3>
                    <p className="text-white/55 leading-relaxed max-w-md mx-auto">
                      Responde 6 preguntas sobre tu operación actual. Al final, recibirás
                      una valoración personalizada y acceso a una consulta estratégica con nuestro equipo.
                    </p>
                  </div>
                  <button
                    id="survey-start-btn"
                    onClick={handleStart}
                    className="btn-primary text-base px-8 py-3.5 mt-2"
                  >
                    Comenzar diagnóstico
                    <ChevronRight size={18} />
                  </button>
                </motion.div>
              )}

              {/* QUESTIONS */}
              {step >= 1 && step <= 6 && currentQuestion && (
                <motion.div
                  key={`q-${step}`}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="flex flex-col gap-6 flex-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[#F05941] text-sm font-semibold">
                      Pregunta {step} de {questions.length}
                    </span>
                    <span className="text-white/30 text-sm">{Math.round(progress)}% completado</span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-white leading-snug">
                    {currentQuestion.question}
                  </h3>

                  <div className="flex flex-col gap-3">
                    {currentQuestion.options.map((opt, i) => (
                      <button
                        key={i}
                        id={`survey-q${step}-opt${i}`}
                        onClick={() => handleSelect(opt.score)}
                        className={`text-left px-5 py-4 rounded-xl border transition-all duration-200 text-sm leading-relaxed ${
                          selected === opt.score
                            ? "bg-[#F05941]/15 border-[#F05941] text-white"
                            : "bg-white/4 border-white/10 text-white/60 hover:border-white/25 hover:text-white/90 hover:bg-white/7"
                        }`}
                      >
                        <span
                          className={`inline-block w-5 h-5 rounded-full border mr-3 flex-shrink-0 align-middle transition-colors duration-200 ${
                            selected === opt.score
                              ? "border-[#F05941] bg-[#F05941]"
                              : "border-white/20"
                          }`}
                        />
                        {opt.text}
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-3 mt-auto pt-4">
                    {step > 1 && (
                      <button
                        onClick={handleBack}
                        className="btn-outline px-5 py-2.5 text-sm"
                      >
                        <ChevronLeft size={16} />
                        Anterior
                      </button>
                    )}
                    <button
                      id={`survey-next-btn-${step}`}
                      onClick={handleNext}
                      disabled={selected === null}
                      className={`btn-primary px-6 py-2.5 text-sm ml-auto transition-opacity ${
                        selected === null ? "opacity-40 cursor-not-allowed" : ""
                      }`}
                    >
                      {step === 6 ? "Ver resultado" : "Siguiente"}
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* RESULT */}
              {step === 7 && (
                <motion.div
                  key="result"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="flex flex-col gap-6 items-center text-center flex-1 justify-center"
                >
                  {isHighFriction ? (
                    <>
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#F05941] to-[#BE3144] flex items-center justify-center shadow-lg shadow-[#F05941]/30">
                        <CheckCircle size={38} className="text-white" />
                      </div>
                      <div>
                        <div className="text-6xl font-black text-[#F05941] mb-2">
                          {totalScore}/{MAX_SCORE}
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">
                          Alta fricción operativa detectada
                        </h3>
                        <p className="text-white/55 leading-relaxed max-w-md mx-auto">
                          Tu operación tiene un potencial de mejora significativo. 
                          Nuestro equipo puede identificar rápidamente dónde están los 
                          cuellos de botella y diseñar un plan de acción en 2 semanas.
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3 mt-2">
                        <a
                          id="survey-wa-high-cta"
                          href={waLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary text-base px-7 py-3.5"
                        >
                          <MessageCircle size={18} />
                          Agendar sesión estratégica
                        </a>
                        <button onClick={handleReset} className="btn-outline px-5 py-3.5 text-sm">
                          <RotateCcw size={15} />
                          Reiniciar
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#872341] to-[#BE3144] flex items-center justify-center shadow-lg">
                        <BookOpen size={38} className="text-white" />
                      </div>
                      <div>
                        <div className="text-6xl font-black text-[#BE3144] mb-2">
                          {totalScore}/{MAX_SCORE}
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">
                          Fricción moderada detectada
                        </h3>
                        <p className="text-white/55 leading-relaxed max-w-md mx-auto">
                          Tu operación muestra señales de mejora pero aún no está en zona crítica.
                          Te enviamos una guía gratuita con los 5 pilares de optimización 
                          que más impacto tienen en empresas como la tuya.
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3 mt-2">
                        <a
                          id="survey-wa-low-cta"
                          href={waLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary text-base px-7 py-3.5"
                        >
                          <MessageCircle size={18} />
                          Recibir guía gratuita
                        </a>
                        <button onClick={handleReset} className="btn-outline px-5 py-3.5 text-sm">
                          <RotateCcw size={15} />
                          Reiniciar
                        </button>
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
