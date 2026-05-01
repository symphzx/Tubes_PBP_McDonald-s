import { useCallback } from "react";
import type { UpdateOpsiPayload } from "../types";

export function useUpdateOpsi() {
  return useCallback(async (payload: UpdateOpsiPayload) => {
    const response = await fetch(`/api/opsi-menu/${payload.id}`, {
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
      throw new Error("Failed to update opsi");
    }

    return response.json();
  }, []);
}