/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AuthModal from "../components/AuthModal.tsx";
import Footer from "../components/Footer.tsx";
import CuisineBrowse from "../components/home/CuisineBrowse.tsx";
import ExclusiveTables from "../components/home/ExclusiveTables.tsx";
import Hero from "../components/home/Hero.tsx";
import HowItWorks from "../components/home/HowItWorks.tsx";
import MembershipSection from "../components/home/MembershipSection.tsx";
import NewsletterCTA from "../components/home/NewsletterCTA.tsx";
import PartnerCTA from "../components/home/PartnerCTA.tsx";
import StatsBar from "../components/home/StatsBar.tsx";
import Testimonials from "../components/home/Testimonials.tsx";
import TrendingRow from "../components/home/TrendingRow.tsx";
import Navbar from "../components/Navbar.tsx";
import api from "../lib/api.ts";

export default function Home() {
  const [trending, setTrending] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await api.get("/restaurants/featured");
        setTrending(res.data);
      } catch (error: any) {
        console.error(error);
        toast.error(error?.response?.data?.message || error?.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTrending();
  }, []);

  return (
    <div className="min-h-screen bg-surface flex flex-col pt-0">
      <Navbar />
      <AuthModal />
      <main className="flex-1">
        <Hero />
        <StatsBar />
        <CuisineBrowse />
        <HowItWorks />
        <TrendingRow trending={trending} loading={loading} />
        <ExclusiveTables exclusiveRestaurants={trending.slice(3)} />
        <Testimonials />
        <MembershipSection />
        <PartnerCTA />
        <NewsletterCTA />
      </main>
      <Footer />
    </div>
  );
}
