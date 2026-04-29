import type { ReactNode } from "react";
import { Navigate } from "react-router";

type Props = {
  children: ReactNode;
};

const ProtectedCustomerRoute = ({ children }: Props) => {
//   const token = localStorage.getItem("token");
    const orderType = sessionStorage.getItem("orderType");

  if (!orderType) {
    return <Navigate to="/order" replace />;
  }

  return children;
};

export default ProtectedCustomerRoute;