"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image"; // Assuming you are using Next.js Image component
import Singer from "../../public/images/singer.jpg"; // Assuming image paths are correct
import Machine from "../../public/images/machine.jpg";
import Stage from "../../public/images/stage.jpg";

export default function PastEventsSection() { // Renamed component for clarity
  const sectionRef = useRef(null);

  // GSAP animation for hover effects on boxes
  useGSAP(() => {
    const boxes = gsap.utils.selector(sectionRef);

    boxes(".box").forEach((el) => {
      const textElements = el.querySelectorAll("p, svg, span");

      // Mouse enter animation
      el.addEventListener("mouseenter", () => {
        gsap.to(el, {
          backgroundColor: "var(--color-hover)",
          duration: 0.4,
          ease: "power2.out",
        });
        gsap.to(textElements, {
          color: "var(--color-background)",
          stroke: "var(--color-background)",
          duration: 0.4,
          ease: "power2.out",
        });
      });

      // Mouse leave animation
      el.addEventListener("mouseleave", () => {
        gsap.to(el, {
          backgroundColor: "transparent",
          duration: 0.4,
          ease: "power2.out",
        });
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
    <section
      ref={sectionRef}
      className="h-screen overflow-x-hidden w-full select-none"
    >
      <div
        className="grid h-screen w-full relative"
        // Responsive grid layout for different screen sizes
        style={{
          gridTemplateColumns: "26% 26% 26% 10% 12%", // Desktop columns
          gridTemplateRows: "9rem auto", // Desktop rows
        }}
      >
        {/* Large image of a stage */}
        <div className="relative h-screen row-span-2 col-span-1">
          <Image
            src={Stage}
            alt="bi0s Stage"
            fill // Fill the parent container
            className="object-cover" // Ensure image covers the area
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Optimize image loading
          />
        </div>

        {/* Section title */}
        <div className="box relative z-50 flex items-center justify-center col-span-3 border-border border-b border-r">
          <p className="text-center uppercase text-xl sm:text-3xl md:text-4xl tracking-widest font-frontage-regular">
            Looking back, <br /> Moving forward
          </p>
        </div>

        {/* Empty div for layout spacing */}
        <div></div>

        {/* Image of a singer */}
        <div className="relative">
          <Image
            src={Singer}
            alt="Performer"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Image of a machine */}
        <div className="relative">
          <Image
            src={Machine}
            alt="Machine"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Call to action to view past events */}
        <div className="box flex items-center justify-center col-span-2 require-pointer">
          <p className="uppercase text-xl sm:text-3xl md:text-4xl lg:text-5xl font-frontage-bulb text-center text-foreground px-12">
            View Past Events
          </p>
        </div>

        {/* Removed the redundant <div className="opacity-0"></div> */}
      </div>
    </section>
  );
}
