"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense, useRef } from "react";
import { Loader, SendHorizontal, Terminal, Shield, Cpu, Lock, Code, Zap, Eye, ChevronRight } from "lucide-react";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import DOMPurify from "dompurify";

const mdxComponents = {
  h1: (props) => <h1 {...props} className="text-xl sm:text-2xl lg:text-3xl font-bold my-4 text-accent" style={{ fontFamily: 'var(--font-frontage-bold)' }} />,
  h2: (props) => <h2 {...props} className="text-lg sm:text-xl lg:text-2xl font-semibold my-3 text-foreground" style={{ fontFamily: 'var(--font-frontage-regular)' }} />,
  h3: (props) => <h3 {...props} className="text-base sm:text-lg lg:text-xl font-medium my-2 text-foreground" style={{ fontFamily: 'var(--font-sf)' }} />,
  p: (props) => <p {...props} className="my-2 text-sm sm:text-base text-foreground leading-relaxed" style={{ fontFamily: 'var(--font-proxima)' }} />,
  ul: (props) => <ul {...props} className="list-disc ml-4 sm:ml-6 my-2 text-sm sm:text-base text-foreground" style={{ fontFamily: 'var(--font-proxima)' }} />,
  ol: (props) => <ol {...props} className="list-decimal ml-4 sm:ml-6 my-2 text-sm sm:text-base text-foreground" style={{ fontFamily: 'var(--font-proxima)' }} />,
  li: (props) => <li {...props} className="my-1 text-foreground" />,
  a: (props) => (
    <a
      {...props}
      className="text-accent underline hover:text-hover transition-colors break-words"
      style={{ fontFamily: 'var(--font-proxima)' }}
      target="_blank"
      rel="noopener noreferrer"
    />
  ),
  blockquote: (props) => (
    <blockquote
      {...props}
      className="border-l-4 border-accent pl-3 sm:pl-4 italic my-2 text-text-secondary py-2 text-sm sm:text-base"
      style={{ 
        fontFamily: 'var(--font-proxima)',
        backgroundColor: 'var(--color-surface-alt)'
      }}
    />
  ),
  hr: () => <hr className="my-4 sm:my-6" style={{ borderColor: 'var(--color-border)' }} />,
  code: (props) => (
    <code 
      {...props} 
      className="px-1 sm:px-2 py-1 rounded text-xs sm:text-sm font-mono border text-accent break-words" 
      style={{ 
        backgroundColor: 'var(--color-surface-alt)',
        borderColor: 'var(--color-border)'
      }} 
    />
  ),
  pre: (props) => (
    <pre 
      {...props} 
      className="p-3 sm:p-4 rounded overflow-x-auto my-4 border text-xs sm:text-sm"
      style={{ 
        backgroundColor: 'var(--color-surface-alt)',
        borderColor: 'var(--color-border)'
      }}
    >
      <code className="font-mono text-accent">{props.children}</code>
    </pre>
  ),
};

const LoadingIndicator = ({className}) => (
  <div className={`flex justify-center items-center w-full ${className}`}>
    <div className="relative">
      <Loader className="animate-spin text-accent h-6 w-6 sm:h-8 sm:w-8" />
      <div className="absolute inset-0 animate-ping">
        <div className="h-6 w-6 sm:h-8 sm:w-8 border-2 border-accent rounded-full opacity-20"></div>
      </div>
    </div>
  </div>
);

export const CyberGrid = () => (
  <div className="fixed inset-0 pointer-events-none opacity-5 sm:opacity-10">
    <div 
      className="absolute inset-0" 
      style={{
        backgroundImage: `
          linear-gradient(rgba(211,211,211,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(211,211,211,0.1) 1px, transparent 1px)
        `,
        backgroundSize: '30px 30px'
      }} 
    />
  </div>
);

const MDXContent = ({ content }) => {
  const [parsedResponse, setParsedResponse] = useState(null);
  const [parseError, setParseError] = useState(null);

  useEffect(() => {
    const parseMdx = async () => {
      if (!content) return;
      
      try {
        const cleanContent = DOMPurify.sanitize(content.replace(/\r\n/g, '\n').replace(/\r/g, '\n'));
        
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
        setParsedResponse({
          compiledSource: '',
          frontmatter: {},
          scope: {}
        });
        setParseError(DOMPurify.sanitize(content));
      }
    };

    parseMdx();
  }, [content]);

  if (parseError) {
    return (
      <div className="p-4 sm:p-6">
        <div 
          className="whitespace-pre-wrap text-sm sm:text-base text-foreground leading-relaxed"
          style={{ fontFamily: 'var(--font-proxima)' }}
          dangerouslySetInnerHTML={{ __html: parseError }}
        />
      </div>
    );
  }

  if (!parsedResponse) {
    return <LoadingIndicator className="min-h-[200px] max-h-[50vh] sm:max-h-[60vh] overflow-y-auto" />;
  }

  return (
    <div className="p-4 sm:p-6 mdx-content">
      <MDXRemote {...parsedResponse} components={mdxComponents} />
    </div>
  );
};

const QuickActions = ({ onQuickPrompt }) => {
  const actions = [
    { icon: Terminal, text: "Recruitment Process", prompt: "Tell me about the bi0s recruitment process" },
    { icon: Code, text: "Technical Skills", prompt: "What technical skills are required for bi0s?" },
    { icon: Shield, text: "Security Domains", prompt: "What security domains does bi0s focus on?" },
    { icon: Cpu, text: "CTF Training", prompt: "How does bi0s prepare members for CTF competitions?" }
  ];
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={() => onQuickPrompt(action.prompt)}
          className="group flex items-center gap-2 sm:gap-3 p-3 sm:p-4 border rounded-lg hover:bg-surface-alt transition-all duration-300"
          style={{
            backgroundColor: 'var(--color-surface-alt)',
            borderColor: 'var(--color-border)'
          }}
        >
          <action.icon className="w-4 h-4 sm:w-5 sm:h-5 text-accent group-hover:text-hover flex-shrink-0" />
          <span 
            className="text-foreground group-hover:text-accent text-xs sm:text-sm flex-1 text-left"
            style={{ fontFamily: 'var(--font-sf)' }}
          >
            {action.text}
          </span>
          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-text-secondary ml-auto group-hover:text-accent transition-colors flex-shrink-0" />
        </button>
      ))}
    </div>
  );
};

function AiContents() {
  const searchParams = useSearchParams();
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [submittedPrompt, setSubmittedPrompt] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [commandHistory, setCommandHistory] = useState([]);
  const inputRef = useRef(null);

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
    setCommandHistory(prev => [...prev, p]);
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
        setResponse(`ACCESS DENIED: ${data.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error fetching the answer:", error);
      setResponse(`CONNECTION ERROR: ${error.message}`);
    } finally {
      setPrompt("");
      setIsProcessing(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim() || isProcessing) return;
    
    setSubmittedPrompt(prompt);
    setCommandHistory(prev => [...prev, prompt]);
    fetchAnswer(prompt);
  };

  const handleQuickPrompt = (quickPrompt) => {
    if (isProcessing) return;
    setPrompt(quickPrompt);
    simulateSubmission(quickPrompt);
  };

  return (
    <div 
      className="min-h-screen w-full text-foreground relative overflow-hidden flex flex-col items-center justify-center"
      style={{ 
        backgroundColor: 'var(--color-background)',
        fontFamily: 'var(--font-sf)'
      }}
    >
      <div className="h-24 md:h-36 w-full" />
      <CyberGrid />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 mt-2">
        
        {!submittedPrompt && (
          <div className="text-center mb-8 sm:mb-12">
            <div 
              className="inline-flex items-center gap-2 border rounded-full px-4 sm:px-6 py-2 mb-4 sm:mb-6"
              style={{
                backgroundColor: 'var(--color-surface-alt)',
                borderColor: 'var(--color-border)'
              }}
            >
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-accent" />
              <span 
                className="text-xs sm:text-sm text-foreground"
                style={{ fontFamily: 'var(--font-sf)' }}
              >
                CYBERSECURITY RECRUITMENT ASSISTANT
              </span>
            </div>
            
            <h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 break-words"
              style={{ fontFamily: 'var(--font-frontage-bulb)' }}
            >
              <span>AI</span>
              <span className="text-text-secondary"> SYSTEM</span>
            </h1>
            
            <QuickActions onQuickPrompt={handleQuickPrompt} />
          </div>
        )}

        {/* Chat interface */}
        <div 
          className="backdrop-blur-sm border rounded-lg overflow-hidden"
          style={{
            backgroundColor: 'var(--color-surface-elevated)',
            borderColor: 'var(--color-border)'
          }}
        >
          {/* Terminal Header */}
          <div 
            className="px-3 sm:px-4 py-2 flex items-center justify-between border-b"
            style={{
              backgroundColor: 'var(--color-surface-alt)',
              borderColor: 'var(--color-border)'
            }}
          >
            <div className="flex items-center gap-2">
              <Terminal className="w-3 h-3 sm:w-4 sm:h-4 text-accent" />
              <span className="text-xs sm:text-sm font-mono text-foreground">ai@bi0s:~$</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-hover rounded-full"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-accent rounded-full"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-accent rounded-full"></div>
            </div>
          </div>

          {/* Command History */}
          {commandHistory.length > 0 && (
            <div 
              className="max-h-32 sm:max-h-40 overflow-y-auto border-b"
              style={{
                backgroundColor: 'var(--color-surface-alt)',
                borderColor: 'var(--color-border)'
              }}
            >
              {commandHistory.slice(-5).map((cmd, index) => (
                <div 
                  key={index} 
                  className="px-3 sm:px-4 py-2 font-mono text-xs sm:text-sm text-text-secondary border-b last:border-b-0"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  <span className="text-accent">ai@bi0s:~$</span> 
                  <span className="ml-1 break-words">{cmd}</span>
                </div>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div className="p-3 sm:p-4">
            <div className="flex items-start gap-2 mb-3 sm:mb-4">
              <span className="text-accent font-mono text-xs sm:text-sm pt-2 flex-shrink-0">ai@bi0s:~$</span>
              <div className="flex-1 min-w-0">
                <textarea
                  ref={inputRef}
                  rows={1}
                  placeholder="Enter your query.."
                  className="w-full bg-transparent text-foreground font-mono text-xs sm:text-sm focus:outline-none placeholder:text-text-secondary resize-none leading-relaxed"
                  value={prompt}
                  onChange={(e) => {
                    setPrompt(e.target.value);
                    // Auto-resize textarea
                    e.target.style.height = 'auto';
                    e.target.style.height = e.target.scrollHeight + 'px';
                  }}
                  disabled={isProcessing}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                  style={{ maxHeight: '120px', paddingTop: '0.5rem' }}
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                disabled={isProcessing || !prompt.trim()}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded border transition-all duration-200 ${
                  isProcessing || !prompt.trim()
                    ? "border-border text-text-disabled cursor-not-allowed"
                    : "border-accent text-accent hover:bg-surface-alt"
                }`}
                style={{
                  backgroundColor: isProcessing || !prompt.trim() ? 'var(--color-surface-alt)' : 'transparent'
                }}
              >
                {isProcessing ? (
                  <>
                    <Loader className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
                    <span className="text-xs sm:text-sm font-mono">PROCESSING</span>
                  </>
                ) : (
                  <>
                    <SendHorizontal className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm font-mono">EXECUTE</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Response Area */}
          {submittedPrompt && (
            <div className="border-t" style={{ borderColor: 'var(--color-border)' }}>
              <div 
                className="px-3 sm:px-4 py-2 border-b"
                style={{
                  backgroundColor: 'var(--color-surface-alt)',
                  borderColor: 'var(--color-border)'
                }}
              >
                <div className="flex items-start gap-2 text-xs sm:text-sm font-mono text-text-secondary">
                  <Lock className="w-3 h-3 sm:w-4 sm:h-4 mt-0.5 flex-shrink-0" />
                  <span className="break-words">QUERY: {submittedPrompt}</span>
                </div>
              </div>
              
              <div className="min-h-[200px] max-h-[50vh] sm:max-h-[60vh] overflow-y-auto">
                {isProcessing ? (
                  <div className="p-6 sm:p-8 text-center">
                    <div className="inline-flex items-center gap-3 text-accent font-mono text-sm sm:text-base">
                      <Loader className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                      <span>ANALYZING QUERY...</span>
                    </div>
                    <div className="mt-4 text-text-secondary text-sm">
                      <div className="flex justify-center gap-1">
                        <div className="w-2 h-2 bg-accent rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <MDXContent content={response} />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AI() {
  return (
    <Suspense fallback={<LoadingIndicator className="min-h-screen" />}>
      <AiContents />
    </Suspense>
  );
}