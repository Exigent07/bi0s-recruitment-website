import { useState, useEffect, useRef } from "react";
import { Shield, Flag, Wrench, Search, Microscope, GraduationCap, Trophy, Briefcase } from "lucide-react";

function Card({ title, description, icon, isActive }) {
  return (
    <div className={`w-full h-full rounded-xl p-4 sm:p-6 shadow-xl backdrop-blur-sm border transition-all duration-500 hover:scale-105 hover:shadow-2xl group cursor-pointer ${
      isActive ? 'shadow-accent/20' : ''
    }`}
    style={{
      backgroundColor: 'var(--color-surface-elevated)',
      borderColor: 'var(--color-border)',
      boxShadow: isActive ? '0 25px 50px -12px rgba(211, 211, 211, 0.1)' : '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
    }}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center mb-3 sm:mb-4">
          <div className="mb-2 group-hover:scale-110 transition-transform duration-300"
               style={{ color: 'var(--color-accent)' }}>
            {icon}
          </div>
        </div>
        
        <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 md:mb-4 text-center transition-colors duration-300"
            style={{ 
              color: 'var(--color-foreground)',
              fontFamily: 'var(--font-frontage-bold)'
            }}>
          {title}
        </h3>
        
        <p className="text-xs sm:text-sm leading-relaxed flex-grow transition-colors duration-300 text-center sm:text-left"
           style={{ 
             color: 'var(--color-text-secondary)',
             fontFamily: 'var(--font-sf)'
           }}>
          {description}
        </p>
        
        <div className="mt-3 sm:mt-4 flex justify-center">
          <div className="w-8 sm:w-12 h-0.5 group-hover:w-12 sm:group-hover:w-16 transition-all duration-300"
               style={{ backgroundColor: 'var(--color-accent)' }}></div>
        </div>
      </div>
    </div>
  );
}

export default function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);
  const carouselRef = useRef(null);

  const cards = [
    {
      id: 1,
      title: "Join Team bi0s",
      description: "Be part of India's premier cybersecurity research group! Since 2007, we've been consistently ranking No.1 in CTFTime and pioneering cybersecurity education in India. Join a community that functions like a family.",
      icon: <Shield size={48} className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />,
    },
    {
      id: 2,
      title: "Mentor-Mentee Model",
      description: "Experience our unique learning approach where senior students personally train and mentor juniors. Gain hands-on experience and skills that top companies like VMware, Cisco, and Intel value in our graduates.",
      icon: <GraduationCap size={48} className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />,
    },
    {
      id: 3,
      title: "Specialized Teams",
      description: "Choose your path in 10+ cybersecurity focus areas: CTF competitions, Hardware Security, Penetration Testing, Research & Development, and more. Find your passion and excel in it.",
      icon: <Flag size={48} className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />,
    },
    {
      id: 4,
      title: "Real-World Experience",
      description: "Participate in global CTFs, bug bounty programs, and international research projects. Contribute to open-source tools, submit CVEs, and work on cutting-edge security challenges.",
      icon: <Search size={48} className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />,
    },
    {
      id: 5,
      title: "Industry Recognition",
      description: "Our alumni are highly sought after by top tech companies. Recruiters say 'Freshers from Amrita are better than experienced people hired from outside' - that's the bi0s advantage.",
      icon: <Trophy size={48} className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />,
    },
    {
      id: 6,
      title: "Hardware Security",
      description: "Dive deep into Embedded Systems, Firmware Analysis, Wireless Security, Automotive Security, ICS/SCADA Security, and Side Channel Analysis. Master the physical side of cybersecurity.",
      icon: <Wrench size={48} className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />,
    },
    {
      id: 7,
      title: "Research Opportunities",
      description: "Work on international cybersecurity research projects, collaborate with global experts, and contribute to academic publications. Build your research portfolio while still a student.",
      icon: <Microscope size={48} className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />,
    },
    {
      id: 8,
      title: "Professional Growth",
      description: "From organizing India's first CTF to providing consultancy services, gain entrepreneurial experience and professional skills that set you apart in the cybersecurity industry.",
      icon: <Briefcase size={48} className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />,
    },
  ];

  const radius = 500;
  const rotateStep = 360 / cards.length;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % cards.length);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setPrevTranslate(currentTranslate);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    const newTranslate = prevTranslate + diff;
    
    setCurrentTranslate(newTranslate);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    
    const threshold = 50;
    const cardWidth = carouselRef.current?.offsetWidth || 0;
    const movedBy = currentTranslate - prevTranslate;
    
    if (Math.abs(movedBy) > threshold) {
      if (movedBy > 0 && activeIndex > 0) {
        handlePrev();
      } else if (movedBy < 0 && activeIndex < cards.length - 1) {
        handleNext();
      }
    }
    
    setCurrentTranslate(-activeIndex * cardWidth);
    setPrevTranslate(-activeIndex * cardWidth);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setPrevTranslate(currentTranslate);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const currentX = e.clientX;
    const diff = currentX - startX;
    const newTranslate = prevTranslate + diff;
    
    setCurrentTranslate(newTranslate);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    
    const threshold = 50;
    const cardWidth = carouselRef.current?.offsetWidth || 0;
    const movedBy = currentTranslate - prevTranslate;
    
    if (Math.abs(movedBy) > threshold) {
      if (movedBy > 0 && activeIndex > 0) {
        handlePrev();
      } else if (movedBy < 0 && activeIndex < cards.length - 1) {
        handleNext();
      }
    }
    
    setCurrentTranslate(-activeIndex * cardWidth);
    setPrevTranslate(-activeIndex * cardWidth);
  };

  useEffect(() => {
    if (!isHovered && !isDragging) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % cards.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [cards.length, isHovered, isDragging]);

  useEffect(() => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.offsetWidth;
      const newTranslate = -activeIndex * cardWidth;
      setCurrentTranslate(newTranslate);
      setPrevTranslate(newTranslate);
    }
  }, [activeIndex]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center overflow-hidden px-2 sm:px-4 py-4 sm:py-8"
         style={{ backgroundColor: 'var(--color-background)' }}>

      <div className="relative w-full max-w-6xl flex items-center justify-center"
           onMouseEnter={() => setIsHovered(true)}
           onMouseLeave={() => setIsHovered(false)}>
        
        {/* Mobile Carousel */}
        <div className="block lg:hidden w-full">
          <div className="relative w-full max-w-sm mx-auto overflow-hidden">
            <div 
              ref={carouselRef}
              className="flex transition-transform duration-500 ease-out cursor-grab active:cursor-grabbing"
              style={{ 
                transform: isDragging 
                  ? `translateX(${currentTranslate}px)` 
                  : `translateX(-${activeIndex * 100}%)`
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {cards.map((card, i) => (
                <div key={card.id} className="w-full flex-shrink-0 select-none">
                  <div className="h-[350px] xs:h-[400px] sm:h-[450px] mx-1 sm:mx-2">
                    <Card 
                      title={card.title} 
                      description={card.description} 
                      icon={card.icon}
                      isActive={i === activeIndex}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop 3D Carousel */}
        <div className="hidden lg:block">
          <div
            className="relative w-[300px] xl:w-[320px] h-[400px] xl:h-[450px]"
            style={{
              perspective: "1200px",
            }}
          >
            <div
              className="absolute w-full h-full transition-transform duration-700"
              style={{
                transformStyle: "preserve-3d",
                transform: `translateZ(-${radius}px) rotateY(-${
                  activeIndex * rotateStep
                }deg)`,
              }}
            >
              {cards.map((card, i) => (
                <div
                  key={card.id}
                  className="absolute left-0 top-0 w-full h-full"
                  style={{
                    transform: `rotateY(${i * rotateStep}deg) translateZ(${radius}px)`,
                  }}
                >
                  <Card 
                    title={card.title} 
                    description={card.description} 
                    icon={card.icon}
                    isActive={i === activeIndex}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="absolute top-1/2 -translate-y-1/2 left-1 right-1 xs:left-2 xs:right-2 sm:left-4 sm:right-4 lg:left-[-80px] lg:right-[-80px] xl:left-[-100px] xl:right-[-100px] flex justify-between pointer-events-none">
          <button
            onClick={handlePrev}
            className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 pointer-events-auto hover:scale-110"
            style={{
              backgroundColor: 'var(--color-surface-elevated)',
              borderColor: 'var(--color-border)',
              color: 'var(--color-foreground)',
              border: '1px solid var(--color-border)'
            }}
          >
            <svg className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={handleNext}
            className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 pointer-events-auto hover:scale-110"
            style={{
              backgroundColor: 'var(--color-surface-elevated)',
              borderColor: 'var(--color-border)',
              color: 'var(--color-foreground)',
              border: '1px solid var(--color-border)'
            }}
          >
            <svg className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="mt-3 sm:mt-4 md:mt-12 w-32 xs:w-40 sm:w-48 md:w-64 h-1 rounded-full overflow-hidden mx-auto"
           style={{ backgroundColor: 'var(--color-border)' }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            backgroundColor: 'var(--color-accent)',
            width: `${((activeIndex + 1) / cards.length) * 100}%`
          }}
        />
      </div>
    </div>
  );
}