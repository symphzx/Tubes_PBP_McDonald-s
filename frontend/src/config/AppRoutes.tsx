import { lazy } from "react";
import { Route, Routes } from "react-router";
import { MenuLayout } from "../components/MenuLayout";
import OrderLayout from "../components/OrderLayout";
import SetQuantityPage from "../pages/Order/SetQuantityPage/SetQuantityPage";
import { AdminLayout } from "../components/AdminLayout";

const HomePage = lazy(() => import("../pages/Home/HomePage"));

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

const AdminPage = lazy(() => import("../pages/Admin/AdminPage"));
const LoginPage = lazy(() => import("../pages/Admin/Login/LoginPage"));

const ListMenuPage = lazy(() => import("../pages/Admin/MenuManagement/ListMenuPage"));
const CreateMenuPage = lazy(() => import("../pages/Admin/MenuManagement/CreateMenuPage"));
const EditMenuPage = lazy(() => import("../pages/Admin/MenuManagement/EditMenuPage"))

const ListCategoryPage = lazy(() => import("../pages/Admin/CategoryManagement/ListCategoryPage"));
const CreateCategoryPage = lazy(() => import("../pages/Admin/CategoryManagement/CreateCategoryPage"));
const EditCategoryPage = lazy(() => import("../pages/Admin/CategoryManagement/EditCategoryPage"));

const ListOrderPage = lazy(() => import("../pages/Admin/OrderManagement/ListOrderPage"));

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MenuLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu/:category" element={<MenuPage />} />
      </Route>
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/payment/success" element={<PaymentSuccess />} />

      <Route path="/order/package-selection" element={<PackageSelection />} />

      <Route element={<OrderLayout />}>
        <Route path="/order" element={<OrderTypePage />} />
        <Route path="/customizeOrder/:id" element={<CustomizeOrderPage />} />
        <Route path="/cart" element={<OrderCartPage />} />
        <Route path="/setQuantity/:id" element={<SetQuantityPage />} />
        <Route path="/recomendation" element={<RecomendationPage />} />
      </Route>

      <Route element={<AdminLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />

        <Route path="/admin/list-menu" element={<ListMenuPage />} />
        <Route path="/admin/create-menu" element={<CreateMenuPage />} />
        <Route path="/admin/edit-menu/:id" element={<EditMenuPage />} />

        <Route path="/admin/list-category" element={<ListCategoryPage />} />
        <Route path="/admin/create-category" element={<CreateCategoryPage />} />
        <Route path="/admin/edit-category/:id" element={<EditCategoryPage />} />

        <Route path="/admin/list-order" element={<ListOrderPage />} />
        
      </Route>
    </Routes>
  );
};
