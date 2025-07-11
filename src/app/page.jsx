"use client";

import EventsSection from "@/components/EventsSection";
import ExplainSection from "@/components/ExplainSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import NavBar from "@/components/NavBar";
import PastSection from "@/components/PastSection"; 
import RecruitmentIntroSection from "@/components/RecruitmentIntroSection";
import AboutUsSection from "@/components/AboutUsSection";
import CustomPointer from "@/components/CustomPointer"; 

export default function Home() {
  return (
    <main className="min-h-screen w-screen flex flex-col items-center justify-center overflow-x-hidden">
      <CustomPointer /> 
      <NavBar />
      <HeroSection />
      <RecruitmentIntroSection />
      <ExplainSection />
      <EventsSection />
      <PastSection /> 
      <FAQSection />
      <AboutUsSection />
      <Footer />
    </main>
  );
}
