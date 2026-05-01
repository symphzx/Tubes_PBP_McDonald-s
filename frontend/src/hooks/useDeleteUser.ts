import { useCallback } from "react";

export function useDeleteUser() {
  return useCallback(async (userId: string) => {
    const response = await fetch(`/api/user/${userId}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      const result = await response.json().catch(() => ({}));
      throw new Error(result.message || "Failed to delete user");
    }

    return response.json().catch(() => ({}));
  }, []);
}