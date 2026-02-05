import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";

// lazy pages
const Landing = lazy(() => import("../pages/Public/Landing"));
const Login = lazy(() => import("../pages/Public/Login"));
const Register = lazy(() => import("../pages/Public/Register"));
const ForgotPassword = lazy(() => import("../pages/Public/ForgotPass"));
const ResetPassword = lazy(() => import("../pages/Public/ResetPass"));
const PatientDashboard = lazy(() => import("../pages/Private/PatientPages/PatientDashboard"));
const StaffDashboard = lazy(() => import("../pages/Private/StaffPages/StaffDashboard"));
const PharmacistDashboard = lazy(() => import("../pages/Private/PharmacistPages/PharmacistDashboard"));
const BookAppointment = lazy(() => import("../pages/Private/PatientPages/BookAppointment"));
const MyAppointments = lazy(() => import("../pages/Private/PatientPages/MyAppointments"));
const MedicalHistory = lazy(() => import("../pages/Private/PatientPages/MedicalHistory"));
const DoctorAvailability = lazy(() => import("../pages/Private/PatientPages/DoctorAvailability"));
const DoctorSchedules = lazy(() => import("../pages/Private/StaffPages/DoctorSchedules"));
const PatientQueue = lazy(() => import("../pages/Private/StaffPages/PatientQueue"));
const PatientRecords = lazy(() => import("../pages/Private/StaffPages/PatientRecords"));
const AddMedicine = lazy(() => import("../pages/Private/PharmacistPages/AddMedicine"));
const SearchMedicine = lazy(() => import("../pages/Private/PharmacistPages/SearchMedicine"));
const PharmacyBilling = lazy(() => import("../pages/Private/PharmacistPages/PharmacyBilling"));
const PharmacistSchedule = lazy(() => import("../pages/Private/PharmacistPages/PharmacistSchedule"));
const AdminDashboard = lazy(() => import("../pages/Private/AdminPages/AdminDashboard"));
const ManagePatients = lazy(() => import("../pages/Private/AdminPages/ManagePatient"));
const ManageStaffs = lazy(() => import("../pages/Private/AdminPages/ManageStaff"));

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
                    <Route path="/medical-history" element={<MedicalHistory />} />
                    <Route path="/doctor-availability" element={<DoctorAvailability />} />
                    <Route path="/staff-dashboard" element={<StaffDashboard />} />
                    <Route path="/pharmacist-dashboard" element={<PharmacistDashboard />} />
                    <Route path="/doctor-schedule" element={<DoctorSchedules />} />
                    <Route path="/patient-records" element={<PatientRecords />} />
                    <Route path="/patient-queue" element={<PatientQueue />} />
                    <Route path="/add-medicine" element={<AddMedicine />} />
                    <Route path="/search-medicine" element={<SearchMedicine />} />
                    <Route path="/pharmacy-billing" element={<PharmacyBilling />} />
                    <Route path="/pharmacist-schedule" element={<PharmacistSchedule />} />
                    <Route path="/admin-dashboard" element={<AdminDashboard />} />
                    <Route path="/manage-patients" element={<ManagePatients />} />
                    <Route path="/manage-staffs" element={<ManageStaffs />} />
                </Route>

                {/* fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Suspense >
    );
};

export default PublicRoutes;