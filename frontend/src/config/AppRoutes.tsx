import { lazy } from "react";
import { Route, Routes } from "react-router";
import { MenuLayout } from "../components/MenuLayout";
import { TemplateLayout } from "../components/TemplateLayout";

const MenuPage = lazy(() => import("../pages/Menu/MenuPage"));
const PaymentPage = lazy(() => import("../pages/Payment/PaymentPage"));
const PaymentSuccess = lazy(() => import("../pages/Payment/PaymentSuccess"))

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MenuLayout />}>
        <Route path="/menu" element={<MenuPage />} />
      </Route>

      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/payment/success" element={<PaymentSuccess />} />

      <Route element={<TemplateLayout />}>
        {" "}
        // Ubah nama Layout sesuai fitur kalian // Masukkin Web Kalian Di sini
      </Route>
    </Routes>
  );
};
