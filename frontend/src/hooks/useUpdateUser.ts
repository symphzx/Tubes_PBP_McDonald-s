import { useCallback } from "react";
import type { UpdateUserPayload } from "../types";

export function useUpdateUser() {
  return useCallback(
    async (payload: UpdateUserPayload) => {
      // Build body dinamis: hanya kirim password kalau diisi
      const body: Record<string, unknown> = {
        nama: payload.nama,
        email: payload.email,
        role: payload.role,
      };

      if (payload.password && payload.password.length > 0) {
        body.password = payload.password;
      }

      const response = await fetch(`/api/user/${payload.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message);
        throw new Error(result.message || "Failed to update user");
      }

      return result;
    },
    []
  );
}