"use client";

import { ClockFading, CalendarDays, ArrowUpRight, ExternalLink, Tickets, Shirt, Globe, BookOpen, Info } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import ctfLogo from "../../public/images/ctf.png";
import hardwareLogo from "../../public/images/hardware.png";
import pentestLogo from "../../public/images/pentest.png";

export default function HeroSection() {
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
      <div className="h-24 md:h-36 w-full" />
      
      <div 
        className="hidden md:grid grid-cols-4 grid-rows-2 h-[calc(100%-6rem)] md:h-[calc(100%-9rem)] w-full relative"
        style={{ gridTemplateColumns: "26% 26% 26% 10% 12%", gridTemplateRows: "70% 30%" }}
      >
        <div require-text="External" require-pointer="true" className="box border-border border-r border-b flex items-center justify-center relative require-pointer cursor-pointer" onClick={() => window.open('https://joinctf.bi0s.in', '_blank')}>
          <Image
            alt="CTF Logo"
            src={ctfLogo}
            className="sm:w-14 md:w-auto h-32 object-contain mix-blend-difference"
            priority
          />
          <div className="flex items-end justify-between w-full absolute bottom-3 right px-6">
            <p className="text-lg xs:text-xl lg:text-2xl 2xl:text-3xl font-frontage-regular">CTF</p>
            <ArrowUpRight className="w-8 h-8 lg:w-10 lg:h-10 2xl:w-12 2xl:h-12 stroke-1 text-foreground" />
          </div>
        </div>

        <div require-text="External" className="box border-border border-r border-b flex items-center justify-center relative require-pointer cursor-pointer" onClick={() => window.open('https://pentest.bi0s.in', '_blank')}>
          <Image
            alt="Pentest Logo"
            src={pentestLogo}
            className="sm:w-14 md:w-auto h-32 object-contain mix-blend-difference"
            priority
          />
          <div className="flex items-end justify-between w-full absolute bottom-3 right px-6">
            <p className="text-lg xs:text-xl lg:text-2xl 2xl:text-3xl font-frontage-regular">Pentest</p>
            <ArrowUpRight className="w-8 h-8 lg:w-10 lg:h-10 2xl:w-12 2xl:h-12 stroke-1 text-foreground" />
          </div>
        </div>

        <div require-text="External" className="box border-border border-r border-b flex items-center justify-center relative require-pointer cursor-pointer" onClick={() => window.open('https://bi0shardware.in', '_blank')}>
          <Image
            alt="Hardware Logo"
            src={hardwareLogo}
            className="sm:w-14 md:w-auto h-32 object-contain mix-blend-difference"
            priority
          />
          <div className="flex items-end justify-between w-full absolute bottom-3 right px-6">
            <p className="text-lg xs:text-xl lg:text-2xl 2xl:text-3xl font-frontage-regular">Hardware</p>
            <ArrowUpRight className="w-8 h-8 lg:w-10 lg:h-10 2xl:w-12 2xl:h-12 stroke-1 text-foreground" />
          </div>
        </div>

        <div require-text="No. 1" className="box border-border border-r border-b row-span-2 flex items-center justify-center relative require-pointer">
          <p className="uppercase font-bold -rotate-90 text-2xl xs:text-3xl lg:text-4xl 2xl:text-5xl text-foreground font-mono whitespace-nowrap">
            India's No. 1 CTF Team
          </p>
        </div>

        <div require-text="Join Now" className="box flex items-center justify-center row-span-2 require-pointer cursor-pointer">
          <p className="uppercase -rotate-90 text-2xl xs:text-4xl lg:text-5xl 2xl:text-6xl text-foreground font-frontage-bulb whitespace-nowrap">
            Join Now
          </p>
        </div>

        <div require-text="bi0s.in" className="box border-border border-b border-r flex items-center justify-center relative w-full require-pointer cursor-pointer" onClick={() => window.open('https://bi0s.in', '_blank')}>
          <Globe className="h-20 w-20 xs:h-28 xs:w-28 lg:h-24 lg:w-24 stroke-[0.75px]" />
          <div className="absolute bottom-3 right-6">
            <ExternalLink className="h-5 w-5 xs:h-6 xs:w-6 lg:h-7 lg:w-7 stroke-1 text-foreground" />
          </div>
        </div>

        <div require-text="wiki.bi0s" className="box border-border border-b border-r flex items-center justify-center relative w-full require-pointer cursor-pointer" onClick={() => window.open('https://wiki.bi0s.in', '_blank')}>
          <BookOpen className="h-20 w-20 xs:h-28 xs:w-28 lg:h-24 lg:w-24 stroke-[0.75px]" />
          <div className="absolute bottom-3 right-6">
            <ExternalLink className="h-5 w-5 xs:h-6 xs:w-6 lg:h-7 lg:w-7 stroke-1 text-foreground" />
          </div>
        </div>

        <div require-text="/about" className="box border-border border-b border-r flex items-center justify-center relative w-full require-pointer cursor-pointer" onClick={() => window.open('https://bi0s.in/about', '_blank')}>
          <Info className="h-20 w-20 xs:h-28 xs:w-28 lg:h-24 lg:w-24 stroke-[0.75px]" />
          <div className="absolute bottom-3 right-6">
            <ExternalLink className="h-5 w-5 xs:h-6 xs:w-6 lg:h-7 lg:w-7 stroke-1 text-foreground" />
          </div>
        </div>
      </div>

      <div className="md:hidden w-full h-[calc(100%-6rem)] flex flex-col">
        <div className="flex-1 box border-b border-border flex items-center justify-center require-pointer min-h-[60px]">
          <p className="uppercase font-bold text-lg xs:text-xl text-foreground font-mono whitespace-nowrap">
            India's No. 1 CTF Team
          </p>
        </div>
        
        <div className="flex-[3] grid grid-cols-3 border-b border-border">
          <div require-text="CTF" className="box border-r border-border flex flex-col items-center justify-center p-3 require-pointer cursor-pointer" onClick={() => window.open('https://joinctf.bi0s.in', '_blank')}>
            <Image
              alt="CTF Logo"
              src={ctfLogo}
              className="h-16 xs:h-20 object-contain mix-blend-difference mb-2"
              priority
            />
          </div>
          
          <div require-text="Pentest" className="box border-r border-border flex flex-col items-center justify-center p-3 require-pointer cursor-pointer" onClick={() => window.open('https://pentest.bi0s.in', '_blank')}>
            <Image
              alt="Pentest Logo"
              src={pentestLogo}
              className="h-16 xs:h-20 object-contain mix-blend-difference mb-2"
              priority
            />
          </div>
          
          <div require-text="Hardware" className="box flex flex-col items-center justify-center p-3 require-pointer cursor-pointer" onClick={() => window.open('https:/bi0shardware.in/join', '_blank')}>
            <Image
              alt="Hardware Logo"
              src={hardwareLogo}
              className="h-16 xs:h-20 object-contain mix-blend-difference mb-2"
              priority
            />
          </div>
        </div>
        
        <div className="flex-[3] grid grid-cols-3 border-b border-border">
          <div require-text="bi0s.in" className="box border-r border-border flex flex-col items-center justify-center p-3 require-pointer cursor-pointer" onClick={() => window.open('https://bi0s.in', '_blank')}>
            <Globe className="h-16 w-16 xs:h-20 xs:w-20 stroke-[0.75px] mb-2" />
            <p className="text-sm xs:text-base font-frontage-regular text-center">Website</p>
          </div>
          
          <div require-text="wiki.bi0s" className="box border-r border-border flex flex-col items-center justify-center p-3 require-pointer cursor-pointer" onClick={() => window.open('https://wiki.bi0s.in', '_blank')}>
            <BookOpen className="h-16 w-16 xs:h-20 xs:w-20 stroke-[0.75px] mb-2" />
            <p className="text-sm xs:text-base font-frontage-regular text-center">Wiki</p>
          </div>
          
          <div require-text="/about" className="box flex flex-col items-center justify-center p-3 require-pointer cursor-pointer" onClick={() => window.open('https://bi0s.in/about', '_blank')}>
            <Info className="h-16 w-16 xs:h-20 xs:w-20 stroke-[0.75px] mb-2" />
            <p className="text-sm xs:text-base font-frontage-regular text-center">About</p>
          </div>
        </div>
        
        <div className="flex-1 box flex justify-center items-center border-b border-border require-pointer cursor-pointer min-h-[60px]">
          <p className="text-foreground font-frontage-bulb text-2xl xs:text-3xl">JOIN NOW</p>
        </div>
      </div>
    </section>
  );
}