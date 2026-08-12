import {CalendarIcon, StoreIcon} from "lucide-react";

interface OwnerRestaurantsProps {
    restaurants: any[];
    bookings: any[];
    onEdit: (restaurant : any) => void;
    onViewBookings: (restaurantId : string) => void;
}

const restaurantIdOf = (b : any) => {
    const ref = b ?. restaurant;
    if (! ref) 
        return "";
    

    return typeof ref === "string" ? ref : (ref ?. _id ?? ref);
};

const statusBadge = (status : string) => {
    const base = "text-[9px] font-medium tracking-widest uppercase px-2 py-0.5 rounded-sm";
    if (status === "approved") 
        return `${base} bg-emerald-500/20 text-emerald-400`;
    

    if (status === "rejected") 
        return `${base} bg-error-container text-on-error-container`;
    

    return `${base} bg-sky-500/20 text-sky-400`;
};

export default function OwnerRestaurants({restaurants, bookings, onEdit, onViewBookings} : OwnerRestaurantsProps) {
    const bookingCount = (restaurantId? : string) => bookings.filter((b) => String(restaurantIdOf(b)) === String(restaurantId)).length;

    return (
        <div className="space-y-6 text-left text-on-surface">
            <div className="flex justify-between items-center lg:hidden">
                <h3 className="font-display text-lg font-medium text-on-surface">
                    My Restaurants
                </h3>
                <span className="text-xs text-on-surface/60">
                    {
                    restaurants.length
                }
                    registered
                </span>
            </div>

            {
            restaurants.length === 0 ? (
                <div className="bg-surface-container-lowest border border-outline-variant/10 p-12 text-center rounded-md">
                    <StoreIcon size={32}
                        className="mx-auto text-outline-variant mb-2"/>
                    <p className="text-xs text-on-surface/60 italic">
                        No restaurants registered yet.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {
                    restaurants.map((r) => {
                        const count = bookingCount(r._id);
                        return (
                            <div key={
                                    r._id
                                }
                                className="bg-surface-container-lowest border border-outline-variant/20 p-6 rounded-md shadow-sm space-y-4">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-center gap-3.5">
                                        <span className="w-12 h-12 bg-secondary/15 rounded-full flex items-center justify-center text-secondary font-medium text-base shrink-0">
                                            {
                                            r.name.charAt(0)
                                        } </span>
                                        <div>
                                            <h4 className="font-display font-medium text-on-surface text-base line-clamp-1">
                                                {
                                                r.name
                                            } </h4>
                                            <p className="text-xs text-on-surface/60 mt-0.5">
                                                {
                                                r.cuisine
                                            }
                                                · {
                                                r.location
                                            } </p>
                                        </div>
                                    </div>
                                    <span className={
                                        statusBadge(r.status)
                                    }>
                                        {
                                        r.status
                                    }</span>
                                </div>

                                <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-on-surface/60 border-t border-outline-variant/10 pt-3">
                                    <span>Capacity: {
                                        r.totalSeats
                                    }
                                        seats</span>
                                    <span>Bookings: {count}</span>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    <button onClick={
                                            () => onViewBookings(r._id)
                                        }
                                        className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-surface-container-low hover:bg-surface-container-high text-on-surface text-[10px] font-medium tracking-wider uppercase rounded-sm transition-colors cursor-pointer border border-outline-variant/20">
                                        <CalendarIcon size={12}/>
                                        Bookings ({count})
                                    </button>
                                    <button onClick={
                                            () => onEdit(r)
                                        }
                                        className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-primary hover:bg-secondary text-on-primary hover:text-white text-[10px] font-medium tracking-wider uppercase rounded-sm transition-colors cursor-pointer">
                                        Update
                                    </button>
                                </div>
                            </div>
                        );
                    })
                } </div>
            )
        } </div>
    );
}

