import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// lazy pages
const Login = lazy(() => import("../pages/Public/Login"));
const Register = lazy(() => import("../pages/Public/Register"));
// const ForgotPassword = lazy(() => import("../pages/Public/ForgotPassword"));
// const ResetPassword = lazy(() => import("../pages/Public/ResetPassword"));

const PublicRoutes = () => {
    return (
        <Suspense
            fallback={
                <div className="flex items-center justify-center min-h-screen">
                    <p>Loading...</p>
                </div>
            }
        >
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
                {/* <Route path="/reset-password/:token" element={<ResetPassword />} /> */}

                {/* fallback */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </Suspense>
    );
};

export default PublicRoutes;
