import { useCallback } from "react";

export function useFrogetAuth() {
  return useCallback(async (email: string) => {
    try {
      const response = await fetch("/api/auth/forgot-password", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ email }),
    });

    alert("Recovery email sent!");

    if (response.status !== 200) {
      throw new Error("Connection Error");
    }
    
    } catch (error) {
      console.error("Forget request failed:", error);
    }
  }, []);
}
