"use client";

import { useMemories } from "@/src/context/MemoriesContext";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";

import { Heart } from "lucide-react";
import { useState } from "react";

const particles = [
  { emoji: "✨", x: "10%", delay: 0 },
  { emoji: "💜", x: "25%", delay: 0.5 },
  { emoji: "🌸", x: "75%", delay: 1 },
  { emoji: "✨", x: "85%", delay: 1.5 },
  { emoji: "💜", x: "50%", delay: 0.8 },
  { emoji: "🌸", x: "40%", delay: 1.2 },
];

export function Header() {
  const [isClicked, setIsClicked] = useState(false);
  const { memories } = useMemories();

  const handleHeartClick = () => {
    setIsClicked(true);

    // Trigger confetti
    const colors = ["#c084fc", "#f472b6", "#818cf8"];
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.4 },
      colors: colors,
    });

    setTimeout(() => setIsClicked(false), 400);
  };

  return (
    <div
      className="sticky top-0 z-50 overflow-hidden py-2"
      style={{
        background: "linear-gradient(160deg, #2d1040, #0d0620, #1a0535)",
      }}
    >
      {/* Floating Particles */}
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl pointer-events-none"
          style={{ left: particle.x, top: "20%" }}
          animate={{
            y: [0, -20, 0],
            rotate: [-5, 5, -5],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        >
          {particle.emoji}
        </motion.div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[100px] px-4">
        {/* Heart Icon */}
        <motion.button
          onClick={handleHeartClick}
          className="mb-6 focus:outline-none"
          animate={isClicked ? { scale: [1, 1.4, 1] } : { scale: [1, 1.18, 1] }}
          transition={
            isClicked ? { duration: 0.4 } : { duration: 2, repeat: Infinity }
          }
        >
          <Heart
            className="w-16 h-16 "
            style={{
              fill: "#f472b6",
              stroke: "#f472b6",
              filter: "drop-shadow(0 0 20px rgba(244, 114, 182, 0.6))",
            }}
          />
        </motion.button>

        {/* Couple Names with Animated Gradient */}
        <motion.h1
          className="mb-2 text-center text-3xl sm:text-4xl md:text-5xl"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 500,
            background: "linear-gradient(90deg, #f9a8d4, #c084fc, #818cf8)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
          animate={{
            backgroundPosition: ["0% center", "200% center"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          Neto &amp; Pedro
        </motion.h1>

        {/* Subtitle */}
        <p
          className="mb-4 tracking-widest uppercase opacity-80"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.75rem",
            color: "#9d7fc0",
          }}
        >
          uma linha invisivél com fotos da vida que criamos
        </p>

        {/* Stats */}
        <div className="flex items-center gap-6 text-center">
          <div>
            <p className="text-2xl font-medium" style={{ color: "#c084fc" }}>
              {memories.length}
            </p>
            <p
              className="text-xs uppercase tracking-wide"
              style={{ color: "#9d7fc0" }}
            >
              memórias
            </p>
          </div>

          <div className="h-8 w-px" style={{ backgroundColor: "#4d3070" }} />

          <div>
            <p className="text-2xl font-medium" style={{ color: "#f472b6" }}>
              ∞
            </p>
            <p
              className="text-xs uppercase tracking-wide"
              style={{ color: "#9d7fc0" }}
            >
              sorrisos
            </p>
          </div>

          <div className="h-8 w-px" style={{ backgroundColor: "#4d3070" }} />

          <div>
            <p className="text-2xl font-medium" style={{ color: "#818cf8" }}>
              1
            </p>
            <p
              className="text-xs uppercase tracking-wide"
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
