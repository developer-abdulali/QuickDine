const stats = [
    {
        value: "120+",
        label: "Partner Venues"
    }, {
        value: "40K",
        label: "Reservations Served"
    }, {
        value: "4.8",
        label: "Average Guest Rating"
    }, {
        value: "24/7",
        label: "Concierge Support"
    },
];

export default function StatsBar() {
    return (
        <section className="bg-surface-container-low text-on-surface border-y border-outline-variant/20 py-12 transition-colors">
            <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
                {
                stats.map((s) => (
                    <div key={
                            s.label
                        }
                        className="text-center space-y-1">
                        <h4 className="font-display text-3xl md:text-4xl font-medium text-secondary">
                            {
                            s.value
                        } </h4>
                        <p className="text-[10px] tracking-widest uppercase text-on-surface/60 font-medium">
                            {
                            s.label
                        } </p>
                    </div>
                ))
            } </div>
        </section>
    );
}

