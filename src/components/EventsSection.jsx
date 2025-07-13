"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Carousel from "./Carousel";

export default function EventsSection() {
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
    <section ref={sectionRef} className="min-h-fit md:min-h-screen overflow-x-hidden w-full select-none">
      <div className="hidden md:grid grid-cols-[88%_12%] grid-rows-[92%_8%] h-screen w-full relative">
        <div className="flex flex-col items-center z-50 justify-center relative border-border border-r overflow-hidden">
          <Carousel />
        </div>

        <div className="box flex w-full relative items-center justify-center row-span-2 require-pointer">
          <p className="uppercase h-full w-full flex items-center justify-center -rotate-90 text-2xl lg:text-4xl xl:text-5xl 2xl:text-6xl text-foreground font-frontage-bulb whitespace-nowrap">
            GO BEYOND
          </p>
        </div>

        <div className="box border-border border-t border-r flex flex-col items-center justify-center px-4 lg:px-8 xl:px-12">
          <p className="text-center text-sm md:text-xl lg:text-4xl text-text-secondary font-proxima leading-relaxed">
            Your cybersecurity journey begins here.
          </p>
        </div>
      </div>

      <div className="md:hidden w-full h-fit flex flex-col">
        <div className="flex-1 relative min-h-[70vh] flex items-center justify-center">
          <Carousel />
        </div>
        
        <div className="box border-t border-border flex items-center justify-center require-pointer p-4 sm:p-6 min-h-[60px]">
          <p className="text-center text-sm xs:text-base sm:text-lg text-text-secondary font-proxima leading-relaxed">
            Your cybersecurity journey begins here.
          </p>
        </div>
        
        <div className="box flex justify-center items-center border-y border-border require-pointer min-h-[60px] p-4">
          <p className="text-foreground font-frontage-bulb text-lg xs:text-xl sm:text-2xl">GO BEYOND</p>
        </div>
      </div>
    </section>
  );
}