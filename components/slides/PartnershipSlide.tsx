import React from 'react';
import { SlideContainer } from '../SlideContainer';
import { SlideProps } from '../../types';

export const PartnershipSlide: React.FC<SlideProps> = ({ isActive, direction }) => {
  return (
    <SlideContainer isVisible={isActive} direction={direction} className="bg-slate-100 text-rhino-dark">
      <div className="flex flex-col md:flex-row h-full relative">
        
        {/* Center Line/Logo */}
        <div className="hidden md:flex absolute inset-0 justify-center items-center z-20 pointer-events-none">
          <div className="h-full w-[1px] bg-slate-300"></div>
          <div className="absolute bg-white border border-slate-300 p-4 rounded-full shadow-lg">
             {/* Simple Geometric Rhino Icon */}
             <div className="w-12 h-12 bg-rhino-dark flex items-center justify-center text-white font-bold text-xs">RHINO</div>
          </div>
        </div>

        {/* Left Side: Jason */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full bg-white p-8 md:p-16 flex flex-col justify-center items-center md:items-end text-center md:text-right border-b md:border-b-0 border-slate-200">
          <h2 className="text-rhino-blue font-bold tracking-[0.3em] uppercase mb-4">Jason</h2>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">SYSTEMS</h1>
          <p className="text-xl text-slate-600 max-w-sm mb-4">
            Designs the behavioral + operational systems.
          </p>
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-100 max-w-sm shadow-sm">
            <p className="font-medium text-slate-800">"One reads the people."</p>
          </div>
        </div>

        {/* Right Side: Erik */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full bg-slate-50 p-8 md:p-16 flex flex-col justify-center items-center md:items-start text-center md:text-left">
          <h2 className="text-slate-900 font-bold tracking-[0.3em] uppercase mb-4">Erik</h2>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">STRUCTURE</h1>
           <p className="text-xl text-slate-600 max-w-sm mb-4">
            Engineers the financial + structural architecture.
          </p>
          <div className="bg-white p-6 rounded-lg border border-slate-200 max-w-sm shadow-sm">
            <p className="font-medium text-slate-800">"One reads the numbers."</p>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="absolute bottom-0 w-full bg-rhino-dark text-white py-6 z-30 flex flex-col items-center justify-center text-center px-4">
          <h3 className="text-xl md:text-2xl font-serif italic mb-1">
            Human strategy + Deal strategy → Predictable outcomes.
          </h3>
          <p className="text-sm opacity-60 tracking-widest uppercase">The Combined Engine</p>
        </div>
      </div>
    </SlideContainer>
  );
};