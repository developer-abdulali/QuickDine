import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";
import StaticPageHeader from "../components/StaticPageHeader.tsx";

const sections = [
  {
    title: "1. What Are Cookies?",
    body: "Cookies are small text files stored on your device that help websites remember you and understand how the site is used.",
  },
  {
    title: "2. How We Use Cookies",
    body: "We use essential cookies for authentication and security, preference cookies to remember your settings, and analytics cookies to understand how the platform is used so we can improve it.",
  },
  {
    title: "3. Managing Cookies",
    body: "You can control or delete cookies through your browser settings at any time. Disabling essential cookies may affect how the platform functions for you.",
  },
  {
    title: "4. Third-Party Cookies",
    body: "Some third-party services (such as analytics providers) may set their own cookies when you visit. Their use is governed by their respective privacy policies.",
  },
  {
    title: "5. Contact",
    body: "If you have questions about cookies, contact us at support@example.com.",
  },
];

export default function Cookies() {
  return (
    <div className="min-h-screen bg-surface flex flex-col pt-20">
      <Navbar />

      <main className="grow">
        <StaticPageHeader
          eyebrow="Legal"
          title="Cookie Policy"
          subtitle="Last updated: August 2026. Here's how QuickDine uses cookies and how you can control them."
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