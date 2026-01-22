import React from 'react';
import { SlideContainer } from '../SlideContainer';
import { SlideProps } from '../../types';

export const IntroSlide: React.FC<SlideProps> = ({ isActive, direction }) => {
  return (
    <SlideContainer isVisible={isActive} direction={direction} className="bg-rhino-dark text-white">
      <div className="flex flex-col md:flex-row h-full">
        {/* Left Side: Images */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full relative bg-black overflow-hidden group">
          <div className="absolute inset-0 flex">
             <div className="w-1/2 h-full relative">
                <img 
                  src="https://picsum.photos/seed/jasonramshaw/800/1200" 
                  alt="Jason Ramshaw"
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                />
                <div className="absolute bottom-4 left-4 text-sm font-bold tracking-widest opacity-50">J. RAMSHAW</div>
             </div>
             <div className="w-1/2 h-full relative border-l border-white/10">
                <img 
                  src="https://picsum.photos/seed/erikpeterson/800/1200" 
                  alt="Erik Peterson"
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                />
                <div className="absolute bottom-4 left-4 text-sm font-bold tracking-widest opacity-50">E. PETERSON</div>
             </div>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 bg-rhino-dark relative">
          <div className="space-y-8">
            <h2 className="text-sm md:text-base text-rhino-blue font-bold tracking-[0.2em] uppercase">
              The Partners Behind
            </h2>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight">
              Rhino Communities <span className="text-slate-500">&amp;</span> <br/>
              Equity Consultants
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 font-light border-l-2 border-rhino-blue pl-6">
              One system. One structure. <br/>
              <span className="text-white font-semibold">One clean execution engine.</span>
            </p>

            <div className="pt-8 space-y-2">
              <div className="flex items-center space-x-4">
                <span className="w-12 h-[1px] bg-slate-600"></span>
                <p className="text-lg font-medium">Jason Ramshaw — Systems Engineer</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="w-12 h-[1px] bg-slate-600"></span>
                <p className="text-lg font-medium">Erik Peterson — Deal Strategist</p>
              </div>
            </div>

            <div className="pt-12">
               <p className="italic text-slate-400 font-serif text-lg">
                "Jason designs the system. Erik designs the structure."
               </p>
            </div>
          </div>
          
          <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 opacity-30">
            {/* Minimalist Rhino Logo Representation */}
            <div className="text-xs tracking-widest uppercase border border-white p-2">
              Rhino Communities
            </div>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};