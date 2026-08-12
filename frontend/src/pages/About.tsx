import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";
import StaticPageHeader from "../components/StaticPageHeader.tsx";
import { CompassIcon, Globe2Icon, HeartIcon, LeafIcon } from "lucide-react";

const values = [
  {
    icon: CompassIcon,
    title: "Curated Discovery",
    text: "Every venue on QuickDine is hand-reviewed, so you dine with confidence at only the city's most exceptional tables.",
  },
  {
    icon: HeartIcon,
    title: "Hospitality First",
    text: "We champion independent chefs and restaurateurs, celebrating the craft and care behind every dish.",
  },
  {
    icon: LeafIcon,
    title: "Responsible Dining",
    text: "From sustainable sourcing to waste-aware booking, we help partners run greener, smarter kitchens.",
  },
  {
    icon: Globe2Icon,
    title: "Community Driven",
    text: "Restaurants, diners and neighborhoods grow together — reservations that keep local life thriving.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-surface flex flex-col pt-20">
      <Navbar />

      <main className="grow">
        <StaticPageHeader
          eyebrow="Company"
          title="About QuickDine"
          subtitle="QuickDine connects discerning palates with the world's most exceptional culinary experiences — pairing curious diners with the restaurants shaping modern gastronomy."
        />

        {/* Story */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
          <div className="space-y-4">
            <h2 className="font-display text-2xl font-medium text-primary">Our Story</h2>
            <p className="text-sm text-black/55 leading-relaxed">
              QuickDine began with a simple frustration: remarkable restaurants were
              everywhere, yet discovering them, reserving a table, and managing guest
              capacity remained fragmented and manual. We built a single platform where
              diners find and book exceptional experiences, and where restaurant owners
              run reservations effortlessly.
            </p>
            <p className="text-sm text-black/55 leading-relaxed">
              Today QuickDine serves thousands of guests and partner venues each month,
              pairing smart slot management with a curation-first discovery feed.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="font-display text-2xl font-medium text-primary">Our Mission</h2>
            <p className="text-sm text-black/55 leading-relaxed">
              To make great dining effortless for guests and sustainable for chefs — by
              turning every reservation into a memorable evening and every cover into
              predictable revenue.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="bg-white border-y border-outline-variant/10">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
            <h2 className="font-display text-2xl font-medium text-primary mb-10 text-left">
              What We Stand For
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="bg-surface border border-outline-variant/20 p-6 rounded-md shadow-sm space-y-3"
                >
                  <Icon size={22} className="text-secondary" />
                  <h3 className="font-display font-medium text-primary">{title}</h3>
                  <p className="text-xs text-black/55 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "120+", label: "Partner Venues" },
              { value: "40K", label: "Reservations Served" },
              { value: "4.8", label: "Average Rating" },
              { value: "24/7", label: "Concierge Support" },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-white border border-outline-variant/20 p-6 rounded-md shadow-sm text-center space-y-1"
              >
                <h4 className="font-display text-3xl font-medium text-primary">{s.value}</h4>
                <p className="text-[10px] tracking-widest uppercase text-black/55">{s.label}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}