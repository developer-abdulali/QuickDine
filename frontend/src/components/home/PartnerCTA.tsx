import {ArrowRight, StoreIcon} from "lucide-react";
import {Link} from "react-router-dom";

export default function PartnerCTA() {
    return (
        <section className="py-24 bg-surface-container-low/50 transition-colors">
            <div className="max-w-5xl mx-auto px-6 md:px-10">
                <div className="bg-surface-container-lowest border border-outline-variant/30 text-on-surface rounded-md px-8 md:px-14 py-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left shadow-sm">
                    <div>
                        <span className="text-[10px] tracking-[0.2em] uppercase text-secondary font-medium flex items-center justify-center md:justify-start gap-2 mb-3">
                            <StoreIcon size={14}/>
                            RESTAURANT OWNERS
                        </span>
                        <h2 className="font-display text-2xl md:text-3xl font-medium leading-tight text-on-surface">
                            Partner with QuickDine
                        </h2>
                        <p className="text-sm text-on-surface/60 mt-3 max-w-xl leading-relaxed">
                            Fill your tables with guaranteed, no-show-safe reservations and
                                          manage capacity, slots and analytics from one dashboard.
                        </p>
                    </div>
                    <Link to="/partner" className="shrink-0 bg-primary text-on-primary hover:bg-secondary hover:text-white transition-soft text-xs font-medium tracking-widest uppercase px-8 py-4 inline-flex items-center gap-2 rounded">
                        Become a Partner
                        <ArrowRight size={14}/>
                    </Link>
                </div>
            </div>
        </section>
    );
}

