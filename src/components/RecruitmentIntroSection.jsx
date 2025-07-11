"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { AlertTriangle, Users, Star, Zap } from "lucide-react";

export default function RecruitmentIntroSection() {
  const sectionRef = useRef(null);

  // GSAP animation for hover effects on boxes
  useGSAP(() => {
    const boxes = gsap.utils.selector(sectionRef);
  
    boxes(".box").forEach((el) => {
      // Select all text and SVG elements within the box
      const textElements = el.querySelectorAll("p, svg, span, h2, h3");
    
      // Mouse enter animation
      el.addEventListener("mouseenter", () => {
        gsap.to(el, { backgroundColor: "var(--color-hover)", duration: 0.4, ease: "power2.out" });
        gsap.to(textElements, {
          color: "var(--color-background)",
          stroke: "var(--color-background)",
          duration: 0.4,
          ease: "power2.out",
        });
      });
    
      // Mouse leave animation
      el.addEventListener("mouseleave", () => {
        gsap.to(el, { backgroundColor: "transparent", duration: 0.4, ease: "power2.out" });
        gsap.to(textElements, {
          color: "var(--color-foreground)",
          stroke: "var(--color-foreground)",
          duration: 0.4,
          ease: "power2.out",
        });
      });
    });    
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <section ref={sectionRef} className="h-screen overflow-x-hidden w-full select-none">
      <div 
        className="grid h-screen w-full relative"
        // Responsive grid layout for different screen sizes
        style={{
          gridTemplateColumns: "26% 26% 36% 12%", // Desktop columns
          gridTemplateRows: "25% 25% 25% 25%", // Desktop rows
        }}
      >
        {/* Title Section - spans across multiple columns */}
        <div className="row-start-1 col-span-3 border-border border-r border-b flex items-center justify-center box">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-frontage-bold text-foreground text-center">
            Prove Yourself. Join the Elite.
          </h2>
        </div>

        {/* Challenge Icons - individual boxes for visual elements */}
        <div className="row-start-2 col-start-1 border-border border-r border-b flex flex-col items-center justify-center box">
          <Zap className="w-16 h-16 mb-4 stroke-[0.5px] text-foreground" />
          <p className="text-center text-sm font-frontage-regular text-foreground">CONQUER</p>
        </div>

        <div className="row-start-2 col-start-2 border-border border-r border-b flex flex-col items-center justify-center box">
          <Star className="w-16 h-16 mb-4 stroke-[0.5px] text-foreground" />
          <p className="text-center text-sm font-frontage-regular text-foreground">ELITE</p>
        </div>

        <div className="row-start-3 col-start-1 border-border border-r border-b flex flex-col items-center justify-center box">
          <Users className="w-16 h-16 mb-4 stroke-[0.5px] text-foreground" />
          <p className="text-center text-sm font-frontage-regular text-foreground">PROVE</p>
        </div>

        <div className="row-start-3 col-start-2 border-border border-r border-b flex flex-col items-center justify-center box">
          <AlertTriangle className="w-16 h-16 mb-4 stroke-[0.5px] text-foreground" />
          <p className="text-center text-sm font-frontage-regular text-foreground">CHALLENGE</p>
        </div>

        {/* Main Content - detailed description */}
        <div className="row-start-2 row-span-2 col-start-3 border-border border-r border-b flex items-center justify-center p-8 box">
          <p className="text-center text-lg md:text-xl font-sf text-foreground leading-relaxed">
            All you need to do is prove yourself. Take on the challenges and conquer them all 
            to show us your mettle, and claim your spot among the elite!
          </p>
        </div>

        {/* Warning Section - important notice for recruitment */}
        <div className="row-start-4 col-span-3 border-border border-r flex items-center justify-center p-8 box">
          <div className="flex items-center gap-6 bg-muted p-6 rounded-lg max-w-4xl">
            <AlertTriangle className="w-8 h-8 text-destructive flex-shrink-0" />
            <p className="text-sm md:text-base text-destructive font-bold font-sf">
              NOTE: This Recruitment drive is only for upcoming freshers in the Amritapuri campus ('25-'29 batch).
              We are not recruiting Second years (Sem 3) or Third Years (Sem 5) students.
            </p>
          </div>
        </div>

        {/* Side Panel - decorative text */}
        <div className="row-span-4 col-start-4 flex w-full h-full items-center justify-center require-pointer box">
          <p className="uppercase h-full w-full flex items-center justify-center -rotate-90 text-2xl xs:text-4xl lg:text-5xl 2xl:text-6xl text-foreground font-frontage-bulb whitespace-nowrap">
            Recruitment
          </p>
        </div>
      </div>
    </section>
  );
}
