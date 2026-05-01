import { useCallback, useMemo, useState } from "react";
import type { Menu } from "../types";

export function useMenuDetail(id: string) {
  const [menu, setMenu] = useState<Menu | null>(null);

  const reload = useCallback(async () => {
    const response = await fetch(`/api/menu/${id}`);

    if (response.status !== 200) {
      alert("Failed to reload menu");
      throw new Error("Failed to reload menu");
    }

    const data = await response.json();

    setMenu(data.records);
  }, [id]);

  return useMemo(
    () => ({
      menu,
      reload,
    }),
    [menu, reload]
  );
}