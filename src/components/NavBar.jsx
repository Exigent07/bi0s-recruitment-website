"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import MenuButton from "./MenuButton"; // Assuming MenuButton path is correct
import Image from "next/image"; // Assuming you are using Next.js Image component
import logo from "../../public/images/logo.png"; // Assuming logo path is correct

export default function NavBar() {
  const logoRef = useRef(null);
  const centerRef = useRef(null);
  const menuRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  // GSAP animations for hover effects on Navbar elements
  useEffect(() => {
    const logoEl = logoRef.current;
    const menuEl = menuRef.current;

    // Animation for logo hover
    const logoHover = () => {
      gsap.to(logoEl, {
        background: "var(--color-hover)",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    // Animation for logo leave
    const logoLeave = () => {
      gsap.to(logoEl, {
        background: "transparent",
        duration: 0.4,
        ease: "power2.out",
      });
    };

    // Animation for menu button hover
    const menuHover = () => {
      gsap.to(menuEl, {
        background: "var(--color-hover)",
        duration: 0.3,
        ease: "power2.out",
      });

      // Animate inner cubes of the menu button
      gsap.to(menuEl.querySelectorAll(".cube-outer"), {
        background: "var(--color-background)",
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(menuEl.querySelectorAll(".cube-inner"), {
        background: "var(--color-hover)",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    // Animation for menu button leave
    const menuLeave = () => {
      gsap.to(menuEl, {
        background: "transparent",
        duration: 0.4,
        ease: "power2.out",
      });

      // Reset inner cubes of the menu button
      gsap.to(menuEl.querySelectorAll(".cube-outer"), {
        background: "var(--color-stroke)",
        duration: 0.4,
        ease: "power2.out",
      });

      gsap.to(menuEl.querySelectorAll(".cube-inner"), {
        background: "var(--color-background)",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    // Add event listeners if elements exist
    logoEl?.addEventListener("mouseenter", logoHover);
    logoEl?.addEventListener("mouseleave", logoLeave);
    menuEl?.addEventListener("mouseenter", menuHover);
    menuEl?.addEventListener("mouseleave", menuLeave);

    // Cleanup function to remove event listeners
    return () => {
      logoEl?.removeEventListener("mouseenter", logoHover);
      logoEl?.removeEventListener("mouseleave", logoLeave);
      menuEl?.removeEventListener("mouseenter", menuHover);
      menuEl?.removeEventListener("mouseleave", menuLeave);
    };
  }, []); // Empty dependency array ensures this runs once on mount

  // Effect for Navbar scroll behavior (hide/show)
  useEffect(() => {
    const handleScroll = () => {
      // Disable scroll effect on smaller screens (e.g., mobile)
      if (window.innerWidth < 768) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Check if user is at the bottom of the page (within 100px)
      const isAtBottom = scrollY + windowHeight >= documentHeight - 100;
      
      // Show Navbar if scrolled up or at the bottom
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
      // Hide Navbar if scrolled down and not at the bottom
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

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);
    // Cleanup function to remove scroll event listener
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]); // Dependency array includes 'scrolled' to re-run effect when its value changes

  return (
    <nav className="w-full h-24 md:h-36 fixed top-0 left-0 z-50 bg-transparent flex select-none">
      {/* Logo Section */}
      <div
        ref={logoRef}
        className="w-[26%] h-full flex items-center justify-center bg-background border-border border-b border-r"
      >
        <div className="h-20 flex items-center justify-center">
          <Image
            alt="Logo"
            src={logo}
            className="w-10 sm:w-14 md:w-auto h-36 object-contain mix-blend-difference"
            priority // Prioritize loading for better performance
          />
        </div>
      </div>
      {/* Center Section (empty for now, but can be used for more nav items) */}
      <div
        ref={centerRef}
        className="w-[48%] md:w-[62%] h-full flex items-center bg-background justify-center border-border border-b border-r"
      />
      {/* Menu Button Section */}
      <div
        ref={menuRef}
        className="w-[26%] md:w-[12%] h-full flex items-center bg-background justify-center border-border border-b border-l require-pointer"
      >
        <MenuButton />
      </div>
    </nav>
  );
}
