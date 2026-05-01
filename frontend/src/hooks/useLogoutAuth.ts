import { useCallback } from "react";

export function useLogoutAuth() {
  return useCallback(async () => {
    try{
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message);
        throw new Error(result.message || "Failed to logout user");
      }

      return result;
    } catch (error) {
      console.error("Logout request failed:", error);
    }
  }, []);
}