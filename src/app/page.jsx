"use client";

import EventsSection from "@/components/EventsSection";
import ExplainSection from "@/components/ExplainSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import NavBar from "@/components/NavBar";
import { CyberGrid } from "./ai/page";

export default function Home() {
  return (
    <main className="min-h-screen w-screen flex flex-col items-center justify-center overflow-x-hidden">
      <CyberGrid />
      <NavBar />
      <HeroSection />
      <ExplainSection />
      <EventsSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
