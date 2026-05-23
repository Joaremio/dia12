"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Type, Smile } from "lucide-react";
import { useState } from "react";
import { WishItem, WishRequest } from "@/src/types/item";
import { useForm } from "react-hook-form";

interface AddWishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (wish: WishRequest) => void;
}

const emojiOptions = [
  "✈️",
  "🍽️",
  "💃",
  "⛺",
  "📸",
  "🎭",
  "🎨",
  "🎮",
  "🎬",
  "🎵",
  "🏖️",
  "🏔️",
  "🌅",
  "🌌",
  "🎆",
  "🎊",
  "🎁",
  "💐",
  "🌹",
  "💝",
  "🍕",
  "🍰",
  "🍾",
  "☕",
  "🍓",
  "🎂",
  "🧁",
  "🍫",
  "🍷",
  "🥂",
  "🚗",
  "🏠",
  "💍",
  "👰",
  "🤵",
  "👶",
  "🐶",
  "🐱",
  "🦋",
  "🌺",
];

export default function WishDialog({
  isOpen,
  onClose,
  onAdd,
}: AddWishModalProps) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<WishRequest>({
    defaultValues: {
      title: "",
      emoji: "✨",
    },
  });

  const title = watch("title");
  const selectedEmoji = watch("emoji");

  const onSubmit = (wish: WishRequest) => {
    onAdd(wish);
    handleClose();
  };

  const handleClose = () => {
    reset();
    setShowEmojiPicker(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
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
            onClick={handleClose}
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
                boxShadow: "0 0 60px #c084fc44, 0 32px 64px rgba(0,0,0,0.7)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: "rgba(0,0,0,0.5)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <X className="w-4 h-4 text-white" />
              </button>

              {/* Header */}
              <div
                className="px-6 pt-8 pb-6"
                style={{
                  background: "linear-gradient(135deg, #c084fc33, #f472b622)",
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Sparkles className="w-6 h-6" style={{ color: "#f472b6" }} />

                  <h2
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1.75rem",
                      fontWeight: 700,
                      color: "#f0e6ff",
                    }}
                  >
                    Novo Desejo
                  </h2>
                </div>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="px-6 pb-8 space-y-5 mt-6"
              >
                {/* Title */}
                <div>
                  <label
                    className="flex items-center gap-2 mb-2"
                    style={{
                      fontSize: "0.75rem",
                      color: "#c084fc",
                    }}
                  >
                    <Type className="w-3.5 h-3.5" />
                    TÍTULO
                  </label>

                  <input
                    type="text"
                    placeholder="Ex: Visitar Paris"
                    maxLength={50}
                    {...register("title", {
                      required: "Título é obrigatório",
                    })}
                    className="w-full px-4 py-3 rounded-2xl outline-none"
                    style={{
                      backgroundColor: "#1a0d35",
                      border: "1.5px solid #c084fc44",
                      color: "#f0e6ff",
                    }}
                  />

                  {errors.title && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.title.message}
                    </p>
                  )}

                  <div className="mt-1 text-right">
                    <span
                      style={{
                        fontSize: "0.7rem",
                        color: "#9d7fc0",
                      }}
                    >
                      {title?.length || 0}/50
                    </span>
                  </div>
                </div>

                {/* Emoji */}
                <div>
                  <label
                    className="flex items-center gap-2 mb-2"
                    style={{
                      fontSize: "0.75rem",
                      color: "#c084fc",
                    }}
                  >
                    <Smile className="w-3.5 h-3.5" />
                    EMOJI
                  </label>

                  <button
                    type="button"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="w-full px-4 py-3 rounded-2xl flex items-center gap-3"
                    style={{
                      backgroundColor: "#1a0d35",
                      border: "1.5px solid #c084fc44",
                    }}
                  >
                    <span className="text-2xl">{selectedEmoji}</span>
                  </button>

                  <AnimatePresence>
                    {showEmojiPicker && (
                      <motion.div
                        className="mt-3 p-4 rounded-2xl grid grid-cols-8 gap-2"
                        style={{
                          backgroundColor: "#0d0620",
                          border: "1px solid #c084fc22",
                        }}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        {emojiOptions.map((emoji) => (
                          <button
                            key={emoji}
                            type="button"
                            onClick={() => {
                              setValue("emoji", emoji);
                              setShowEmojiPicker(false);
                            }}
                            className="text-2xl p-2 rounded-xl hover:bg-purple-500/10"
                          >
                            {emoji}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex-1 py-3 rounded-2xl"
                  >
                    Cancelar
                  </button>

                  <motion.button
                    type="submit"
                    disabled={!title?.trim()}
                    className="flex-1 py-3 rounded-2xl"
                    style={{
                      background: title?.trim()
                        ? "linear-gradient(135deg, #c084fc, #f472b6)"
                        : "#1a0d35",
                      color: "#fff",
                    }}
                  >
                    Adicionar
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
