"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import logo from "../../public/images/logo.png";

export default function NavBar() {
  const logoRef = useRef(null);
  const centerRef = useRef(null);
  const rightRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const logoEl = logoRef.current;
    const centerEl = centerRef.current;
    const rightEl = rightRef.current;

    const logoHover = () => {
      gsap.to(logoEl, {
        background: "var(--color-hover)",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const logoLeave = () => {
      gsap.to(logoEl, {
        background: "transparent",
        duration: 0.4,
        ease: "power2.out",
      });
    };
    
    const centerHover = () => {
      gsap.to(centerEl, {
        background: "var(--color-hover)",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const centerLeave = () => {
      gsap.to(centerEl, {
        background: "transparent",
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const rightHover = () => {
      gsap.to(rightEl, {
        background: "var(--color-hover)",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const rightLeave = () => {
      gsap.to(rightEl, {
        background: "transparent",
        duration: 0.4,
        ease: "power2.out",
      });
    };

    logoEl?.addEventListener("mouseenter", logoHover);
    logoEl?.addEventListener("mouseleave", logoLeave);
    centerEl?.addEventListener("mouseenter", centerHover);
    centerEl?.addEventListener("mouseleave", centerLeave);
    rightEl?.addEventListener("mouseenter", rightHover);
    rightEl?.addEventListener("mouseleave", rightLeave);

    return () => {
      logoEl?.removeEventListener("mouseenter", logoHover);
      logoEl?.removeEventListener("mouseleave", logoLeave);
      centerEl?.removeEventListener("mouseenter", centerHover);
      centerEl?.removeEventListener("mouseleave", centerLeave);
      rightEl?.removeEventListener("mouseenter", rightHover);
      rightEl?.removeEventListener("mouseleave", rightLeave);
    };
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
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  return (
    <nav className="w-full h-24 md:h-36 fixed top-0 left-0 z-[999] bg-transparent flex select-none">
      <div
        ref={logoRef}
        className="w-[26%] h-full flex items-center justify-center bg-background border-border border-b border-r"
      >
        <div className="h-20 flex items-center justify-center">
          <Image
            alt="Logo"
            src={logo}
            className="w-10 sm:w-14 md:w-auto h-36 object-contain mix-blend-difference"
            priority
          />
        </div>
      </div>
      <div
        ref={centerRef}
        className="w-[48%] md:w-[62%] h-full flex items-center bg-background justify-center border-border border-b border-r"
      />
      <div
        ref={rightRef}
        className="w-[26%] md:w-[12%] h-full flex items-center bg-background justify-center border-border border-b border-l require-pointer"
      />
    </nav>
  );
}