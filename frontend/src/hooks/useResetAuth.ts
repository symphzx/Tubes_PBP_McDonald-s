import { useCallback } from "react";

export function useResetAuth() {
  return useCallback(async (token: string, newPassword: string) => {
    try {
      const response = await fetch("/api/auth/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, newPassword }),
        },
      );

      if (response.status !== 200) {
        const data = await response.json();
        alert("Reset Failed: " + data.message);
        return;
      }

      alert("Password has been reset successfully!");
    
    } catch (error) {
      console.error("Login request failed:", error);
    }
  }, []);
}
