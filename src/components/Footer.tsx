import React from 'react';
import { Droplets, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuoteModal } from '../context/QuoteModalContext';
import { CONTACT } from '../config/contact';

/*
  Every row in every footer column uses this height, so the columns share one
  baseline grid. Links add hover on top. Without it the plain Service
  Locations items sat on a tighter rhythm than the link columns beside them.
*/
const rowClass = 'flex items-center min-h-11 leading-tight';
const linkClass =
  'text-left inline-flex items-center min-h-11 min-w-11 leading-tight hover:text-leaf-400 transition-colors';



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
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-x-6 gap-y-8 mb-8">
          {/* Logo */}
          <div className="col-span-2">
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
            <ul className="text-sm">
              <li><button onClick={() => scrollTo('our-values')} className={linkClass}>Our Values</button></li>
              <li><button onClick={() => scrollTo('our-culture')} className={linkClass}>Our Culture</button></li>
              <li><button onClick={() => scrollTo('vision')} className={linkClass}>Vision</button></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Our Services</h4>
            <ul className="text-sm">
              <li><button onClick={() => scrollTo('service-window')} className={linkClass}>Window Cleaning</button></li>
              <li><button onClick={() => scrollTo('service-retail')} className={linkClass}>Retail &amp; Commercial Cleaning</button></li>
              <li><button onClick={() => scrollTo('service-periodical')} className={linkClass}>Periodical Cleaning</button></li>
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="text-white font-semibold mb-4">Service Locations</h4>
            <ul className="text-sm">
              <li className={rowClass}>Brisbane</li>
              <li className={rowClass}>Gold Coast</li>
              <li className={rowClass}>Sunshine Coast</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Stay in Touch</h4>
            {/* Sits on the same 44px row rhythm as the other columns' first item */}
            <div className="flex flex-col justify-center min-h-11 text-sm leading-tight">
              <p className="text-white">{CONTACT.name}</p>
              <p className="text-slate-400">{CONTACT.role}</p>
            </div>
            <ul className="text-sm">
              <li>
                <a href={`tel:${CONTACT.phoneTel}`} className={`${linkClass} gap-2`}>
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className={`${linkClass} gap-2 break-all`}>
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <button onClick={() => openQuote()} className={linkClass}>
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
          {/* slate-500 on slate-900 is 3.75:1 and fails AA; slate-400 is 6.96:1. */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-1 text-sm text-slate-400">
            <p>&copy; {new Date().getFullYear()} Clear Up Pty Ltd. All rights reserved.</p>
            <Link to="/privacy-policy" className="inline-flex items-center min-h-11 hover:text-white transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
