/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext.tsx";
import Navbar from "../../components/Navbar.tsx";
import Footer from "../../components/Footer.tsx";
import Loader from "../../components/Loader.tsx";
import { ArrowLeftIcon, CalendarIcon, PlusIcon, StoreIcon } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../lib/api.ts";
import RestaurantWizard from "../../components/owner/RestaurantWizard.tsx";
import OwnerProfileDetails from "../../components/owner/OwnerProfileDetails.tsx";
import OwnerRestaurants from "../../components/owner/OwnerRestaurants.tsx";
import OwnerAllBookings from "../../components/owner/OwnerAllBookings.tsx";

export default function OwnerDashboard() {
  const { logout } = useAppContext();
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingRestaurant, setAddingRestaurant] = useState(false);
  const [activeTab, setActiveTab] = useState<"restaurants" | "bookings">(
    "restaurants",
  );
  const [bookingsFilter, setBookingsFilter] = useState<string | null>(null);
  const [editingRestaurant, setEditingRestaurant] = useState<any>(null);

  const fetchOwnerData = async () => {
    try {
      const [restaurantRes, bookingsRes] = await Promise.all([
        api.get("/owner/restaurant").catch(() => ({ data: [] })),
        api.get("/owner/bookings").catch(() => ({ data: [] })),
      ]);
      setRestaurants(restaurantRes.data ?? []);
      setBookings(bookingsRes.data ?? []);
    } catch (error: any) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || "Failed to load owner data",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => await fetchOwnerData())();
  }, []);

  const handleRestaurantCreated = (newRestaurant: any) => {
    setRestaurants((prev) =>
      prev.some((r) => r._id === newRestaurant._id)
        ? prev
        : [newRestaurant, ...prev],
    );
    setAddingRestaurant(false);
  };

  const handleRestaurantUpdated = (updated: any) => {
    setRestaurants((prev) =>
      prev.map((r) => (r._id === updated._id ? updated : r)),
    );
    setEditingRestaurant(updated);
  };

  const handleViewBookings = (restaurantId: string) => {
    setBookingsFilter(restaurantId);
    setActiveTab("bookings");
  };

  if (loading) {
    return <Loader text="Loading Owner Dashboard..." />;
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col pt-20 text-on-surface transition-colors">
      <Navbar />

      <main className="grow max-w-7xl w-full mx-auto px-6 md:px-10 py-12">
        {/* Heading */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-outline-variant/10 pb-8 mb-8 text-left">
          <div>
            <h1 className="font-display text-2xl md:text-3xl text-on-surface font-semibold">
              Restaurant Portal
            </h1>
            <p className="text-xs text-on-surface/60 mt-1.5">
              Review capacity limits and process live reservations.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {restaurants.length > 0 && !editingRestaurant && (
              <button
                onClick={() => setAddingRestaurant((prev) => !prev)}
                className="bg-primary hover:bg-secondary text-on-primary hover:text-white px-4 py-2 text-[10px] font-medium tracking-widest uppercase transition-colors rounded-sm cursor-pointer"
              >
                {addingRestaurant ? (
                  <>
                    <ArrowLeftIcon
                      size={12}
                      className="inline-block mr-1.5 -mt-0.5"
                    />
                    Go Back
                  </>
                ) : (
                  <>
                    <PlusIcon
                      size={12}
                      className="inline-block mr-1.5 -mt-0.5"
                    />
                    Add New Restaurant
                  </>
                )}
              </button>
            )}

            <button
              onClick={logout}
              className="bg-error-container hover:bg-error-container/85 text-on-error-container px-4 py-2 text-[10px] font-medium tracking-widest uppercase transition-colors rounded-sm cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>

        {addingRestaurant || restaurants.length === 0 ? (
          /* Create/Add restaurant wizard */
          <RestaurantWizard setRestaurant={handleRestaurantCreated} />
        ) : editingRestaurant ? (
          /* Edit a specific restaurant */
          <div className="max-w-3xl mx-auto">
            <button
              onClick={() => setEditingRestaurant(null)}
              className="inline-flex items-center gap-1.5 mb-6 px-4 py-2 bg-surface-container-lowest border border-outline-variant/30 hover:border-secondary text-on-surface/80 hover:text-secondary text-[10px] font-medium tracking-wider uppercase rounded-sm transition-colors cursor-pointer"
            >
              <ArrowLeftIcon size={12} />
              Back to My Restaurants
            </button>
            <OwnerProfileDetails
              restaurant={editingRestaurant}
              setRestaurant={handleRestaurantUpdated}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Tab selector sidebar */}
            <aside className="lg:col-span-3 space-y-6 bg-surface-container-lowest border border-outline-variant/20 p-6 rounded-md shadow-sm h-fit">
              <nav className="flex flex-col gap-1.5">
                <button
                  onClick={() => setActiveTab("restaurants")}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-medium tracking-wider uppercase text-left rounded-sm cursor-pointer transition-colors ${
                    activeTab === "restaurants"
                      ? "bg-primary text-on-primary font-medium"
                      : "text-on-surface/60 hover:bg-surface-container-low"
                  }`}
                >
                  <StoreIcon size={14} />
                  My Restaurants ({restaurants.length})
                </button>

                <button
                  onClick={() => setActiveTab("bookings")}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-medium tracking-wider uppercase text-left rounded-sm cursor-pointer transition-colors ${
                    activeTab === "bookings"
                      ? "bg-primary text-on-primary font-medium"
                      : "text-on-surface/60 hover:bg-surface-container-low"
                  }`}
                >
                  <CalendarIcon size={14} />
                  All Bookings ({bookings.length})
                </button>
              </nav>
            </aside>

            {/* Content Area */}
            <div className="lg:col-span-9 space-y-8">
              {activeTab === "bookings" ? (
                <OwnerAllBookings
                  bookings={bookings}
                  setBookings={setBookings}
                  restaurants={restaurants}
                  filterRestaurantId={bookingsFilter}
                  onFilterChange={setBookingsFilter}
                />
              ) : (
                <OwnerRestaurants
                  restaurants={restaurants}
                  bookings={bookings}
                  onEdit={setEditingRestaurant}
                  onViewBookings={handleViewBookings}
                />
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

