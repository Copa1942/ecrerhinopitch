import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationProps {
  currentSlide: number;
  totalSlides: number;
  onNext: () => void;
  onPrev: () => void;
  onGoTo: (index: number) => void;
}

export const SlideNavigation: React.FC<NavigationProps> = ({ 
  currentSlide, 
  totalSlides, 
  onNext, 
  onPrev,
  onGoTo
}) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-4 bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/10">
      <button 
        onClick={onPrev}
        disabled={currentSlide === 0}
        className="p-2 rounded-full hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-transparent text-white transition-all"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <div className="flex gap-2 px-2">
        {Array.from({ length: totalSlides }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => onGoTo(idx)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              idx === currentSlide ? 'bg-white w-6' : 'bg-white/40 hover:bg-white/80'
            }`}
          />
        ))}
      </div>

      <button 
        onClick={onNext}
        disabled={currentSlide === totalSlides - 1}
        className="p-2 rounded-full hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-transparent text-white transition-all"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};