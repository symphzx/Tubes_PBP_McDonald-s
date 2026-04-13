import { lazy } from "react";
import { Route, Routes } from "react-router";
import { MenuLayout } from "../components/MenuLayout";
import OrderLayout from "../components/OrderLayout";
import SetQuantityPage from "../pages/Order/SetQuantityPage/SetQuantityPage";
import { AdminLayout } from "../components/AdminLayout";
import LoginPage from "../pages/Admin/Login/LoginPage";
import AdminPage from "../pages/Admin/AdminPage";

const MenuPage = lazy(() => import("../pages/Menu/MenuPage"));

const PaymentPage = lazy(() => import("../pages/Payment/PaymentPage"));
const PaymentSuccess = lazy(() => import("../pages/Payment/PaymentSuccess"));

const OrderTypePage = lazy(() => import("../pages/Order/OrderType/OrderType"));
const CustomizeOrderPage = lazy(
  () => import("../pages/Order/CustomizeOrder/CustomizeOrder"),
);
const OrderCartPage = lazy(() => import("../pages/Order/OrderCart/OrderCart"));
const RecomendationPage = lazy(
  () => import("../pages/Order/Recomendation/RecomendationPage"),
);

const PackageSelection = lazy(
  () => import("../pages/Order/PackageSelection/PackageSelectionBurger"),
);

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MenuLayout />}>
        <Route path="/menu" element={<MenuPage />} />
      </Route>
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/payment/success" element={<PaymentSuccess />} />

      <Route path="/order/package-selection" element={<PackageSelection />} />

      <Route element={<OrderLayout />}>
        <Route path="/order" element={<OrderTypePage />} />
        <Route path="/customize/:id" element={<CustomizeOrderPage />} />
        <Route path="/cart" element={<OrderCartPage />} />
        <Route path="/setQuantity/:id" element={<SetQuantityPage />} />
        <Route path="/recomendation" element={<RecomendationPage />} />
      </Route>

      <Route element={<AdminLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Route>
    </Routes>
  );
};
