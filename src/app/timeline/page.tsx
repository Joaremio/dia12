"use client";

import { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Camera, MapPin, Music, Heart } from "lucide-react";
import { Memory } from "@/src/types/memory";
import { saveMemory } from "@/src/services/memoryService";
import MemoryDialog from "@/src/components/MemoryDialog";
import { MemoryDetailModal } from "@/src/components/MemoryDetailModal";
import { formartDate } from "@/src/lib/formartDate";
import { useMemories } from "@/src/context/MemoriesContext";

// Partículas de coração flutuando no fundo
function FloatingHearts() {
  const hearts = Array.from({ length: 6 });
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-400 opacity-20 select-none"
          style={{
            left: `${10 + i * 15}%`,
            fontSize: `${10 + (i % 3) * 6}px`,
            bottom: "-20px",
          }}
          animate={{
            y: [0, -700],
            x: [0, (i % 2 === 0 ? 1 : -1) * (20 + i * 8)],
            opacity: [0, 0.25, 0],
            rotate: [0, i % 2 === 0 ? 20 : -20],
          }}
          transition={{
            duration: 8 + i * 1.5,
            repeat: Infinity,
            delay: i * 1.8,
            ease: "easeInOut",
          }}
        >
          ♥
        </motion.div>
      ))}
    </div>
  );
}

// Ponto brilhante da timeline
function GlowDot({ color }: { color: string }) {
  return (
    <motion.div
      className="absolute -left-[2.25rem] top-5 w-4 h-4 rounded-full"
      style={{ backgroundColor: color }}
      animate={{
        boxShadow: [
          `0 0 6px ${color}55`,
          `0 0 18px ${color}cc`,
          `0 0 6px ${color}55`,
        ],
        scale: [1, 1.15, 1],
      }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

// Card individual com efeito de tilt no toque
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
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, x: -30 }}
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
        className="rounded-[20px] overflow-hidden cursor-pointer"
        style={{
          background: "linear-gradient(145deg, var(--card), #1a0a2e)",
          boxShadow: `0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px ${color}22`,
        }}
        whileHover={{
          scale: 1.02,
          boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 0 1.5px ${color}55`,
        }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onClick={onClick}
      >
        {/* Photo */}
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
            {/* Gradiente inferior */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            {/* Coração no canto */}
            <motion.div
              className="absolute top-2.5 right-2.5"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Heart className="w-4 h-4 fill-pink-400 text-pink-400 drop-shadow" />
            </motion.div>
          </div>
        ) : (
          <div
            className="h-20 flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${color}22, ${color}08)`,
            }}
          >
            <Camera className="w-6 h-6 opacity-25 text-muted-foreground" />
          </div>
        )}

        {/* Content */}
        <div className="py-2 px-4 pb-4">
          {/* Title */}
          <motion.h2
            className=" text-xl text-accent py-2 leading-tight"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
            }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {memory.title}
          </motion.h2>

          {/* Description */}
          <motion.p
            className="leading-relaxed py-2 text-[#fcd97d] font-semibold"
            style={{
              fontSize: "0.78rem",
            }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            {memory.description}
          </motion.p>

          {/* Divider animado */}
          <motion.div
            className="w-full h-px mb-2.5"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Timeline() {
  const { memories, setMemories, loading } = useMemories();
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  async function handleAddMemory(memory: Memory) {
    const saved = await saveMemory(memory);
    if (saved) setMemories((prev) => [...prev, saved]);
  }

  function onCloseMemoriesDetailsDialog() {
    setSelectedMemory(null);
  }

  const palette = [
    "var(--accent-purple)",
    "var(--accent-indigo)",
    "var(--accent-pink)",
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Heart className="w-8 h-8 text-pink-400 fill-pink-400" />
        </motion.div>
        <p className="text-muted-foreground text-xs tracking-widest uppercase">
          Carregando memórias...
        </p>
      </div>
    );
  }

  return (
    <>
      <FloatingHearts />

      <div className="relative px-4 py-8 pb-28 z-10">
        {/* Título */}
        <motion.h2
          className="mb-8 text-center uppercase tracking-widest font-dm-sans text-muted-foreground"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Nossa História
        </motion.h2>

        <div className="relative">
          {/* Linha vertical animada */}
          <motion.div
            className="absolute left-0 top-0 bottom-0 w-1 rounded-full"
            style={{
              background:
                "linear-gradient(to bottom, #c084fc, #818cf8, #f472b6)",
            }}
            initial={{ scaleY: 0, originY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
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
        </div>

        <MemoryDetailModal
          memory={selectedMemory}
          onClose={onCloseMemoriesDetailsDialog}
        />

        <MemoryDialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          onSave={handleAddMemory}
        />
      </div>

      {/* Botão adicionar */}
      {!selectedMemory && (
        <motion.button
          className="py-4 rounded-2xl text-white font-medium fixed bottom-24 left-4 right-4 z-50 flex items-center justify-center gap-2"
          style={{
            background: "linear-gradient(135deg, #c084fc, #f472b6)",
            boxShadow: "0 4px 32px rgba(192, 132, 252, 0.4)",
          }}
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          whileHover={{
            scale: 1.03,
            boxShadow: "0 6px 40px rgba(244, 114, 182, 0.5)",
          }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setIsOpen(true)}
        >
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Heart className="w-4 h-4 fill-white" />
          </motion.span>
          Adicionar Memória
        </motion.button>
      )}
    </>
  );
}
