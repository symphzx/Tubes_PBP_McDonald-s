import { useCallback, useMemo, useState } from "react";
import type { UserInfo } from "../types";

export function useUserDetail(id: string) {
  const [user, setUser] = useState<UserInfo | null>(null);

  const reload = useCallback(async () => {
    const response = await fetch(`/api/user/${id}`);

    if (response.status !== 200) {
      alert("Failed to reload user");
      throw new Error("Failed to reload user");
    }

    const data = await response.json();

    setUser(data.data);
  }, [id]);

  return useMemo(
    () => ({
      user,
      reload,
    }),
    [user, reload]
  );
}