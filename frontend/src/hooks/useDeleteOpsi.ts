import { useCallback } from "react";

export function useDeleteOpsi() {
  return useCallback(async (opsiId: string) => {
    const response = await fetch(`/api/opsi-menu/${opsiId}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to delete opsi");
    }

    return response.json().catch(() => ({}));
  }, []);
}