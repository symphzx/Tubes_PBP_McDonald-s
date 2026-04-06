import { lazy } from "react";
import { Route, Routes } from "react-router";
import { MenuLayout } from "../components/MenuLayout";
import { AdminLayout } from "../components/AdminLayout";

// import { TemplateLayout } from "../components/TemplateLayout";
import OrderType from "../pages/Order/OrderType/OrderType";
import CustomizeOrder from "../pages/Order/CustomizeOrder/CustomizeOrder";
import OrderCart from "../pages/Order/OrderCart/OrderCart";
import OrderLayout from "../components/OrderLayout";

const MenuPage = lazy(() => import("../pages/Menu/MenuPage"));
const PaymentPage = lazy(() => import("../pages/Payment/PaymentPage"));
const PaymentSuccess = lazy(() => import("../pages/Payment/PaymentSuccess"))
const LoginPage = lazy(() => import("../pages/Login/LoginPage"));
const AdminPage = lazy(() => import("../pages/Admin/AdminPage"));

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MenuLayout />}>
        <Route path="/menu" element={<MenuPage />} />
      </Route>

      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/payment/success" element={<PaymentSuccess />} />

      <Route element={<AdminLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Route>
    </Routes>
  );
};
