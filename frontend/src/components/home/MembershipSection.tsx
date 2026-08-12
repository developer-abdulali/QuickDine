import {Armchair, BadgeCheck} from "lucide-react";
import {assets} from "../../assets/assets";

export default function MembershipSection() {
    return (
        <section className="py-24 xl:py-32 bg-surface-container-lowest text-on-surface transition-colors px-6 md:px-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7 h-[450px] overflow-hidden rounded-lg border border-outline-variant/20">
                    <img src={
                            assets.membership_section_img
                        }
                        alt="Chef's Table"
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"/>
                </div>
                <div className="lg:col-span-5 flex flex-col justify-center lg:pl-6">
                    <span className="text-[10px] text-secondary tracking-[0.2em] font-medium block mb-2 uppercase">PREMIUM CLUB MEMBERSHIP</span>
                    <h2 className="font-display text-3xl md:text-4xl text-on-surface mb-6 leading-tight">Access the Exquisite Chef's Table</h2>
                    <p className="text-sm text-on-surface/60 mb-8 leading-relaxed">
                        Join GourmetReserve and receive priority access to seasonal chef collaborations, private dining club events, and
                                                table guarantees at high-demand tables.
                    </p>

                    <div className="space-y-4">
                        <div className="flex gap-4">
                            <BadgeCheck size={20}
                                className="text-secondary shrink-0 mt-0.5"/>
                            <div>
                                <h4 className="text-sm text-on-surface font-medium">Last-Minute Reservations</h4>
                                <p className="text-xs text-on-surface/60 mt-1 leading-relaxed">
                                    Unlock tables held exclusively for club members during peak weekends.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Armchair size={20}
                                className="text-secondary shrink-0 mt-0.5"/>
                            <div>
                                <h4 className="text-sm text-on-surface font-medium">Curated Tasting Invites</h4>
                                <p className="text-xs text-on-surface/60 mt-1 leading-relaxed">
                                    Receive personalized invitations to private kitchen tasting sessions.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

