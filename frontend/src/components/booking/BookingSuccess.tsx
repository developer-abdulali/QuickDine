import {
    Calendar,
    Check,
    Clock,
    MapPin,
    Users
} from "lucide-react";
import {Link} from "react-router-dom";

interface BookingSuccessProps {
    confirmedBooking: any;
    restaurant: any;
    date: string;
    slot: string;
    guests: string;
}

export default function BookingSuccess({
    confirmedBooking,
    restaurant,
    date,
    slot,
    guests
} : BookingSuccessProps) {
    if (!confirmedBooking || !restaurant) 
        return null;
    


    return (
        <div className="max-w-xl w-full bg-surface-container-lowest border border-outline-variant/20 p-10 text-center rounded-lg ambient-shadow space-y-8 animate-in zoom-in-95 duration-300 text-on-surface">
            <div className="w-16 h-16 bg-secondary/15 rounded-full flex items-center justify-center text-secondary mx-auto">
                <Check size={32}/>
            </div>

            <div className="space-y-3">
                <h2 className="font-display text-3xl font-medium text-on-surface">Reservation Confirmed</h2>
                <p className="text-xs text-on-surface/60 max-w-sm mx-auto leading-relaxed">
                    A curated dining experience has been successfully reserved for you at{" "}
                    <span className="text-on-surface font-semibold">
                        {
                        restaurant.name
                    }</span>.
                </p>
            </div>

            {/* Confirmation Card Details */}
            <div className="bg-surface-container-low p-6 rounded-md space-y-4 text-left border border-outline-variant/10 text-on-surface">
                <div className="flex justify-between items-center pb-3 border-b border-outline-variant/10">
                    <span className="text-[10px] font-medium text-on-surface/60 tracking-wider uppercase">REFERENCE CODE</span>
                    <span className="text-sm font-medium text-secondary">
                        {
                        confirmedBooking.bookingId
                    }</span>
                </div>

                <div className="space-y-3 text-xs text-on-surface">
                    <div className="flex items-center gap-3">
                        <Calendar size={14}
                            className="text-on-surface/60"/>
                        <span className="font-medium"> {
                            new Date(date).toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric"
                            })
                        } </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Clock size={14}
                            className="text-on-surface/60"/>
                        <span className="font-medium">{slot}
                            PM</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Users size={14}
                            className="text-on-surface/60"/>
                        <span className="font-medium">{guests}
                            Guests</span>
                    </div>
                    <div className="flex items-start gap-3">
                        <MapPin size={14}
                            className="text-on-surface/60 mt-0.5"/>
                        <span className="font-medium">{
                            restaurant.address
                        }</span>
                    </div>
                </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/dashboard" className="flex-1 bg-primary hover:bg-secondary text-on-primary hover:text-white py-3.5 px-4 text-xs font-medium tracking-widest uppercase text-center cursor-pointer transition-colors rounded-sm">
                    MY BOOKINGS
                </Link>
                <Link to="/" className="flex-1 border border-outline-variant/50 hover:border-secondary text-on-surface hover:text-secondary py-3.5 px-4 text-xs font-medium tracking-widest uppercase text-center cursor-pointer transition-colors rounded-sm">
                    DISCOVER MORE
                </Link>
            </div>
        </div>
    );
}

