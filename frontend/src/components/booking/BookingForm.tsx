import React from "react";

interface BookingFormProps {
    name: string;
    setName: (val : string) => void;
    email: string;
    setEmail: (val : string) => void;
    phone: string;
    setPhone: (val : string) => void;
    occasion: string;
    setOccasion: (val : string) => void;
    specialRequests: string;
    setSpecialRequests: (val : string) => void;
    confirming: boolean;
    onSubmit: (e : React.FormEvent) => void;
}

export default function BookingForm({
    name,
    setName,
    email,
    setEmail,
    phone,
    setPhone,
    occasion,
    setOccasion,
    specialRequests,
    setSpecialRequests,
    confirming,
    onSubmit
} : BookingFormProps) {
    return (
        <div className="bg-surface-container-lowest border border-outline-variant/20 p-8 rounded-md shadow-sm text-left text-on-surface">
            <h3 className="font-display text-lg font-semibold text-on-surface mb-6 pb-3 border-b border-outline-variant/10">Guest Details</h3>

            <form onSubmit={onSubmit}
                className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-1">
                        <label className="block text-[10px] font-medium text-on-surface/60 tracking-wider uppercase">FULL NAME</label>
                        <input type="text"
                            value={name}
                            onChange={
                                (e) => setName(e.target.value)
                            }
                            className="w-full pb-2 pt-1 text-sm bg-transparent border-b border-outline-variant/60 focus:border-secondary focus:outline-none transition-colors text-on-surface"
                            required/>
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                        <label className="block text-[10px] font-medium text-on-surface/60 tracking-wider uppercase">EMAIL ADDRESS</label>
                        <input type="email"
                            value={email}
                            onChange={
                                (e) => setEmail(e.target.value)
                            }
                            className="w-full pb-2 pt-1 text-sm bg-transparent border-b border-outline-variant/60 focus:border-secondary focus:outline-none transition-colors text-on-surface"
                            required/>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Phone */}
                    <div className="space-y-1">
                        <label className="block text-[10px] font-medium text-on-surface/60 tracking-wider uppercase">PHONE NUMBER</label>
                        <input type="tel"
                            value={phone}
                            onChange={
                                (e) => setPhone(e.target.value)
                            }
                            className="w-full pb-2 pt-1 text-sm bg-transparent border-b border-outline-variant/60 focus:border-secondary focus:outline-none transition-colors text-on-surface"
                            required/>
                    </div>

                    {/* Occasion */}
                    <div className="space-y-1">
                        <label className="block text-[10px] font-medium text-on-surface/60 tracking-wider uppercase">SPECIAL OCCASION</label>
                        <select value={occasion}
                            onChange={
                                (e) => setOccasion(e.target.value)
                            }
                            className="w-full pb-2 pt-1 text-sm bg-transparent border-b border-outline-variant/60 focus:border-secondary focus:outline-none cursor-pointer text-on-surface">
                            <option value="" className="bg-surface-container-lowest text-on-surface">None</option>
                            <option value="Birthday" className="bg-surface-container-lowest text-on-surface">Birthday</option>
                            <option value="Anniversary" className="bg-surface-container-lowest text-on-surface">Anniversary</option>
                            <option value="Date Night" className="bg-surface-container-lowest text-on-surface">Date Night</option>
                            <option value="Business Dining" className="bg-surface-container-lowest text-on-surface">Business Dining</option>
                        </select>
                    </div>
                </div>

                {/* Special Requests */}
                <div className="space-y-1">
                    <label className="block text-[10px] font-medium text-on-surface/60 tracking-wider uppercase">
                        SPECIAL REQUESTS (OPTIONAL)
                    </label>
                    <textarea value={specialRequests}
                        onChange={
                            (e) => setSpecialRequests(e.target.value)
                        }
                        rows={3}
                        placeholder="Allergies, dietary restrictions, table preference..."
                        className="w-full bg-surface-container-low text-on-surface border border-outline-variant/40 rounded-md p-3 text-xs focus:border-secondary focus:outline-none"></textarea>
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-start gap-3 py-2">
                    <input type="checkbox" id="newsletterOpt" className="mt-1 cursor-pointer" defaultChecked/>
                    <label htmlFor="newsletterOpt" className="text-xs text-on-surface/60 leading-relaxed cursor-pointer select-none">
                        Send me seasonal tasting menu invitations and private chef event notifications from QuickDine.
                    </label>
                </div>

                {/* Confirm Action Button */}
                <button type="submit"
                    disabled={confirming}
                    className="w-full bg-primary hover:bg-secondary text-on-primary hover:text-white py-4 text-xs font-medium tracking-widest uppercase transition-colors cursor-pointer rounded-sm">
                    {
                    confirming ? "CONFIRMING TABLE..." : "BOOK TABLE"
                } </button>
            </form>
        </div>
    );
}

