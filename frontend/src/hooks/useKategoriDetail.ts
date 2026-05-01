import { useCallback, useMemo, useState } from "react";
import type { KategoriMenu } from "../types";

export function useKategoriDetail(id: string) {
  const [kategori, setKategori] = useState<KategoriMenu | null>(null);
    const reload = useCallback(async () => {
          const response = await fetch(`/api/kategori/${id}`);

          if (response.status !== 200) {
              alert("Failed to reload kategori");
              throw new Error("Failed to reload kategori");
          }

          const data = await response.json();

          setKategori(data.data);
          
    }, [id]);

    
    return useMemo(() => ({
        kategori,
        reload,
    }), [kategori, reload]);
}