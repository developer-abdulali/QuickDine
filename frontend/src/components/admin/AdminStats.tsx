import {Calendar, ShieldCheck, Users, Utensils} from "lucide-react";

interface AdminStatsProps {
    stats: any;
}

export default function AdminStats({stats} : AdminStatsProps) {
    if (!stats) 
        return null;
    

    const kpiCards = [
        {
            title: "Active Diners",
            value: stats.users ?. totalUsers,
            icon: Users
        }, {
            title: "Partners",
            value: stats.users ?. totalOwners,
            icon: ShieldCheck
        }, {
            title: "Total Venues",
            value: stats.restaurants ?. total,
            icon: Utensils
        }, {
            title: "Bookings",
            value: stats.bookings ?. total,
            icon: Calendar
        },
    ];

    return (
        <div className="space-y-8 text-left text-on-surface">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {
                kpiCards.map(({title, value, icon: Icon}) => (
                    <div key={title}
                        className="bg-surface-container-lowest border border-outline-variant/20 p-5 rounded-md shadow-sm space-y-2">
                        <span className="text-[10px] font-medium tracking-wider text-on-surface/60 uppercase flex items-center gap-1.5">
                            <Icon size={12}
                                className="text-secondary"/> {title} </span>
                        <h4 className="font-display text-2xl font-medium text-on-surface">
                            {value} </h4>
                    </div>
                ))
            } </div>

            {/* Recent Bookings */}
            <div className="space-y-4">
                <h3 className="font-display text-lg font-medium text-on-surface">
                    Recent Bookings Activity
                </h3>

                {
                stats.latestBookings ?. length === 0 ? (
                    <p className="text-xs text-on-surface/50 italic">
                        No bookings recorded on the platform.
                    </p>
                ) : (
                    <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-md overflow-hidden shadow-sm">
                        <table className="w-full text-left text-xs border-collapse">
                            <thead>
                                <tr className="bg-surface-container-low border-b border-outline-variant/10 text-[10px] tracking-wider text-on-surface/60 uppercase font-medium">
                                    {
                                    [
                                        "Ref Code",
                                        "Diner",
                                        "Restaurant",
                                        "Details",
                                        "Status"
                                    ].map((header) => (
                                        <th key={header}
                                            className={
                                                `p-4 ${
                                                    header === "Status" ? "text-right" : ""
                                                }`
                                        }>
                                            {header} </th>
                                    ),)
                                } </tr>
                            </thead>

                            <tbody className="divide-y divide-outline-variant/10">
                                {
                                stats.latestBookings.map((b : any) => (
                                    <tr key={
                                            b._id
                                        }
                                        className="hover:bg-surface-container-low/50 transition-colors">
                                        <td className="p-4 font-medium text-on-surface">
                                            {
                                            b.bookingId
                                        }</td>

                                        <td className="p-4">
                                            <div className="text-on-surface font-medium">
                                                {
                                                b.user ?. name
                                            }</div>
                                            <div className="text-[10px] text-on-surface/50">
                                                {
                                                b.user ?. email
                                            } </div>
                                        </td>

                                        <td className="p-4 text-on-surface font-medium">
                                            {
                                            b.restaurant ?. name || "Deleted Restaurant"
                                        } </td>

                                        <td className="p-4 text-on-surface/60">
                                            {
                                            new Date(b.date).toLocaleDateString()
                                        }
                                            at {
                                            b.time
                                        }
                                            PM •{" "}
                                            {
                                            b.guests
                                        }
                                            Guests
                                        </td>

                                        <td className="p-4 text-right">
                                            <span className={
                                                `inline-block py-0.5 px-2 text-[9px] tracking-wider uppercase rounded-sm font-medium ${
                                                    b.status === "confirmed" ? "bg-sky-500/20 text-sky-400" : b.status === "completed" ? "bg-emerald-500/20 text-emerald-400" : "bg-error-container text-on-error-container"
                                                }`
                                            }>
                                                {
                                                b.status
                                            } </span>
                                        </td>
                                    </tr>
                                ))
                            } </tbody>
                        </table>
                    </div>
                )
            } </div>
        </div>
    );
}

