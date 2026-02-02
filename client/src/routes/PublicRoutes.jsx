import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";

// lazy pages
const Landing = lazy(() => import("../pages/Public/Landing"));
const Login = lazy(() => import("../pages/Public/Login"));
const Register = lazy(() => import("../pages/Public/Register"));
const ForgotPassword = lazy(() => import("../pages/Public/ForgotPass"));
const ResetPassword = lazy(() => import("../pages/Public/ResetPass"));
const PatientDashboard = lazy(() => import("../pages/Private/PatientDashboard"));
const StaffDashboard = lazy(() => import("../pages/Private/StaffDashboard"));
const PharmacistDashboard = lazy(() => import("../pages/Private/PharmacistDashboard"));
const BookAppointment = lazy(() => import("../pages/Private/BookAppointment"));
const MyAppointments = lazy(() => import("../pages/Private/MyAppointments"));

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
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />

                {/* Protected Routes */}
                <Route element={<PrivateRoutes />}>
                    <Route path="/patient-dashboard" element={<PatientDashboard />} />
                    <Route path="/book-appointment" element={<BookAppointment />} />
                    <Route path="/my-appointments" element={<MyAppointments />} />
                    <Route path="/staff-dashboard" element={<StaffDashboard />} />
                    <Route path="/pharmacist-dashboard" element={<PharmacistDashboard />} />
                </Route>

                {/* fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Suspense >
    );
};

export default PublicRoutes;