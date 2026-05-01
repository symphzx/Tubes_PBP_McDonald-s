import { useCallback, useMemo } from "react";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";
import { authActions } from "../store/authSlice";

export function useAuth() {
    const dispatch = useAppDispatch();
    const { userInfo, accessToken } = useAppSelector((state) => state.auth);


    const reload = useCallback(async () => {

          const res = await fetch("/api/auth/me", {
              method: "GET",
              credentials: "include",
          });

          if (!res.ok) throw new Error();

          const data = await res.json();

          dispatch(authActions.setUserInfo(data.data.user));
    }, [dispatch]);

    
    return useMemo(() => ({
        userInfo,
        accessToken,
        reload,
    }), [userInfo, accessToken, reload]);
}