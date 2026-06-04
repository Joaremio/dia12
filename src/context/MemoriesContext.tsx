"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Memory } from "@/src/types/memory";
import { getMemories } from "../services/memoryService";

type MemoriesContextType = {
  memories: Memory[];
  setMemories: React.Dispatch<React.SetStateAction<Memory[]>>;
  loading: boolean;
};

const MemoriesContext = createContext<MemoriesContextType | null>(null);

export function MemoriesProvider({ children }: { children: React.ReactNode }) {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    loadMemories();
  }, []);

  async function loadMemories() {
    try {
      setIsLoading(true);
      const data = await getMemories();
      setMemories(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <MemoriesContext.Provider value={{ memories, setMemories, loading }}>
      {children}
    </MemoriesContext.Provider>
  );
}

export function useMemories() {
  const context = useContext(MemoriesContext);

  if (!context) {
    throw new Error("useMemories must be used inside MemoriesProvider");
  }

  return context;
}
