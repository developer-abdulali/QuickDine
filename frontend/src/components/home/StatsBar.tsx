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
        <section className="bg-primary text-white py-12">
            <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
                {
                stats.map((s) => (
                    <div key={
                            s.label
                        }
                        className="text-center space-y-1">
                        <h4 className="font-display text-3xl md:text-4xl font-medium">
                            {
                            s.value
                        } </h4>
                        <p className="text-[10px] tracking-widest uppercase text-white/70">
                            {
                            s.label
                        } </p>
                    </div>
                ))
            } </div>
        </section>
    );
}
