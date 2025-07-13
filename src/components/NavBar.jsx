"use client";

import { useRef, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import gsap from "gsap";
import Image from "next/image";
import { Home, Bot } from "lucide-react";
import logo from "../../public/images/logo.png";
import { useGSAP } from "@gsap/react";

export default function NavBar() {
  const logoRef = useRef(null);
  const centerRef = useRef(null);
  const rightRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const sectionRef = useRef(null);

  const isOnAIPage = pathname === "/ai";
  const linkHref = isOnAIPage ? "/" : "/ai";
  const LinkIcon = isOnAIPage ? Home : Bot;

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

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 768) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      const isAtBottom = scrollY + windowHeight >= documentHeight - 100;
      
      if ((scrollY <= 200 || isAtBottom) && scrolled) {
        setScrolled(false);
        gsap.to(logoRef.current, {
          y: "0%",
          duration: 0.25,
          ease: "power2.out",
        });
        gsap.to(centerRef.current, {
          y: "0%",
          duration: 0.25,
          ease: "power2.out",
        });
        gsap.to(rightRef.current, {
          y: "0%",
          duration: 0.25,
          ease: "power2.out",
        });
      } 
      else if (scrollY > 200 && !isAtBottom && !scrolled) {
        setScrolled(true);
        gsap.to(logoRef.current, {
          y: "-100%",
          duration: 0.5,
          ease: "power2.out",
        });
        gsap.to(centerRef.current, {
          y: "-100%",
          duration: 0.5,
          ease: "power2.out",
        });
        gsap.to(rightRef.current, {
          y: "-100%",
          duration: 0.5,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  return (
    <nav className="w-full h-24 md:h-36 fixed top-0 left-0 z-[999] bg-transparent flex select-none" ref={sectionRef}>
      <Link
      href="/"
        require-text="Home"
        ref={logoRef}
        className="w-[26%] h-full flex items-center justify-center bg-background border-border border-b border-r box"
      >
        <div className="h-20 flex items-center justify-center">
          <Image
            alt="Logo"
            src={logo}
            className="sm:w-full p-2 md:p-0 md:w-auto h-36 object-contain mix-blend-difference"
            priority
          />
        </div>
      </Link>
      <div
        ref={centerRef}
        className="w-[48%] md:w-[62%] h-full flex items-center bg-background justify-center border-border border-b border-r box"
      />
      <div
        ref={rightRef}
        className="w-[26%] md:w-[12%] h-full flex items-center bg-background justify-center border-border border-b cursor-pointer"
      >
        <Link 
          require-text={LinkIcon === Home ? "Home" : "AI"}
          href={linkHref}
          className="h-full w-full flex flex-col items-center justify-center gap-1 hover:text-accent group box"
        >
          <LinkIcon 
            className="w-8 h-8 md:w-12 md:h-12 text-foreground group-hover:text-accent" 
          />
        </Link>
      </div>
    </nav>
  );
}