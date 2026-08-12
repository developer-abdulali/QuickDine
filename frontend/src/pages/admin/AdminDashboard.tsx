/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar.tsx";
import Footer from "../../components/Footer.tsx";
import Loader from "../../components/Loader.tsx";
import { useAppContext } from "../../context/AppContext.tsx";
import { ShieldCheckIcon, CheckCircleIcon, BarChart3Icon, UsersIcon } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../lib/api.ts";

// Subcomponents
import AdminApprovals from "../../components/admin/AdminApprovals.tsx";
import AdminStats from "../../components/admin/AdminStats.tsx";
import AdminUsers from "../../components/admin/AdminUsers.tsx";

export default function AdminDashboard() {
    const { logout } = useAppContext();
    const [restaurants, setRestaurants] = useState<any[]>([]);
    const [stats, setStats] = useState<any>(null);
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<"approvals" | "stats" | "users">("approvals");
    const [btnLoading, setBtnLoading] = useState<string | null>(null);

    const fetchRestaurants = async () => {
        const res = await api.get("/admin/restaurants").catch(() => ({ data: [] }));
        setRestaurants(res.data ?? []);
    };

    const fetchStats = async () => {
        const res = await api.get("/admin/stats").catch(() => ({ data: null }));
        setStats(res.data);
    };

    const fetchUsers = async () => {
        const res = await api.get("/admin/users").catch(() => ({ data: [] }));
        setUsers(res.data ?? []);
    };

    const fetchAdminData = async () => {
        try {
            await Promise.all([fetchRestaurants(), fetchStats(), fetchUsers()]);
        } catch (error: any) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Failed to load admin data");
        } finally {
            setLoading(false);
        }
    };

    const handleApproveStatus = async (
        restaurantId: string,
        status: "approved" | "rejected",
    ): Promise<void> => {
        setBtnLoading(restaurantId);
        try {
            await api.put(`/admin/restaurants/${restaurantId}/approve`, { status });
            toast.success(`Restaurant ${status === "approved" ? "approved" : "rejected"} successfully`);
            await Promise.all([fetchRestaurants(), fetchStats()]);
        } catch (error: any) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Failed to update restaurant status");
        } finally {
            setBtnLoading(null);
        }
    };

    const handleDeleteRestaurant = async (restaurantId: string): Promise<void> => {
        if (!window.confirm("Delete this restaurant and all its bookings?")) return;
        setBtnLoading(`rdel-${restaurantId}`);
        try {
            await api.delete(`/admin/restaurants/${restaurantId}`);
            toast.success("Restaurant deleted successfully");
            await Promise.all([fetchRestaurants(), fetchStats()]);
        } catch (error: any) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Failed to delete restaurant");
        } finally {
            setBtnLoading(null);
        }
    };

    const handleRoleChange = async (
        userId: string,
        role: "user" | "owner" | "admin",
    ): Promise<void> => {
        setBtnLoading(`role-${userId}`);
        try {
            await api.put(`/admin/users/${userId}/role`, { role });
            toast.success("User role updated successfully");
            setUsers((prev) => prev.map((u) => (u._id === userId ? { ...u, role } : u)));
        } catch (error: any) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Failed to update user role");
        } finally {
            setBtnLoading(null);
        }
    };

    const handleDeleteUser = async (userId: string): Promise<void> => {
        if (!window.confirm("Delete this user and all their bookings/restaurants?")) return;
        setBtnLoading(`del-${userId}`);
        try {
            await api.delete(`/admin/users/${userId}`);
            toast.success("User deleted successfully");
            setUsers((prev) => prev.filter((u) => u._id !== userId));
            await Promise.all([fetchRestaurants(), fetchStats()]);
        } catch (error: any) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Failed to delete user");
        } finally {
            setBtnLoading(null);
        }
    };

    useEffect(() => {
        (async () => await fetchAdminData())();
    }, []);

    if (loading) {
        return <Loader text="Loading Master Admin Console..." />;
    }

    // Segregate pending / other restaurants
    const pendingRestaurants = restaurants.filter((r) => r.status === "pending");
    const otherRestaurants = restaurants.filter((r) => r.status !== "pending");

    return (
        <div className="min-h-screen bg-surface flex flex-col pt-20 text-on-surface transition-colors">
            <Navbar />

            <main className="grow max-w-7xl w-full mx-auto px-6 md:px-10 py-12">
                {/* Heading */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-outline-variant/10 pb-8 mb-8 text-left">
                    <div>
                        <h1 className="font-display text-2xl md:text-3xl font-medium text-on-surface flex items-center gap-2">
                            <ShieldCheckIcon size={28} className="text-secondary" /> Admin Console
                        </h1>
                        <p className="text-xs text-on-surface/60 mt-1.5">
                            Approve new restaurant partners, audit active slots listings, and review platform booking metrics.
                        </p>
                    </div>
                    <button
                        onClick={logout}
                        className="bg-error-container hover:bg-error-container/85 text-on-error-container px-4 py-2 text-[10px] font-medium tracking-widest uppercase transition-colors rounded-sm cursor-pointer"
                    >
                        Sign Out
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Tab Navigation Sidebar */}
                    <aside className="lg:col-span-3 space-y-6 bg-surface-container-lowest border border-outline-variant/20 p-6 rounded-md shadow-sm h-fit">
                        <nav className="flex flex-col gap-1.5">
                            <button
                                onClick={() => setActiveTab("approvals")}
                                className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-medium tracking-wider uppercase text-left rounded-sm cursor-pointer transition-colors ${
                                    activeTab === "approvals" ? "bg-primary text-on-primary font-medium" : "text-on-surface/60 hover:bg-surface-container-low"
                                }`}
                            >
                                <CheckCircleIcon size={14} />
                                Approvals ({pendingRestaurants.length} Pending)
                            </button>
                            <button
                                onClick={() => setActiveTab("stats")}
                                className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-medium tracking-wider uppercase text-left rounded-sm cursor-pointer transition-colors ${
                                    activeTab === "stats" ? "bg-primary text-on-primary font-medium" : "text-on-surface/60 hover:bg-surface-container-low"
                                }`}
                            >
                                <BarChart3Icon size={14} />
                                Analytics & Stats
                            </button>
                            <button
                                onClick={() => setActiveTab("users")}
                                className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-medium tracking-wider uppercase text-left rounded-sm cursor-pointer transition-colors ${
                                    activeTab === "users" ? "bg-primary text-on-primary font-medium" : "text-on-surface/60 hover:bg-surface-container-low"
                                }`}
                            >
                                <UsersIcon size={14} />
                                Users Control ({users.length})
                            </button>
                        </nav>
                    </aside>

                    {/* Content Panel */}
                    <div className="lg:col-span-9 space-y-8">
                        {/* Tab 1: Restaurant Approvals */}
                        {activeTab === "approvals" && (
                            <AdminApprovals
                                pendingRestaurants={pendingRestaurants}
                                otherRestaurants={otherRestaurants}
                                btnLoading={btnLoading}
                                onApproveStatus={handleApproveStatus}
                                onDeleteRestaurant={handleDeleteRestaurant}
                            />
                        )}

                        {/* Tab 2: Analytics & Stats */}
                        {activeTab === "stats" && stats && <AdminStats stats={stats} />}

                        {/* Tab 3: Users Control */}
                        {activeTab === "users" && (
                            <AdminUsers
                                users={users}
                                btnLoading={btnLoading}
                                onRoleChange={handleRoleChange}
                                onDeleteUser={handleDeleteUser}
                            />
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

