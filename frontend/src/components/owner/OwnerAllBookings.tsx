import {Calendar, Clock, Users} from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import api from "../../lib/api.ts";

interface OwnerAllBookingsProps {
    bookings: any[];
    setBookings: React.Dispatch < React.SetStateAction < any[] >>;
    restaurants: any[];
    filterRestaurantId?: string | null;
    onFilterChange: (id : string | null) => void;
}

const restaurantIdOf = (b : any) => {
    const ref = b ?. restaurant;
    if (! ref) 
        return "";
    
    return typeof ref === "string" ? ref : (ref ?. _id ?? ref);
};

const statusBadge = (status : string) => {
    const base = "text-[9px] font-medium tracking-widest uppercase px-2 py-0.5 rounded-sm";
    if (status === "confirmed") 
        return `${base} bg-blue-100 text-blue-800`;
    
    if (status === "completed") 
        return `${base} bg-green-100 text-green-800`;
    
    return `${base} bg-error-container text-error`;
};

export default function OwnerAllBookings({
    bookings,
    setBookings,
    restaurants,
    filterRestaurantId,
    onFilterChange
} : OwnerAllBookingsProps) {
    const updateStatus = async (bookingId : string, newStatus : string, original : any,) => {
        setBookings((prev) => prev.map((b) => (b._id === bookingId ? {
            ...b,
            status: newStatus
        } : b)),);
        try {
            await api.put(`/owner/bookings/${bookingId}/status`, {status: newStatus});
            toast.success(`Booking status updated to ${newStatus}`);
        } catch (error : any) {
            setBookings((prev) => prev.map((b) => (b._id === bookingId ? original : b)),);
            toast.error(error ?. response ?. data ?. message || "Failed to update booking status",);
        }
    };

    const filtered = filterRestaurantId ? bookings.filter((b) => String(restaurantIdOf(b)) === String(filterRestaurantId),) : bookings;

    const groups = restaurants.filter((r) => !filterRestaurantId || String(r._id) === String(filterRestaurantId),).map((r) => ({
        restaurant: r,
        items: filtered.filter((b) => String(restaurantIdOf(b)) === String(r._id),)
    })).filter((g) => g.items.length > 0);

    return (
        <div className="space-y-6 text-left">
            <div className="flex flex-col md:flex-row flex-wrap justify-between items-start md:items-center gap-4 lg:hidden">
                <h3 className="font-display text-lg font-medium text-primary">
                    All Bookings
                </h3>
                {
                restaurants.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        <button onClick={
                                () => onFilterChange(null)
                            }
                            className={
                                `px-3 py-1.5 text-[10px] font-medium tracking-wider uppercase rounded-sm transition-colors cursor-pointer ${
                                    !filterRestaurantId ? "bg-primary text-white" : "bg-white border border-outline-variant/30 text-black/55 hover:border-primary"
                                }`
                        }>
                            All Restaurants
                        </button>
                        {
                        restaurants.map((r) => (
                            <button key={
                                    r._id
                                }
                                onClick={
                                    () => onFilterChange(r._id)
                                }
                                className={
                                    `px-3 py-1.5 text-[10px] font-medium tracking-wider uppercase rounded-sm transition-colors cursor-pointer ${
                                        filterRestaurantId === r._id ? "bg-primary text-white" : "bg-white border border-outline-variant/30 text-black/55 hover:border-primary"
                                    }`
                            }>
                                {
                                r.name
                            } </button>
                        ))
                    } </div>
                )
            } </div>

            {
            filtered.length === 0 ? (
                <div className="bg-white border border-outline-variant/10 p-12 text-center rounded-md">
                    <Calendar size={32}
                        className="mx-auto text-outline-variant mb-2"/>
                    <p className="text-xs text-black/55 italic">
                        No booking records found.
                    </p>
                </div>
            ) : (
                <div className="space-y-8">
                    {
                    groups.map((g) => (
                        <div key={
                                g.restaurant._id
                            }
                            className="space-y-3">
                            <div className="flex items-center gap-3">
                                <h4 className="font-display font-medium text-primary">
                                    {
                                    g.restaurant.name
                                } </h4>
                                <span className="text-[9px] text-black/50 uppercase tracking-widest bg-outline-variant/10 px-1.5 py-0.5 rounded-sm">
                                    {
                                    g.items.length
                                } </span>
                            </div>

                            <div className="bg-white border border-outline-variant/20 rounded-md shadow-sm divide-y divide-outline-variant/10">
                                {
                                g.items.map((b) => (
                                    <div key={
                                            b._id
                                        }
                                        className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                        <div className="space-y-1.5 flex-1">
                                            <div className="flex items-center gap-3">
                                                <h5 className="font-medium text-primary text-sm">
                                                    {
                                                    b.user ?. name
                                                } </h5>
                                                <span className="text-[9px] text-black/50 border border-outline-variant/30 px-1.5 py-0.5">
                                                    {
                                                    b.bookingId
                                                } </span>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-black/55">
                                                <span className="flex items-center gap-1">
                                                    <Users size={12}/> {
                                                    b.guests
                                                }
                                                    Guests
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock size={12}/> {
                                                    b.time
                                                } </span>
                                                <span className="flex items-center gap-1">
                                                    <Calendar size={12}/>{" "}
                                                    {
                                                    new Date(b.date).toLocaleDateString()
                                                } </span>
                                            </div>
                                            {
                                            b.specialRequests && (
                                                <p className="text-xs text-secondary/80 bg-secondary/5 px-3 py-1.5 rounded-sm border-l-2 border-secondary mt-2">
                                                    <strong>Requests:</strong>
                                                    {
                                                    b.specialRequests
                                                } </p>
                                            )
                                        } </div>

                                        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
                                            <span className={
                                                statusBadge(b.status)
                                            }>
                                                {
                                                b.status
                                            }</span>
                                            {
                                            b.status === "confirmed" && (
                                                <div className="flex gap-2">
                                                    <button onClick={
                                                            () => updateStatus(b._id, "completed", b)
                                                        }
                                                        className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-[9px] font-medium tracking-wider uppercase rounded-sm transition-colors cursor-pointer">
                                                        Complete
                                                    </button>
                                                    <button onClick={
                                                            () => updateStatus(b._id, "cancelled", b)
                                                        }
                                                        className="px-3 py-1.5 bg-error hover:bg-error/85 text-white text-[9px] font-medium tracking-wider uppercase rounded-sm transition-colors cursor-pointer">
                                                        Cancel
                                                    </button>
                                                </div>
                                            )
                                        } </div>
                                    </div>
                                ))
                            } </div>
                        </div>
                    ))
                } </div>
            )
        } </div>
    );
}
