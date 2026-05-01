import { useCallback } from "react";

export function useLoginAuth() {
  return useCallback(async (email: string, password: string) => {
    try {
      const response = await fetch("/api/auth/login", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    if (response.status !== 200) {
      const data = await response.json();
      alert("Login Failed: " + data.message);
      throw new Error("Connection Error");
    }
    
    } catch (error) {
      console.error("Login request failed:", error);
    }
  }, []);
}
