import { useCallback, useMemo } from "react";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";
import { userActions } from "../store/userSlice";

export function useUsers() {
    const dispatch = useAppDispatch();
    const { userInfo } = useAppSelector((state) => state.user);

    const reload = useCallback(async () => {

        try{
            const response = await fetch("/api/user",{
                method: "GET",
                credentials: "include",
            });

            if (response.status !== 200) {
                alert("Failed to reload user");
                throw new Error("Failed to reload user");
            }

            const data = await response.json();
            dispatch(userActions.setUserInfo(data.records));
        } catch {
            console.log("Failed to reload user");
        }
    }, [dispatch]);

    
    return useMemo(() => ({
        users: userInfo,
        reload,
    }), [userInfo, reload]);
}