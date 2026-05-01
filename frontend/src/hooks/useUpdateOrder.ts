import { useCallback } from "react";
import type { UpdateOrderPayload } from "../types";

export function useUpdateOrder() {
  return useCallback(
    async (payload: UpdateOrderPayload) => {
      const response = await fetch(`/api/order/${payload.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          order_type: payload.order_type,
          no_meja: payload.no_meja,
          status: payload.status,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message);
        throw new Error(result.message || "Failed to update order");
      }

      return result;
    },
    []
  );
}