import { useCallback, useMemo } from "react";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";
import { orderActions } from "../store/orderSlice";

export function useOrders() {
    const dispatch = useAppDispatch();
    const { orders } = useAppSelector((state) => state.order);

    const reload = useCallback(async () => {
        try{
            const response = await fetch("/api/order");

            if (response.status !== 200) {
                alert("Failed to reload order");
                throw new Error("Failed to reload order");
            }

            const data = await response.json();
            dispatch(orderActions.setOrder(data.records));
        } catch {
            throw new Error("Failed to reload order");
        }
    }, [dispatch]);

    
    return useMemo(() => ({
        orders,
        reload,
    }), [orders, reload]);
}