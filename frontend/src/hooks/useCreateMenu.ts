import { useCallback } from "react";
import type { CreateMenuPayload } from "../types";

export function useCreateMenu() {
  return useCallback(async (payload: CreateMenuPayload) => {
    const formData = new FormData();
    formData.append("nama", payload.nama);
    formData.append("kategori_id", payload.kategori_id);
    formData.append("harga_awal", payload.harga_awal);
    formData.append("tipe", payload.tipe);
    formData.append("ketersediaan", payload.ketersediaan);
    formData.append("tag", payload.tag ? payload.tag : "");

    if (payload.gambar) {
      formData.append("gambar", payload.gambar);
    }

    const response = await fetch("/api/menu", {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      alert(result.message);
      throw new Error(result.message || "Failed to create menu");
    }

    return result;
  }, []);
}