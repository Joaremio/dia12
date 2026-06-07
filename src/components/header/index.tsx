"use client";

import { useMemories } from "@/src/context/MemoriesContext";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { useState } from "react";

function HeartButton() {
  const [clicked, setClicked] = useState(false);
  const [key, setKey] = useState(0);

  function handleClick() {
    setClicked(true);
    setKey((k) => k + 1);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.3 },
      colors: ["#c084fc", "#f472b6", "#818cf8", "#fcd97d"],
      scalar: 0.85,
    });
    setTimeout(() => setClicked(false), 420);
  }

  return (
    <div className="relative flex items-center justify-center mb-1">
      {/* Anel pulsante */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 44,
          height: 44,
          background:
            "radial-gradient(circle, rgba(244,114,182,0.18) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.7, 1], opacity: [0.7, 0, 0.7] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.button
        onClick={handleClick}
        className="relative focus:outline-none"
        animate={clicked ? { scale: [1, 1.3, 1] } : { scale: [1, 1.08, 1] }}
        transition={
          clicked
            ? { duration: 0.38 }
            : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <Heart
          className="w-9 h-9"
          style={{
            fill: "#f472b6",
            stroke: "none",
            filter: "drop-shadow(0 0 10px rgba(244,114,182,0.5))",
          }}
        />

        {/* Mini coracao dourado subindo ao clicar */}
        <AnimatePresence>
          {clicked && (
            <motion.span
              key={key}
              className="absolute pointer-events-none select-none"
              style={{
                color: "#fcd97d",
                fontSize: 10,
                top: -8,
                left: "50%",
                translateX: "-50%",
              }}
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 0, y: -22 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              ♥
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

// Chuva de corações — posições fixas para não travar na hidratação
const RAIN = [
  { x: "3%", delay: 0, dur: 4.2, size: 14, opacity: 0.45 },
  { x: "11%", delay: 1.1, dur: 3.8, size: 10, opacity: 0.35 },
  { x: "19%", delay: 0.4, dur: 4.8, size: 18, opacity: 0.38 },
  { x: "28%", delay: 2.0, dur: 3.5, size: 11, opacity: 0.3 },
  { x: "36%", delay: 0.8, dur: 4.4, size: 16, opacity: 0.4 },
  { x: "45%", delay: 1.5, dur: 3.9, size: 10, opacity: 0.32 },
  { x: "54%", delay: 0.2, dur: 4.6, size: 20, opacity: 0.35 },
  { x: "62%", delay: 1.8, dur: 3.6, size: 12, opacity: 0.38 },
  { x: "70%", delay: 0.6, dur: 4.2, size: 15, opacity: 0.42 },
  { x: "78%", delay: 2.3, dur: 3.8, size: 10, opacity: 0.3 },
  { x: "86%", delay: 1.0, dur: 4.5, size: 18, opacity: 0.38 },
  { x: "94%", delay: 0.3, dur: 3.7, size: 13, opacity: 0.4 },
];

export function Header() {
  const { memories } = useMemories();

  return (
    <div
      className="sticky top-0 z-50 overflow-hidden py-3"
      style={{
        background:
          "linear-gradient(160deg, #2d1040 0%, #0d0620 55%, #1a0535 100%)",
        borderBottom: "1px solid rgba(192,132,252,0.08)",
      }}
    >
      {/* Linha de brilho no topo */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 5%, #c084fc55 40%, #f472b644 60%, transparent 95%)",
        }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Chuva de corações */}
      {RAIN.map((h, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none select-none"
          style={{
            left: h.x,
            top: "-16px",
            fontSize: h.size,
            color: i % 2 === 0 ? "#f472b6" : "#c084fc",
            opacity: 0,
          }}
          animate={{
            y: ["0px", "140px"],
            opacity: [0, h.opacity, h.opacity, 0],
            rotate: [0, i % 2 === 0 ? 12 : -12],
          }}
          transition={{
            duration: h.dur,
            repeat: Infinity,
            delay: h.delay,
            ease: "easeIn",
            times: [0, 0.15, 0.8, 1],
          }}
        >
          ♥
        </motion.div>
      ))}

      {/* Conteúdo */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[40px] px-2">
        {/* Coração clicável */}
        <HeartButton />

        {/* Nomes */}
        <motion.h1
          className="mt-2 mb-2 text-center"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 600,
            fontSize: "clamp(1.75rem, 7.5vw, 2.8rem)",
            background:
              "linear-gradient(90deg, #f9a8d4, #c084fc, #818cf8, #f9a8d4)",
            backgroundSize: "250% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            lineHeight: 1.15,
          }}
          animate={{ backgroundPosition: ["0% center", "250% center"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        >
          Neto &amp; Pedro
        </motion.h1>

        {/* Subtítulo */}
        <p
          className="mb-2 tracking-widest uppercase text-center opacity-75"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.62rem",
            color: "#9d7fc0",
            letterSpacing: "0.15em",
          }}
        >
          uma linha invisível com fotos da vida que criamos
        </p>

        {/* Divisor */}
        <div className="flex items-center gap-2 mb-2 w-full max-w-[180px]">
          <div
            className="flex-1 h-px"
            style={{
              background: "linear-gradient(90deg, transparent, #4d3070)",
            }}
          />
          <span style={{ color: "#c084fc", fontSize: 8, opacity: 0.5 }}>✦</span>
          <div
            className="flex-1 h-px"
            style={{
              background: "linear-gradient(90deg, #4d3070, transparent)",
            }}
          />
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 text-center">
          <div>
            <p
              className="text-2xl font-medium leading-none mb-0.5"
              style={{ color: "#c084fc" }}
            >
              {memories.length}
            </p>
            <p
              className="text-[10px] uppercase tracking-widest"
              style={{ color: "#9d7fc0" }}
            >
              memórias
            </p>
          </div>

          <div className="h-6 w-px" style={{ backgroundColor: "#4d3070" }} />

          <div>
            <p
              className="text-2xl font-medium leading-none mb-0.5"
              style={{ color: "#f472b6" }}
            >
              ∞
            </p>
            <p
              className="text-[10px] uppercase tracking-widest"
              style={{ color: "#9d7fc0" }}
            >
              sorrisos
            </p>
          </div>

          <div className="h-6 w-px" style={{ backgroundColor: "#4d3070" }} />

          <div>
            <p
              className="text-2xl font-medium leading-none mb-0.5"
              style={{ color: "#818cf8" }}
            >
              1
            </p>
            <p
              className="text-[10px] uppercase tracking-widest"
              style={{ color: "#9d7fc0" }}
            >
              história
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
