"use client";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import logo from "../../public/images/logo.png";
import Link from "next/link";

export default function Footer() {
  const sectionRef = useRef(null);
  
  useGSAP(() => {
    const boxes = gsap.utils.selector(sectionRef);
  
    boxes(".box").forEach((el) => {
      const textElements = el.querySelectorAll("p, svg, span, input, a, h1, img, h2, h3");
      const underlinedElements = el.querySelectorAll("a.underline span, span.underline");
    
      el.addEventListener("mouseenter", () => {
        gsap.to(el, { backgroundColor: "var(--color-hover)", duration: 0.4, ease: "power2.out" });
        gsap.to(textElements, {
          color: "var(--color-background)",
          stroke: "var(--color-background)",
          duration: 0.4,
          ease: "power2.out",
        });
        
        if (underlinedElements.length > 0) {
          gsap.to(underlinedElements, {
            textDecoration: "underline var(--color-background)",
            duration: 0.4,
            ease: "power2.out",
          });
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
        
        if (underlinedElements.length > 0) {
          gsap.to(underlinedElements, {
            textDecoration: "underline var(--color-foreground)",
            duration: 0.4,
            ease: "power2.out",
          });
        }
      });
    });    
  }, []);

  return (
    <footer
      ref={sectionRef}
      className="min-h-screen overflow-x-hidden w-full select-none"
    >
      <div className="h-24 md:h-36 w-full hidden md:flex" />
      
      <div className="hidden md:grid h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] w-full relative grid-cols-[26%_26%_36%_12%]">
        <div className="row-start-1 h-full col-start-1 border-border border-r border-t border-b flex flex-col justify-between">
          <div className="logo-image box h-full w-full flex items-center justify-center">
            <Image
              alt="Logo"
              src={logo}
              className="mix-blend-difference h-48 w-48 lg:h-64 lg:w-64 xl:h-72 xl:w-72"
            />
          </div>
          
          <div className="copyright h-[10%] flex items-center border-border border-t justify-center text-center flex-col text-sm lg:text-base xl:text-lg box">
            <p>&copy; 2007 - 2025. bi0s</p>
            <p>All Rights Reserved.</p>
          </div>
        </div>
        
        <div className="row-start-1 col-start-2 h-full w-full border-border border-r border-t flex flex-col">
          <div require-text="?" className="w-full h-[50%] flex items-center justify-center box">
            <p className="text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl text-center font-sf font-bold">
              ?
            </p>
          </div>

          <div className="h-[50%] w-full flex flex-col">
            <Link target="_blank" href="https://ctf.bi0s.in" require-text="External" className="register-link h-1/3 border-border px-4 lg:px-6 xl:px-8 pb-2 border-t w-full flex items-end justify-between box require-pointer">
              <span className="text-2xl lg:text-3xl xl:text-4xl text-left font-proxima">CTF</span>
              <ExternalLink className="text-xl lg:text-2xl xl:text-3xl stroke-1 mb-2" />
            </Link>
            <Link target="_blank" href="https://pentest.bi0s.in" require-text="External" className="register-link h-1/3 border-border px-4 lg:px-6 xl:px-8 pb-2 border-t w-full flex items-end justify-between box require-pointer">
              <span className="text-2xl lg:text-3xl xl:text-4xl text-left font-proxima">Pentest</span>
              <ExternalLink className="text-xl lg:text-2xl xl:text-3xl stroke-1 mb-2" />
            </Link>
            <Link target="_blank" href="https://hardware.bi0s.in" require-text="External" className="tickets-link h-1/3 border-border px-4 lg:px-6 xl:px-8 pb-2 border-t w-full flex items-end justify-between box require-pointer">
              <span className="text-2xl lg:text-3xl xl:text-4xl text-left font-proxima">Hardware</span>
              <ExternalLink className="text-xl lg:text-2xl xl:text-3xl stroke-1 mb-2" />
            </Link>
          </div>
        </div>
        
        <div className="row-start-1 relative z-50 col-start-3 border-border border-r border-t flex flex-col justify-between">
          <div className="nav-links h-full w-full grid grid-cols-1 grid-rows-4 gap-4">
            <Link require-text="/about" href="https://bi0s.in/about" className="text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-center flex h-full w-full items-center justify-center font-sf font-bold underline box">
              <span>About</span>
            </Link>
            <Link require-text="/ai" href="/ai" className="text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-center flex h-full w-full items-center justify-center font-sf font-bold underline box">
              <span>Ask AI</span>
            </Link>
            <Link target="_blank" require-text="bi0s.in" href="https://bi0s.in" className="text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-center flex h-full w-full items-center justify-center font-sf font-bold underline box">
              <span>bi0s</span>
            </Link>
            <Link target="_blank" require-text="Wiki" href="http://wiki.bi0s.in" className="text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-center flex h-full w-full items-center justify-center font-sf font-bold underline box">
              <span>Wiki</span>
            </Link>
          </div>
        </div>
        
        <div require-text="Soon" className="box col-start-4 flex w-full h-full items-center justify-center require-pointer">
          <p className="uppercase h-full w-full flex items-center justify-center -rotate-90 text-2xl lg:text-4xl xl:text-5xl 2xl:text-6xl text-foreground font-frontage-bulb whitespace-nowrap">
            See You Soon
          </p>
        </div>
      </div>

      <div className="md:hidden w-full flex flex-col">
        <div className="logo-image box flex-1 min-h-[30vh] border-border border-b flex items-center justify-center">
          <Image
            alt="Logo"
            src={logo}
            className="mix-blend-difference h-32 w-32 xs:h-40 xs:w-40 sm:h-48 sm:w-48"
          />
        </div>

        <div require-text="?" className="w-full min-h-[15vh] flex items-center justify-center box border-border border-b">
          <p className="text-5xl xs:text-6xl sm:text-7xl text-center font-sf font-bold">
            ?
          </p>
        </div>

        <div className="min-h-[20vh] w-full flex flex-col border-border border-b">
          <Link target="_blank" href="https://ctf.bi0s.in" require-text="External" className="register-link h-16 sm:h-20 border-border px-4 sm:px-6 border-t w-full flex items-center justify-between box require-pointer">
            <span className="text-xl sm:text-2xl text-left font-proxima">CTF</span>
            <ExternalLink className="text-lg sm:text-xl stroke-1" />
          </Link>
          <Link target="_blank" href="https://pentest.bi0s.in" require-text="External" className="register-link h-16 sm:h-20 border-border px-4 sm:px-6 border-t w-full flex items-center justify-between box require-pointer">
            <span className="text-xl sm:text-2xl text-left font-proxima">Pentest</span>
            <ExternalLink className="text-lg sm:text-xl stroke-1" />
          </Link>
          <Link target="_blank" href="https://hardware.bi0s.in" require-text="External" className="tickets-link h-16 sm:h-20 border-border px-4 sm:px-6 border-t w-full flex items-center justify-between box require-pointer">
            <span className="text-xl sm:text-2xl text-left font-proxima">Hardware</span>
            <ExternalLink className="text-lg sm:text-xl stroke-1" />
          </Link>
        </div>

        <div className="nav-links min-h-[25vh] w-full flex flex-col border-border border-b">
          <Link require-text="/about" href="https://bi0s.in/about" className="text-2xl sm:text-3xl text-center flex h-16 sm:h-20 w-full items-center justify-center font-sf font-bold underline box border-border border-t">
            <span>About</span>
          </Link>
          <Link require-text="/ai" href="/ai" className="text-2xl sm:text-3xl text-center flex h-16 sm:h-20 w-full items-center justify-center font-sf font-bold underline box border-border border-t">
            <span>Ask AI</span>
          </Link>
          <Link target="_blank" require-text="bi0s.in" href="https://bi0s.in" className="text-2xl sm:text-3xl text-center flex h-16 sm:h-20 w-full items-center justify-center font-sf font-bold underline box border-border border-t">
            <span>bi0s</span>
          </Link>
          <Link target="_blank" require-text="Wiki" href="http://wiki.bi0s.in" className="text-2xl sm:text-3xl text-center flex h-16 sm:h-20 w-full items-center justify-center font-sf font-bold underline box border-border border-t">
            <span>Wiki</span>
          </Link>
        </div>

        <div className="copyright min-h-[15vh] flex items-center justify-center text-center flex-col text-sm sm:text-base box border-border border-t px-4">
          <p>&copy; 2007 - 2025. bi0s</p>
          <p>All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}