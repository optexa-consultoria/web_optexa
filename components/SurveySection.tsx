"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { waLink, LEADS_URL } from "@/lib/site";
import { ChevronRight, ChevronLeft, CheckCircle, BookOpen, MessageCircle, RotateCcw, Send } from "lucide-react";

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

  const [sent, setSent] = useState(false);
  const nivel = isHighFriction ? "Mucho por ganar" : "Buen camino";

  // Guarda el lead en la Hoja Maestra (si hay LEADS_URL) y abre WhatsApp con el mensaje.
  const handleLead = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const utm = new URLSearchParams(location.search).get("utm_source");
    const lead = {
      ...f,
      autoriza: f.autoriza === "on",
      puntaje: totalScore,
      nivel,
      respuestas: answers.map((sc, i) => `P${i + 1}: ${questions[i].options.find((o) => o.score === sc)?.text}`).join(" | "),
      origen: utm || (document.referrer ? new URL(document.referrer).hostname : "directo"),
    };
    // text/plain evita el preflight CORS; sendBeacon sobrevive a la apertura de la nueva pestaña.
    if (LEADS_URL) navigator.sendBeacon(LEADS_URL, new Blob([JSON.stringify(lead)], { type: "text/plain" }));
    const saludo = `Hola Optexa 👋 Soy ${f.nombre}${f.negocio ? ` de ${f.negocio}` : ""}. Hice la evaluación de la web y obtuve ${totalScore}/${MAX_SCORE}.`;
    window.open(waLink(`${saludo} ${isHighFriction ? "Me gustaría agendar un Diagnóstico Express." : "Me gustaría recibir recomendaciones para mi negocio."}`), "_blank", "noopener");
    setSent(true);
  };

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
    setSent(false);
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
                  className="flex flex-col gap-5 items-center flex-1 justify-center"
                >
                  <div className="flex items-center gap-4 text-left">
                    <div className={`w-14 h-14 shrink-0 rounded-full bg-gradient-to-br ${isHighFriction ? "from-[#F05941]" : "from-[#872341]"} to-[#BE3144] flex items-center justify-center`}>
                      {isHighFriction ? <CheckCircle size={28} className="text-white" /> : <BookOpen size={28} className="text-white" />}
                    </div>
                    <div>
                      <div className={`text-4xl font-black ${isHighFriction ? "text-[#F05941]" : "text-[#BE3144]"}`}>
                        {totalScore}/{MAX_SCORE}
                      </div>
                      <h3 className="text-xl font-bold text-white">
                        {isHighFriction ? "Tu negocio tiene mucho por ganar" : "Vas por buen camino"}
                      </h3>
                    </div>
                  </div>
                  <p className="text-white/70 leading-relaxed max-w-md">
                    {isHighFriction
                      ? "Hay varias tareas que hoy te quitan tiempo y se pueden ordenar o simplificar. El siguiente paso es un Diagnóstico Express para conocer tu operación y priorizar las mejoras."
                      : "Tu negocio ya tiene una base de orden. Aun así, siempre hay oportunidades para conectar mejor la información y ahorrar tiempo."}
                  </p>

                  {sent ? (
                    <div role="status" className="w-full max-w-md rounded-2xl border border-white/15 bg-white/5 p-6">
                      <p className="text-white font-semibold mb-1">¡Gracias! Ya tenemos tus datos.</p>
                      <p className="text-white/70 text-sm">
                        Se abrió WhatsApp con tu mensaje listo; envíalo y te respondemos para acordar
                        la reunión. Si no se abrió,{" "}
                        <a href={waHref} target="_blank" rel="noopener noreferrer" className="underline text-white">
                          toca aquí
                        </a>
                        .
                      </p>
                      <button onClick={handleReset} className="btn-outline px-5 py-2.5 text-sm mt-4">
                        <RotateCcw size={15} />
                        Reiniciar
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleLead} className="w-full max-w-md text-left grid gap-3">
                      <p className="text-white font-semibold">
                        Déjanos tus datos y te escribimos para {isHighFriction ? "agendar tu Diagnóstico Express" : "darte recomendaciones"}:
                      </p>
                      <label className="grid gap-1 text-sm text-white/80">
                        Tu nombre
                        <input name="nombre" required maxLength={80} autoComplete="given-name" className="lead-input" />
                      </label>
                      <label className="grid gap-1 text-sm text-white/80">
                        WhatsApp
                        <input name="whatsapp" type="tel" required inputMode="tel" pattern="[0-9+ ]{7,16}" placeholder="300 123 4567" autoComplete="tel" className="lead-input" />
                      </label>
                      <label className="grid gap-1 text-sm text-white/80">
                        Nombre de tu negocio
                        <input name="negocio" required maxLength={80} autoComplete="organization" className="lead-input" />
                      </label>
                      <div className="grid sm:grid-cols-2 gap-3">
                        <label className="grid gap-1 text-sm text-white/80">
                          ¿Qué vendes? <span className="sr-only">(opcional)</span>
                          <select name="tipo" defaultValue="" className="lead-input">
                            <option value="">Elige (opcional)</option>
                            <option>Ropa y accesorios</option>
                            <option>Comida</option>
                            <option>Belleza</option>
                            <option>Servicios</option>
                            <option>Otro</option>
                          </select>
                        </label>
                        <label className="grid gap-1 text-sm text-white/80">
                          Ciudad <span className="sr-only">(opcional)</span>
                          <input name="ciudad" maxLength={40} placeholder="Opcional" autoComplete="address-level2" className="lead-input" />
                        </label>
                      </div>
                      <fieldset className="text-sm text-white/80">
                        <legend className="mb-1">Prefiero la reunión</legend>
                        <div className="flex flex-wrap gap-2">
                          {["Virtual", "Presencial", "Me da igual"].map((r) => (
                            <label key={r} className="flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2 cursor-pointer has-[:checked]:border-[#F05941] has-[:checked]:bg-[#F05941]/15">
                              <input type="radio" name="reunion" value={r} defaultChecked={r === "Me da igual"} className="accent-[#F05941]" />
                              {r}
                            </label>
                          ))}
                        </div>
                      </fieldset>
                      {/* Campo trampa para bots: invisible para personas */}
                      <input name="web" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
                      <label className="flex items-start gap-2 text-xs text-white/70 leading-relaxed">
                        <input type="checkbox" name="autoriza" required className="mt-0.5 accent-[#F05941]" />
                        <span>
                          Autorizo a Optexa a tratar mis datos para contactarme por WhatsApp, según la{" "}
                          <Link href="/privacidad" target="_blank" className="underline text-white">
                            Política de tratamiento de datos
                          </Link>
                          .
                        </span>
                      </label>
                      <div className="flex flex-col sm:flex-row gap-3 mt-1">
                        <button type="submit" id="survey-lead-submit" className="btn-primary text-base px-7 py-3.5">
                          <Send size={18} />
                          Enviar y abrir WhatsApp
                        </button>
                        <button type="button" onClick={handleReset} className="btn-outline px-5 py-3.5 text-sm">
                          <RotateCcw size={15} />
                          Reiniciar
                        </button>
                      </div>
                      <a href={waHref} target="_blank" rel="noopener noreferrer" className="text-xs text-white/60 underline flex items-center gap-1">
                        <MessageCircle size={13} /> Prefiero escribir por WhatsApp sin dejar datos
                      </a>
                    </form>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <p className="mt-6 text-center text-sm text-[#22092C]/70">
          Solo guardamos tus datos si los dejas al final y autorizas su uso. Los tratamos según nuestra{" "}
          <Link href="/privacidad" className="underline text-[#22092C] hover:text-[#F05941]">
            Política de tratamiento de datos
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
