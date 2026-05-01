import type { ReactNode } from "react";
import { Navigate } from "react-router";

type Props = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const  userInfo  = localStorage.getItem("userInfo");

  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;