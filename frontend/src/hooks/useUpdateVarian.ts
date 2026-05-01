import { useCallback } from "react";
import type { UpdateVarianPayload } from "../types";

export function useUpdateVarian() {
  return useCallback(async (payload: UpdateVarianPayload) => {
    const response = await fetch(`/api/varian-menu/${payload.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        menu_id: payload.menu_id,
        nama: payload.nama,
        harga_tambahan: payload.harga_tambahan,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update varian");
    }

    return response.json();
  }, []);
}