"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SendHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

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
      className="h-screen overflow-x-hidden w-full select-none"
    >
      <div
        className="grid h-screen w-full relative border-border border-b"
        style={{
          gridTemplateColumns: "88% 12%",
          gridTemplateRows: 3,
        }}
      >
        <div className="relative z-50 row-start-2 border-border border-r border-t px-8 py-6 flex flex-col justify-center items-center gap-2 box">
          <h3 className="text-6xl font-bold font-sf">Ask AI</h3>
          <form onSubmit={handlePromptSubmit} className="flex w-3/4 items-center border border-border mt-2">
            <input
              type="text"
              placeholder="Got something we didn't answer?"
              className="bg-transparent p-2 flex-grow h-16 w-full text-2xl px-8 focus:outline-none text-muted-foreground"
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
            />
            <button 
              type="submit" 
              className="p-2 w-24 flex items-center justify-center border-border border-l h-full transition hover:bg-foreground hover:text-background"
            >
              <SendHorizontal />
            </button>
          </form>
        </div>
        <div className="box relative z-50 row-start-3 border-border border-r border-t flex items-center justify-center box">
          <h5 className="absolute z-40 w-24 h-24 flex items-center justify-center text-4xl font-frontage-bold tracking-widest mix-blend-difference">
            OR
          </h5>
        </div>
        <div className="row-start-4 relative z-50 h-full border-border border-r border-t flex flex-col items-center justify-between box">
          <h3 className="h-[76%] w-full flex items-center justify-center pl-8 text-6xl font-bold font-sf">Reach out</h3>
          <div className="grid grid-cols-[1fr_1fr_1fr_1fr] h-[24%] w-full text-sm text-muted-foreground">
            <a className="text-md font-semibold font-frontage-bulb flex items-center justify-center border-border border-t border-r" target="_blank" href="https://www.instagram.com/teambi0s">Instagram</a>
            <a className="text-md font-semibold font-frontage-bulb flex items-center justify-center border-border border-t border-r" target="_blank" href="https://ctftime.org/team/662/">CTF Time</a>
            <a className="text-md font-semibold font-frontage-bulb flex items-center justify-center border-border border-t border-r" target="_blank" href="https://www.linkedin.com/company/teambi0s">LinkedIn</a>
            <a className="text-md font-semibold font-frontage-bulb flex items-center justify-center border-border border-t" target="_blank" href="mailto:bi0s@am.amrita.edu">Mail</a>
          </div>
        </div>

        <div require-text="?" className="box row-span-4 flex w-full h-full items-center border-border justify-center require-pointer">
          <p className="uppercase h-full w-full flex items-center justify-center -rotate-90 text-2xl xs:text-4xl lg:text-5xl 2xl:text-6xl text-foreground font-frontage-bulb whitespace-nowrap">
            HELP
          </p>
        </div>
      </div>
    </section>
  );
}
