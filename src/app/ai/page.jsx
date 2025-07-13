"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense, useRef } from "react";
import NavBar from "@/components/NavBar";
import { Loader, SendHorizontal } from "lucide-react";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const mdxComponents = {
  h1: (props) => <h1 {...props} className="text-2xl sm:text-3xl font-bold my-4 text-foreground font-sf" />,
  h2: (props) => <h2 {...props} className="text-xl sm:text-2xl font-semibold my-3 text-foreground font-sf" />,
  h3: (props) => <h3 {...props} className="text-lg sm:text-xl font-medium my-2 text-foreground font-sf" />,
  p: (props) => <p {...props} className="my-2 text-foreground font-proxima leading-relaxed" />,
  ul: (props) => <ul {...props} className="list-disc ml-6 my-2 font-proxima" />,
  ol: (props) => <ol {...props} className="list-decimal ml-6 my-2 font-proxima" />,
  li: (props) => <li {...props} className="my-1 text-foreground" />,
  a: (props) => (
    <a
      {...props}
      className="text-foreground underline hover:text-muted-foreground transition-colors font-proxima"
      target="_blank"
      rel="noopener noreferrer"
    />
  ),
  blockquote: (props) => (
    <blockquote
      {...props}
      className="border-l-4 border-border pl-4 italic my-2 text-muted-foreground font-proxima"
    />
  ),
  hr: () => <hr className="border-border my-6" />,
  table: (props) => (
    <div className="overflow-x-auto my-4">
      <table {...props} className="min-w-full border-collapse border border-border" />
    </div>
  ),
  thead: (props) => <thead {...props} className="bg-surface-alt" />,
  th: (props) => (
    <th {...props} className="border border-border px-4 py-2 text-left font-semibold font-sf" />
  ),
  td: (props) => <td {...props} className="border border-border px-4 py-2 font-proxima" />,
  code: (props) => (
    <code {...props} className="bg-surface-alt px-2 py-1 rounded text-sm font-mono border border-border" />
  ),
  pre: (props) => (
    <pre {...props} className="bg-surface-alt p-4 rounded overflow-x-auto my-4 border border-border">
      <code className="text-sm font-mono">{props.children}</code>
    </pre>
  ),
};

const LoadingIndicator = () => (
  <div className="p-6 flex justify-center items-center min-h-[200px]">
    <Loader className="animate-spin text-foreground h-8 w-8" />
  </div>
);

const MDXContent = ({ content }) => {
  const [parsedResponse, setParsedResponse] = useState(null);
  const [parseError, setParseError] = useState(null);

  useEffect(() => {
    const parseMdx = async () => {
      if (!content) return;
      
      try {
        // Clean the content and ensure it's valid markdown
        const cleanContent = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
        
        const mdxSource = await serialize(cleanContent, {
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            development: false,
          },
          parseFrontmatter: false,
        });
        
        setParsedResponse(mdxSource);
        setParseError(null);
      } catch (error) {
        console.error("Error parsing MDX:", error);
        // Fallback to plain text if MDX parsing fails
        setParsedResponse({
          compiledSource: '',
          frontmatter: {},
          scope: {}
        });
        setParseError(content); // Show the raw content instead
      }
    };

    parseMdx();
  }, [content]);

  if (parseError) {
    return (
      <div className="p-6">
        <div className="whitespace-pre-wrap text-foreground font-proxima leading-relaxed">
          {parseError}
        </div>
      </div>
    );
  }

  if (!parsedResponse) {
    return <LoadingIndicator />;
  }

  return (
    <div className="p-6 mdx-content">
      <MDXRemote {...parsedResponse} components={mdxComponents} />
    </div>
  );
};

function AiContents() {
  const searchParams = useSearchParams();
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [submittedPrompt, setSubmittedPrompt] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const sectionRef = useRef(null);

  useGSAP(() => {
    const boxes = gsap.utils.selector(sectionRef);
  
    boxes(".box").forEach((el) => {
      const textElements = el.querySelectorAll("p, svg, span, input, button, h1, h2, h3, div");
    
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
    const p = searchParams.get("prompt");
    if (p) {
      const decoded = decodeURIComponent(p);
      setPrompt(decoded);
      simulateSubmission(decoded);
    }
  }, [searchParams]);

  const simulateSubmission = (p) => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    setSubmittedPrompt(p);
    fetchAnswer(p);
    
    const url = new URL(window.location.href);
    url.searchParams.delete("prompt");
    window.history.replaceState({}, "", url);
  };

  const fetchAnswer = async (prompt) => {
    try {
      setResponse("");
      
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      if (data.reply) {
        setResponse(data.reply);
      } else {
        setResponse(`Failed to fetch response: ${data.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error fetching the answer:", error);
      setResponse(`Error fetching the answer: ${error.message}`);
    } finally {
      setPrompt("");
      setIsProcessing(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim() || isProcessing) return;
    
    setSubmittedPrompt(prompt);
    fetchAnswer(prompt);
  };

  return (
    <main ref={sectionRef} className="min-h-screen bg-background text-foreground flex flex-col select-none">
      <NavBar />
      
      {/* Desktop Layout */}
      <div className="hidden md:flex flex-1 items-center justify-center mt-20">
        <div className="max-w-4xl w-full px-8">
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-sf text-center font-bold mb-8">
            How can I help?
          </h1>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 mb-8">
            <div className="flex items-center border border-border box">
              <input
                type="text"
                placeholder="Ask AI!"
                className="bg-transparent p-2 flex-grow h-16 lg:h-20 text-xl lg:text-2xl px-8 focus:outline-none text-muted-foreground"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <button
                type="submit"
                disabled={isProcessing || !prompt.trim()}
                className={`h-16 lg:h-20 w-20 lg:w-24 flex items-center justify-center border-border border-l transition ${
                  isProcessing || !prompt.trim() 
                    ? "bg-surface-alt cursor-not-allowed text-muted-foreground" 
                    : "bg-transparent text-foreground hover:bg-foreground hover:text-background"
                }`}
              >
                {isProcessing ? <Loader className="animate-spin w-6 h-6" /> : <SendHorizontal className="w-6 h-6" />}
              </button>
            </div>
          </form>
          
          {submittedPrompt && (
            <div className="bg-background border-border border rounded-md overflow-hidden max-h-[60vh] overflow-y-auto">
              {isProcessing ? (
                <LoadingIndicator />
              ) : (
                <MDXContent content={response} />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex-1 flex flex-col mt-20 px-4">
        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
          <h1 className="text-3xl xs:text-4xl sm:text-5xl font-sf text-center font-bold mb-8">
            How can I help?
          </h1>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
            <div className="flex items-center border border-border box">
              <input
                type="text"
                placeholder="Ask AI!"
                className="bg-transparent p-3 flex-grow h-14 text-lg px-4 focus:outline-none text-muted-foreground"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <button
                type="submit"
                disabled={isProcessing || !prompt.trim()}
                className={`h-14 w-14 flex items-center justify-center border-border border-l transition ${
                  isProcessing || !prompt.trim() 
                    ? "bg-surface-alt cursor-not-allowed text-muted-foreground" 
                    : "bg-transparent text-foreground hover:bg-foreground hover:text-background"
                }`}
              >
                {isProcessing ? <Loader className="animate-spin w-5 h-5" /> : <SendHorizontal className="w-5 h-5" />}
              </button>
            </div>
          </form>
          
          {submittedPrompt && (
            <div className="bg-background border-border border rounded-md overflow-hidden max-h-[50vh] overflow-y-auto">
              {isProcessing ? (
                <LoadingIndicator />
              ) : (
                <MDXContent content={response} />
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default function AI() {
  return (
    <Suspense fallback={<LoadingIndicator />}>
      <AiContents />
    </Suspense>
  );
}