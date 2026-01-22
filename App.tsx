
import React, { useState, useEffect, useCallback } from 'react';
import { IntroSlide } from './components/slides/IntroSlide';
import { JasonSlide } from './components/slides/JasonSlide';
import { ErikSlide } from './components/slides/ErikSlide';
import { PartnershipSlide } from './components/slides/PartnershipSlide';
import { WhySlide } from './components/slides/WhySlide';
import { CapabilitiesSlide } from './components/slides/CapabilitiesSlide';
import { PillarsSlide } from './components/slides/PillarsSlide';
import { SlideNavigation } from './components/SlideNavigation';
import { LiveAssistant } from './components/LiveAssistant';
import { SlideDirection } from './types';

const SLIDES = [
  IntroSlide,
  JasonSlide,
  ErikSlide,
  PartnershipSlide,
  WhySlide,
  CapabilitiesSlide,
  PillarsSlide
];

const SLIDE_DESCRIPTIONS = [
  "Intro Slide: Meet the Team. Features Jason Ramshaw (Systems) and Erik Peterson (Structure). One clean execution engine.",
  "Jason Ramshaw Profile: Systems Engineer. Co-Founder of Rhino Communities. Architect of behavioral systems and media ecosystem.",
  "Erik Peterson Profile: Deal Strategist. Founder of Equity Consultants. Precision underwriting, risk identification, and capital structures.",
  "The Partnership: Systems vs Structure. One reads the people (Jason), one reads the numbers (Erik). Combined Engine.",
  "Synergy: Why it works. Complementary strengths, unified execution, brand trust, and seller certainty.",
  "Capabilities: Division of labor. Jason handles frameworks and brand. Erik handles underwriting and JV/GP structures.",
  "The 8 Rhino Pillars: The ecosystem including Rhino Communities, Media, Education, Ethics, Operations, Consulting, Creative, and Capital."
];

const App: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(SlideDirection.NONE);

  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentSlide ? SlideDirection.NEXT : SlideDirection.PREV);
    setCurrentSlide(index);
  }, [currentSlide]);

  const nextSlide = useCallback(() => {
    if (currentSlide < SLIDES.length - 1) {
      setDirection(SlideDirection.NEXT);
      setCurrentSlide(prev => prev + 1);
    }
  }, [currentSlide]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setDirection(SlideDirection.PREV);
      setCurrentSlide(prev => prev - 1);
    }
  }, [currentSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-rhino-dark">
      {/* Slides */}
      {SLIDES.map((SlideComponent, index) => (
        <SlideComponent 
          key={index} 
          isActive={currentSlide === index}
          direction={direction}
        />
      ))}

      {/* Live AI Assistant */}
      <LiveAssistant 
        currentSlideIndex={currentSlide} 
        slideDescriptions={SLIDE_DESCRIPTIONS} 
      />

      {/* Navigation */}
      <SlideNavigation 
        currentSlide={currentSlide}
        totalSlides={SLIDES.length}
        onNext={nextSlide}
        onPrev={prevSlide}
        onGoTo={goToSlide}
      />
      
      {/* Small mobile warning */}
      <div className="md:hidden absolute top-4 left-0 w-full text-center pointer-events-none z-50">
        <span className="bg-black/50 text-white text-[10px] px-2 py-1 rounded backdrop-blur">
          Swipe not enabled. Use arrows.
        </span>
      </div>
    </div>
  );
};

export default App;
