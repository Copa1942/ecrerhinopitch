import React from 'react';
import { SlideContainer } from '../SlideContainer';
import { SlideProps } from '../../types';
import { User, BrainCircuit, BookOpen, Repeat } from 'lucide-react';

export const JasonSlide: React.FC<SlideProps> = ({ isActive, direction }) => {
  return (
    <SlideContainer isVisible={isActive} direction={direction} className="bg-white text-rhino-dark">
      <div className="flex flex-col md:flex-row h-full">
        {/* Left: Image */}
        <div className="w-full md:w-1/3 h-1/3 md:h-full relative overflow-hidden">
          <img 
            src="https://picsum.photos/seed/jasonramshaw/800/1200" 
            alt="Jason Ramshaw"
            className="w-full h-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-rhino-blue/10 mix-blend-multiply"></div>
        </div>

        {/* Right: Content */}
        <div className="w-full md:w-2/3 h-2/3 md:h-full flex flex-col relative">
          <div className="flex-1 px-8 md:px-20 flex flex-col justify-center">
            
            <div className="mb-2 text-rhino-blue font-bold tracking-widest uppercase text-sm">
              Systems Engineer
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4 text-rhino-dark">
              JASON<br/>RAMSHAW
            </h1>
            <div className="text-slate-500 mb-12 font-medium">
              Co-Founder, Rhino Communities | Partner, Equity Consultants Real Estate
            </div>

            <div className="space-y-8">
              <div className="flex items-start">
                <div className="p-3 bg-slate-100 rounded-lg mr-4 shrink-0">
                   <BrainCircuit className="w-6 h-6 text-rhino-blue" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Architect of Systems</h3>
                  <p className="text-slate-600">Designs Rhino’s acquisition & operational frameworks from the ground up.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-3 bg-slate-100 rounded-lg mr-4 shrink-0">
                   <User className="w-6 h-6 text-rhino-blue" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Behavioral Strategist</h3>
                  <p className="text-slate-600">Reads people and designs trust pathways that unlock off-market opportunities.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-3 bg-slate-100 rounded-lg mr-4 shrink-0">
                   <BookOpen className="w-6 h-6 text-rhino-blue" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Media Ecosystem Creator</h3>
                  <p className="text-slate-600">Creator of Rhino’s education, books, satire, and media presence.</p>
                </div>
              </div>

               <div className="flex items-start">
                <div className="p-3 bg-slate-100 rounded-lg mr-4 shrink-0">
                   <Repeat className="w-6 h-6 text-rhino-blue" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Turnaround Specialist</h3>
                  <p className="text-slate-600">Expert in community-first operational turnarounds.</p>
                </div>
              </div>
            </div>

             <blockquote className="mt-12 text-2xl font-serif italic text-rhino-blue/80 border-l-4 border-rhino-blue pl-6">
              "Jason builds the system everyone else ends up following."
            </blockquote>
          </div>

          {/* Footer Strip */}
          <div className="h-4 w-full bg-rhino-blue"></div>
        </div>
      </div>
    </SlideContainer>
  );
};