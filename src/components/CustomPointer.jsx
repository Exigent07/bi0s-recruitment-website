"use client";

import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { usePathname } from "next/navigation";

export default function CustomPointer() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hoverText, setHoverText] = useState("");
  const [showPointerEffect, setShowPointerEffect] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [currentHoverScale, setCurrentHoverScale] = useState(1);
  const pointerRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    setHoverText("");
    setShowPointerEffect(false);
    setIsHovering(false);
    setCurrentHoverScale(1);
    
    if (pointerRef.current) {
      gsap.to(pointerRef.current, {
        scale: 1,
        duration: 0.3,
        paddingLeft: 0,
        paddingRight: 0,
      });
    }
  }, [pathname]);

  useEffect(() => {
    const handleMouseMove = ({ clientX, clientY }) => {
      setPosition({ x: clientX, y: clientY });

      gsap.to(pointerRef.current, {
        x: clientX,
        y: clientY,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseClick = () => {
      const targetScale = isHovering ? currentHoverScale : 1;
      
      gsap.timeline()
        .to(pointerRef.current, {
          scale: 1.8,
          duration: 0.15,
          ease: "power2.out",
        })
        .to(pointerRef.current, {
          scale: targetScale,
          duration: 0.4,
          ease: "back.out(1.7)",
        });
    };

    const handleMouseEnter = (event) => {
      const el = event.target;
      setIsHovering(true);

      if (el.hasAttribute("require-text")) {
        setHoverText(el.getAttribute("require-text"));
        setCurrentHoverScale(4);
        gsap.to(pointerRef.current, {
          scale: 4,
          paddingLeft: 20,
          paddingRight: 20,
          duration: 0.3,
        });
      } else if (el.hasAttribute("require-pointer")) {
        setShowPointerEffect(true);
        setCurrentHoverScale(1.2);
        gsap.to(pointerRef.current, {
          scale: 1.2,
          duration: 0.3,
        });
      } else {
        setCurrentHoverScale(1.2);
        gsap.to(pointerRef.current, {
          scale: 1.2,
          duration: 0.3,
        });
      }
    };

    const handleMouseLeave = () => {
      setHoverText("");
      setShowPointerEffect(false);
      setIsHovering(false);
      setCurrentHoverScale(1);

      gsap.to(pointerRef.current, {
        scale: 1,
        duration: 0.3,
        paddingLeft: 0,
        paddingRight: 0,
      });
    };

    const resetCursorState = () => {
      setHoverText("");
      setShowPointerEffect(false);
      setIsHovering(false);
      setCurrentHoverScale(1);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleMouseClick);
    window.addEventListener("beforeunload", resetCursorState);
    
    const timeoutId = setTimeout(() => {
      const interactiveElements = document.querySelectorAll(
        'a, button, input, textarea, select, [role="button"]'
      );
      const allElements = document.querySelectorAll("*");

      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
      });

      allElements.forEach((el) => {
        if (
          el.hasAttribute("require-text") ||
          el.hasAttribute("require-pointer")
        ) {
          el.addEventListener("mouseenter", handleMouseEnter);
          el.addEventListener("mouseleave", handleMouseLeave);
        }
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleMouseClick);
      window.removeEventListener("beforeunload", resetCursorState);

      const interactiveElements = document.querySelectorAll(
        'a, button, input, textarea, select, [role="button"]'
      );
      const allElements = document.querySelectorAll("*");

      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });

      allElements.forEach((el) => {
        if (
          el.hasAttribute("require-text") ||
          el.hasAttribute("require-pointer")
        ) {
          el.removeEventListener("mouseenter", handleMouseEnter);
          el.removeEventListener("mouseleave", handleMouseLeave);
        }
      });
    };
  }, [isHovering, currentHoverScale, pathname]);

  useEffect(() => {
    document.body.style.cursor = "none";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <div
      ref={pointerRef}
      className={`pointer-events-none z-[1000] translate-full fixed items-center justify-center 
                 mix-blend-difference h-4 w-4 rounded-full shadow-md opacity-0 hidden md:flex
                 ${showPointerEffect ? "border-2" : ""}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
        backgroundColor: "var(--color-foreground)",
        borderColor: showPointerEffect ? "var(--color-border)" : "transparent",
      }}
    >
      {hoverText && (
        <span
          className="text-[0.5rem] text-background text-center font-bold whitespace-nowrap"
          style={{ fontFamily: "var(--font-sf)" }}
        >
          {hoverText}
        </span>
      )}
    </div>
  );
}