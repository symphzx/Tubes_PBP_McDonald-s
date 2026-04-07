import { lazy } from "react";
import { Route, Routes } from "react-router";
import { MenuLayout } from "../components/MenuLayout";
import { TemplateLayout } from "../components/TemplateLayout";
import OrderType from "../pages/Order/OrderType/OrderType";
import CustomizeOrder from "../pages/Order/CustomizeOrder/CustomizeOrder";
import OrderCart from "../pages/Order/OrderCart/OrderCart";
import OrderLayout from "../components/OrderLayout";
import SetQuantityPage from "../pages/Order/SetQuantityPage/SetQuantityPage";

const MenuPage = lazy(() => import("../pages/Menu/MenuPage"));
const PaymentPage = lazy(() => import("../pages/Payment/PaymentPage"));
const PaymentSuccess = lazy(() => import("../pages/Payment/PaymentSuccess"));

const PackageSelection = lazy(
  () => import("../pages/Order/PackageSelection/PackageSelectionPage"),
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

      {/* <Route element={<TemplateLayout />}> */} // Ubah nama Layout sesuai
      fitur kalian // Masukkin Web Kalian Di sini
      {/* </Route> */}
    </Routes>
  );
};
