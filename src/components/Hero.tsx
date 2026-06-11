import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone } from 'lucide-react';
import { useQuoteModal } from '../context/QuoteModalContext';

// Generic placeholder video. Swap with Sonia's real YouTube ID once recorded.
const YOUTUBE_ID = 'aqz-KE-bpKQ';

export default function Hero() {
  const { openQuote } = useQuoteModal();

  return (
    <section className="relative bg-gradient-to-br from-white via-sky-50 to-leaf-50/40 pt-28 lg:pt-32 pb-16 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary-100/40 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-leaf-100/40 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="py-8 lg:py-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-primary-100 text-primary-700 font-medium text-sm mb-8 shadow-sm backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-leaf-500"></span>
              100% service delivery with transparency
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold text-primary-900 leading-[1.1] tracking-tight mb-6">
              Over 20 years of cleaning experience,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-leaf-500">
                built on integrity, care and respect.
              </span>
            </h1>
            <p className="text-lg text-slate-600 mb-10 max-w-xl leading-relaxed">
              Clear Up delivers reliable commercial cleaning across Brisbane, the Gold Coast and the Sunshine Coast — with clear communication, daily reporting and proactive management at every stage.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => openQuote()}
                className="inline-flex justify-center items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full font-medium transition-all shadow-lg shadow-primary-600/25 hover:shadow-primary-600/40"
              >
                Request a Quote
                <ArrowRight className="w-5 h-5" />
              </button>
              <a
                href="tel:1300123456"
                className="inline-flex justify-center items-center gap-2 bg-white hover:bg-slate-50 text-primary-900 border border-primary-200 px-8 py-4 rounded-full font-medium transition-colors"
              >
                <Phone className="w-4 h-4" />
                1300 123 456
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative"
          >
            {/*
              Hero video.
              PLACEHOLDER: currently embedding a generic YouTube video so the
              section looks complete. To swap for Sonia's real intro video,
              change the YOUTUBE_ID constant in this file to the new video ID.
            */}
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white bg-slate-900">
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?rel=0&modestbranding=1`}
                title="Sonia's Introduction"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <p className="mt-3 text-sm text-slate-500 text-center lg:text-left">
              Placeholder video — Sonia's intro will replace this soon.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
