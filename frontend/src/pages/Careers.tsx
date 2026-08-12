import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";
import StaticPageHeader from "../components/StaticPageHeader.tsx";
import { CheckCircle2Icon } from "lucide-react";

const roles = [
  { title: "Senior Product Engineer", type: "Full-time", location: "Remote / New York" },
  { title: "Restaurant Partnerships Manager", type: "Full-time", location: "San Francisco" },
  { title: "Brand & Content Designer", type: "Full-time", location: "New York" },
  { title: "Guest Experience Associate", type: "Full-time · Part-time", location: "Remote" },
];

const perks = [
  "Kitchen-table culture — we build what we'd want at our own tables",
  "Competitive compensation, equity and flexible remote work",
  "Annual dining stipend to explore partner venues",
  "Health, wellness and continuous-learning budgets",
];

export default function Careers() {
  return (
    <div className="min-h-screen bg-surface flex flex-col pt-20">
      <Navbar />

      <main className="grow">
        <StaticPageHeader
          eyebrow="Company"
          title="Careers at QuickDine"
          subtitle="We are chefs of product, hosts of engineering and sommeliers of design — join a team building the future of restaurant discovery."
        />

        {/* Culture + Perks */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
          <div className="space-y-4">
            <h2 className="font-display text-2xl font-medium text-primary">
              Life at QuickDine
            </h2>
            <p className="text-sm text-black/55 leading-relaxed">
              We move fast, taste everything, and obsess over detail — much like the
              kitchens we serve. Small teams, high ownership, and a genuine love for
              hospitality define how we work.
            </p>
          </div>
          <div className="bg-white border border-outline-variant/20 rounded-md shadow-sm p-6 space-y-3">
            <h3 className="font-display font-medium text-primary">What You'll Enjoy</h3>
            {perks.map((p) => (
              <div key={p} className="flex items-start gap-2.5 text-xs text-black/55">
                <CheckCircle2Icon size={14} className="text-secondary shrink-0 mt-0.5" />
                <span>{p}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Open roles */}
        <section className="bg-white border-y border-outline-variant/10">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
            <h2 className="font-display text-2xl font-medium text-primary mb-8 text-left">
              Open Positions
            </h2>
            <div className="space-y-4">
              {roles.map((r) => (
                <div
                  key={r.title}
                  className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-surface border border-outline-variant/20 p-6 rounded-md shadow-sm"
                >
                  <div>
                    <h3 className="font-display font-medium text-primary">{r.title}</h3>
                    <p className="text-xs text-black/55 mt-1">
                      {r.type} · {r.location}
                    </p>
                  </div>
                  <a
                    href="mailto:careers@example.com"
                    className="bg-primary hover:bg-secondary text-white px-4 py-2 text-[10px] font-medium tracking-widest uppercase transition-colors rounded-sm cursor-pointer"
                  >
                    Apply Now
                  </a>
                </div>
              ))}
            </div>
            <p className="text-xs text-black/55 italic mt-8 text-center">
              Don't see your role? Email us at careers@example.com — we love meeting
              great people.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}