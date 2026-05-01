import { useCallback } from "react";
import type { CreateOpsiPayload } from "../types";

export function useCreateOpsi() {
  return useCallback(async (payload: CreateOpsiPayload) => {
    const response = await fetch("/api/opsi-menu", {
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
      throw new Error("Failed to create opsi");
    }

    return response.json();
  }, []);
}