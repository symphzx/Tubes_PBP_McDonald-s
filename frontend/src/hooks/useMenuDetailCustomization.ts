import { useCallback, useMemo, useState } from "react";
import type { MenuDetail } from "../types";

export function useMenuDetailCustomization(id?: string) {
  const [menu, setMenu] = useState<MenuDetail | null>(null);

  const reload = useCallback(async () => {
    if (!id) return;

    const controller = new AbortController();
    try {
      const res = await fetch(`/api/menu/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();

      setMenu(data.records);
    } catch (err) {
      console.error("Gagal fetch detail menu:", err);
    }
  }, [id]);

  return useMemo(
    () => ({
      menu,
      reload,
    }),
    [menu, reload],
  );
}
