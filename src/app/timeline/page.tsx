"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Heart, Sparkles } from "lucide-react";
import { Memory } from "@/src/types/memory";
import { saveMemory } from "@/src/services/memoryService";
import MemoryDialog from "@/src/components/MemoryDialog";
import { MemoryDetailModal } from "@/src/components/MemoryDetailModal";
import { useMemories } from "@/src/context/MemoriesContext";

// ─── Estrelas fixas no fundo ───────────────────────────────────────────────
const STARS = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  top: `${(i * 41 + 7) % 100}%`,
  left: `${(i * 67 + 13) % 100}%`,
  size: i % 5 === 0 ? 2 : 1,
  delay: (i * 0.4) % 3,
}));

function StarField() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {STARS.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-purple-200"
          style={{ top: s.top, left: s.left, width: s.size, height: s.size }}
          animate={{ opacity: [0.1, 0.5, 0.1] }}
          transition={{
            duration: 3 + s.delay,
            repeat: Infinity,
            delay: s.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ─── Corações flutuantes ───────────────────────────────────────────────────
const HEART_CONFIG = [
  { left: "8%", size: 10, duration: 9, delay: 0, xRange: 18 },
  { left: "22%", size: 14, duration: 11, delay: 1.8, xRange: -22 },
  { left: "38%", size: 8, duration: 8, delay: 0.9, xRange: 14 },
  { left: "55%", size: 12, duration: 12, delay: 2.5, xRange: -18 },
  { left: "72%", size: 10, duration: 10, delay: 0.4, xRange: 20 },
  { left: "88%", size: 8, duration: 9, delay: 3, xRange: -12 },
];

function FloatingHearts() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {HEART_CONFIG.map((h, i) => (
        <motion.div
          key={i}
          className="absolute select-none text-pink-400"
          style={{ left: h.left, fontSize: h.size, bottom: "-20px" }}
          animate={{
            y: [0, -720],
            x: [0, h.xRange],
            opacity: [0, 0.22, 0.22, 0],
            rotate: [0, h.xRange > 0 ? 15 : -15],
          }}
          transition={{
            duration: h.duration,
            repeat: Infinity,
            delay: h.delay,
            ease: "easeInOut",
          }}
        >
          ♥
        </motion.div>
      ))}
    </div>
  );
}

// ─── Faíscas que saem do ponto da timeline ─────────────────────────────────
function GlowDot({ color }: { color: string }) {
  return (
    <div className="absolute -left-[2.25rem] top-5">
      {/* Anel externo pulsante */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor: color }}
        animate={{ scale: [1, 2.2, 1], opacity: [0.35, 0, 0.35] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Anel médio */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor: color }}
        animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
        transition={{
          duration: 2.4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.3,
        }}
      />
      {/* Dot central */}
      <motion.div
        className="relative w-4 h-4 rounded-full"
        style={{ backgroundColor: color }}
        animate={{
          boxShadow: [
            `0 0 4px ${color}66`,
            `0 0 16px ${color}cc, 0 0 32px ${color}44`,
            `0 0 4px ${color}66`,
          ],
        }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

// ─── Partícula de brilho ao abrir card ────────────────────────────────────
function SparkBurst({ color }: { color: string }) {
  const sparks = Array.from({ length: 6 }, (_, i) => ({
    angle: i * 60,
    dist: 28 + (i % 2) * 10,
  }));
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[20px]">
      {sparks.map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 3,
            height: 3,
            background: color,
            top: "50%",
            left: "50%",
          }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: Math.cos((s.angle * Math.PI) / 180) * s.dist,
            y: Math.sin((s.angle * Math.PI) / 180) * s.dist,
            opacity: 0,
            scale: 0,
          }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

// ─── Card de memória ───────────────────────────────────────────────────────
function MemoryCard({
  memory,
  index,
  color,
  onClick,
}: {
  memory: Memory;
  index: number;
  color: string;
  onClick: () => void;
}) {
  const [sparked, setSparked] = useState(false);

  function handleClick() {
    setSparked(true);
    setTimeout(() => setSparked(false), 600);
    onClick();
  }

  return (
    <motion.div
      className="relative max-w-sm"
      initial={{ opacity: 0, x: -32 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: index * 0.18,
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
    >
      <GlowDot color={color} />

      <motion.div
        className="rounded-[20px] overflow-hidden cursor-pointer relative"
        style={{
          background: "linear-gradient(145deg, var(--card), #1a0a2e)",
          boxShadow: `0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px ${color}22`,
        }}
        whileHover={{
          scale: 1.025,
          boxShadow: `0 8px 36px rgba(0,0,0,0.55), 0 0 0 1.5px ${color}66`,
        }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onClick={handleClick}
      >
        {/* Faíscas ao clicar */}
        <AnimatePresence>
          {sparked && <SparkBurst color={color} />}
        </AnimatePresence>

        {/* Reflexo de luz no topo do card */}
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none z-10"
          style={{
            background: `linear-gradient(90deg, transparent 10%, ${color}88 50%, transparent 90%)`,
          }}
        />

        {/* Foto */}
        {memory.photo ? (
          <div className="relative w-full aspect-square overflow-hidden">
            <motion.img
              src={memory.photo}
              alt={memory.title}
              className="w-full h-full object-cover object-center"
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

            {/* Coração pulsante */}
            <motion.div
              className="absolute top-2.5 right-2.5 bg-black/30 backdrop-blur-sm rounded-full p-1"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400" />
            </motion.div>
          </div>
        ) : (
          <div
            className="h-20 flex items-center justify-center relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${color}22, ${color}08)`,
            }}
          >
            {/* Brilho decorativo sem foto */}
            <motion.div
              className="absolute inset-0"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                background: `radial-gradient(ellipse at center, ${color}18, transparent 70%)`,
              }}
            />
            <Camera className="w-6 h-6 opacity-20 text-muted-foreground relative z-10" />
          </div>
        )}

        {/* Conteúdo */}
        <div className="py-2 px-4 pb-4">
          <motion.h2
            className="text-xl text-[#fcd97d] py-2 leading-tight"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700,
            }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.18 + 0.2 }}
          >
            {memory.title}
          </motion.h2>

          <motion.p
            className="leading-relaxed py-1 text-accent font-semibold"
            style={{ fontSize: "0.80rem" }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.18 + 0.32 }}
          >
            {memory.description}
          </motion.p>

          {/* Divisor animado com brilho */}
          <div className="relative my-2.5">
            <motion.div
              className="w-full h-px"
              style={{
                background: `linear-gradient(90deg, transparent, ${color}66, transparent)`,
              }}
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: index * 0.18 + 0.3, duration: 0.55 }}
            />
            {/* Brilho correndo pelo divisor */}
            <motion.div
              className="absolute top-0 h-px w-8 rounded-full"
              style={{
                left: "50%",
                transform: "translateX(-50%)",
                background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                opacity: 0.8,
              }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Loading ───────────────────────────────────────────────────────────────
function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="relative">
        <motion.div
          className="w-10 h-10 rounded-full"
          style={{
            border: "1.5px solid transparent",
            borderTopColor: "#c084fc",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-2"
          animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Heart className="w-full h-full text-pink-400 fill-pink-400" />
        </motion.div>
      </div>
      <p className="text-muted-foreground text-xs tracking-widest uppercase">
        Carregando memórias...
      </p>
    </div>
  );
}

// ─── Estado vazio ──────────────────────────────────────────────────────────
function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <motion.div
      className="flex flex-col items-center gap-4 py-16 text-center px-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Sparkles className="w-10 h-10 text-purple-400 opacity-60" />
      </motion.div>
      <p className="text-muted-foreground text-sm leading-relaxed">
        Nenhuma memória ainda.
        <br />
        <span className="text-purple-400">
          Adicione o primeiro momento especial de vocês ✨
        </span>
      </p>
    </motion.div>
  );
}

// ─── Page principal ────────────────────────────────────────────────────────
export default function Timeline() {
  const { memories, setMemories, loading } = useMemories();
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  async function handleAddMemory(memory: Memory) {
    const saved = await saveMemory(memory);
    if (saved) setMemories((prev) => [...prev, saved]);
  }

  const palette = [
    "var(--accent-purple)",
    "var(--accent-indigo)",
    "var(--accent-pink)",
  ];

  if (loading) return <LoadingState />;

  return (
    <>
      <StarField />
      <FloatingHearts />

      <div className="relative px-4 py-8 pb-28 z-10 flex flex-col justify-center items-center">
        {/* Título */}
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-1 font-dm-sans">
            tudo que vivemos
          </p>
          <h2
            className="text-2xl font-medium text-[#f0e6ff]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Nossa{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #c084fc, #f472b6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              História
            </span>
          </h2>
          {/* Underline decorativo */}
          <motion.div
            className="mx-auto mt-2 h-px w-24 rounded-full"
            style={{ background: "linear-gradient(90deg, #c084fc, #f472b6)" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          />
        </motion.div>

        {memories.length === 0 ? (
          <EmptyState onAdd={() => setIsOpen(true)} />
        ) : (
          <div className="relative w-full max-w-sm">
            {/* Linha vertical */}
            <motion.div
              className="absolute left-0 top-0 bottom-0 w-px rounded-full"
              style={{
                background:
                  "linear-gradient(to bottom, #c084fc, #818cf8, #f472b6)",
              }}
              initial={{ scaleY: 0, originY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1.1, ease: "easeOut" }}
            />
            {/* Luz correndo na linha */}
            <motion.div
              className="absolute left-0 w-px rounded-full"
              style={{
                height: 60,
                background:
                  "linear-gradient(to bottom, transparent, #f472b6cc, transparent)",
              }}
              animate={{ top: ["-10%", "110%"] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 1,
              }}
            />

            {/* Cards */}
            <div className="space-y-6 ml-8 pr-2">
              {memories.map((memory, index) => (
                <MemoryCard
                  key={memory.id}
                  memory={memory}
                  index={index}
                  color={palette[index % palette.length]}
                  onClick={() => setSelectedMemory(memory)}
                />
              ))}
            </div>

            {/* Estrela no fim da linha */}
            <motion.div
              className="absolute -left-[0.35rem] text-pink-400"
              style={{ bottom: -12, fontSize: 14 }}
              animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.2, 0.9] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              ✦
            </motion.div>
          </div>
        )}

        <MemoryDetailModal
          memory={selectedMemory}
          onClose={() => setSelectedMemory(null)}
        />
        <MemoryDialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          onSave={handleAddMemory}
        />
      </div>

      {/* Botão fixo */}
      {!selectedMemory && (
        <motion.button
          className="py-4 rounded-2xl font-medium fixed bottom-24 left-4 right-4 z-50 flex items-center justify-center gap-2 text-sm"
          style={{
            background: "linear-gradient(135deg, #c084fc, #f472b6)",
            boxShadow: "0 4px 28px rgba(192,132,252,0.45)",
            color: "#0d0620",
          }}
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          whileHover={{
            scale: 1.03,
            boxShadow: "0 6px 40px rgba(244,114,182,0.55)",
          }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setIsOpen(true)}
        >
          <motion.span
            animate={{ scale: [1, 1.35, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          >
            <Heart className="w-4 h-4 fill-current" />
          </motion.span>
          Adicionar Memória
        </motion.button>
      )}
    </>
  );
}
