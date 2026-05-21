import { motion } from "framer-motion";
import {
  X,
  Camera,
  MapPin,
  Calendar as CalendarIcon,
  Loader2,
} from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { Memory } from "@/src/types/memory";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { uploadPhoto } from "@/src/services/memoryService";

interface AddMemoryModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (memory: Memory) => void;
}

export default function MemoryDialog({
  open,
  onClose,
  onSave,
}: AddMemoryModalProps) {
  const { register, handleSubmit } = useForm<Memory>();
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  async function handleSave(data: Memory) {
    setIsSaving(true);

    let photoUrl = "";

    if (photoFile) {
      const url = await uploadPhoto(photoFile);
      photoUrl = url ?? "";
    }

    onSave({ ...data, photo: photoUrl });
    setIsSaving(false);
    setPhotoFile(null);
    setPhotoPreview(null);
    onClose();
  }

  function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  }

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay asChild>
          <motion.div
            className="fixed inset-0 z-50"
            style={{ backgroundColor: "rgba(13, 6, 32, 0.85)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        </Dialog.Overlay>

        <Dialog.Content asChild>
          <motion.div
            className="fixed inset-x-0 bottom-0 z-50 rounded-t-[24px] overflow-hidden"
            style={{
              backgroundColor: "#1a0d35",
              maxWidth: "448px",
              margin: "0 auto",
              maxHeight: "82vh",
              display: "flex",
              flexDirection: "column",
            }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* Handle bar */}
            <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
              <div
                className="w-10 h-1 rounded-full"
                style={{ backgroundColor: "#4d3070" }}
              />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 flex-shrink-0">
              <Dialog.Title
                className="m-0"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.25rem",
                  fontWeight: 500,
                  color: "#f0e6ff",
                }}
              >
                Nova Memória
              </Dialog.Title>
              <Dialog.Close asChild>
                <button
                  className="rounded-full p-1.5"
                  style={{ backgroundColor: "#2d1040" }}
                >
                  <X className="w-4 h-4" style={{ color: "#9d7fc0" }} />
                </button>
              </Dialog.Close>
            </div>

            {/* Scroll area */}
            <div className="overflow-y-auto flex-1 px-5 pb-5 space-y-4">
              {/* Photo */}
              <div>
                <label
                  className="block mb-1.5 text-xs uppercase tracking-wider"
                  style={{ color: "#9d7fc0" }}
                >
                  Foto
                </label>
                <div className="relative rounded-xl overflow-hidden">
                  {photoPreview ? (
                    <div className="relative">
                      <img
                        src={photoPreview}
                        alt="Preview"
                        className="w-full object-cover"
                        style={{ height: "100px" }}
                      />
                      <button
                        onClick={() => {
                          setPhotoPreview(null);
                          setPhotoFile(null);
                        }}
                        className="absolute top-1.5 right-1.5 rounded-full p-1.5"
                        style={{ backgroundColor: "rgba(13, 6, 32, 0.8)" }}
                      >
                        <X className="w-3 h-3" style={{ color: "#f0e6ff" }} />
                      </button>
                    </div>
                  ) : (
                    <label
                      className="flex items-center justify-center gap-2 cursor-pointer"
                      style={{
                        height: "64px",
                        backgroundColor: "#2d1040",
                        border: "0.5px dashed #4d3070",
                        borderRadius: "12px",
                      }}
                    >
                      <Camera
                        className="w-5 h-5"
                        style={{ color: "#c084fc" }}
                      />
                      <span className="text-sm" style={{ color: "#9d7fc0" }}>
                        Adicionar foto
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handlePhotoUpload}
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Title */}
              <div>
                <label
                  className="block mb-1.5 text-xs uppercase tracking-wider"
                  style={{ color: "#9d7fc0" }}
                >
                  Título
                </label>
                <input
                  type="text"
                  {...register("title", { required: true })}
                  placeholder="Ex: Nosso primeiro encontro"
                  className="w-full px-3 py-2.5 rounded-xl text-sm"
                  style={{
                    backgroundColor: "#2d1040",
                    border: "0.5px solid #4d3070",
                    color: "#f0e6ff",
                    outline: "none",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#c084fc")}
                  onBlur={(e) => (e.target.style.borderColor = "#4d3070")}
                />
              </div>

              {/* Location */}
              <div>
                <label
                  className="block mb-1.5 text-xs uppercase tracking-wider"
                  style={{ color: "#9d7fc0" }}
                >
                  Local
                </label>
                <div className="relative">
                  <MapPin
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5"
                    style={{ color: "#9d7fc0" }}
                  />
                  <input
                    type="text"
                    {...register("location")}
                    placeholder="Ex: Café do Centro"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm"
                    style={{
                      backgroundColor: "#2d1040",
                      border: "0.5px solid #4d3070",
                      color: "#f0e6ff",
                      outline: "none",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#c084fc")}
                    onBlur={(e) => (e.target.style.borderColor = "#4d3070")}
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label
                  className="block mb-1.5 text-xs uppercase tracking-wider"
                  style={{ color: "#9d7fc0" }}
                >
                  O que foi especial
                </label>
                <textarea
                  {...register("description")}
                  placeholder="Conte como foi esse momento..."
                  rows={2}
                  className="w-full px-3 py-2.5 rounded-xl resize-none text-sm"
                  style={{
                    backgroundColor: "#2d1040",
                    border: "0.5px solid #4d3070",
                    color: "#f0e6ff",
                    outline: "none",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#c084fc")}
                  onBlur={(e) => (e.target.style.borderColor = "#4d3070")}
                />
              </div>

              {/* Date */}
              <div>
                <label
                  className="block mb-1.5 text-xs uppercase tracking-wider"
                  style={{ color: "#9d7fc0" }}
                >
                  Data
                </label>
                <div className="relative">
                  <CalendarIcon
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5"
                    style={{ color: "#9d7fc0" }}
                  />
                  <input
                    type="date"
                    {...register("date", { required: true })}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm"
                    style={{
                      backgroundColor: "#2d1040",
                      border: "0.5px solid #4d3070",
                      color: "#f0e6ff",
                      outline: "none",
                      colorScheme: "dark",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#c084fc")}
                    onBlur={(e) => (e.target.style.borderColor = "#4d3070")}
                  />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div
              className="flex gap-3 px-5 py-4 flex-shrink-0"
              style={{ borderTop: "0.5px solid #2d1040" }}
            >
              <button
                onClick={onClose}
                disabled={isSaving}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium"
                style={{
                  backgroundColor: "#2d1040",
                  border: "0.5px solid #4d3070",
                  color: "#c084fc",
                }}
              >
                Cancelar
              </button>
              <motion.button
                onClick={handleSubmit(handleSave)}
                disabled={isSaving}
                className="flex-1 py-2.5 rounded-xl text-white text-sm font-medium flex items-center justify-center gap-2"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #ec4899)",
                  boxShadow: "0 4px 20px rgba(124, 58, 237, 0.3)",
                  opacity: isSaving ? 0.7 : 1,
                }}
                whileHover={{ scale: isSaving ? 1 : 1.02 }}
                whileTap={{ scale: isSaving ? 1 : 0.97 }}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  "Salvar Memória"
                )}
              </motion.button>
            </div>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
