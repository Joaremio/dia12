"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { categorias, Programa } from "@/src/data/programas";
import { todosOsProgramas } from "@/src/utils/flatten-programas";

const CORES_PARTICULA = ["#c084fc", "#f472b6", "#818cf8", "#e879f9", "#a78bfa"];

const ESTRELAS = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  size: i % 4 === 0 ? 2 : 1,
  top: `${(i * 37 + 5) % 100}%`,
  left: `${(i * 61 + 11) % 100}%`,
  opacity: 0.15 + (i % 3) * 0.1,
}));

function Particula({
  cor,
  top,
  left,
  dx,
}: {
  cor: string;
  top: string;
  left: string;
  dx: number;
}) {
  return (
    <motion.div
      style={{
        position: "absolute",
        width: 5,
        height: 5,
        borderRadius: "50%",
        background: cor,
        top,
        left,
        pointerEvents: "none",
        zIndex: 50,
      }}
      initial={{ opacity: 0, scale: 0, y: 0 }}
      animate={{ opacity: [0, 1, 0], scale: [0, 1.8, 0], y: -90, x: dx }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    />
  );
}

export default function Planos() {
  const [programa, setPrograma] = useState<Programa | null>(null);
  const [girando, setGirando] = useState(false);
  const [particulas, setParticulas] = useState<
    { cor: string; top: string; left: string; dx: number }[]
  >([]);
  const [historico, setHistorico] = useState<Programa[]>([]);
  const [filtro, setFiltro] = useState<string | null>(null);

  function sortear() {
    if (girando) return;
    setGirando(true);
    setPrograma(null);

    const fonte = filtro
      ? todosOsProgramas.filter((p) => p.categoria === filtro)
      : todosOsProgramas;

    setParticulas(
      Array.from({ length: 20 }, (_, i) => ({
        cor: CORES_PARTICULA[i % CORES_PARTICULA.length],
        top: `${45 + Math.random() * 15}%`,
        left: `${10 + Math.random() * 80}%`,
        dx: (Math.random() - 0.5) * 90,
      })),
    );
    setTimeout(() => setParticulas([]), 1000);

    setTimeout(() => {
      const novo = fonte[Math.floor(Math.random() * fonte.length)];
      setPrograma(novo);
      setHistorico((h) => [novo, ...h].slice(0, 5));
      setGirando(false);
    }, 700);
  }

  return (
    <div
      style={{
        minHeight: "100dvh",
        background: "#0d0620",
        fontFamily: "'DM Sans', sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "clamp(1.5rem, 5vw, 3rem) clamp(1rem, 4vw, 1.5rem)",
        paddingBottom: "6rem", // espaço para nav bottom
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Gradientes de fundo */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 40% at 50% -5%, rgba(192,132,252,0.18) 0%, transparent 65%), radial-gradient(ellipse 50% 35% at 90% 90%, rgba(244,114,182,0.1) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      {/* Estrelas estáticas */}
      {ESTRELAS.map((s) => (
        <div
          key={s.id}
          style={{
            position: "absolute",
            width: s.size,
            height: s.size,
            borderRadius: "50%",
            background: "#f0e6ff",
            top: s.top,
            left: s.left,
            opacity: s.opacity,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Partículas */}
      {particulas.map((p, i) => (
        <Particula key={i} {...p} />
      ))}

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 480,
        }}
      >
        {/* ── Header ── */}
        <motion.header
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          style={{
            textAlign: "center",
            marginBottom: "clamp(1.5rem, 4vw, 2.5rem)",
          }}
        >
          <p
            style={{
              color: "#9d7fc0",
              fontSize: "clamp(10px, 2.5vw, 12px)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginBottom: 8,
              margin: "0 0 8px",
            }}
          >
            o que fazer hoje?
          </p>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.75rem, 7vw, 2.6rem)",
              fontWeight: 500,
              color: "#f0e6ff",
              margin: 0,
              lineHeight: 1.15,
            }}
          >
            Programa do{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #c084fc, #f472b6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              casal
            </span>
          </h1>
        </motion.header>

        {/* ── Filtros ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.18 }}
          style={{
            display: "flex",
            gap: 6,
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "clamp(1rem, 3vw, 1.75rem)",
          }}
        >
          {[
            {
              label: "Todos",
              cor: "#c084fc",
              corBg: "rgba(192,132,252,0.12)",
              icone: "",
            },
            ...categorias,
          ].map((c, idx) => {
            const isAtivo = idx === 0 ? !filtro : filtro === c.label;
            return (
              <button
                key={c.label}
                onClick={() =>
                  setFiltro(
                    idx === 0 ? null : c.label === filtro ? null : c.label,
                  )
                }
                style={{
                  padding: "6px 14px",
                  borderRadius: 999,
                  border: `1px solid ${isAtivo ? c.cor : "#4d3070"}`,
                  background: isAtivo ? c.corBg : "transparent",
                  color: isAtivo ? c.cor : "#9d7fc0",
                  fontSize: "clamp(11px, 2.8vw, 13px)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  fontFamily: "'DM Sans', sans-serif",
                  whiteSpace: "nowrap",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                {c.icone ? `${c.icone} ` : ""}
                {c.label}
              </button>
            );
          })}
        </motion.div>

        {/* ── Card principal ── */}
        <div
          style={{
            background: "#1a0d35",
            border: "1px solid #4d3070",
            borderRadius: 20,
            padding: "clamp(1.25rem, 5vw, 2rem)",
            marginBottom: "clamp(0.75rem, 2.5vw, 1.25rem)",
            minHeight: "clamp(170px, 40vw, 220px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Brilho dinâmico */}
          <AnimatePresence>
            {programa && (
              <motion.div
                key={programa.titulo + "-glow"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `radial-gradient(ellipse 70% 55% at 50% 0%, ${programa.corBg} 0%, transparent 70%)`,
                  pointerEvents: "none",
                }}
              />
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {girando ? (
              <motion.div
                key="girando"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                style={{ textAlign: "center" }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 0.65,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    fontSize: "clamp(32px, 8vw, 42px)",
                    display: "inline-block",
                    marginBottom: 10,
                  }}
                >
                  ✨
                </motion.div>
                <p style={{ color: "#9d7fc0", fontSize: 13, margin: 0 }}>
                  sorteando...
                </p>
              </motion.div>
            ) : programa ? (
              <motion.div
                key={programa.titulo}
                initial={{ opacity: 0, y: 18, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -18, scale: 0.96 }}
                transition={{ duration: 0.38, ease: "easeOut" }}
                style={{
                  textAlign: "center",
                  position: "relative",
                  zIndex: 1,
                  width: "100%",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    padding: "4px 12px",
                    borderRadius: 999,
                    background: programa.corBg,
                    border: `1px solid ${programa.cor}44`,
                    color: programa.cor,
                    fontSize: "clamp(10px, 2.5vw, 11px)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: 14,
                  }}
                >
                  {programa.icone} {programa.categoria}
                </span>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(1.3rem, 5vw, 1.65rem)",
                    fontWeight: 500,
                    color: "#f0e6ff",
                    margin: "0 0 10px",
                    lineHeight: 1.25,
                  }}
                >
                  {programa.titulo}
                </h2>
                <p
                  style={{
                    color: "#9d7fc0",
                    fontSize: "clamp(13px, 3.2vw, 14px)",
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {programa.descricao}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="vazio"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ textAlign: "center" }}
              >
                <div
                  style={{
                    fontSize: "clamp(36px, 10vw, 48px)",
                    marginBottom: 10,
                  }}
                >
                  💫
                </div>
                <p
                  style={{
                    color: "#9d7fc0",
                    fontSize: "clamp(13px, 3.2vw, 14px)",
                    margin: 0,
                  }}
                >
                  clique no botão e descubra o programa de hoje
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Botão sortear ── */}
        <motion.button
          onClick={sortear}
          whileHover={{ scale: 1.025 }}
          whileTap={{ scale: 0.97 }}
          disabled={girando}
          style={{
            width: "100%",
            padding: "clamp(14px, 4vw, 17px)",
            borderRadius: 14,
            border: "none",
            background: girando
              ? "rgba(192,132,252,0.25)"
              : "linear-gradient(135deg, #c084fc 0%, #f472b6 100%)",
            color: girando ? "#9d7fc0" : "#0d0620",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            fontSize: "clamp(14px, 3.5vw, 15px)",
            cursor: girando ? "not-allowed" : "pointer",
            transition: "background 0.3s, color 0.3s",
            letterSpacing: "0.03em",
            WebkitTapHighlightColor: "transparent",
            marginTop: "20px",
          }}
        >
          {girando ? "sorteando..." : "✨ sortear programa"}
        </motion.button>
      </div>
    </div>
  );
}
