import { X, MapPin, Music, Camera, Heart } from "lucide-react";
import { Memory } from "@/src/types/memory";
import { AnimatePresence, motion } from "framer-motion";
import { formartDate } from "@/src/lib/formartDate";
import { useEffect, useRef } from "react";

// Cor tema cosmos fixa
const THEME_COLOR = "#c084fc";

const PLAYLIST = [
  "/music/track1.mp3",
  "/music/track2.mp3",
  "/music/track3.mp3",
  "/music/track4.mp3",
  "/music/track5.mp3",
];

interface MemoryDetailModalProps {
  memory: Memory | null;
  onClose: () => void;
}

export function MemoryDetailModal({ memory, onClose }: MemoryDetailModalProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!memory) return;

    // pausa música de fundo
    window.backgroundAudio?.pause();

    const track = PLAYLIST[Math.floor(Math.random() * PLAYLIST.length)];

    const audio = new Audio(track);

    audio.loop = true;
    audio.volume = 0;

    audioRef.current = audio;

    audio.play().catch(() => {});

    let vol = 0;

    const fadeIn = setInterval(() => {
      vol = Math.min(vol + 0.05, 0.4);

      audio.volume = vol;

      if (vol >= 0.4) {
        clearInterval(fadeIn);
      }
    }, 80);

    return () => {
      clearInterval(fadeIn);

      let v = audio.volume;

      const fadeOut = setInterval(() => {
        v = Math.max(v - 0.05, 0);

        audio.volume = v;

        if (v <= 0) {
          clearInterval(fadeOut);

          audio.pause();
          audio.currentTime = 0;

          // volta música de fundo
          window.backgroundAudio?.play().catch(() => {});
        }
      }, 60);
    };
  }, [memory]);

  return (
    <AnimatePresence>
      {memory && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50"
            style={{
              backgroundColor: "rgba(5, 2, 16, 0.85)",
              backdropFilter: "blur(12px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ type: "spring", damping: 22, stiffness: 280 }}
          >
            <div
              className="relative w-full max-w-sm rounded-[32px] overflow-hidden"
              style={{
                backgroundColor: "#120828",
                boxShadow: `0 0 60px ${THEME_COLOR}44, 0 32px 64px rgba(0,0,0,0.7)`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: "rgba(0,0,0,0.5)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <X className="w-4 h-4 text-white" />
              </button>

              {/* Photo Area */}
              {memory.photo ? (
                <motion.div
                  className="relative w-full"
                  style={{ height: "180px" }}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <img
                    src={memory.photo}
                    alt={memory.title}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to bottom, transparent 40%, #120828 100%)",
                    }}
                  />
                </motion.div>
              ) : (
                <div
                  className="w-full h-52 flex flex-col items-center justify-center gap-3"
                  style={{
                    background: `linear-gradient(135deg, ${THEME_COLOR}33, ${THEME_COLOR}11)`,
                  }}
                >
                  <Camera
                    className="w-14 h-14 opacity-25"
                    style={{ color: THEME_COLOR }}
                  />
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: THEME_COLOR,
                      opacity: 0.5,
                    }}
                  >
                    Sem foto
                  </span>
                </div>
              )}

              {/* Content */}
              <div
                className="px-6 pb-8"
                style={{ marginTop: memory.photo ? "-24px" : "0" }}
              >
                {/* Date Badge */}
                <motion.div
                  className="inline-flex items-center mt-4 px-3 py-1 rounded-full mb-3"
                  style={{
                    backgroundColor: `${THEME_COLOR}22`,
                    border: `1px solid ${THEME_COLOR}44`,
                  }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <span
                    style={{
                      fontSize: "0.7rem",
                      color: THEME_COLOR,
                      letterSpacing: "0.05em",
                    }}
                  >
                    {formartDate(memory.date)}
                  </span>
                </motion.div>

                {/* Title */}
                <motion.h2
                  className="mb-2 leading-tight"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: "#f0e6ff",
                  }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {memory.title}
                </motion.h2>

                {/* Location */}
                <motion.div
                  className="flex items-center gap-1.5 mb-4"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <MapPin
                    className="w-3.5 h-3.5 flex-shrink-0"
                    style={{ color: THEME_COLOR }}
                  />
                  <span style={{ fontSize: "0.8rem", color: "#9d7fc0" }}>
                    {memory.location}
                  </span>
                </motion.div>

                {/* Divider */}
                <div
                  className="w-full h-px mb-4"
                  style={{
                    background: `linear-gradient(90deg, ${THEME_COLOR}44, transparent)`,
                  }}
                />

                {/* Description */}
                <motion.p
                  className="mb-5 leading-relaxed"
                  style={{
                    fontSize: "0.875rem",
                    color: "#c4aada",
                    lineHeight: "1.65",
                  }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {memory.description}
                </motion.p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
