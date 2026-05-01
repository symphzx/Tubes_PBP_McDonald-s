import { useCallback } from "react";

export function useDeleteKategori() {
  return useCallback(async (kategoriId: string) => {
    const response = await fetch(
      `/api/kategori/${kategoriId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    if (!response.ok) {
      const result = await response.json().catch(() => ({}));
      throw new Error(result.message || "Failed to delete kategori");
    }

    return response.json().catch(() => ({}));
  }, []);
}