"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { waLink } from "@/lib/site";
import { ChevronRight, ChevronLeft, CheckCircle, BookOpen, MessageCircle, RotateCcw } from "lucide-react";

const questions = [
  {
    id: 1,
    question: "¿Dónde guardas hoy la información de tus productos, clientes y ventas?",
    options: [
      { text: "En cuadernos, chats y en mi memoria", score: 3 },
      { text: "En algunas hojas de cálculo, pero separadas o desordenadas", score: 2 },
      { text: "En un solo lugar organizado y actualizado", score: 1 },
    ],
  },
  {
    id: 2,
    question: "Cuando un cliente pregunta por un producto, ¿qué tan rápido sabes si hay existencias y a qué precio?",
    options: [
      { text: "Tengo que buscar o contar; a veces me equivoco", score: 3 },
      { text: "Lo sé, pero me toma un rato confirmarlo", score: 2 },
      { text: "Lo sé al instante", score: 1 },
    ],
  },
  {
    id: 3,
    question: "¿Cómo llevas el control de pedidos que llegan por WhatsApp, Instagram u otros canales?",
    options: [
      { text: "Se quedan en los chats y a veces se me pierden", score: 3 },
      { text: "Los anoto, pero sin un seguimiento claro", score: 2 },
      { text: "Tengo un registro con el estado de cada pedido", score: 1 },
    ],
  },
  {
    id: 4,
    question: "¿Sabes cuánto vendiste y cuánto ganaste el mes pasado?",
    options: [
      { text: "No, lo calculo más o menos", score: 3 },
      { text: "Sí, pero tengo que sacar cuentas a mano", score: 2 },
      { text: "Sí, lo veo en un reporte o tablero", score: 1 },
    ],
  },
  {
    id: 5,
    question: "¿Cuánto tiempo dedicas a la semana a tareas repetitivas (copiar datos, sacar cuentas, responder lo mismo)?",
    options: [
      { text: "Más de 5 horas", score: 3 },
      { text: "Entre 2 y 5 horas", score: 2 },
      { text: "Menos de 2 horas", score: 1 },
    ],
  },
  {
    id: 6,
    question: "Si mañana tus ventas se duplicaran, ¿qué pasaría?",
    options: [
      { text: "No daría abasto: todo depende de mí y de hacerlo a mano", score: 3 },
      { text: "Lo lograría, pero con mucho esfuerzo extra", score: 2 },
      { text: "Estoy preparado: tengo procesos y herramientas para crecer", score: 1 },
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

  const waHref = waLink(
    isHighFriction
      ? `Hola Optexa 👋 Hice la evaluación de la web y obtuve ${totalScore}/${MAX_SCORE}. Me gustaría agendar un Diagnóstico Express para mi negocio.`
      : `Hola Optexa 👋 Hice la evaluación de la web y obtuve ${totalScore}/${MAX_SCORE}. Me gustaría recibir recomendaciones para seguir mejorando mi negocio.`
  );

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
            Evaluación gratuita
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#22092C] leading-tight">
            ¿Qué tan organizado{" "}<br className="hidden md:block" />
            está tu negocio?
          </h2>
          <p className="mt-4 text-lg text-[#22092C]/70 max-w-xl mx-auto leading-relaxed">
            6 preguntas, 3 minutos. Una mirada rápida y honesta a cómo funciona hoy tu negocio.
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
                  <Image src="/isotipo.png" alt="" aria-hidden="true" width={80} height={80} className="w-20 h-20" />
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      Evaluación de orden y control
                    </h3>
                    <p className="text-white/55 leading-relaxed max-w-md mx-auto">
                      Responde 6 preguntas sobre tu negocio. Al final verás tu resultado y
                      podrás escribirnos por WhatsApp para conversar sobre los siguientes pasos.
                    </p>
                  </div>
                  <button
                    id="survey-start-btn"
                    onClick={handleStart}
                    className="btn-primary text-base px-8 py-3.5 mt-2"
                  >
                    Comenzar evaluación
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
                    <span className="text-white/60 text-sm">{Math.round(progress)}% completado</span>
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
                        aria-pressed={selected === opt.score}
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
                          Tu negocio tiene mucho por ganar
                        </h3>
                        <p className="text-white/55 leading-relaxed max-w-md mx-auto">
                          Hay varias tareas que hoy te quitan tiempo y se pueden ordenar o
                          simplificar. El siguiente paso es un Diagnóstico Express para
                          conocer tu operación y priorizar las mejoras.
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3 mt-2">
                        <a
                          id="survey-wa-high-cta"
                          href={waHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary text-base px-7 py-3.5"
                        >
                          <MessageCircle size={18} />
                          Agendar Diagnóstico Express
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
                          Vas por buen camino
                        </h3>
                        <p className="text-white/55 leading-relaxed max-w-md mx-auto">
                          Tu negocio ya tiene una base de orden. Aun así, siempre hay
                          oportunidades para conectar mejor la información y ahorrar tiempo.
                          Escríbenos y te contamos por dónde empezar.
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3 mt-2">
                        <a
                          id="survey-wa-low-cta"
                          href={waHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary text-base px-7 py-3.5"
                        >
                          <MessageCircle size={18} />
                          Hablar con Optexa
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

        <p className="mt-6 text-center text-sm text-[#22092C]/70">
          Tus respuestas no se guardan en esta página. Si nos escribes por WhatsApp, tratamos tus
          datos según nuestra{" "}
          <Link href="/privacidad" className="underline text-[#22092C] hover:text-[#F05941]">
            Política de tratamiento de datos
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
