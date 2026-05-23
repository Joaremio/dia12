"use client";

import { Check, Trash2, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

import { WishItem, WishRequest } from "@/src/types/item";
import {
  getItems,
  saveWishItem,
  setCompletedWishItem,
} from "@/src/services/itemService";
import { AnimatePresence, motion } from "framer-motion";
import WishDialog from "@/src/components/WIshDialog";
import { formartDate } from "@/src/lib/formartDate";

export default function Wishlist() {
  const [wishes, setWishes] = useState<WishItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    async function loadWishes() {
      const data = await getItems();
      setWishes(data);
      setIsLoading(false);
    }
    loadWishes();
  }, []);

  const toggleWish = async (id: number) => {
    try {
      const updatedWish = await setCompletedWishItem(id);

      setWishes((prev) =>
        prev.map((wish) => {
          return wish.id === id ? updatedWish : wish;
        }),
      );

      if (updatedWish.completed) {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#c084fc", "#f472b6", "#818cf8"],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addWish = async (newWish: WishRequest) => {
    const data = await saveWishItem(newWish);
    setWishes((prev) => [...prev, data]);
  };

  const deleteWish = (id: number) => {
    setDeletingId(id);
    setTimeout(() => {
      setWishes(wishes.filter((wish) => wish.id !== id));
      setDeletingId(null);
    }, 300);
  };

  return (
    <div className="px-4 py-8">
      <h2
        className="mb-8 text-center uppercase tracking-widest"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.875rem",
          color: "#9d7fc0",
        }}
      >
        Lista de Desejos do Casal
      </h2>

      <div className="space-y-3 mb-6">
        <AnimatePresence mode="popLayout">
          {wishes.map((wish, index) => (
            <motion.div
              key={wish.id}
              className="rounded-2xl p-4 flex items-start gap-4 relative group"
              style={{ backgroundColor: "#1a0d35" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: deletingId === wish.id ? 0 : 1,
                x: deletingId === wish.id ? -100 : 0,
                scale: deletingId === wish.id ? 0.8 : 1,
              }}
              exit={{ opacity: 0, x: -100, scale: 0.8 }}
              transition={{ delay: index * 0.1 }}
              layout
            >
              {/* Custom Checkbox */}
              <button
                onClick={() => toggleWish(wish.id)}
                className="flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center transition-all"
                style={{
                  backgroundColor: wish.completed ? "#f472b6" : "transparent",
                  border: wish.completed ? "none" : "2px solid #c084fc",
                }}
              >
                {wish.completed && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Check className="w-4 h-4 text-white" />
                  </motion.div>
                )}
              </button>

              {/* Emoji */}
              <span className="text-2xl flex-shrink-0">{wish.emoji}</span>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3
                  className={wish.completed ? "line-through opacity-60" : ""}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: "#f0e6ff",
                  }}
                >
                  {wish.title}
                  {wish.completed && <span className="ml-2">🎉</span>}
                </h3>

                {wish.completed && wish.completedDate && (
                  <p
                    className="mt-1"
                    style={{
                      fontSize: "0.7rem",
                      color: "#818cf8",
                    }}
                  >
                    ✓ Feito em: {formartDate(wish.completedDate)}
                  </p>
                )}
              </div>

              {/* Delete Button - appears on hover */}
              <motion.button
                onClick={() => deleteWish(wish.id)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  backgroundColor: "#f472b622",
                  border: "1px solid #f472b644",
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Trash2 className="w-3.5 h-3.5" style={{ color: "#f472b6" }} />
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add Wish Button */}
      <motion.button
        onClick={() => setIsAddModalOpen(true)}
        className="w-full py-4 rounded-2xl font-medium flex items-center justify-center gap-2"
        style={{
          backgroundColor: "transparent",
          border: "1.5px solid #c084fc",
          color: "#c084fc",
        }}
        whileHover={{ scale: 1.02, backgroundColor: "#c084fc11" }}
        whileTap={{ scale: 0.97 }}
      >
        <Plus className="w-5 h-5" />
        Adicionar Desejo
      </motion.button>

      {/* Add Wish Modal */}
      <WishDialog
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={addWish}
      />
    </div>
  );
}
