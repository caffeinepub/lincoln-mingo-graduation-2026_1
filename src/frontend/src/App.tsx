import { Toaster } from "@/components/ui/sonner";
import { useEffect, useState } from "react";
import AdminDashboard from "./components/AdminDashboard";
import Footer from "./components/Footer";
import GiftRegistry from "./components/GiftRegistry";
import GraduationSlideshow from "./components/GraduationSlideshow";
import Header from "./components/Header";
import Hero from "./components/Hero";
import LiveStream from "./components/LiveStream";
import PersonalNote from "./components/PersonalNote";
import RSVPMessages from "./components/RSVPMessages";
import VideoSection from "./components/VideoSection";
import WhyMatters from "./components/WhyMatters";
import { fireConfetti } from "./hooks/useConfetti";

export default function App() {
  const [showAdmin, setShowAdmin] = useState(window.location.hash === "#admin");

  useEffect(() => {
    const handleHashChange = () => {
      setShowAdmin(window.location.hash === "#admin");
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    if (!showAdmin) {
      const timer = setTimeout(() => {
        fireConfetti();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [showAdmin]);

  if (showAdmin) {
    return (
      <>
        <Toaster
          theme="dark"
          toastOptions={{
            classNames: {
              toast: "bg-navy-50 border border-gold/30 text-foreground",
            },
          }}
        />
        <AdminDashboard />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-navy text-foreground">
      <Toaster
        theme="dark"
        toastOptions={{
          classNames: {
            toast: "bg-navy-50 border border-gold/30 text-foreground",
          },
        }}
      />
      <Header />
      <main className="pt-[88px] sm:pt-[96px]">
        <GraduationSlideshow />
        <Hero />
        <WhyMatters />
        <VideoSection />
        <LiveStream />
        <RSVPMessages />
        <GiftRegistry />
        <PersonalNote />
      </main>
      <Footer />
    </div>
  );
}
