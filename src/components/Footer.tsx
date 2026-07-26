import React from 'react';
import { Droplets, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuoteModal } from '../context/QuoteModalContext';

const PHONE_DISPLAY = '1300 123 456';
const PHONE_TEL = '1300123456';

export default function Footer() {
  const { openQuote } = useQuoteModal();
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/*
          Six-column grid: the logo takes two, then the four menus take one
          each, so the gap between every menu column is identical.
        */}
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          {/* Logo */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2">
              <img
                src={`${import.meta.env.BASE_URL}logo%20overlay.png`}
                alt="Clear Up Logo"
                className="h-20 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  document.getElementById('footer-fallback-logo')?.classList.remove('hidden');
                }}
              />
              <div id="footer-fallback-logo" className="hidden items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-leaf-500 rounded-md flex items-center justify-center text-white">
                  <Droplets className="w-5 h-5" />
                </div>
                <span className="font-display font-bold text-xl tracking-tight text-white">
                  Clear<span className="text-leaf-400">Up</span>
                </span>
              </div>
            </Link>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => scrollTo('values')} className="text-left hover:text-leaf-400 transition-colors">Our Values</button></li>
              <li><button onClick={() => scrollTo('values')} className="text-left hover:text-leaf-400 transition-colors">Our Culture</button></li>
              <li><button onClick={() => scrollTo('values')} className="text-left hover:text-leaf-400 transition-colors">Vision</button></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => scrollTo('services')} className="text-left hover:text-leaf-400 transition-colors">Window Cleaning</button></li>
              <li><button onClick={() => scrollTo('services')} className="text-left hover:text-leaf-400 transition-colors">Retail &amp; Commercial Cleaning</button></li>
              <li><button onClick={() => scrollTo('services')} className="text-left hover:text-leaf-400 transition-colors">Periodical Cleaning</button></li>
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="text-white font-semibold mb-4">Service Locations</h4>
            <ul className="space-y-2 text-sm">
              <li>Brisbane</li>
              <li>Gold Coast</li>
              <li>Sunshine Coast</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Stay in Touch</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center gap-2 hover:text-leaf-400 transition-colors">
                  <Phone className="w-4 h-4" />
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <button onClick={() => openQuote()} className="text-left hover:text-leaf-400 transition-colors">
                  Request a Quote
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6">
          <p className="text-sm text-slate-400 italic max-w-3xl mb-6">
            Clear Up acknowledges the Traditional Custodians of the land and pays respect to Elders past and present, their culture and history.
          </p>
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-slate-500">
            <p>&copy; {new Date().getFullYear()} Clear Up Pty Ltd. All rights reserved.</p>
            <Link to="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
