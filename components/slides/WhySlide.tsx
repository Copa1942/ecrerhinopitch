import React from 'react';
import { SlideContainer } from '../SlideContainer';
import { SlideProps } from '../../types';
import { Network, Target, ShieldCheck, Handshake } from 'lucide-react';

export const WhySlide: React.FC<SlideProps> = ({ isActive, direction }) => {
  return (
    <SlideContainer isVisible={isActive} direction={direction} className="bg-rhino-dark text-white">
      <div className="h-full flex flex-col p-8 md:p-16 lg:p-24 relative overflow-hidden">
        
        {/* Background Texture */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rhino-blue opacity-20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-900 opacity-10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative z-10 max-w-6xl mx-auto w-full h-full flex flex-col">
          <div className="mb-12 md:mb-20 text-center">
             <h2 className="text-rhino-blue font-bold tracking-widest uppercase mb-4">The Synergy</h2>
             <h1 className="text-4xl md:text-6xl font-serif font-bold">Why Our Partnership Works</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 flex-1 content-center">
            
            {/* Card 1 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 md:p-8 rounded-xl hover:bg-white/10 transition-colors duration-300">
              <div className="w-12 h-12 bg-rhino-blue rounded-lg flex items-center justify-center mb-6">
                <Network className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Complementary Strengths</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                <strong className="text-white">Jason</strong> manages trust, communication, and system flow. <br/>
                <strong className="text-white">Erik</strong> manages structure, margin, and risk.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 md:p-8 rounded-xl hover:bg-white/10 transition-colors duration-300">
              <div className="w-12 h-12 bg-rhino-blue rounded-lg flex items-center justify-center mb-6">
                <Target className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Unified Execution</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                One integrated process. No weak links. No handoffs. A complete lifecycle solution.
              </p>
            </div>

             {/* Card 3 */}
             <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 md:p-8 rounded-xl hover:bg-white/10 transition-colors duration-300">
              <div className="w-12 h-12 bg-rhino-blue rounded-lg flex items-center justify-center mb-6">
                <ShieldCheck className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Brand + Strategy</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Rhino’s public trust + ECR’s financial discipline = <span className="text-white font-semibold">Predictable Execution.</span>
              </p>
            </div>

             {/* Card 4 */}
             <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 md:p-8 rounded-xl hover:bg-white/10 transition-colors duration-300">
              <div className="w-12 h-12 bg-rhino-blue rounded-lg flex items-center justify-center mb-6">
                <Handshake className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Seller Certainty</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Clear communication, structured outcomes, and resident-first operations.
              </p>
            </div>

          </div>
        </div>
      </div>
    </SlideContainer>
  );
};