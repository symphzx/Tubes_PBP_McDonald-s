import { useCallback } from "react";
import type { CreateVarianPayload } from "../types";

export function useCreateVarian() {
  return useCallback(async (payload: CreateVarianPayload) => {
    const response = await fetch("/api/varian-menu", {
      method: "POST",
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
      throw new Error("Failed to create varian");
    }

    return response.json();
  }, []);
}