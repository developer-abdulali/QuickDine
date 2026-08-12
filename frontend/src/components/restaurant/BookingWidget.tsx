import {Calendar, Users} from "lucide-react";

interface BookingWidgetProps {
    restaurant: any;
    selectedDate: string;
    setSelectedDate: (date : string) => void;
    selectedGuests: string;
    setSelectedGuests: (guests : string) => void;
    selectedSlot: string;
    setSelectedSlot: (slot : string) => void;
    slotsAvailability: any[];
    loadingSlots: boolean;
    isAuthenticated: boolean;
    handleReserveClick: () => void;
}

export default function BookingWidget({
    restaurant,
    selectedDate,
    setSelectedDate,
    selectedGuests,
    setSelectedGuests,
    selectedSlot,
    setSelectedSlot,
    slotsAvailability,
    loadingSlots,
    isAuthenticated,
    handleReserveClick
} : BookingWidgetProps) {
    if (!restaurant) 
        return null;
    


    return (
        <div className="bg-surface-container-lowest border border-outline-variant/20 p-6 rounded-md shadow-sm text-left text-on-surface transition-colors">
            <h3 className="font-display text-lg font-medium text-on-surface mb-4 pb-3 border-b border-outline-variant/10">Book a Table</h3>

            <div className="space-y-4">
                {/* Guests count */}
                <div className="space-y-1">
                    <label className="block text-[10px] font-medium text-on-surface/60 tracking-wider uppercase">PARTY SIZE</label>
                    <div className="relative">
                        <Users className="absolute left-3 top-3 text-on-surface/50"
                            size={16}/>
                        <select value={selectedGuests}
                            onChange={
                                (e) => setSelectedGuests(e.target.value)
                            }
                            className="w-full bg-surface-container-low text-on-surface pl-9 pr-3 py-2.5 text-xs border border-outline-variant/40 focus:border-secondary focus:outline-none rounded-md cursor-pointer">
                            <option value="1" className="bg-surface-container-lowest text-on-surface">1 Guest</option>
                            <option value="2" className="bg-surface-container-lowest text-on-surface">2 Guests</option>
                            <option value="4" className="bg-surface-container-lowest text-on-surface">4 Guests</option>
                            <option value="6" className="bg-surface-container-lowest text-on-surface">6 Guests</option>
                            <option value="8" className="bg-surface-container-lowest text-on-surface">8 Guests</option>
                        </select>
                    </div>
                </div>

                {/* Date */}
                <div className="space-y-1">
                    <label className="block text-[10px] font-medium text-on-surface/60 tracking-wider uppercase">DATE</label>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-3 text-on-surface/50"
                            size={16}/>
                        <input type="date"
                            value={selectedDate}
                            onChange={
                                (e) => setSelectedDate(e.target.value)
                            }
                            min={
                                new Date().toISOString().split("T")[0]
                            }
                            className="w-full bg-surface-container-low text-on-surface pl-9 pr-3 py-2.5 text-xs border border-outline-variant/40 focus:border-secondary focus:outline-none rounded-md cursor-pointer"/>
                    </div>
                </div>

                {/* Time Slots Grid */}
                <div className="space-y-2 pt-2">
                    <span className="block text-[10px] font-medium text-on-surface/60 tracking-wider uppercase">AVAILABLE TIMES</span>
                    <div className="grid grid-cols-3 gap-2">
                        {
                        loadingSlots ? (
                            <div className="col-span-3 py-4 text-center flex justify-center">
                                <div className="w-5 h-5 border-2 border-outline-variant/30 border-t-secondary rounded-full animate-spin"></div>
                            </div>
                        ) : ((() => {
                            const todayStr = new Date().toISOString().split("T")[0];
                            const isToday = selectedDate === todayStr;
                            const allSlots = slotsAvailability.length > 0 ? slotsAvailability : (restaurant.availableSlots || []).map((s : string) => ({time: s, availableSeats: 20, isAvailable: true}));
                            return allSlots.filter((slotInfo : any) => {
                                if (! isToday) 
                                    return true;
                                

                                const [slotHour, slotMinute] = slotInfo.time.split(":").map(Number);
                                const now = new Date();
                                const currentHour = now.getHours();
                                const currentMinute = now.getMinutes();
                                return slotHour > currentHour || (slotHour === currentHour && slotMinute > currentMinute);
                            });
                        })().map((slotInfo : any) => {
                            const slot = slotInfo.time;
                            const isSelected = selectedSlot === slot;
                            const isFull = !slotInfo.isAvailable || slotInfo.availableSeats < Number(selectedGuests);
                            return (
                                <button key={slot}
                                    type="button"
                                    disabled={isFull}
                                    onClick={
                                        () => setSelectedSlot(slot)
                                    }
                                    className={
                                        `py-2 px-1 text-center text-[10px] font-medium tracking-wider uppercase border transition-all rounded-sm ${
                                            isSelected ? "bg-secondary border-secondary text-white shadow-sm cursor-pointer" : isFull ? "bg-surface-container-low border-outline-variant/10 text-on-surface/30 cursor-not-allowed opacity-50" : "border-outline-variant/40 text-on-surface/80 hover:border-secondary hover:text-secondary cursor-pointer bg-surface-container-low"
                                        }`
                                }>
                                    {slot}
                                    {
                                    isFull && <span className="block text-[8px] text-error uppercase mt-0.5">Full</span>
                                } </button>
                            );
                        }))
                    } </div>
                </div>

                {/* Action Button */}
                <button onClick={handleReserveClick}
                    className="w-full bg-primary hover:bg-secondary text-on-primary hover:text-white py-4 mt-6 text-xs font-medium tracking-widest uppercase transition-colors cursor-pointer rounded">
                    {
                    isAuthenticated ? "RESERVE NOW" : "LOGIN TO RESERVE"
                } </button>

                <p className="text-center text-[10px] text-on-surface/50 mt-3 leading-relaxed">
                    No reservation fee. Cancel for free up to 24 hours prior.
                </p>
            </div>
        </div>
    );
}

