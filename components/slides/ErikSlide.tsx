import React from 'react';
import { SlideContainer } from '../SlideContainer';
import { SlideProps } from '../../types';
import { TrendingUp, ShieldCheck, Building2, GitMerge } from 'lucide-react';

export const ErikSlide: React.FC<SlideProps> = ({ isActive, direction }) => {
  return (
    <SlideContainer isVisible={isActive} direction={direction} className="bg-white text-rhino-dark">
      <div className="flex flex-col md:flex-row h-full">
        {/* Left: Image (Swapped visual weight logic for contrast, but user requested layout Left=Image) */}
        <div className="w-full md:w-1/3 h-1/3 md:h-full relative overflow-hidden order-1">
          <img 
            src="https://picsum.photos/seed/erikpeterson/801/1201" 
            alt="Erik Peterson"
            className="w-full h-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-slate-900/10 mix-blend-multiply"></div>
        </div>

        {/* Right: Content */}
        <div className="w-full md:w-2/3 h-2/3 md:h-full flex flex-col relative order-2">
          <div className="flex-1 px-8 md:px-20 flex flex-col justify-center">
            
            <div className="mb-2 text-slate-900 font-bold tracking-widest uppercase text-sm">
              Deal Strategist
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4 text-rhino-dark">
              ERIK<br/>PETERSON
            </h1>
            <div className="text-slate-500 mb-12 font-medium">
              Founder, Equity Consultants Real Estate | Partner, Rhino Communities
            </div>

            <div className="space-y-8">
              <div className="flex items-start">
                <div className="p-3 bg-slate-900 rounded-lg mr-4 shrink-0">
                   <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Underwriting Discipline</h3>
                  <p className="text-slate-600">Margin architecture and financial rigorousness.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-3 bg-slate-900 rounded-lg mr-4 shrink-0">
                   <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Risk Identification</h3>
                  <p className="text-slate-600">Precision deal modeling and downside protection.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-3 bg-slate-900 rounded-lg mr-4 shrink-0">
                   <GitMerge className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Capital Structures</h3>
                  <p className="text-slate-600">Expertise in JV/GP structuring, acquisitions, and finance.</p>
                </div>
              </div>

               <div className="flex items-start">
                <div className="p-3 bg-slate-900 rounded-lg mr-4 shrink-0">
                   <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Value Engineering</h3>
                  <p className="text-slate-600">Long-term operational structuring for maximum equity.</p>
                </div>
              </div>
            </div>

             <blockquote className="mt-12 text-2xl font-serif italic text-slate-800 border-l-4 border-slate-900 pl-6">
              "Erik sees the margin the moment the numbers hit the table."
            </blockquote>
          </div>

          {/* Footer Strip - Opposite color (Black/Dark Grey) */}
          <div className="h-4 w-full bg-slate-900"></div>
        </div>
      </div>
    </SlideContainer>
  );
};