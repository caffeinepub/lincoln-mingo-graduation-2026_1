import { Toaster } from "@/components/ui/sonner";
import Footer from "./components/Footer";
import GiftRegistry from "./components/GiftRegistry";
import GraduationSlideshow from "./components/GraduationSlideshow";
import Header from "./components/Header";
import Hero from "./components/Hero";
import PersonalNote from "./components/PersonalNote";
import RSVPMessages from "./components/RSVPMessages";
import VideoSection from "./components/VideoSection";
import WhyMatters from "./components/WhyMatters";

export default function App() {
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
      <main>
        <GraduationSlideshow />
        <Hero />
        <WhyMatters />
        <VideoSection />
        <RSVPMessages />
        <GiftRegistry />
        <PersonalNote />
      </main>
      <Footer />
    </div>
  );
}
