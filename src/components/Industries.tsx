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
    <section id="industries" className="py-20 lg:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold text-primary-900 mb-4">
            Industries We Serve
          </h2>
          <p className="text-slate-600 text-lg">
            Trusted across a range of sectors where reliability, hygiene and presentation matter.
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        <div className="flex gap-4 animate-marquee whitespace-nowrap py-2">
          {loop.map(({ name, icon: Icon }, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-64 h-28 bg-gradient-to-br from-sky-50 to-leaf-50/60 border border-slate-100 rounded-2xl flex flex-col items-center justify-center text-center px-4 shadow-sm"
            >
              <Icon className="w-8 h-8 text-primary-600 mb-2" />
              <span className="font-display font-semibold text-primary-900 text-base whitespace-normal">{name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-12">
        <button
          onClick={() => openQuote()}
          className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full font-medium transition-all shadow-lg shadow-primary-600/25"
        >
          Request a Quote
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
