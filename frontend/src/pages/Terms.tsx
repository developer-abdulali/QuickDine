import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";
import StaticPageHeader from "../components/StaticPageHeader.tsx";

const sections = [
  {
    title: "1. Acceptance of Terms",
    body: "By accessing or using QuickDine (the 'Platform'), you agree to be bound by these Terms of Service. If you do not agree, please discontinue use immediately.",
  },
  {
    title: "2. Accounts",
    body: "You are responsible for safeguarding your account credentials and for all activity that occurs under your account. You must provide accurate information and keep it up to date.",
  },
  {
    title: "3. Reservations & Dining",
    body: "Reservations are confirmed subject to availability and venue capacity. No-shows may be subject to venue policy. QuickDine facilitates bookings between guests and venues but is not the operator of any venue.",
  },
  {
    title: "4. Partner Listings",
    body: "Restaurant partners are responsible for the accuracy of their listings and for honouring confirmed reservations. QuickDine may suspend or remove listings that violate these terms.",
  },
  {
    title: "5. Acceptable Use",
    body: "You agree not to misuse the Platform, interfere with its operation, submit fraudulent information, or attempt to access data you are not authorised to access.",
  },
  {
    title: "6. Intellectual Property",
    body: "All content, branding and technology on the Platform are the property of QuickDine or its licensors and may not be reproduced without permission.",
  },
  {
    title: "7. Limitation of Liability",
    body: "To the maximum extent permitted by law, QuickDine shall not be liable for indirect, incidental or consequential damages arising from your use of the Platform.",
  },
  {
    title: "8. Changes to Terms",
    body: "We may revise these Terms from time to time. Continued use of the Platform after changes take effect constitutes acceptance of the updated Terms.",
  },
];

export default function Terms() {
  return (
    <div className="min-h-screen bg-surface flex flex-col pt-20">
      <Navbar />

      <main className="grow">
        <StaticPageHeader
          eyebrow="Legal"
          title="Terms of Service"
          subtitle="Last updated: August 2026. These terms govern your use of the QuickDine platform as a guest or restaurant partner."
        />

        <section className="max-w-3xl mx-auto px-6 md:px-10 py-16 space-y-10 text-left">
          {sections.map((s) => (
            <div key={s.title} className="space-y-2">
              <h2 className="font-display text-lg font-medium text-primary">{s.title}</h2>
              <p className="text-sm text-black/55 leading-relaxed">{s.body}</p>
            </div>
          ))}
          <p className="text-xs text-black/40 italic">
            Questions about these terms? Contact us at support@example.com.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}