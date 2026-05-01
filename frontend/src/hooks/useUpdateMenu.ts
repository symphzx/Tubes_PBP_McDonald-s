import { useCallback } from "react";
import type { UpdateMenuPayload } from "../types";

export function useUpdateMenu() {
  return useCallback(async (payload: UpdateMenuPayload) => {
    const formData = new FormData();
    formData.append("nama", payload.nama);
    formData.append("kategori_id", payload.kategori_id);
    formData.append("harga_awal", payload.harga_awal);
    formData.append("tipe", payload.tipe);
    formData.append("ketersediaan", payload.ketersediaan);
    formData.append("tag", payload.tag || "");

    if (payload.gambar) {
      formData.append("gambar", payload.gambar);
    } else if (payload.existingImage) {
      formData.append("existingImage", payload.existingImage);
    }

    const response = await fetch(`/api/menu/${payload.id}`, {
      method: "PUT",
      credentials: "include",
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      alert(result.message);
      throw new Error(result.message || "Failed to update menu");
    }

    return result;
  }, []);
}