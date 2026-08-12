import {Calendar, MapPin, Search, Users} from "lucide-react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {assets} from "../../assets/assets";

export default function Hero() {
    const navigate = useNavigate();

    // Search input states
    const [searchQuery, setSearchQuery] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [guests, setGuests] = useState("2");

    const handleSearchSubmit = (e : React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (searchQuery) 
            params.append("search", searchQuery);
        
        if (location) 
            params.append("location", location);
        
        if (date) 
            params.append("date", date);
        
        if (guests) 
            params.append("guests", guests);
        

        navigate(`/search?${
            params.toString()
        }`);
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img alt="Elegant Dining Room" className="w-full h-full object-cover brightness-70"
                    src={
                        assets.hero_bg_img
                    }/>
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-7xl px-6 md:px-10 text-center">
                <span className="text-sm text-secondary-container tracking-[0.25em] uppercase block mb-4 font-medium">
                    EXQUISITE DINING EXPERIENCES
                </span>
                <h1 className="font-display text-4xl md:text-6xl text-white mb-12 max-w-3xl mx-auto leading-[1.15] font-medium tracking-tight drop-shadow-md">
                    Curation for the Discerning Palette
                </h1>

                {/* Search Bar Component */}
                <form onSubmit={handleSearchSubmit}
                    className="bg-surface-container-lowest border border-outline-variant/30 p-3 md:p-2.5 ambient-shadow rounded-lg max-w-4xl mx-auto flex flex-col md:flex-row gap-2">
                    {/* Search Term / Cuisine */}
                    <div className="flex-1 flex items-center border-b md:border-b-0 md:border-r border-outline-variant/30 px-4 py-3">
                        <Search className="text-on-surface/50 mr-3 shrink-0"
                            size={18}/>
                        <input className="w-full bg-transparent border-none focus:outline-none text-sm text-on-surface placeholder:text-on-surface/50" placeholder="Search cuisines, restaurants..." type="text"
                            value={searchQuery}
                            onChange={
                                (e) => setSearchQuery(e.target.value)
                            }/>
                    </div>

                    {/* Location */}
                    <div className="flex-1 flex items-center border-b md:border-b-0 md:border-r border-outline-variant/30 px-4 py-3">
                        <MapPin className="text-on-surface/50 mr-3 shrink-0"
                            size={18}/>
                        <input className="w-full bg-transparent border-none focus:outline-none text-sm text-on-surface placeholder:text-on-surface/50" placeholder="Location (e.g. Manhattan)" type="text"
                            value={location}
                            onChange={
                                (e) => setLocation(e.target.value)
                            }/>
                    </div>

                    {/* Date */}
                    <div className="flex-1 flex items-center border-b md:border-b-0 md:border-r border-outline-variant/30 px-4 py-3">
                        <Calendar className="text-on-surface/50 mr-3 shrink-0"
                            size={18}/>
                        <input className="w-full bg-transparent border-none focus:outline-none text-sm text-on-surface placeholder:text-on-surface/50 cursor-pointer" type="date"
                            value={date}
                            onChange={
                                (e) => setDate(e.target.value)
                            }/>
                    </div>

                    {/* Guests */}
                    <div className="flex-1 flex items-center border-b md:border-b-0 md:border-r border-outline-variant/30 px-4 py-3">
                        <Users className="text-on-surface/50 mr-3 shrink-0"
                            size={18}/>
                        <select className="w-full bg-transparent border-none focus:outline-none text-sm text-on-surface cursor-pointer"
                            value={guests}
                            onChange={
                                (e) => setGuests(e.target.value)
                        }>
                            <option value="1" className="bg-surface-container-lowest text-on-surface">1 Guest</option>
                            <option value="2" className="bg-surface-container-lowest text-on-surface">2 Guests</option>
                            <option value="4" className="bg-surface-container-lowest text-on-surface">4 Guests</option>
                            <option value="6" className="bg-surface-container-lowest text-on-surface">6 Guests</option>
                            <option value="8" className="bg-surface-container-lowest text-on-surface">8 Guests</option>
                        </select>
                    </div>

                    <button type="submit" className="bg-primary text-on-primary text-xs tracking-widest uppercase px-8 py-4 md:py-3 hover:bg-secondary hover:text-white transition-soft cursor-pointer font-medium rounded">
                        FIND A TABLE
                    </button>
                </form>
            </div>
        </section>
    );
}

