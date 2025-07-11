"use client";

import { ClockFading, CalendarDays, ArrowUpRight, ExternalLink } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import ThreeDModel from "@/models/3DModel"; // Assuming this path is correct
import gsap from "gsap";
import { useGSAP } from "@gsap/react";


// Countdown component to display time left
const Countdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({ days: "--", hours: "--", minutes: "--", seconds: "--" });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
      } else {
        const days = String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, "0");
        const hours = String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, "0");
        const minutes = String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, "0");
        const seconds = String(Math.floor((difference / 1000) % 60)).padStart(2, "0");
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]); // Re-run effect if targetDate changes

  return (
    <div className="flex md:grid-cols-2 md:grid-rows-2 md:grid 2xl:flex justify-end items-center gap-3 xs:gap-5 md:gap-7">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div key={label} className="flex flex-col items-center justify-center">
          <span className="text-lg xs:text-4xl lg:text-5xl 2xl:text-6xl font-sf">{value}</span>
          <span className="text-[0.5rem] xs:text-sm md:text-base lg:text-lg 2xl:text-lg uppercase font-frontage-regular">{label}</span>
        </div>
      ))}
    </div>
  );
};

// Main HeroSection component
export default function HeroSection() {
  const [threeDModelColor, setthreeDModelColor] = useState("#f2f2f2");
  const sectionRef = useRef(null);

  // GSAP animation for hover effects on boxes
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
    
        // Change 3D model color on hover if the box contains a canvas
        if (el.querySelector("canvas")) {
          setthreeDModelColor("#0d0d0d");
        }
      });
    
      el.addEventListener("mouseleave", () => {
        gsap.to(el, { backgroundColor: "transparent", duration: 0.4, ease: "power2.out" });
        gsap.to(textElements, {
          color: "var(--color-foreground)",
          stroke: "var(--color-foreground)",
          duration: 0.4,
          ease: "power2.out",
        });
    
        if (el.querySelector("canvas")) {
          setthreeDModelColor("#f2f2f2");
        }
      });
    });    
  }, [threeDModelColor]); // Dependency array includes threeDModelColor to re-run effect when it changes

  // Data for the interactive boxes, to reduce redundancy in mobile view
  const interactiveBoxes = [
    {
      icon: <ClockFading className="h-12 w-12 sm:w-16 sm:h-16 stroke-[0.5px] text-foreground mb-6" />,
      text: "PAST EVENTS & RECAPS", // Updated text
      link: "#", // Add actual link if available
      requireText: "Link"
    },
    {
      icon: <CalendarDays className="h-12 w-12 sm:w-16 sm:h-16 stroke-[0.5px] text-foreground mb-6" />,
      text: "VIEW EVENTS",
      link: "#", // Add actual link if available
      requireText: "External"
    },
    // Added placeholder boxes to maintain the layout structure
    {
      icon: <div className="h-12 w-12 sm:w-16 sm:h-16 bg-transparent mb-6" />, // Empty div for placeholder icon
      text: "PLACEHOLDER", 
      link: "#",
      requireText: "Placeholder"
    },
    {
      icon: <div className="h-12 w-12 sm:w-16 sm:h-16 bg-transparent mb-6" />, // Empty div for placeholder icon
      text: "PLACEHOLDER", 
      link: "#",
      requireText: "Placeholder"
    },
  ];

  return (
    <section ref={sectionRef} className="h-screen overflow-x-hidden w-full select-none">
      <div className="h-24 md:h-36 w-full" /> 

      <div 
        className="hidden md:grid grid-cols-4 grid-rows-2 h-[calc(100%-6rem)] md:h-[calc(100%-9rem)] w-full relative"
        style={{ gridTemplateColumns: "26% 26% 36% 12%", gridTemplateRows: "70% 30%" }}
      >
        <div require-nature="danger" require-text="Link" className="box border-border border-r border-b flex items-center justify-center relative require-pointer">
          <ClockFading className="w-16 h-16 xs:w-20 xs:h-20 stroke-[0.5px] text-foreground" />
          <div className="flex items-end justify-between w-full absolute bottom-3 right px-6">
            <p className="text-lg xs:text-xl lg:text-2xl 2xl:text-3xl font-frontage-regular">PAST EVENTS & RECAPS</p>
            <ArrowUpRight className="w-8 h-8 lg:w-10 lg:h-10 2xl:w-12 2xl:h-12 stroke-1 text-foreground" />
          </div>
        </div>

        <div require-text="External" className="box border-border border-r border-b flex items-center justify-center relative require-pointer">
          <CalendarDays className="w-16 h-16 xs:w-20 xs:h-20 stroke-[0.5px] text-foreground" />
          <div className="flex items-end justify-between w-full absolute bottom-3 right px-6">
            <p className="text-lg xs:text-xl lg:text-2xl 2xl:text-3xl font-frontage-regular">VIEW EVENTS</p>
            <ArrowUpRight className="w-8 h-8 lg:w-10 lg:h-10 2xl:w-12 2xl:h-12 stroke-1 text-foreground" />
          </div>
        </div>

        <div className="box border-border border-b border-r row-span-2 flex flex-col justify-between">
          <p className="text-3xl xs:text-4xl lg:text-6xl 2xl:text-7xl font-light text-center h-[14%] flex items-center justify-center text-foreground border-border border-b">
            bi0s
          </p>
          <div className="flex flex-col items-center justify-center flex-grow">
            <ThreeDModel color={threeDModelColor} />
          </div>
          <div className="flex flex-col gap-10 xs:gap-12 px-6 xs:px-10 py-6" require-text="Soon">
            <p className="text-3xl xs:text-4xl lg:text-5xl 2xl:text-6xl font-frontage-regular text-foreground">
              COMING
              <br />
              SOON
            </p>
            <Countdown targetDate={new Date('2025-07-30T00:00:00')} /> 
          </div>
        </div>

        <div require-text="Register" className="box flex items-center justify-center row-span-2 require-pointer">
          <p className="uppercase -rotate-90 text-2xl xs:text-4xl lg:text-5xl 2xl:text-6xl text-foreground font-frontage-bulb whitespace-nowrap">
            Register Now
          </p>
        </div>

        <div className="box border-border border-b border-r flex items-center justify-center relative w-full require-pointer">
          <p className="text-lg xs:text-xl lg:text-2xl 2xl:text-3xl font-frontage-regular text-foreground"></p>
        </div>

        <div className="box border-border border-b border-r flex items-center justify-center relative w-full require-pointer">
          <p className="text-lg xs:text-xl lg:text-2xl 2xl:text-3xl font-frontage-regular text-foreground"></p>
        </div>
      </div>

      <div className="md:hidden w-full h-[calc(100%-6rem)] flex flex-col">
        <div className="h-[14%] box flex items-center justify-center w-full border-border border-b">
          <h1 className="text-center text-foreground text-4xl xs:text-6xl font-proxima">bi0s</h1>
        </div>

        <div className="h-[22%] box border-b py-3 border-border flex flex-col justify-between relative">
          <div className="flex items-center justify-between">
            <p className="text-foreground pl-3 xs:pl-6 py-1.5 xs:py-3 text-xl xs:text-4xl font-frontage-regular text-left">
              COMING <br /> SOON
            </p>
            <span className="relative right-1/12 self-start mt-3 xs:mt-4 xs:right-1/6 md:relative flex justify-center items-center h-12">
              <ThreeDModel color={threeDModelColor} />
            </span>
          </div>
          <div className="flex items-center justify-end pr-6">
            <Countdown targetDate={new Date('2025-07-30T00:00:00')} />
          </div>
        </div>
        
        {interactiveBoxes.map((box, index) => (
          <div key={index} className="h-[28%] grid grid-cols-[66%_34%] border-b border-border">
            <div className="h-full box border-r border-border px-2 sm:px-0 p-0 sm:p-8 flex flex-col items-center justify-between require-pointer">
              <div className="h-full flex items-center justify-center">
                {box.icon}
              </div>
              <div className="flex items-center justify-between w-full mt-4">
                <p className="text-sm sm:text-lg font-frontage-regular text-foreground">{box.text}</p>
                <ArrowUpRight className="w-6 h-6 stroke-1 text-foreground" />
              </div>
            </div>
            
            <div className="h-full box p-0 sm:p-8 flex flex-col items-center justify-center require-pointer">
              <div className="h-full flex items-center justify-center">
                {box.icon} 
              </div>
              <div className="flex justify-end w-full mt-4 px-2">
                <ExternalLink className="h-6 w-6 stroke-1 mb-1 text-foreground" />
              </div>
            </div>
          </div>
        ))}
        
        <div className="box h-[8%] flex justify-center items-center require-pointer">
          <p className="text-foreground pt-1 h-full w-full flex justify-center items-center font-frontage-bulb text-2xl xs:text-4xl">REGISTER NOW</p>
        </div>
      </div>
    </section>
  );
}
