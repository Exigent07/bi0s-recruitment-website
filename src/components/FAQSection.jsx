"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SendHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const faqs = [
  { question: "Question 1?", answer: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad cupiditate consequatur corrupti recusandae molestias iure. Saepe, modi similique quibusdam omnis amet minima voluptates consequatur molestiae ipsum cumque et, earum consequuntur?" },
  { question: "Question 2?", answer: " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad cupiditate consequatur corrupti recusandae molestias iure. Saepe, modi similique quibusdam omnis amet minima voluptates consequatur molestiae ipsum cumque et, earum consequuntur?" },
  { question: "Question 5?", answer: " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad cupiditate consequatur corrupti recusandae molestias iure. Saepe, modi similique quibusdam omnis amet minima voluptates consequatur molestiae ipsum cumque et, earum consequuntur?" },
  { question: "Question 4?", answer: " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad cupiditate consequatur corrupti recusandae molestias iure. Saepe, modi similique quibusdam omnis amet minima voluptates consequatur molestiae ipsum cumque et, earum consequuntur?" },
];

export default function FAQSection() {
  const [userPrompt, setUserPrompt] = useState("");
  const sectionRef = useRef(null);
  const router = useRouter();

  useGSAP(() => {
    const boxes = gsap.utils.selector(sectionRef);
  
    boxes(".box").forEach((el) => {
      const textElements = el.querySelectorAll("p, svg, span, input, a, h2, h3");
    
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

  const handlePromptSubmit = (e) => {
    e.preventDefault();
    if (userPrompt.trim()) {
      const encodedPrompt = encodeURIComponent(userPrompt);
      router.push(`/ai?prompt=${encodedPrompt}`);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen overflow-x-hidden w-full select-none"
    >
      <div className="hidden md:grid h-screen w-full relative grid-cols-[88%_12%] grid-rows-3">
        <div className="relative z-50 row-start-1 border-border border-r border-t px-4 lg:px-8 py-6 flex flex-col justify-center items-center gap-2 box">
          <h3 className="text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold font-sf">Ask AI</h3>
          <form onSubmit={handlePromptSubmit} className="flex w-full max-w-4xl items-center border border-border mt-2">
            <input
              type="text"
              placeholder="Got something we didn't answer?"
              className="bg-transparent p-2 flex-grow h-12 lg:h-16 w-full text-lg lg:text-xl xl:text-2xl px-4 lg:px-8 focus:outline-none text-muted-foreground"
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
            />
            <button 
              type="submit" 
              className="p-2 w-16 lg:w-24 flex items-center justify-center border-border border-l h-full transition hover:bg-foreground hover:text-background"
            >
              <SendHorizontal className="w-5 h-5 lg:w-6 lg:h-6" />
            </button>
          </form>
        </div>
        
        <div className="box relative z-50 row-start-2 border-border border-r border-t flex items-center justify-center">
          <h5 className="absolute z-40 w-16 h-16 lg:w-24 lg:h-24 flex items-center justify-center text-2xl lg:text-3xl xl:text-4xl font-frontage-bold tracking-widest mix-blend-difference">
            OR
          </h5>
        </div>
        
        <div className="row-start-3 relative z-50 h-full border-border border-r border-y flex flex-col items-center justify-between box">
          <h3 className="h-[76%] w-full flex items-center justify-center pl-4 lg:pl-8 text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold font-sf">Reach out</h3>
          <div className="grid grid-cols-4 h-[24%] w-full text-sm text-muted-foreground">
            <a className="text-sm lg:text-base xl:text-lg font-frontage-bold flex items-center justify-center border-border border-t border-r" target="_blank" href="https://www.instagram.com/teambi0s">Instagram</a>
            <a className="text-sm lg:text-base xl:text-lg font-frontage-bold flex items-center justify-center border-border border-t border-r" target="_blank" href="https://ctftime.org/team/662/">CTF Time</a>
            <a className="text-sm lg:text-base xl:text-lg font-frontage-bold flex items-center justify-center border-border border-t border-r" target="_blank" href="https://www.linkedin.com/company/teambi0s">LinkedIn</a>
            <a className="text-sm lg:text-base xl:text-lg font-frontage-bold flex items-center justify-center border-border border-t" target="_blank" href="mailto:bi0s@am.amrita.edu">Mail</a>
          </div>
        </div>

        <Link require-text="/about" target="_blank" href="https://bi0s.in/about" className="box row-span-4 flex w-full h-full items-center border-none justify-center require-pointer">
          <p className="uppercase h-full w-full flex items-center justify-center -rotate-90 text-2xl lg:text-4xl xl:text-5xl 2xl:text-6xl text-foreground font-frontage-bulb whitespace-nowrap">
            HELP
          </p>
        </Link>
      </div>

      <div className="md:hidden w-full min-h-screen flex flex-col">
        <div className="box flex-1 min-h-[40vh] border-border border-b flex flex-col justify-center items-center gap-4 px-4 py-8">
          <h3 className="text-3xl xs:text-4xl sm:text-5xl font-bold font-sf text-center">Ask AI</h3>
          <form onSubmit={handlePromptSubmit} className="flex w-full max-w-md items-center border border-border">
            <input
              type="text"
              placeholder="Got something we didn't answer?"
              className="bg-transparent p-3 flex-grow h-12 w-full text-base sm:text-lg px-4 focus:outline-none text-muted-foreground"
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
            />
            <button 
              type="submit" 
              className="p-3 w-12 flex items-center justify-center border-border border-l h-full transition hover:bg-foreground hover:text-background"
            >
              <SendHorizontal className="w-5 h-5" />
            </button>
          </form>
        </div>

        <div className="box border-border border-b flex items-center justify-center require-pointer min-h-[80px] p-4">
          <h5 className="text-2xl xs:text-3xl font-frontage-bold tracking-widest mix-blend-difference">
            OR
          </h5>
        </div>

        <div className="box flex-1 min-h-[30vh] border-border border-b flex flex-col items-center justify-center px-4 py-8">
          <h3 className="text-3xl xs:text-4xl sm:text-5xl font-bold font-sf text-center mb-8">Reach out</h3>
          <div className="grid grid-cols-2 gap-4 w-full max-w-sm text-center">
            <a className="text-base font-frontage-bold flex items-center justify-center border border-border p-4 transition hover:bg-foreground hover:text-background" target="_blank" href="https://www.instagram.com/teambi0s">Instagram</a>
            <a className="text-base font-frontage-bold flex items-center justify-center border border-border p-4 transition hover:bg-foreground hover:text-background" target="_blank" href="https://ctftime.org/team/662/">CTF Time</a>
            <a className="text-base font-frontage-bold flex items-center justify-center border border-border p-4 transition hover:bg-foreground hover:text-background" target="_blank" href="https://www.linkedin.com/company/teambi0s">LinkedIn</a>
            <a className="text-base font-frontage-bold flex items-center justify-center border border-border p-4 transition hover:bg-foreground hover:text-background" target="_blank" href="mailto:bi0s@am.amrita.edu">Mail</a>
          </div>
        </div>

        <Link require-text="/about" target="_blank" href="https://bi0s.in/about" className="box flex justify-center items-center border-border border-b require-pointer min-h-[80px] p-4">
          <p className="text-foreground font-frontage-bulb text-xl xs:text-2xl sm:text-3xl">HELP</p>
        </Link>
      </div>
    </section>
  );
}