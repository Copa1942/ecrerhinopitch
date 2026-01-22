import React from 'react';
import { SlideContainer } from '../SlideContainer';
import { SlideProps } from '../../types';
import { Home, Mic2, Book, Scale, Settings, Users, PenTool, Coins } from 'lucide-react';

const pillars = [
  { icon: Home, title: "Rhino Communities", subtitle: "Core Organization" },
  { icon: Mic2, title: "Brand-Building & Media", subtitle: "Outreach" },
  { icon: Book, title: "Education & Satire", subtitle: "Books & Podcasts" },
  { icon: Scale, title: "Ethics & Advocacy", subtitle: "Industry Leadership" },
  { icon: Settings, title: "Operations Strategy", subtitle: "Efficiency" },
  { icon: Users, title: "Consulting & Turnaround", subtitle: "Advisory" },
  { icon: PenTool, title: "Rhino Canvas Co.", subtitle: "Creative" },
  { icon: Coins, title: "Capital, JV, GP", subtitle: "Jason + Erik Partnership", highlight: true },
];

export const PillarsSlide: React.FC<SlideProps> = ({ isActive, direction }) => {
  return (
    <SlideContainer isVisible={isActive} direction={direction} className="bg-rhino-dark text-white">
      <div className="h-full flex flex-col p-8 md:p-16">
        <div className="text-center mb-12">
          <h2 className="text-rhino-blue font-bold tracking-widest uppercase mb-2">The Ecosystem</h2>
          <h1 className="text-4xl md:text-5xl font-serif font-bold">The 8 Rhino Pillars</h1>
        </div>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto w-full">
          {pillars.map((pillar, idx) => (
            <div 
              key={idx} 
              className={`
                group relative border p-6 flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-1
                ${pillar.highlight 
                  ? 'bg-rhino-blue border-rhino-blue shadow-lg shadow-blue-900/50' 
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'}
              `}
            >
              <div className={`p-4 rounded-full mb-4 ${pillar.highlight ? 'bg-white text-rhino-blue' : 'bg-white/10 text-white'}`}>
                <pillar.icon className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold mb-1">{pillar.title}</h3>
              <p className={`text-xs uppercase tracking-wider ${pillar.highlight ? 'text-blue-200' : 'text-slate-400'}`}>
                {pillar.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SlideContainer>
  );
};