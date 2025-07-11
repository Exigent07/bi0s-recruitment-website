"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Shield, Users, Trophy, Target } from "lucide-react";

export default function AboutUsSection() {
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
          gridTemplateRows: "20% 20% 20% 20% 20%", // Desktop rows
        }}
      >
        {/* Title Section - spans across multiple columns */}
        <div className="row-start-1 col-span-3 border-border border-r border-b flex items-center justify-center box">
          <h2 className="text-5xl md:text-6xl font-frontage-bold text-foreground">About Team bi0s</h2>
        </div>

        {/* Main Content Blocks - key information about bi0s */}
        <div className="row-start-2 col-start-1 border-border border-r border-b flex flex-col items-center justify-center p-6 box">
          <Shield className="w-12 h-12 mb-4 stroke-[0.5px] text-foreground" />
          <p className="text-center text-sm font-sf text-foreground">
            Community of passionate college students making the world safer through security research
          </p>
        </div>

        <div className="row-start-2 col-start-2 border-border border-r border-b flex flex-col items-center justify-center p-6 box">
          <Target className="w-12 h-12 mb-4 stroke-[0.5px] text-foreground" />
          <p className="text-center text-sm font-sf text-foreground">
            Focusing on web security, forensics, binary exploitation, reverse engineering, and more
          </p>
        </div>

        <div className="row-start-3 col-start-1 border-border border-r border-b flex flex-col items-center justify-center p-6 box">
          <Users className="w-12 h-12 mb-4 stroke-[0.5px] text-foreground" />
          <p className="text-center text-sm font-sf text-foreground">
            Founded in 2008, now 30+ active members with guidance from alumni and faculty
          </p>
        </div>

        <div className="row-start-3 col-start-2 border-border border-r border-b flex flex-col items-center justify-center p-6 box">
          <Trophy className="w-12 h-12 mb-4 stroke-[0.5px] text-foreground" />
          <p className="text-center text-sm font-sf text-foreground">
            #1 CTF team in India since 2016, competing internationally and conducting research
          </p>
        </div>

        {/* Large Text Block - life at bi0s */}
        <div className="row-start-2 row-span-2 col-start-3 border-border border-r border-b flex items-center justify-center p-8 box">
          <p className="text-center text-lg font-sf text-foreground leading-relaxed">
            Life at bi0s is filled with late-night CTFs, tech talks, alumni meetups, and fun gaming sessions. 
            Members also attend top security conferences and enjoy team bonding events year-round.
          </p>
        </div>

        {/* Bottom Section - primary activities */}
        <div className="row-start-4 row-span-2 col-span-3 border-border border-r flex items-center justify-center p-12 box">
          <p className="text-center text-2xl font-frontage-regular text-foreground max-w-4xl">
            WE PRIMARILY PARTICIPATE IN INTERNATIONAL CTF COMPETITIONS AND CONTRIBUTE TO 
            REAL-WORLD SECURITY RESEARCH WHILE RUNNING WORKSHOPS FOR STUDENTS AND PROFESSIONALS
          </p>
        </div>

        {/* Side Panel - decorative text */}
        <div className="row-span-5 col-start-4 flex w-full h-full items-center justify-center require-pointer box">
          <p className="uppercase h-full w-full flex items-center justify-center -rotate-90 text-2xl xs:text-4xl lg:text-5xl 2xl:text-6xl text-foreground font-frontage-bulb whitespace-nowrap">
            About Us
          </p>
        </div>
      </div>
    </section>
  );
}
