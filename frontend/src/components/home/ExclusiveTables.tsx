import {ArrowRight} from "lucide-react";
import {Link} from "react-router-dom";
import RestaurantCard from "../RestaurantCard.tsx";

interface ExclusiveTablesProps {
    exclusiveRestaurants: any[];
}

export default function ExclusiveTables({exclusiveRestaurants} : ExclusiveTablesProps) {
    if (!exclusiveRestaurants.length) 
        return null;
    


    return (
        <section className="py-24 border-b border-outline-variant/10">
            <div className="max-w-7xl mx-auto px-6 md:px-10">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <span className="text-[10px] text-secondary tracking-[0.2em] block mb-2 uppercase">
                            HARD-TO-GET TABLES
                        </span>
                        <h2 className="font-display text-2xl md:text-3xl font-semibold text-primary">
                            Exclusive Tables &amp; Private Rooms
                        </h2>
                    </div>
                    <Link to="/search" className="text-xs text-secondary hover:text-primary transition-colors flex items-center gap-1.5 group">
                        EXPLORE MORE{" "}
                        <ArrowRight size={14}
                            className="group-hover:translate-x-1 transition-transform"/>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                    exclusiveRestaurants.slice(0, 3).map((r) => (
                        <RestaurantCard key={
                                r._id
                            }
                            restaurant={r}/>
                    ))
                } </div>
            </div>
        </section>
    );
}
