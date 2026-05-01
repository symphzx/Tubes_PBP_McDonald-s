import { useCallback } from "react";
import type { CreateKategoriPayload } from "../types";

export function useCreateKategori() {
  return useCallback(
    async (payload: CreateKategoriPayload) => {
      const response = await fetch("/api/kategori", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          nama: payload.nama,
          sortOrder: payload.sortOrder,
          startDate: payload.startDate,
          endDate: payload.endDate,
          startTime: payload.startTime,
          endTime: payload.endTime,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message);
        throw new Error(result.message || "Failed to create kategori");
      }

      return result;
    },
    []
  );
}