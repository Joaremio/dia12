"use client";

import { addMonths, differenceInDays, differenceInMonths } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

const START_DATE = new Date("2025-11-09");
const ANNIVERSARY = new Date("2026-11-09");

const BG_HEARTS = [
  { x: "4%", delay: 0, dur: 5.2, size: 10, opacity: 0.15 },
  { x: "18%", delay: 1.3, dur: 4.5, size: 7, opacity: 0.12 },
  { x: "33%", delay: 0.5, dur: 5.8, size: 13, opacity: 0.13 },
  { x: "50%", delay: 2.0, dur: 4.8, size: 8, opacity: 0.11 },
  { x: "65%", delay: 0.8, dur: 5.4, size: 11, opacity: 0.14 },
  { x: "80%", delay: 1.6, dur: 4.6, size: 9, opacity: 0.12 },
  { x: "93%", delay: 0.2, dur: 5.0, size: 12, opacity: 0.13 },
];

function getTimeUntil(target: Date) {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

function getTimeTogether() {
  const today = new Date();
  const months = differenceInMonths(today, START_DATE);
  const after = addMonths(START_DATE, months);
  const days = differenceInDays(today, after);
  const total = differenceInDays(today, START_DATE);
  return { months, days, total };
}

// ─── Constelação de Touro ─────────────────────────────────────────────────

function TaurusConstellation() {
  const stars = [
    { cx: 28, cy: 24, r: 1.6 },
    { cx: 41, cy: 37, r: 2.8 },
    { cx: 47, cy: 48, r: 1.6 },
    { cx: 51, cy: 50, r: 1.6 },
    { cx: 47, cy: 56, r: 1.6 },
    { cx: 52, cy: 56, r: 2.8 },
    { cx: 42, cy: 56, r: 2.8 },
    { cx: 17, cy: 36, r: 1.6 },
    { cx: 60, cy: 61, r: 2.8 },
    { cx: 77, cy: 70, r: 2.8 },
  ];
  const lines = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 5],
    [5, 4],
    [4, 6],
    [6, 7],
    [5, 8],
    [8, 9],
  ];
  return (
    <svg
      viewBox="0 0 120 100"
      width="110"
      height="92"
      style={{ overflow: "visible" }}
    >
      {lines.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={stars[a].cx}
          y1={stars[a].cy}
          x2={stars[b].cx}
          y2={stars[b].cy}
          stroke="#c084fc"
          strokeWidth="0.7"
          strokeOpacity="0.35"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
        />
      ))}
      {stars.map((s, i) => (
        <motion.circle
          key={i}
          cx={s.cx}
          cy={s.cy}
          r={s.r}
          fill="#f0e6ff"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0.6, 1, 0.6], scale: 1 }}
          transition={{
            delay: i * 0.07,
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            filter: i === 0 ? "drop-shadow(0 0 3px #c084fc)" : undefined,
          }}
        />
      ))}
    </svg>
  );
}

// ─── Constelação de Câncer ────────────────────────────────────────────────

function CancerConstellation() {
  const stars = [
    { cx: 37, cy: 33, r: 2.8 },
    { cx: 50, cy: 48, r: 2.0 },
    { cx: 55, cy: 62, r: 2.8 },
    { cx: 90, cy: 74, r: 2.4 },
    { cx: 53, cy: 90, r: 2.8 },
  ];
  const lines = [
    [0, 1],
    [1, 2],
    [2, 3],
    [2, 4],
  ];
  return (
    <svg
      viewBox="0 0 120 100"
      width="110"
      height="92"
      style={{ overflow: "visible" }}
    >
      {lines.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={stars[a].cx}
          y1={stars[a].cy}
          x2={stars[b].cx}
          y2={stars[b].cy}
          stroke="#f472b6"
          strokeWidth="0.7"
          strokeOpacity="0.35"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
        />
      ))}
      {stars.map((s, i) => (
        <motion.circle
          key={i}
          cx={s.cx}
          cy={s.cy}
          r={s.r}
          fill="#f0e6ff"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0.6, 1, 0.6], scale: 1 }}
          transition={{
            delay: i * 0.07,
            duration: 2.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            filter: i === 3 ? "drop-shadow(0 0 3px #f472b6)" : undefined,
          }}
        />
      ))}
    </svg>
  );
}

// ─── Flip de número ────────────────────────────────────────────────────────
function FlipNum({ value, color }: { value: number; color: string }) {
  return (
    <div className="flex flex-col items-center" style={{ minWidth: 48 }}>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: -18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 18, opacity: 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.2rem, 9vw, 3rem)",
            fontWeight: 600,
            color,
            lineHeight: 1,
            display: "block",
          }}
        >
          {String(value).padStart(2, "0")}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────
export default function Home() {
  const [cd, setCd] = useState(getTimeUntil(ANNIVERSARY));
  const [tg, setTg] = useState(getTimeTogether());

  useEffect(() => {
    const id = setInterval(() => {
      setCd(getTimeUntil(ANNIVERSARY));
      setTg(getTimeTogether());
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="relative min-h-screen overflow-hidden flex flex-col items-center"
      style={{
        background: "#0d0620",
        fontFamily: "'DM Sans', sans-serif",
        paddingBottom: "7rem",
      }}
    >
      {/* Gradiente */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 45% at 50% 0%, rgba(192,132,252,0.13) 0%, transparent 65%), radial-gradient(ellipse 50% 35% at 85% 85%, rgba(244,114,182,0.08) 0%, transparent 60%)",
        }}
      />

      {/* Corações de fundo */}
      {BG_HEARTS.map((h, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none select-none"
          style={{
            left: h.x,
            top: "-14px",
            fontSize: h.size,
            color: i % 2 === 0 ? "#f472b6" : "#c084fc",
          }}
          animate={{
            y: ["0px", "100vh"],
            opacity: [0, h.opacity, h.opacity, 0],
          }}
          transition={{
            duration: h.dur,
            repeat: Infinity,
            delay: h.delay,
            ease: "easeIn",
            times: [0, 0.1, 0.85, 1],
          }}
        >
          ♥
        </motion.div>
      ))}

      <div className="relative z-10 w-full max-w-md px-5 pt-10 flex flex-col gap-10">
        {/* ── Constelações ── */}
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-end justify-center gap-6">
            {/* Touro */}
            <div className="flex flex-col items-center gap-1">
              <TaurusConstellation />
              <span
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#c084fc",
                  opacity: 0.7,
                }}
              >
                Touro
              </span>
            </div>

            {/* Coração central */}
            <motion.div
              className="mb-8"
              animate={{ scale: [1, 1.18, 1] }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Heart
                style={{
                  width: 22,
                  height: 22,
                  fill: "#f472b6",
                  stroke: "none",
                  filter: "drop-shadow(0 0 7px rgba(244,114,182,0.6))",
                }}
              />
            </motion.div>

            {/* Câncer */}
            <div className="flex flex-col items-center gap-1">
              <CancerConstellation />
              <span
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#f472b6",
                  opacity: 0.7,
                }}
              >
                Câncer
              </span>
            </div>
          </div>

          <p
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#9d7fc0",
              marginTop: -4,
            }}
          >
            09 de novembro de 2025
          </p>
        </motion.div>

        {/* ── Tempo juntos ── */}
        <motion.div
          className="flex flex-col gap-2"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-1">
            <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400" />
            <span
              style={{
                fontSize: "0.6rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#9d7fc0",
              }}
            >
              tempo juntos
            </span>
          </div>

          <p
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.7rem, 6.5vw, 2.1rem)",
              fontWeight: 500,
              color: "#f0e6ff",
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            {tg.months} meses e {tg.days} dias
          </p>
          <p style={{ fontSize: "0.78rem", color: "#9d7fc0" }}>
            {tg.total} dias de amor
          </p>

          {/* Divisor */}
          <div className="flex items-center gap-3 mt-3">
            <div
              className="flex-1 h-px"
              style={{
                background: "linear-gradient(90deg, transparent, #4d3070)",
              }}
            />
            <span style={{ color: "#4d3070", fontSize: 8 }}>✦</span>
            <div
              className="flex-1 h-px"
              style={{
                background: "linear-gradient(90deg, #4d3070, transparent)",
              }}
            />
          </div>
        </motion.div>

        {/* ── Countdown ── */}
        <motion.div
          className="flex flex-col items-center "
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="flex flex-col items-center gap-0.5">
            <span
              style={{
                fontSize: "0.6rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#9d7fc0",
              }}
            >
              1º aniversário · 09 nov 2026
            </span>
          </div>

          {/* Números grandes */}
          <div className="flex items-start justify-center gap-1 w-full">
            <div className="flex flex-col items-center">
              <FlipNum value={cd.days} color="#c084fc" />
              <span
                style={{
                  fontSize: "0.55rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#9d7fc0",
                  marginTop: 4,
                }}
              >
                dias
              </span>
            </div>
            <span
              style={{
                color: "#4d3070",
                fontSize: "2rem",
                lineHeight: "1",
                marginTop: 6,
                fontWeight: 300,
              }}
            >
              :
            </span>
            <div className="flex flex-col items-center">
              <FlipNum value={cd.hours} color="#a78bfa" />
              <span
                style={{
                  fontSize: "0.55rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#9d7fc0",
                  marginTop: 4,
                }}
              >
                horas
              </span>
            </div>
            <span
              style={{
                color: "#4d3070",
                fontSize: "2rem",
                lineHeight: "1",
                marginTop: 6,
                fontWeight: 300,
              }}
            >
              :
            </span>
            <div className="flex flex-col items-center">
              <FlipNum value={cd.minutes} color="#818cf8" />
              <span
                style={{
                  fontSize: "0.55rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#9d7fc0",
                  marginTop: 4,
                }}
              >
                min
              </span>
            </div>
            <span
              style={{
                color: "#4d3070",
                fontSize: "2rem",
                lineHeight: "1",
                marginTop: 6,
                fontWeight: 300,
              }}
            >
              :
            </span>
            <div className="flex flex-col items-center">
              <FlipNum value={cd.seconds} color="#f472b6" />
              <span
                style={{
                  fontSize: "0.55rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#9d7fc0",
                  marginTop: 4,
                }}
              >
                seg
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
