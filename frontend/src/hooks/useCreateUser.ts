import { useCallback } from "react";
import type { CreateUserPayload } from "../types";

export function useCreateUser() {
  return useCallback(
    async (payload: CreateUserPayload) => {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          nama: payload.nama,
          email: payload.email,
          password: payload.password,
          role: payload.role,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message);
        throw new Error(result.message || "Failed to create user");
      }

      return result;
    },
    []
  );
}