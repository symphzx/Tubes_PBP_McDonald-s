import { lazy } from "react"
import { Route, Routes } from "react-router"

const PaymentPage = lazy(() => import("../pages/PaymentPage"))

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/payment" element={<PaymentPage />} />
        </Routes>
    )
}