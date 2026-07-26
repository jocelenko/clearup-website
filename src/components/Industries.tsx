import React from 'react';
import { GraduationCap, ShoppingBag, Building, Stethoscope, UtensilsCrossed, ArrowRight } from 'lucide-react';
import { useQuoteModal } from '../context/QuoteModalContext';

const industries = [
  { name: 'Education', icon: GraduationCap },
  { name: 'Shopping Centre & Retail', icon: ShoppingBag },
  { name: 'Commercial Cleaning', icon: Building },
  { name: 'Medical Practice Cleaning', icon: Stethoscope },
  { name: 'Hospitality', icon: UtensilsCrossed },
];

export default function Industries() {
  const { openQuote } = useQuoteModal();
  // Duplicate the list so the marquee loops seamlessly
  const loop = [...industries, ...industries, ...industries];

  return (
    <section id="industries" className="py-14 lg:py-16 bg-gradient-to-br from-primary-900 via-primary-800 to-slate-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold text-white mb-4">
            Industries We Serve
          </h2>
          <p className="text-primary-200 text-lg">
            With integrity, care and respect.
          </p>
        </div>
      </div>

      {/*
        The cards are masked out at both edges rather than covered by a
        coloured overlay, so they fade into whatever the section background
        is instead of smudging grey over the white cards.
      */}
      <div
        className="relative"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 7%, black 93%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 7%, black 93%, transparent)',
        }}
      >
        <div className="flex gap-4 animate-marquee whitespace-nowrap py-2">
          {loop.map(({ name, icon: Icon }, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-64 h-28 bg-white border border-white/10 rounded-2xl flex flex-col items-center justify-center text-center px-4 shadow-lg"
            >
              <Icon className="w-8 h-8 text-primary-600 mb-2" />
              <span className="font-display font-semibold text-primary-900 text-base whitespace-normal">{name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-10">
        <button
          onClick={() => openQuote()}
          className="inline-flex items-center gap-2 bg-white hover:bg-primary-50 text-primary-900 px-8 py-4 rounded-full font-semibold transition-all shadow-lg"
        >
          Request a Quote
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
