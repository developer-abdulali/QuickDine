import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";
import StaticPageHeader from "../components/StaticPageHeader.tsx";

const sections = [
  {
    title: "1. Information We Collect",
    body: "We collect the information you provide when creating an account, making a reservation or registering a restaurant — including your name, email, phone number and dining preferences.",
  },
  {
    title: "2. How We Use Your Information",
    body: "We use your information to process reservations, deliver service communications, improve the platform, personalise discovery and ensure venue availability is accurate. We never sell your personal data.",
  },
  {
    title: "3. Sharing With Venues",
    body: "When you make a reservation, we share the necessary booking details (name, party size, contact and requests) with the venue so it can host you.",
  },
  {
    title: "4. Data Security",
    body: "We apply industry-standard safeguards — including encryption in transit — to protect your information from unauthorised access, alteration or disclosure.",
  },
  {
    title: "5. Your Rights",
    body: "You may access, correct or delete your personal information at any time by contacting support@example.com or managing your account settings.",
  },
  {
    title: "6. Retention",
    body: "We retain personal data only as long as necessary to provide services, comply with legal obligations and resolve disputes.",
  },
  {
    title: "7. Contact",
    body: "For any privacy-related questions, reach us at support@example.com. We respond promptly during business hours.",
  },
];

export default function Privacy() {
  return (
    <div className="min-h-screen bg-surface flex flex-col pt-20">
      <Navbar />

      <main className="grow">
        <StaticPageHeader
          eyebrow="Legal"
          title="Privacy Policy"
          subtitle="Last updated: August 2026. Your trust matters — this policy explains what we collect, why, and how we keep it safe."
        />

        <section className="max-w-3xl mx-auto px-6 md:px-10 py-16 space-y-10 text-left">
          {sections.map((s) => (
            <div key={s.title} className="space-y-2">
              <h2 className="font-display text-lg font-medium text-primary">{s.title}</h2>
              <p className="text-sm text-black/55 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}