import { X, MapPin, Music, Camera, Heart } from "lucide-react";
import { Memory } from "@/src/types/memory";
import { AnimatePresence, motion } from "framer-motion";
import { formartDate } from "@/src/lib/formartDate";
import { useEffect, useRef } from "react";

const THEME_COLOR = "#c084fc";
const PINK = "#f472b6";

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

// Corações flutuando dentro do modal
function ModalHearts() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[32px]">
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${15 + i * 22}%`,
            bottom: "-10px",
            fontSize: `${8 + (i % 2) * 5}px`,
            color: i % 2 === 0 ? THEME_COLOR : PINK,
            opacity: 0,
          }}
          animate={{
            y: [0, -280],
            opacity: [0, 0.3, 0],
            x: [(i % 2 === 0 ? 1 : -1) * 10],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            delay: i * 2,
            ease: "easeOut",
          }}
        >
          ♥
        </motion.div>
      ))}
    </div>
  );
}

export function MemoryDetailModal({ memory, onClose }: MemoryDetailModalProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!memory) return;

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
      if (vol >= 0.4) clearInterval(fadeIn);
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
              backgroundColor: "rgba(5, 2, 16, 0.9)",
              backdropFilter: "blur(16px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal wrapper */}
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center p-12 pt-12"
            initial={{ opacity: 0, scale: 0.75, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.75, y: 40 }}
            transition={{ type: "spring", damping: 24, stiffness: 300 }}
          >
            <div
              className="relative w-full max-w-sm rounded-4xl overflow-hidden"
              style={{
                backgroundColor: "#120828",
                boxShadow: `0 0 0 1px ${THEME_COLOR}33, 0 0 60px ${THEME_COLOR}33, 0 32px 64px rgba(0,0,0,0.8)`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <ModalHearts />

              {/* Close Button */}
              <motion.button
                onClick={onClose}
                className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: "rgba(0,0,0,0.6)",
                  backdropFilter: "blur(8px)",
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-3.5 h-3.5 text-white" />
              </motion.button>

              {/* Photo */}
              {memory.photo ? (
                <motion.div
                  className="relative w-full aspect-[4/5] overflow-hidden"
                  initial={{ scale: 1.08 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <img
                    src={memory.photo}
                    alt={memory.title}
                    className="w-full h-full object-cover object-center"
                  />
                </motion.div>
              ) : (
                <div
                  className="w-full h-40 flex flex-col items-center justify-center gap-2"
                  style={{
                    background: `linear-gradient(135deg, ${THEME_COLOR}33, ${THEME_COLOR}11)`,
                  }}
                >
                  <Camera
                    className="w-10 h-10 opacity-20"
                    style={{ color: THEME_COLOR }}
                  />
                  <span
                    style={{
                      fontSize: "0.7rem",
                      color: THEME_COLOR,
                      opacity: 0.5,
                    }}
                  >
                    Sem foto
                  </span>
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
                    textShadow: `0 0 30px ${THEME_COLOR}44`,
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

                <div className="flex items-center justify-between">
                  {/* Date badge */}
                  <motion.div
                    className="inline-flex items-center bg-secondary mt-2 px-2.5 py-0.5 rounded-full mb-2"
                    style={{
                      border: `1px solid ${THEME_COLOR}44`,
                    }}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    <span
                      className="text-accent font-extrabold"
                      style={{
                        fontSize: "0.6rem",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {formartDate(memory.date)}
                    </span>
                  </motion.div>

                  {/* Location */}
                  <motion.div
                    className="flex items-center gap-1  "
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    <MapPin size={8} className="text-accent font-extrabold" />
                    <span
                      style={{ fontSize: "0.7rem" }}
                      className="text-accent font-extrabold"
                    >
                      {memory.location}
                    </span>
                  </motion.div>
                </div>

                {/* Divider animado */}
                <motion.div
                  className="w-full h-px mb-2.5"
                  style={{
                    background: `linear-gradient(90deg, ${PINK}66, ${THEME_COLOR}44, transparent)`,
                  }}
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
