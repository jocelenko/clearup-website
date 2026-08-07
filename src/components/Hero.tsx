import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone } from 'lucide-react';
import { useQuoteModal } from '../context/QuoteModalContext';
import { CONTACT } from '../config/contact';

const BASE = import.meta.env.BASE_URL;
const SRCSET = [800, 1280, 1920, 2560]
  .map((w) => `${BASE}hero-office-${w}.webp ${w}w`)
  .join(', ');

export default function Hero() {
  const { openQuote } = useQuoteModal();

  return (
    <section className="relative isolate bg-primary-900 text-white pt-28 sm:pt-32 pb-14 sm:pb-16 lg:pb-20 overflow-hidden">
      {/*
        Photograph of the actual work, sitting under the brand navy.
        The entrance is scale only, deliberately: a blur-in masked the image
        load nicely but stalls whenever rAF is throttled (background tab),
        and a hero left permanently blurred is a far worse failure than one
        left 4% large.
      */}
      <motion.img
        src={`${BASE}hero-office-1920.webp`}
        srcSet={SRCSET}
        sizes="100vw"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        decoding="async"
        initial={{ scale: 1.04 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 -z-10 h-full w-full object-cover object-[center_28%]"
      />

      {/*
        The scrim is graded, not flat. It stays light across the top so the
        two cleaners in the photograph actually read, then deepens through
        the headline and body copy where white text has to clear 4.5:1.
        A light navy wash underneath keeps the whole thing in the brand's
        blue rather than letting it grey off.
      */}
      <div className="absolute inset-0 -z-10 bg-primary-900/25" aria-hidden="true"></div>
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-primary-900/35 via-primary-900/80 to-slate-900/95"
        aria-hidden="true"
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center"
        >
          {/* Carries its own dark fill so it stays legible over the lightest
              part of the photograph, where the scrim is deliberately thin. */}
          <div className="inline-flex items-center gap-3 max-w-full px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl sm:rounded-full bg-slate-950/55 border border-white/25 text-white font-semibold text-sm sm:text-base lg:text-lg backdrop-blur-md mb-7 sm:mb-8 shadow-lg shadow-slate-950/30">
            <span className="flex h-2.5 w-2.5 rounded-full bg-leaf-400 flex-shrink-0"></span>
            <span>100% service delivery with transparency</span>
          </div>

          <h1 className="text-[2rem] leading-[1.15] sm:text-5xl lg:text-6xl font-display font-semibold text-white sm:leading-[1.1] tracking-tight mb-5 sm:mb-6 max-w-5xl text-balance [text-shadow:0_2px_24px_rgb(15_23_42_/_0.45)]">
            Over 20 years of cleaning experience, built on{' '}
            <span className="uppercase">integrity, care</span> and{' '}
            <span className="uppercase">respect</span>.
          </h1>

          <p className="text-base sm:text-lg text-white/90 mb-8 sm:mb-10 max-w-2xl leading-relaxed text-pretty [text-shadow:0_1px_16px_rgb(15_23_42_/_0.5)]">
            Clear Up delivers reliable commercial cleaning across Brisbane, the Gold Coast and the Sunshine Coast, with clear communication, daily reporting and proactive management at every stage.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <button
              onClick={() => openQuote()}
              className="inline-flex justify-center items-center gap-2 bg-white hover:bg-primary-50 text-primary-900 px-8 py-4 rounded-full font-semibold transition-colors shadow-xl shadow-slate-950/30"
            >
              Request a Quote
              <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href={`tel:${CONTACT.phoneTel}`}
              className="inline-flex justify-center items-center gap-2 bg-white/12 hover:bg-white/22 text-white border border-white/30 px-8 py-4 rounded-full font-medium transition-colors backdrop-blur-md"
            >
              <Phone className="w-4 h-4" />
              {CONTACT.phoneDisplay}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
