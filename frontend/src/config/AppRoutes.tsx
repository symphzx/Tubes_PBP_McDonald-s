import { lazy } from "react";
import { Route, Routes } from "react-router";
import { MenuLayout } from "../components/MenuLayout";
import { TemplateLayout } from "../components/TemplateLayout";

const MenuPage = lazy(() => import("../pages/Menu/MenuPage"));

export const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<MenuLayout />}>
                <Route path="/menu" element={<MenuPage />} />
            </Route>
            <Route element={<TemplateLayout />}> // Ubah nama Layout sesuai fitur kalian
                // Masukkin Web Kalian Di sini
            </Route>
        </Routes>
    );
};
