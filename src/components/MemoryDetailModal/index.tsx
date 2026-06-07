import { X, MapPin, Camera, Heart } from "lucide-react";
import { Memory } from "@/src/types/memory";
import { AnimatePresence, motion } from "framer-motion";
import { formartDate } from "@/src/lib/formartDate";
import { useEffect, useRef, useState } from "react";

// Carrega Cormorant Garamond apenas no client
if (typeof document !== "undefined") {
  const id = "cormorant-font";
  if (!document.getElementById(id)) {
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&display=swap";
    document.head.appendChild(link);
  }
}

const THEME_COLOR = "#c084fc";
const PINK = "#f472b6";
const INDIGO = "#818cf8";

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

// ─── Partículas de entrada ─────────────────────────────────────────────────
const ENTRY_PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  angle: i * 30,
  dist: 60 + (i % 3) * 20,
  color: [THEME_COLOR, PINK, INDIGO][i % 3],
  size: i % 4 === 0 ? 4 : 3,
}));

function EntryBurst() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[60] flex items-center justify-center">
      {ENTRY_PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{ width: p.size, height: p.size, background: p.color }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: Math.cos((p.angle * Math.PI) / 180) * p.dist,
            y: Math.sin((p.angle * Math.PI) / 180) * p.dist,
            opacity: 0,
            scale: 0,
          }}
          transition={{ duration: 0.65, ease: "easeOut", delay: p.id * 0.015 }}
        />
      ))}
    </div>
  );
}

// ─── Corações flutuantes internos ──────────────────────────────────────────
const HEART_CFG = [
  { left: "12%", size: 9, dur: 7, delay: 0, dx: 12 },
  { left: "30%", size: 12, dur: 9, delay: 1.5, dx: -14 },
  { left: "55%", size: 8, dur: 8, delay: 0.7, dx: 10 },
  { left: "78%", size: 11, dur: 10, delay: 2.2, dx: -10 },
];

function ModalHearts() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[32px] z-0">
      {HEART_CFG.map((h, i) => (
        <motion.div
          key={i}
          className="absolute select-none"
          style={{
            left: h.left,
            bottom: -10,
            fontSize: h.size,
            color: i % 2 === 0 ? THEME_COLOR : PINK,
          }}
          animate={{
            y: [0, -300],
            x: [0, h.dx],
            opacity: [0, 0.28, 0.28, 0],
            rotate: [0, h.dx > 0 ? 12 : -12],
          }}
          transition={{
            duration: h.dur,
            repeat: Infinity,
            delay: h.delay,
            ease: "easeOut",
          }}
        >
          ♥
        </motion.div>
      ))}
    </div>
  );
}

// ─── Luz girando em torno do modal ────────────────────────────────────────
function OrbitGlow() {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        inset: -1,
        borderRadius: 32,
        background: `conic-gradient(from 0deg, transparent 60%, ${THEME_COLOR}55 80%, ${PINK}44 90%, transparent 100%)`,
        zIndex: 0,
      }}
      animate={{ rotate: 360 }}
      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
    />
  );
}

// ─── Brilho correndo no divisor ────────────────────────────────────────────
function ScanLine({ color, delay = 0 }: { color: string; delay?: number }) {
  return (
    <div className="relative w-full h-px my-3 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}55, transparent)`,
        }}
      />
      <motion.div
        className="absolute top-0 h-px w-10 rounded-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        }}
        animate={{ left: ["-10%", "110%"] }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          delay,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

// ─── Badge metálico ────────────────────────────────────────────────────────
function MetaBadge({
  icon,
  label,
  delay,
}: {
  icon: React.ReactNode;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: `1px solid ${THEME_COLOR}33`,
        backdropFilter: "blur(4px)",
      }}
      initial={{ opacity: 0, y: 8, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 260, damping: 20 }}
    >
      {icon}
      <span
        className="text-accent font-semibold"
        style={{ fontSize: "0.65rem", letterSpacing: "0.05em" }}
      >
        {label}
      </span>
    </motion.div>
  );
}

// ─── Coração pulsante sobre a foto ────────────────────────────────────────
function PhotoHeart() {
  const [liked, setLiked] = useState(false);

  return (
    <motion.button
      className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)" }}
      whileTap={{ scale: 0.85 }}
      onClick={() => setLiked((v) => !v)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={liked ? "liked" : "idle"}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: liked ? [1, 1.4, 1] : 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <Heart
            className="w-3.5 h-3.5"
            style={{ color: PINK, fill: liked ? PINK : "transparent" }}
          />
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}

// ─── Título com shimmer ────────────────────────────────────────────────────
function ShimmerTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative inline-block py-2 w-full overflow-hidden">
      {/* Texto base legível */}
      <h2
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 600,
          fontSize: "clamp(1.55rem, 5.5vw, 1.85rem)",
          lineHeight: 1.2,
          color: "#fcd97d",
          margin: 0,
          textShadow: `0 0 28px rgba(252,217,125,0.35)`,
          letterSpacing: "0.01em",
        }}
      >
        {children}
      </h2>

      {/* Camada shimmer — luz que passa a cada ~4s */}
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "linear-gradient(105deg, transparent 35%, rgba(255,245,200,0.55) 50%, transparent 65%)",
          pointerEvents: "none",
          mixBlendMode: "screen",
        }}
        animate={{ x: ["-120%", "180%"] }}
        transition={{
          duration: 1.1,
          repeat: Infinity,
          repeatDelay: 3.8,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

// ─── Modal principal ───────────────────────────────────────────────────────
export function MemoryDetailModal({ memory, onClose }: MemoryDetailModalProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [showBurst, setShowBurst] = useState(false);

  useEffect(() => {
    if (!memory) return;
    setShowBurst(true);
    const t = setTimeout(() => setShowBurst(false), 700);

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
      clearTimeout(t);
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
          {/* Burst de entrada */}
          <AnimatePresence>{showBurst && <EntryBurst />}</AnimatePresence>

          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50"
            style={{
              backgroundColor: "rgba(5,2,16,0.88)",
              backdropFilter: "blur(18px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-[24rem]"
              initial={{ scale: 0.72, y: 48, rotateX: 8 }}
              animate={{ scale: 1, y: 0, rotateX: 0 }}
              exit={{ scale: 0.72, y: 48, rotateX: 8, opacity: 0 }}
              transition={{ type: "spring", damping: 22, stiffness: 280 }}
              style={{ perspective: 800 }}
            >
              {/* Glow orbital em torno do card */}
              <OrbitGlow />

              {/* Card */}
              <div
                className="relative rounded-[32px] overflow-hidden"
                style={{
                  backgroundColor: "#120828",
                  boxShadow: `0 0 0 1px ${THEME_COLOR}33, 0 0 80px ${THEME_COLOR}28, 0 32px 64px rgba(0,0,0,0.85)`,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <ModalHearts />

                {/* Botão fechar */}
                <motion.button
                  onClick={onClose}
                  className="absolute top-3 left-3 z-20 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: "rgba(0,0,0,0.55)",
                    backdropFilter: "blur(8px)",
                  }}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.25, type: "spring", stiffness: 300 }}
                  whileHover={{
                    scale: 1.12,
                    backgroundColor: "rgba(244,114,182,0.3)",
                  }}
                  whileTap={{ scale: 0.88 }}
                >
                  <X className="w-3.5 h-3.5 text-white" />
                </motion.button>

                {/* Foto */}
                {memory.photo ? (
                  <motion.div
                    className="relative w-full aspect-square overflow-hidden"
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                  >
                    <img
                      src={memory.photo}
                      alt={memory.title}
                      className="w-full h-full object-cover object-center"
                    />
                    {/* Gradiente */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#120828]/80 via-transparent to-transparent" />

                    {/* Reflexo no topo da foto */}
                    <motion.div
                      className="absolute top-0 left-0 right-0 h-px"
                      style={{
                        background: `linear-gradient(90deg, transparent 10%, ${THEME_COLOR}88 50%, transparent 90%)`,
                      }}
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />

                    <PhotoHeart />
                  </motion.div>
                ) : (
                  <motion.div
                    className="w-full h-44 flex flex-col items-center justify-center gap-2 relative overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${THEME_COLOR}33, ${THEME_COLOR}0a)`,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.div
                      className="absolute inset-0"
                      animate={{ opacity: [0.3, 0.7, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      style={{
                        background: `radial-gradient(ellipse at center, ${THEME_COLOR}22, transparent 70%)`,
                      }}
                    />
                    <Camera
                      className="w-10 h-10 opacity-20 relative z-10"
                      style={{ color: THEME_COLOR }}
                    />
                    <span
                      style={{
                        fontSize: "0.68rem",
                        color: THEME_COLOR,
                        opacity: 0.5,
                      }}
                    >
                      sem foto
                    </span>
                  </motion.div>
                )}

                {/* Conteúdo */}
                <div className="px-4 pb-5 pt-2 relative z-10">
                  {/* Título com shimmer */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.22, type: "spring", stiffness: 200 }}
                  >
                    <ShimmerTitle>{memory.title}</ShimmerTitle>
                  </motion.div>

                  {/* Descrição */}
                  <motion.p
                    className="leading-relaxed text-accent font-semibold"
                    style={{ fontSize: "0.78rem" }}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.32 }}
                  >
                    {memory.description}
                  </motion.p>

                  <ScanLine color={PINK} delay={0.5} />

                  {/* Meta: data + local */}
                  <div className="flex items-center justify-between flex-wrap gap-2 mt-1">
                    <MetaBadge
                      icon={
                        <Heart
                          className="w-2.5 h-2.5"
                          style={{ color: PINK }}
                        />
                      }
                      label={formartDate(memory.date)}
                      delay={0.38}
                    />
                    {memory.location && (
                      <MetaBadge
                        icon={
                          <MapPin
                            className="w-2.5 h-2.5"
                            style={{ color: THEME_COLOR }}
                          />
                        }
                        label={memory.location}
                        delay={0.44}
                      />
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
