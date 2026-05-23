import { supabase } from "../lib/supabase";
import { WishItem, WishRequest } from "../types/item";

export async function saveWishItem(
  WishItem: Omit<WishRequest, "id">,
): Promise<WishItem> {
  const { data, error } = await supabase
    .from("WishItem")
    .insert({
      title: WishItem.title,
      emoji: WishItem.emoji,
    })
    .select()
    .single();

  if (error) {
    console.error("Erro ao salvar Desejo:", error);
  }

  return data;
}

export async function getItems(): Promise<WishItem[]> {
  const { data, error } = await supabase
    .from("WishItem")
    .select("*")
    .order("completedDate", { ascending: true });

  if (error) {
    console.error("Erro ao buscar desejos:", error);
    return [];
  }

  return data;
}

export async function setCompletedWishItem(id: number) {
  // pega o item atual
  const { data: wish, error: findError } = await supabase
    .from("WishItem")
    .select("completed")
    .eq("id", id)
    .single();

  if (findError) {
    throw findError;
  }

  const newCompleted = !wish.completed;

  // atualiza invertendo
  const { data, error } = await supabase
    .from("WishItem")
    .update({
      completed: newCompleted,
      completedDate: newCompleted ? new Date().toISOString() : null,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}
