import { useCallback } from "react";

export function useDeleteVarian() {
  return useCallback(async (varianId: string) => {
    const response = await fetch(`/api/varian-menu/${varianId}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to delete varian");
    }

    return response.json().catch(() => ({}));
  }, []);
}