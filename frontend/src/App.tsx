import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Search from "./pages/Search.tsx";
import RestaurantDetail from "./pages/RestaurantDetail.tsx";
import BookingConfirmation from "./pages/BookingConfirmation.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import OwnerDashboard from "./pages/owner/OwnerDashboard.tsx";
import AdminDashboard from "./pages/admin/AdminDashboard.tsx";
import About from "./pages/About.tsx";
import Partner from "./pages/Partner.tsx";
import Careers from "./pages/Careers.tsx";
import Terms from "./pages/Terms.tsx";
import Privacy from "./pages/Privacy.tsx";
import Cookies from "./pages/Cookies.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";
import GoToTopButton from "./components/GoToTopButton.tsx";
import { Toaster } from "react-hot-toast";

export default function App() {
    return (
        <>
            <ScrollToTop />
            <GoToTopButton />
            <Toaster 
                position="bottom-right"
                toastOptions={{
                    style: {
                        background: "#1a1c1c",
                        color: "#ffffff",
                        fontFamily: "Manrope, sans-serif",
                        fontSize: "12px",
                        letterSpacing: "0.02em",
                        borderRadius: "4px",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                    },
                }}
            />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/restaurant/:slug" element={<RestaurantDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/partner" element={<Partner />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/cookies" element={<Cookies />} />
                <Route 
                    path="/booking/:slug" 
                    element={
                        <ProtectedRoute>
                            <BookingConfirmation />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/dashboard" 
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/owner/dashboard" 
                    element={
                        <ProtectedRoute allowedRoles={["owner"]}>
                            <OwnerDashboard />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/admin/dashboard" 
                    element={
                        <ProtectedRoute allowedRoles={["admin"]}>
                            <AdminDashboard />
                        </ProtectedRoute>
                    } 
                />
            </Routes>
        </>
    );
}

