import { useCallback } from "react";

export function useDeleteMenu() {
  return useCallback(async (menuId: string) => {
    const response = await fetch(
      `/api/menu/${menuId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    if (!response.ok) {
      const result = await response.json().catch(() => ({}));
      throw new Error(result.message || "Failed to delete menu");
    }

    return response.json().catch(() => ({}));
  }, []);
}