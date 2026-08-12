import { useAppContext } from "../context/AppContext.tsx";
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";
import StaticPageHeader from "../components/StaticPageHeader.tsx";
import {
  BarChart3Icon,
  CalendarDaysIcon,
  HeartHandshakeIcon,
  SmartphoneIcon,
} from "lucide-react";

const benefits = [
  {
    icon: CalendarDaysIcon,
    title: "Zero-Headache Reservations",
    text: "Real-time slot-based booking with automatic capacity control — no more phone logs or double-booked tables.",
  },
  {
    icon: BarChart3Icon,
    title: "Guest Analytics",
    text: "Understand peak hours, party sizes and review sentiment to grow your covers intelligently.",
  },
  {
    icon: SmartphoneIcon,
    title: "Your Venue, On Your Terms",
    text: "Update menus, pricing, slots and imagery in minutes from a dedicated owner dashboard.",
  },
  {
    icon: HeartHandshakeIcon,
    title: "A Curated Audience",
    text: "Join a hand-picked directory of venues featured to discerning diners actively looking to book.",
  },
];

const steps = [
  {
    step: "01",
    title: "Register Your Venue",
    text: "Create an owner account and fill out your restaurant profile — cuisine, location, capacity and imagery.",
  },
  {
    step: "02",
    title: "Get Approved",
    text: "Our curation team reviews your listing and approves it for publication on the platform.",
  },
  {
    step: "03",
    title: "Start Receiving Reservations",
    text: "Once live, guests can discover and book your tables in real time while you manage it all from the dashboard.",
  },
];

export default function Partner() {
  const { setAuthModalOpen } = useAppContext();

  return (
    <div className="min-h-screen bg-surface flex flex-col pt-20">
      <Navbar />

      <main className="grow">
        <StaticPageHeader
          eyebrow="Partnerships"
          title="Partner with QuickDine"
          subtitle="Put your restaurant in front of guests who travel for unforgettable meals — with the tools to manage every reservation, slot and special occasion in one place."
        >
          <button
            onClick={() => setAuthModalOpen(true)}
            className="mt-8 inline-block bg-primary hover:bg-secondary text-white px-6 py-3 text-xs font-medium tracking-widest uppercase transition-colors cursor-pointer"
          >
            Register Your Restaurant
          </button>
        </StaticPageHeader>

        {/* Benefits */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 py-16">
          <h2 className="font-display text-2xl font-medium text-primary mb-10 text-left">
            Why Partner With Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="bg-white border border-outline-variant/20 p-6 rounded-md shadow-sm space-y-3"
              >
                <Icon size={22} className="text-secondary" />
                <h3 className="font-display font-medium text-primary">{title}</h3>
                <p className="text-xs text-black/55 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="bg-white border-y border-outline-variant/10">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
            <h2 className="font-display text-2xl font-medium text-primary mb-10 text-left">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {steps.map((s) => (
                <div
                  key={s.step}
                  className="bg-surface border border-outline-variant/20 p-6 rounded-md shadow-sm space-y-3"
                >
                  <span className="font-display text-3xl font-medium text-secondary/60">
                    {s.step}
                  </span>
                  <h3 className="font-display font-medium text-primary">{s.title}</h3>
                  <p className="text-xs text-black/55 leading-relaxed">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 text-center">
          <h2 className="font-display text-2xl font-medium text-primary">
            Ready to grow your covers?
          </h2>
          <p className="text-sm text-black/55 mt-3 max-w-xl mx-auto">
            Join hundreds of independent venues using QuickDine to fill tables and
            delight guests — from brunch bistros to fine-dining destinations.
          </p>
          <button
            onClick={() => setAuthModalOpen(true)}
            className="mt-8 inline-block bg-primary hover:bg-secondary text-white px-8 py-3 text-xs font-medium tracking-widest uppercase transition-colors cursor-pointer"
          >
            Get Started
          </button>
        </section>
      </main>

      <Footer />
    </div>
  );
}