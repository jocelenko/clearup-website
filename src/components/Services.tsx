import React, { useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { Building2, BrushCleaning, X, ArrowRight } from 'lucide-react';
import { useQuoteModal } from '../context/QuoteModalContext';
import type { QuoteService } from '../context/QuoteModalContext';
import { useModalA11y } from '../hooks/useModalA11y';

/*
  Squeegee, drawn to match the lucide stroke style (24px grid, 2px stroke)
  because lucide has no squeegee of its own. Handle, grip, blade holder and
  rubber edge.
*/
function Squeegee({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2.5v6" />
      <path d="M9.25 2.5h5.5" />
      <rect x="2" y="8.5" width="20" height="4.5" rx="1.5" />
      <path d="M5 13v3" />
      <path d="M19 13v3" />
      <path d="M4 16h16" />
    </svg>
  );
}

type ServiceKey = 'window' | 'retail' | 'periodical';

interface ServiceDef {
  key: ServiceKey;
  title: string;
  short: string;
  icon: React.ReactNode;
  details: React.ReactNode;
}

const services: ServiceDef[] = [
  {
    key: 'window',
    title: 'Window Cleaning',
    short: 'High-quality, reliable window cleaning with clear communication at every stage.',
    icon: <Squeegee className="w-7 h-7" />,
    details: (
      <p>
        Committed to delivering high-quality service and an exceptional customer experience. We go beyond completing the task by refining our processes, tailoring each service, and maintaining clear communication throughout every stage of the job. With daily reporting and proactive management, we keep you informed of progress and any changes, ensuring reliable results, regardless of conditions.
      </p>
    ),
  },
  {
    key: 'retail',
    title: 'Retail & Commercial Cleaning',
    short: 'Comprehensive solutions for commercial, retail and industrial environments.',
    icon: <Building2 className="w-7 h-7" />,
    details: (
      <p>
        Comprehensive cleaning solutions for commercial facilities, industrial sites, and retail environments. Our services ensure hygienic, safe, and professional environments that meet industry standards and enhance business operations.
      </p>
    ),
  },
  {
    key: 'periodical',
    title: 'Periodical Cleaning',
    short: 'Specialised periodical work, from carpet care to high-pressure hard surface cleaning.',
    icon: <BrushCleaning className="w-7 h-7" />,
    details: (
      <ul className="space-y-3 list-disc pl-5">
        <li>
          <strong>Hard Surface Maintenance:</strong> high-dusting and hot pressure wash cleaning for car parks, building facades, concrete pathways, and all other hard surfaces.
        </li>
        <li>
          <strong>Wood Treatment:</strong> extensive experience in wood treatment, including detailed floor preparation for each stage of the treatment process.
        </li>
        <li>
          <strong>Bathroom Sanitisation:</strong> steam cleaning for bathroom walls to effectively remove old stains and buildup.
        </li>
        <li>
          <strong>Carpet Care:</strong> specialised carpet shampooing suitable for both fabric and wool carpet tiles.
        </li>
      </ul>
    ),
  },
];

export default function Services() {
  const [active, setActive] = useState<ServiceKey | null>(null);
  const { openQuote } = useQuoteModal();

  const activeService = services.find((s) => s.key === active);
  const closeDetail = useCallback(() => setActive(null), []);
  const panelRef = useModalA11y({ isOpen: active !== null, onClose: closeDetail });

  return (
    <section id="services" className="py-14 lg:py-16 bg-gradient-to-br from-leaf-900 via-leaf-800 to-leaf-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold text-white mb-4">
            Where We Can Serve You
          </h2>
          <p className="text-leaf-200 text-lg">
            Delivered with the same standard of care and transparency.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.button
              key={s.key}
              id={`service-${s.key}`}
              type="button"
              onClick={() => setActive(s.key)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex flex-col text-left bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl border border-slate-100 hover:border-primary-200 transition-all group scroll-mt-28"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-600 to-leaf-500 text-white flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                {s.icon}
              </div>
              <h3 className="text-xl font-display font-semibold text-primary-900 mb-2">{s.title}</h3>
              <p className="text-slate-600 mb-4">{s.short}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 text-primary-600 font-medium text-sm">
                Learn more <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/*
        Rendered conditionally rather than through AnimatePresence. With
        motion 12.40 + React 19 the exit animation ran but the node was never
        unmounted, leaving an invisible fixed-inset backdrop with
        pointer-events:auto that swallowed every click on the page. Opening
        still animates; closing is immediate, which is normal for a dialog.
      */}
      {activeService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeDetail}
          >
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="service-detail-title"
              tabIndex={-1}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-3 p-5 sm:p-6 border-b border-slate-100">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-600 to-leaf-500 text-white flex items-center justify-center flex-shrink-0">
                    {activeService.icon}
                  </div>
                  <h3 id="service-detail-title" className="text-xl sm:text-2xl font-display font-semibold text-primary-900">
                    {activeService.title}
                  </h3>
                </div>
                <button
                  onClick={closeDetail}
                  className="text-slate-400 hover:text-slate-700 flex items-center justify-center w-11 h-11 -mr-2 flex-shrink-0 rounded-lg"
                  aria-label="Close"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-5 sm:p-6 text-slate-700 leading-relaxed">{activeService.details}</div>
              <div className="p-5 sm:p-6 pt-0">
                <button
                  onClick={() => {
                    const key = activeService.key as QuoteService;
                    setActive(null);
                    openQuote(key);
                  }}
                  className="w-full inline-flex justify-center items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-full font-medium transition-colors"
                >
                  Request a Quote for {activeService.title}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
    </section>
  );
}
