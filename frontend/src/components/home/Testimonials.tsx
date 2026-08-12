import {Star} from "lucide-react";
import {dummyReviews} from "../../assets/assets";

export default function Testimonials() {
    return (
        <section className="py-24 bg-white border-y border-outline-variant/10">
            <div className="max-w-7xl mx-auto px-6 md:px-10">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <span className="text-[10px] text-secondary tracking-[0.2em] block mb-2 uppercase">
                            MEMBER REVIEWS
                        </span>
                        <h2 className="font-display text-2xl md:text-3xl font-semibold text-primary">
                            What Our Diners Say
                        </h2>
                    </div>
                    <span className="flex items-center gap-1.5 text-secondary">
                        <Star size={16}
                            fill="currentColor"/>
                        <span className="text-xs font-medium text-primary">4.8 / 5</span>
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {
                    dummyReviews.map((r) => (
                        <div key={
                                r._id
                            }
                            className="bg-surface border border-outline-variant/20 p-7 rounded-md shadow-sm flex flex-col gap-4">
                            <div className="flex gap-1 text-secondary">
                                {
                                Array.from({length: r.rating}).map((_, i) => (
                                    <Star key={i}
                                        size={14}
                                        fill="currentColor"/>
                                ))
                            } </div>
                            <p className="text-sm text-black/55 leading-relaxed flex-1">
                                “{
                                r.comment
                            }”
                            </p>
                            <div>
                                <p className="text-sm font-medium text-primary">
                                    {
                                    r.userName
                                }</p>
                                <p className="text-[10px] text-black/50 uppercase tracking-widest mt-0.5">
                                    {
                                    new Date(r.visitedDate).toLocaleDateString(undefined, {
                                        month: "short",
                                        year: "numeric"
                                    })
                                } </p>
                            </div>
                        </div>
                    ))
                } </div>
            </div>
        </section>
    );
}
