import {CalendarCheckIcon, CompassIcon, UtensilsCrossedIcon} from "lucide-react";

const steps = [
    {
        icon: CompassIcon,
        step: "01",
        title: "Discover",
        text: "Explore a curated feed of hand-picked venues, exclusive rooftop tables and tasting-menu destinations."
    }, {
        icon: CalendarCheckIcon,
        step: "02",
        title: "Reserve",
        text: "Pick your date, party size and preferred slot — live capacity tells you the exact table availability in real time."
    }, {
        icon: UtensilsCrossedIcon,
        step: "03",
        title: "Savor",
        text: "Arrive to a reservation you can rely on, with your requests and special occasions already communicated."
    },
];

export default function HowItWorks() {
    return (
        <section className="py-24 bg-surface-container-low/50 transition-colors">
            <div className="max-w-7xl mx-auto px-6 md:px-10">
                <div className="text-center mb-14">
                    <span className="text-[10px] text-secondary tracking-[0.2em] font-medium block mb-2 uppercase">
                        HOW IT WORKS
                    </span>
                    <h2 className="font-display text-2xl md:text-3xl font-semibold text-on-surface">
                        Discover. Reserve. Dine.
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {
                    steps.map(({icon: Icon, step, title, text}) => (
                        <div key={step}
                            className="relative bg-surface-container-lowest border border-outline-variant/20 p-8 rounded-md shadow-sm space-y-5">
                            <div className="flex items-center justify-between">
                                <span className="w-12 h-12 bg-secondary/15 rounded-full flex items-center justify-center text-secondary">
                                    <Icon size={22}
                                        strokeWidth={1.4}/>
                                </span>
                                <span className="font-display text-4xl font-medium text-outline-variant/60">
                                    {step} </span>
                            </div>
                            <div>
                                <h3 className="font-display font-medium text-on-surface text-lg">
                                    {title} </h3>
                                <p className="text-xs text-on-surface/60 leading-relaxed mt-2">
                                    {text} </p>
                            </div>
                        </div>
                    ))
                } </div>
            </div>
        </section>
    );
}

