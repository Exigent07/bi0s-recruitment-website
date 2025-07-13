"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function ExplainSection() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const boxes = gsap.utils.selector(sectionRef);
  
    boxes(".box").forEach((el) => {
      const textElements = el.querySelectorAll("p, svg, span");
    
      el.addEventListener("mouseenter", () => {
        gsap.to(el, { backgroundColor: "var(--color-hover)", duration: 0.4, ease: "power2.out" });
        gsap.to(textElements, {
          color: "var(--color-background)",
          stroke: "var(--color-background)",
          duration: 0.4,
          ease: "power2.out",
        });
      });
    
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
  }, []);  

  return (
    <section ref={sectionRef} className="h-screen overflow-x-hidden w-full select-none">
      <div 
        className="hidden md:grid grid-cols-1 grid-rows-[35%_55%_10%] md:grid-cols-[26%_62%_12%] md:grid-rows-1 h-screen w-full relative"
      >
        <div className="box border-border border-r border-b flex items-center justify-center relative require-pointer p-6">
          <p className="text-center text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-foreground font-frontage-regular leading-tight">
            Converging Ideas, Creating Tomorrow.
          </p>
        </div>

        <div className="box border-border border-b border-r flex items-center justify-center relative require-pointer p-8 lg:p-12 xl:p-16 2xl:p-20">
          <p className="text-center text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-foreground font-frontage-bold leading-relaxed">
            Team bi0s is a cyber-security enthusiast club and research group from Amrita Vishwa Vidyapeetham (University), India.
          </p>
        </div>

        <div className="box flex items-center justify-center border-border border-b require-pointer">
          <p className="uppercase -rotate-90 text-2xl xs:text-4xl lg:text-5xl 2xl:text-6xl text-foreground font-frontage-bulb whitespace-nowrap">
            Who are we?
          </p>
        </div>
      </div>

      <div className="md:hidden w-full h-[calc(100%-6rem)] flex flex-col">
        <div className="flex-[2] box border-b border-border flex items-center justify-center require-pointer p-4">
          <p className="text-center text-xl xs:text-2xl text-foreground font-frontage-regular leading-tight">
            Converging Ideas, Creating Tomorrow.
          </p>
        </div>
        
        <div className="flex-[4] box border-b border-border flex items-center justify-center require-pointer p-6">
          <p className="text-center text-lg xs:text-xl text-foreground font-frontage-bold leading-relaxed">
            Team bi0s is a cyber-security enthusiast club and research group from Amrita Vishwa Vidyapeetham (University), India.
          </p>
        </div>
        
        <div className="flex-[1] box flex justify-center items-center border-b border-border require-pointer min-h-[60px]">
          <p className="text-foreground font-frontage-bulb text-xl xs:text-2xl">WHO ARE WE?</p>
        </div>
      </div>
    </section>
  );
}