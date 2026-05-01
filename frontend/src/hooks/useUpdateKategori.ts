import { useCallback } from "react";
import type { UpdateKategoriPayload } from "../types";

export function useUpdateKategori() {
  return useCallback(
    async (payload: UpdateKategoriPayload) => {
      const response = await fetch(
        `/api/kategori/${payload.id}`,
        {
          method: "PUT",
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
        }
      );

      const result = await response.json();

      if (!response.ok) {
        alert(result.message);
        throw new Error(result.message || "Failed to update kategori");
      }

      return result;
    },
    []
  );
}