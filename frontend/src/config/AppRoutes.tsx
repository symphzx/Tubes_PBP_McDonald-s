import { lazy } from "react";
import { Route, Routes } from "react-router";
import { MenuLayout } from "../components/MenuLayout";
// import { TemplateLayout } from "../components/TemplateLayout";
import OrderType from "../pages/Order/OrderType/OrderType";
import CustomizeOrder from "../pages/Order/CustomizeOrder/CustomizeOrder";
import OrderCart from "../pages/Order/OrderCart/OrderCart";
import OrderLayout from "../components/OrderLayout";

const MenuPage = lazy(() => import("../pages/Menu/MenuPage"));

export const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<MenuLayout />}>
                <Route path="/menu" element={<MenuPage />} />
            </Route>
            {/*             
            <Route element={<TemplateLayout />}> // Ubah nama Layout sesuai fitur kalian
                // Masukkin Web Kalian Di sini
            </Route> */}
            <Route element={<OrderLayout />}>
                <Route path="/order" element={<OrderType />} />
                <Route path="/customizeOrder" element={<CustomizeOrder />} />
                <Route path="/cart" element={<OrderCart />} />
            </Route>
            {/* <Route path="/customizeOrder" element={} /> */}
        </Routes>
    );
};
