"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Camera, MapPin, Music } from "lucide-react";
import { Memory } from "@/src/types/memory";
import { getMemories, saveMemory } from "@/src/services/memoryService";
import MemoryDialog from "@/src/components/MemoryDialog";

export default function Timeline() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function loadMemories() {
      const data = await getMemories();
      setMemories(data);
      setIsLoading(false);
    }

    loadMemories();
  }, []);

  async function handleAddMemory(memory: Memory) {
    const saved = await saveMemory(memory);
    if (saved) {
      setMemories((prev) => [...prev, saved]);
    }
  }

  const palette = [
    "var(--accent-purple)",
    "var(--accent-indigo)",
    "var(--accent-pink)",
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-muted-foreground text-sm">Carregando memórias...</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-8">
      <h2 className="mb-8 text-center uppercase tracking-widest font-dm-sans text-muted-foreground">
        Nossa História
      </h2>

      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-0 top-0 bottom-0 w-1 rounded-full bg-gradient-to-b from-purple-400 via-indigo-400 to-pink-400" />

        {/* Memory Cards */}
        <div className="space-y-8 ml-8">
          {memories.map((memory, index) => {
            const color = palette[index % palette.length];

            return (
              <motion.div
                key={memory.id}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
              >
                {/* Glowing Point */}
                <motion.div
                  className="absolute -left-[2.25rem] top-4 w-4 h-4 rounded-full"
                  style={{
                    backgroundColor: color,
                    boxShadow: `0 0 12px ${color}88`,
                  }}
                  animate={{
                    boxShadow: [
                      `0 0 12px ${color}55`,
                      `0 0 20px ${color}cc`,
                      `0 0 12px ${color}55`,
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Memory Card */}
                <motion.div
                  className="rounded-[24px] overflow-hidden bg-card"
                  whileHover={{ scale: 0.97 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {/* Photo Area */}
                  {memory.photo ? (
                    <img
                      src={memory.photo}
                      alt={memory.title}
                      className="w-full h-40 object-cover"
                    />
                  ) : (
                    <div
                      className="h-24 flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, var(--card), var(--card-secondary))`,
                      }}
                    >
                      <Camera className="w-8 h-8 opacity-30 text-muted-foreground" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-4">
                    {/* Date Badge */}
                    <div className="inline-block px-3 py-1 rounded-full mb-2 bg-muted text-muted-foreground text-xs">
                      {memory.date}
                    </div>

                    {/* Title */}
                    <h3 className="mb-1 text-card-foreground text-sm font-medium font-dm-sans">
                      {memory.title}
                    </h3>

                    {/* Location */}
                    <div className="flex items-center gap-1 mb-2">
                      <MapPin className="w-3 h-3 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">
                        {memory.location}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="mb-3 text-xs text-muted-foreground">
                      {memory.description}
                    </p>

                    {/* Music Chip */}
                    {memory.music && (
                      <div className="inline-flex items-center gap-2 px-3 py-2 rounded-[10px] bg-secondary">
                        <Music className="w-3 h-3 text-primary" />
                        <span className="text-xs text-card-foreground">
                          {memory.music.name} · {memory.music.artist}
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Add Memory Button */}
      <motion.button
        className="w-full mt-8 py-4 rounded-2xl text-white font-medium"
        style={{
          background: "linear-gradient(135deg, #c084fc, #f472b6)",
          boxShadow: "0 4px 24px rgba(192, 132, 252, 0.3)",
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(true)}
      >
        + Adicionar Memória
      </motion.button>

      <MemoryDialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onSave={handleAddMemory}
      />
    </div>
  );
}
