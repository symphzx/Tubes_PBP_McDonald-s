import { lazy, useEffect } from "react";
import { Route, Routes } from "react-router";
import { MenuLayout } from "../components/MenuLayout";
import OrderLayout from "../components/OrderLayout";
import SetQuantityPage from "../pages/Order/SetQuantityPage/SetQuantityPage";
import { AdminLayout } from "../components/AdminLayout";
import { useAppSelector } from "../hooks/useAppSelector";
import { authActions } from "../store/authSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";

const HomePage = lazy(() => import("../pages/Home/HomePage"));

const OrderTypePage = lazy(() => import("../pages/Order/OrderType/OrderType"));

const MenuPage = lazy(() => import("../pages/Menu/MenuPage"));

const PackageSelectionBurger = lazy(() => import("../pages/Order/PackageSelection/PackageSelectionBurger"))
const PackageSelectionAyam = lazy(() => import("../pages/Order/PackageSelection/PackageSelectionAyam"))

const CustomizeOrderPage = lazy(
  () => import("../pages/Order/CustomizeOrder/CustomizeOrder"),
);

const RecomendationPage = lazy(
  () => import("../pages/Order/Recomendation/RecomendationPage"),
);

const OrderCartPage = lazy(() => import("../pages/Order/OrderCart/OrderCart"));

const PaymentPage = lazy(() => import("../pages/Payment/PaymentPage"));
const PaymentSuccess = lazy(() => import("../pages/Payment/PaymentSuccess"));


const ProtectedRoute = lazy(() => import("./ProtectedRoute"));
const ProtectedCustomerRoute = lazy(() => import("./ProtectedCustomerRoute"));

const AdminPage = lazy(() => import("../pages/Admin/AdminPage"));
const LoginPage = lazy(() => import("../pages/Admin/Login/LoginPage"));
const ResetPasswordPage = lazy(() => import("../pages/Admin/ResetPassword/ResetPasswordPage"));

const ListMenuPage = lazy(() => import("../pages/Admin/MenuManagement/ListMenuPage"));
const CreateMenuPage = lazy(() => import("../pages/Admin/MenuManagement/CreateMenuPage"));
const EditMenuPage = lazy(() => import("../pages/Admin/MenuManagement/EditMenuPage"))

const ListCategoryPage = lazy(() => import("../pages/Admin/CategoryManagement/ListCategoryPage"));
const CreateCategoryPage = lazy(() => import("../pages/Admin/CategoryManagement/CreateCategoryPage"));
const EditCategoryPage = lazy(() => import("../pages/Admin/CategoryManagement/EditCategoryPage"));

const ListOrderPage = lazy(() => import("../pages/Admin/OrderManagement/ListOrderPage"));

const ListUserPage = lazy(() => import("../pages/Admin/UserManagement/ListUserPage"));
const CreateUserPage = lazy(() => import("../pages/Admin/UserManagement/CreateUserPage"));
const EditUserPage = lazy(() => import("../pages/Admin/UserManagement/EditUserPage"));

export const AppRoutes = () => {
  const { userInfo } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
        const fetchUser = async () => {
          try {
            const res = await fetch("/api/auth/me", {
              method: "GET",
              credentials: "include",
            });
  
            if (!res.ok) throw new Error();
  
            const data = await res.json();
  
            dispatch(authActions.setUserInfo(data.data.user));
          } catch (err) {
            console.log(err);
            dispatch(authActions.setUserInfo(undefined));
          }
        };
  
        fetchUser();
      }, [dispatch]);

  return (
    <Routes>
      <Route element={<MenuLayout />}>
        <Route path="/" element={<ProtectedCustomerRoute> <HomePage /> </ProtectedCustomerRoute>} />
        <Route path="/menu/:category" element={<MenuPage />} />
      </Route>
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/payment/success" element={<PaymentSuccess />} />

      <Route path="/order/package-selection-burger" element={<ProtectedCustomerRoute> <PackageSelectionBurger /> </ProtectedCustomerRoute>} />
      <Route path="/order/package-selection-ayam" element={<ProtectedCustomerRoute> <PackageSelectionAyam /> </ProtectedCustomerRoute>} />

      <Route element={<OrderLayout />}>
        <Route path="/order" element={ <OrderTypePage />} />
        <Route path="/customize-order/:id" element={<ProtectedCustomerRoute> <CustomizeOrderPage /> </ProtectedCustomerRoute> } />
        <Route path="/cart" element={<ProtectedCustomerRoute> <OrderCartPage /> </ProtectedCustomerRoute>} />
        <Route path="/set-quantity/:id" element={<ProtectedCustomerRoute> <SetQuantityPage /> </ProtectedCustomerRoute>} />
        <Route path="/recommendation" element={<ProtectedCustomerRoute> <RecomendationPage /> </ProtectedCustomerRoute>} />
      </Route>

      <Route element={<AdminLayout />}>
        { !userInfo && <Route path="/login" element={<LoginPage />} /> }
        { <Route path="/reset-password" element={ <ResetPasswordPage /> } /> }

        { <Route path="/admin" element={ <ProtectedRoute> <AdminPage /> </ProtectedRoute>} /> }

        { <Route path="/admin/list-menu" element={ <ProtectedRoute> <ListMenuPage /> </ProtectedRoute>} /> }
        { <Route path="/admin/create-menu" element={ <ProtectedRoute> <CreateMenuPage /> </ProtectedRoute>} /> }
        { <Route path="/admin/edit-menu/:id" element={ <ProtectedRoute> <EditMenuPage /> </ProtectedRoute>} /> }

        { <Route path="/admin/list-category" element={ <ProtectedRoute> <ListCategoryPage /> </ProtectedRoute>} /> }
        { <Route path="/admin/create-category" element={ <ProtectedRoute> <CreateCategoryPage /> </ProtectedRoute>} /> }
        { <Route path="/admin/edit-category/:id" element={ <ProtectedRoute> <EditCategoryPage /> </ProtectedRoute>} /> }

        { <Route path="/admin/list-user" element={ <ProtectedRoute> <ListUserPage /> </ProtectedRoute>} /> }
        { <Route path="/admin/create-user" element={ <ProtectedRoute> <CreateUserPage /> </ProtectedRoute>} /> }
        { <Route path="/admin/edit-user/:id" element={ <ProtectedRoute> <EditUserPage /> </ProtectedRoute>} /> }

        { <Route path="/admin/list-order" element={ <ProtectedRoute> <ListOrderPage /> </ProtectedRoute>} /> }
        
      </Route>
    </Routes>
  );
};
