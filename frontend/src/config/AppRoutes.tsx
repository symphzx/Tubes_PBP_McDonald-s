<<<<<<< HEAD
import { lazy } from "react"
import { Route, Routes } from "react-router"

const PaymentPage = lazy(() => import("../pages/PaymentPage"))
=======
import { lazy } from "react";
import { Route, Routes } from "react-router";
import { MenuLayout } from "../components/MenuLayout";
import { TemplateLayout } from "../components/TemplateLayout";

const MenuPage = lazy(() => import("../pages/Menu/MenuPage"));
>>>>>>> origin/develop

export const AppRoutes = () => {
    return (
        <Routes>
<<<<<<< HEAD
            <Route path="/payment" element={<PaymentPage />} />
        </Routes>
    )
}
=======
            <Route element={<MenuLayout />}>
                <Route path="/menu" element={<MenuPage />} />
            </Route>
            <Route element={<TemplateLayout />}> // Ubah nama Layout sesuai fitur kalian
                // Masukkin Web Kalian Di sini
            </Route>
        </Routes>
    );
};
>>>>>>> origin/develop
