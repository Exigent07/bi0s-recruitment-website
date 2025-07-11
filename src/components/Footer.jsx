"use client";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Cube from "@/models/3DModel"; // Assuming 3DModel path is correct
import { ExternalLink } from "lucide-react";
import Image from "next/image"; // Assuming Next.js Image component
import logo from "../../public/images/logo.png"; // Assuming logo path is correct
import Link from "next/link"; // Assuming Next.js Link component

export default function Footer() {
  const [cubeColor, setCubeColor] = useState("#f2f2f2"); // State for 3D cube color
  const sectionRef = useRef(null); // Ref for the footer section

  // GSAP animation for hover effects on boxes within the footer
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
            textDecorationColor: "var(--color-background)", 
            duration: 0.4,
            ease: "power2.out",
          });
        }
    
        if (el.querySelector("canvas")) {
          setCubeColor("#0d0d0d");
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
            textDecorationColor: "var(--color-foreground)", 
            duration: 0.4,
            ease: "power2.out",
          });
        }
    
        if (el.querySelector("canvas")) {
          setCubeColor("#f2f2f2");
        }
      });
    });    
  }, [cubeColor]); 

  return (
    <footer
      ref={sectionRef}
      className="h-screen overflow-x-hidden w-full select-none"
    >
      <div className="h-24 md:h-36 w-full" /> 
      <div
        className="grid h-[calc(100%-6rem)] md:h-[calc(100%-9rem)] w-full relative"
        style={{
          gridTemplateColumns: "26% 26% 36% 12%", 
        }}
      >
        <div className="row-start-1 h-full col-start-1 border-border border-r border-t border-b flex flex-col justify-between">
          <div className="logo-image box h-full w-full flex items-center justify-center">
            <Image
              alt="Logo"
              src={logo}
              className="mix-blend-difference h-72 w-72 object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
            />
          </div>
          
          <div className="copyright h-[10%] flex items-center border-border border-t justify-center text-center flex-col text-lg box">
            <p>&copy; 2025. bi0s</p> {/* Updated copyright year */}
            <p>All Rights Reserved.</p>
          </div>
        </div>
        
        {/* 3D Cube, Register, and Tickets Links */}
        <div className="row-start-1 col-start-2 h-full w-full border-border border-r border-t flex flex-col">
          <div className="cube-container w-full h-[70%] flex items-center justify-center box">
            <Cube color={cubeColor} size={100} />
          </div>

          <div className="h-[30%] w-full flex flex-col">
            <div className="register-link h-1/2 border-border px-8 pb-2 border-t w-full flex items-end justify-between box require-pointer">
              <span className="text-4xl text-left font-proxima">Register</span>
              <ExternalLink className="text-3xl stroke-1 mb-2" />
            </div>
            <div className="tickets-link h-1/2 border-border px-8 pb-2 border-t w-full flex items-end justify-between box require-pointer">
              <span className="text-4xl text-left font-proxima">Get Tickets</span>
              <ExternalLink className="text-3xl stroke-1 mb-2" />
            </div>
          </div>
        </div>
        
        {/* Navigation Links */}
        <div className="row-start-1 relative z-50 col-start-3 border-border border-r border-t flex flex-col justify-between">
          <div className="nav-links h-full w-full grid grid-cols-1 grid-rows-[1fr_1fr_1fr_1fr] gap-4"> {/* Corrected grid-row to grid-rows */}
            <Link href="/echo" className="text-7xl text-center flex h-full w-full items-center justify-center font-sf font-bold underline box">
              <span>Ask Echo</span>
            </Link>
            <Link href="#events" className="text-7xl text-center flex h-full w-full items-center justify-center font-sf font-bold underline box">
              <span>Events</span>
            </Link>
            <Link href="/theme" className="text-7xl text-center flex h-full w-full items-center justify-center font-sf font-bold underline box">
              <span>Theme</span>
            </Link>
            <Link href="/recap" className="text-7xl text-center flex h-full w-full items-center justify-center font-sf font-bold underline box">
              <span>Recap</span>
            </Link>
          </div>
        </div>
        
        {/* Side Panel - Decorative Text */}
        <div className="box col-start-4 flex w-full h-full items-center justify-center require-pointer">
          <p className="uppercase h-full w-full flex items-center justify-center -rotate-90 text-2xl xs:text-4xl lg:text-5xl 2xl:text-6xl text-foreground font-frontage-bulb whitespace-nowrap">
            See You Soon
          </p>
        </div>
      </div>
    </footer>
  );
}
