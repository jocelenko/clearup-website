import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Phone, Play, X } from 'lucide-react';
import { useQuoteModal } from '../context/QuoteModalContext';

// Generic placeholder video. Swap with Sonia's real YouTube ID once recorded.
const YOUTUBE_ID = 'aqz-KE-bpKQ';

export default function Hero() {
  const { openQuote } = useQuoteModal();
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-slate-900 text-white pt-28 pb-14 lg:pb-16 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-leaf-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/*
            Top row: the headline message sits on the left, with a small
            click-to-expand video window on the right. Keeping the video
            compact lets the headline run the full width of the header
            underneath, instead of being squeezed into a narrow column.
          */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-6">
            {/* max-w-full lets the pill wrap instead of overflowing narrow screens */}
            <div className="inline-flex items-center gap-3 max-w-full px-5 py-3 rounded-2xl sm:rounded-full bg-white/10 border border-white/20 text-white font-semibold text-base sm:text-lg backdrop-blur-sm self-start">
              <span className="flex h-2.5 w-2.5 rounded-full bg-leaf-400 flex-shrink-0"></span>
              <span>100% service delivery with transparency</span>
            </div>

            <button
              type="button"
              onClick={() => setVideoOpen(true)}
              className="group relative w-full sm:w-56 lg:w-64 flex-shrink-0 aspect-video rounded-2xl overflow-hidden border border-white/20 shadow-xl bg-slate-900"
              aria-label="Play Sonia's introduction video"
            >
              <img
                src={`https://i.ytimg.com/vi/${YOUTUBE_ID}/hqdefault.jpg`}
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"
              />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="w-12 h-12 rounded-full bg-white/90 text-primary-900 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 ml-0.5 fill-current" />
                </span>
              </span>
            </button>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold text-white leading-[1.1] tracking-tight mb-6 max-w-6xl text-balance">
            Over 20 years of cleaning experience, built on{' '}
            <span className="uppercase">integrity, care</span> and{' '}
            <span className="uppercase">respect</span>.
          </h1>

          <p className="text-lg text-primary-200 mb-10 max-w-3xl leading-relaxed">
            Clear Up delivers reliable commercial cleaning across Brisbane, the Gold Coast and the Sunshine Coast, with clear communication, daily reporting and proactive management at every stage.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
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

      {/* Expanded video lightbox */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setVideoOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setVideoOpen(false)}
                className="absolute -top-12 right-0 text-white/80 hover:text-white p-2"
                aria-label="Close video"
              >
                <X className="w-7 h-7" />
              </button>
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?rel=0&modestbranding=1&autoplay=1`}
                  title="Sonia's Introduction"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
