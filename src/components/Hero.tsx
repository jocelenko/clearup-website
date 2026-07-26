import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone } from 'lucide-react';
import { useQuoteModal } from '../context/QuoteModalContext';

export default function Hero() {
  const { openQuote } = useQuoteModal();

  return (
    <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-slate-900 text-white pt-28 sm:pt-32 pb-14 sm:pb-16 lg:pb-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-80 sm:w-96 h-80 sm:h-96 bg-primary-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-80 sm:w-96 h-80 sm:h-96 bg-leaf-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center"
        >
          <div className="inline-flex items-center gap-3 max-w-full px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl sm:rounded-full bg-white/10 border border-white/20 text-white font-semibold text-sm sm:text-base lg:text-lg backdrop-blur-sm mb-7 sm:mb-8">
            <span className="flex h-2.5 w-2.5 rounded-full bg-leaf-400 flex-shrink-0"></span>
            <span>100% service delivery with transparency</span>
          </div>

          <h1 className="text-[2rem] leading-[1.15] sm:text-5xl lg:text-6xl font-display font-semibold text-white sm:leading-[1.1] tracking-tight mb-5 sm:mb-6 max-w-5xl text-balance">
            Over 20 years of cleaning experience, built on{' '}
            <span className="uppercase">integrity, care</span> and{' '}
            <span className="uppercase">respect</span>.
          </h1>

          <p className="text-base sm:text-lg text-primary-200 mb-8 sm:mb-10 max-w-2xl leading-relaxed text-pretty">
            Clear Up delivers reliable commercial cleaning across Brisbane, the Gold Coast and the Sunshine Coast, with clear communication, daily reporting and proactive management at every stage.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <button
              onClick={() => openQuote()}
              className="inline-flex justify-center items-center gap-2 bg-white hover:bg-primary-50 text-primary-900 px-8 py-4 rounded-full font-semibold transition-all shadow-lg"
            >
              Request a Quote
              <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="tel:1300123456"
              className="inline-flex justify-center items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/25 px-8 py-4 rounded-full font-medium transition-colors backdrop-blur-sm"
            >
              <Phone className="w-4 h-4" />
              1300 123 456
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
