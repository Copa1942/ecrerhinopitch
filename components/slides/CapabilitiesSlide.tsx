import React from 'react';
import { SlideContainer } from '../SlideContainer';
import { SlideProps } from '../../types';
import { CheckCircle2 } from 'lucide-react';

export const CapabilitiesSlide: React.FC<SlideProps> = ({ isActive, direction }) => {
  return (
    <SlideContainer isVisible={isActive} direction={direction} className="bg-white text-rhino-dark">
      <div className="h-full flex flex-col">
        <div className="flex-1 flex flex-col md:flex-row">
          
          {/* Left Column: Jason */}
          <div className="w-full md:w-1/2 h-full bg-slate-50 p-8 md:p-20 flex flex-col justify-center border-r border-slate-200">
             <div className="mb-8">
               <span className="bg-rhino-blue text-white px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
                 Systems
               </span>
               <h2 className="text-4xl md:text-5xl font-serif font-bold mt-4 text-rhino-dark">JASON</h2>
             </div>

             <ul className="space-y-6">
                {[
                  "Acquisition frameworks",
                  "Human strategy + seller navigation",
                  "Operational turnaround mapping",
                  "Brand + media ecosystem"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center text-lg md:text-xl font-medium text-slate-700">
                    <CheckCircle2 className="w-6 h-6 text-rhino-blue mr-4 shrink-0" />
                    {item}
                  </li>
                ))}
             </ul>
          </div>

          {/* Right Column: Erik */}
          <div className="w-full md:w-1/2 h-full bg-white p-8 md:p-20 flex flex-col justify-center">
             <div className="mb-8">
               <span className="bg-slate-900 text-white px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
                 Deals
               </span>
               <h2 className="text-4xl md:text-5xl font-serif font-bold mt-4 text-rhino-dark">ERIK</h2>
             </div>

             <ul className="space-y-6">
                {[
                  "Underwriting architecture",
                  "Margin optimization",
                  "JV/GP structures",
                  "Operational finance"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center text-lg md:text-xl font-medium text-slate-700">
                    <CheckCircle2 className="w-6 h-6 text-slate-900 mr-4 shrink-0" />
                    {item}
                  </li>
                ))}
             </ul>
          </div>

        </div>

        {/* Footer */}
        <div className="h-20 bg-rhino-dark flex items-center justify-center">
          <p className="text-white text-xl md:text-2xl font-serif italic">
             "Systems + Structure = Strategic Execution."
          </p>
        </div>
      </div>
    </SlideContainer>
  );
};