import { supabase } from "@/src/lib/supabase";
import { Memory } from "@/src/types/memory";

export async function uploadPhoto(file: File): Promise<string | null> {
  const ext = file.name.split(".").pop();
  const fileName = `${Date.now()}.${ext}`;

  const { error } = await supabase.storage
    .from("photos")
    .upload(fileName, file);

  if (error) {
    console.error("Erro ao fazer upload da foto:", error);
    return null;
  }

  const { data } = supabase.storage.from("photos").getPublicUrl(fileName);

  return data.publicUrl;
}

export async function getMemories(): Promise<Memory[]> {
  const { data, error } = await supabase
    .from("memories")
    .select("*")
    .order("date", { ascending: true });

  console.log("data:", data);
  console.log("error:", error);

  if (error) {
    console.error("Erro ao buscar memórias:", error);
    return [];
  }

  return data.map((row) => ({
    id: row.id,
    title: row.title,
    date: row.date,
    location: row.location,
    description: row.description,
    photo: row.photo,
  }));
}

export async function saveMemory(
  memory: Omit<Memory, "id">,
): Promise<Memory | null> {
  const { data, error } = await supabase
    .from("memories")
    .insert({
      title: memory.title,
      date: memory.date,
      location: memory.location,
      description: memory.description,
      photo: memory.photo,
    })
    .select()
    .single();

  if (error) {
    console.error("Erro ao salvar memória:", error);
    return null;
  }

  return {
    id: data.id,
    title: data.title,
    date: data.date,
    location: data.location,
    description: data.description,
    photo: data.photo,
  };
}

export async function deleteMemory(id: number): Promise<boolean> {
  const { error } = await supabase.from("memories").delete().eq("id", id);

  if (error) {
    console.error("Erro ao deletar memória:", error);
    return false;
  }

  return true;
}
