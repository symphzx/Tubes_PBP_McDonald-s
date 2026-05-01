import { useCallback, useMemo } from "react";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";
import { menuActions } from "../store/menuSlice";

export function useMenus() {
    const dispatch = useAppDispatch();
    const {menus, menuState: state} = useAppSelector((state) => state.menu);


    const reload = useCallback(async () => {
        dispatch(menuActions.setState('loading'));

        try{
            const response = await fetch("/api/menu");

            if (response.status !== 200) {
                alert("Failed to reload menu");
                throw new Error("Failed to reload menu");
            }

            const data = await response.json();
            dispatch(menuActions.setMenu(data.records));
            dispatch(menuActions.setState('fullfilled'));
        } catch {
            dispatch(menuActions.setState('error'));
        }
    }, [dispatch]);

    
    return useMemo(() => ({
        menus,
        state,
        reload,
    }), [menus, state, reload]);
}