import {CheckCircle, MapPin, Users, Utensils} from "lucide-react";
import {Link} from "react-router-dom";

interface AdminApprovalsProps {
    pendingRestaurants: any[];
    otherRestaurants: any[];
    btnLoading: string | null;
    onApproveStatus: (restaurantId : string, status : "approved" | "rejected",) => Promise < void >;
    onDeleteRestaurant: (restaurantId : string) => Promise < void >;
}

export default function AdminApprovals({
    pendingRestaurants,
    otherRestaurants,
    btnLoading,
    onApproveStatus,
    onDeleteRestaurant
} : AdminApprovalsProps) {
    return (
        <div className="space-y-8 text-left text-on-surface">
            {/* Section A: Pending Approvals */}
            <div className="space-y-4">
                <h3 className="font-display text-lg font-medium text-on-surface flex items-center gap-2">
                    Pending Registration Requests ({
                    pendingRestaurants.length
                })
                </h3>

                {
                pendingRestaurants.length === 0 ? (
                    <div className="bg-surface-container-lowest border border-outline-variant/10 p-12 text-center rounded-md">
                        <CheckCircle size={32}
                            className="mx-auto text-emerald-500 mb-2"/>
                        <p className="text-xs text-on-surface/60 italic">
                            All restaurant registrations have been processed.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {
                        pendingRestaurants.map((r) => (
                            <div key={
                                    r._id
                                }
                                className="bg-surface-container-lowest border border-outline-variant/20 rounded-md p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                <div className="space-y-1.5 flex-1">
                                    <h4 className="font-display text-base font-medium text-on-surface">
                                        {
                                        r.name
                                    } </h4>
                                    <p className="text-xs text-on-surface/60 leading-relaxed">
                                        {
                                        r.description
                                    } </p>
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-on-surface/50 pt-2">
                                        <span className="flex items-center gap-1">
                                            <Utensils size={12}/> {
                                            r.cuisine
                                        } </span>
                                        <span className="flex items-center gap-1">
                                            <MapPin size={12}/> {
                                            r.address
                                        } </span>
                                        <span className="flex items-center gap-1">
                                            <Users size={12}/>
                                            Capacity: {
                                            r.totalSeats
                                        }
                                            seats
                                        </span>
                                    </div>
                                    <p className="text-[10px] text-secondary font-medium tracking-wide uppercase pt-1">
                                        Owner: {
                                        r.owner ?. name
                                    }
                                        ({
                                        r.owner ?. email
                                    })
                                    </p>
                                </div>

                                <div className="flex gap-2 shrink-0 w-full md:w-auto justify-end">
                                    <button disabled={
                                            btnLoading === r._id
                                        }
                                        onClick={
                                            () => onApproveStatus(r._id, "approved")
                                        }
                                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-[9px] font-medium tracking-wider uppercase transition-colors rounded-sm cursor-pointer disabled:opacity-50">
                                        Approve
                                    </button>
                                    <button disabled={
                                            btnLoading === r._id
                                        }
                                        onClick={
                                            () => onApproveStatus(r._id, "rejected")
                                        }
                                        className="px-4 py-2 bg-error hover:bg-error/85 text-white text-[9px] font-medium tracking-wider uppercase transition-colors rounded-sm cursor-pointer disabled:opacity-50">
                                        Reject
                                    </button>
                                </div>
                            </div>
                        ))
                    } </div>
                )
            } </div>

            {/* Section B: Existing Restaurant Partners */}
            <div className="space-y-4">
                <h3 className="font-display text-lg font-medium text-on-surface">
                    Registered Venues ({
                    otherRestaurants.length
                })
                </h3>

                {
                otherRestaurants.length === 0 ? (
                    <p className="text-xs text-on-surface/50 italic">
                        No approved or rejected restaurant records.
                    </p>
                ) : (
                    <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-md overflow-hidden shadow-sm">
                        <table className="w-full text-left text-xs border-collapse">
                            <thead>
                                <tr className="bg-surface-container-low border-b border-outline-variant/10 text-[10px] font-medium tracking-wider text-on-surface/60 uppercase">
                                    <th className="p-4">Venue</th>
                                    <th className="p-4">Cuisine & City</th>
                                    <th className="p-4">Owner Account</th>
                                    <th className="p-4 text-right">Status / Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-outline-variant/10">
                                {
                                otherRestaurants.map((r) => (
                                    <tr key={
                                            r._id
                                        }
                                        className="hover:bg-surface-container-low/50 transition-colors">
                                        <td className="p-4 font-medium text-on-surface">
                                            <Link to={
                                                    `/restaurant/${
                                                        r.slug
                                                    }`
                                                }
                                                className="hover:text-secondary">
                                                {
                                                r.name
                                            } </Link>
                                        </td>
                                        <td className="p-4 text-on-surface/80">
                                            {
                                            r.cuisine
                                        }
                                            • {
                                            r.location
                                        } </td>
                                        <td className="p-4 text-on-surface/60">
                                            {
                                            r.owner ?. name || "N/A"
                                        } </td>
                                        <td className="p-4 text-right space-x-3">
                                            <span className={
                                                `inline-block py-0.5 px-2 text-[9px] font-medium tracking-wider uppercase rounded-sm ${
                                                    r.status === "approved" ? "bg-emerald-500/20 text-emerald-400" : "bg-error-container text-on-error-container"
                                                }`
                                            }>
                                                {
                                                r.status
                                            } </span>

                                            {
                                            r.status === "approved" ? (
                                                <button onClick={
                                                        () => onApproveStatus(r._id, "rejected")
                                                    }
                                                    className="text-error hover:underline text-[10px] uppercase font-medium cursor-pointer">
                                                    Suspend
                                                </button>
                                            ) : (
                                                <button onClick={
                                                        () => onApproveStatus(r._id, "approved")
                                                    }
                                                    className="text-emerald-500 hover:underline text-[10px] uppercase font-medium cursor-pointer">
                                                    Re-Approve
                                                </button>
                                            )
                                        }
                                            <button onClick={
                                                    () => onDeleteRestaurant(r._id)
                                                }
                                                disabled={
                                                    btnLoading === `rdel-${
                                                        r._id
                                                    }`
                                                }
                                                className="text-error hover:underline text-[10px] uppercase font-medium disabled:opacity-50 cursor-pointer">
                                                {
                                                btnLoading === `rdel-${
                                                    r._id
                                                }` ? "Deleting..." : "Delete"
                                            } </button>
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

