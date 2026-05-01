import { useCallback, useMemo } from "react";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";
import { categoryActions } from "../store/categorySlice";

export function useKategori() {
    const dispatch = useAppDispatch();
    const { category: kategori } = useAppSelector((state) => state.category);


    const reload = useCallback(async () => {
          const response = await fetch("/api/kategori");

          if (response.status !== 200) {
              alert("Failed to reload kategori");
              throw new Error("Failed to reload kategori");
          }

          const data = await response.json();
          dispatch(categoryActions.setCategory(data.records));
    }, [dispatch]);

    
    return useMemo(() => ({
        kategori,
        reload,
    }), [kategori, reload]);
}