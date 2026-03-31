import { Toaster } from "@/components/ui/sonner";
import { useEffect, useRef } from "react";
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
  const fired = useRef(false);

  useEffect(() => {
    const handleFirstClick = () => {
      if (fired.current) return;
      fired.current = true;
      fireConfetti();
      document.removeEventListener("click", handleFirstClick);
    };

    document.addEventListener("click", handleFirstClick);
    return () => document.removeEventListener("click", handleFirstClick);
  }, []);

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
      {/* pt accounts for fixed header (56px nav + 32px event strip) */}
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
