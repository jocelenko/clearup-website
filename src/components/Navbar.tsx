import React from 'react';
import { Menu, X, Phone, Droplets } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { useQuoteModal } from '../context/QuoteModalContext';

const PHONE_DISPLAY = '1300 123 456';
const PHONE_TEL = '1300123456';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { openQuote } = useQuoteModal();
  const location = useLocation();
  const onHome = location.pathname === '/';

  const handleQuote = () => {
    setIsOpen(false);
    openQuote();
  };

  return (
    <nav className="fixed w-full bg-white/95 backdrop-blur-md z-40 border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 gap-4">
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
              <img
                src="/logo.png"
                alt="Clear Up Logo"
                className="h-10 sm:h-12 w-auto max-w-[200px] sm:max-w-[240px] mix-blend-multiply object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  document.getElementById('fallback-logo')?.classList.remove('hidden');
                }}
              />
              <div id="fallback-logo" className="hidden items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-leaf-500 rounded-lg flex items-center justify-center text-white">
                  <Droplets className="w-6 h-6" />
                </div>
                <span className="font-display font-bold text-2xl tracking-tight text-slate-900">
                  Clear<span className="text-leaf-600">Up</span>
                </span>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            <a
              href={`tel:${PHONE_TEL}`}
              className="flex items-center gap-2 text-slate-700 hover:text-primary-600 font-medium transition-colors"
            >
              <Phone className="w-4 h-4 text-primary-600" />
              <span>{PHONE_DISPLAY}</span>
            </a>
            <button
              onClick={handleQuote}
              className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-full font-medium transition-colors shadow-sm shadow-primary-600/20"
            >
              Request a Quote
            </button>
          </div>

          <div className="flex items-center md:hidden">
            <a
              href={`tel:${PHONE_TEL}`}
              className="mr-2 text-slate-700 hover:text-primary-600 p-2"
              aria-label="Call us"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-700 hover:text-primary-600 focus:outline-none p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              <a
                href={`tel:${PHONE_TEL}`}
                className="flex items-center gap-2 px-3 py-3 text-slate-700 font-medium rounded-lg hover:bg-slate-50"
              >
                <Phone className="w-4 h-4 text-primary-600" />
                {PHONE_DISPLAY}
              </a>
              <button
                onClick={handleQuote}
                className="block w-full px-3 py-3 text-base font-medium text-center text-white bg-primary-600 hover:bg-primary-700 rounded-lg"
              >
                Request a Quote
              </button>
              {onHome && (
                <div className="pt-2 grid grid-cols-2 gap-2 text-sm">
                  <a href="#services" onClick={() => setIsOpen(false)} className="px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700">Services</a>
                  <a href="#industries" onClick={() => setIsOpen(false)} className="px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700">Industries</a>
                  <a href="#systems" onClick={() => setIsOpen(false)} className="px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700">Systems</a>
                  <a href="#values" onClick={() => setIsOpen(false)} className="px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700">Values</a>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
