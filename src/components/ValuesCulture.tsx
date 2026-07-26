import React from 'react';
import { motion } from 'motion/react';

/*
  Box fill uses the pale end of the brand green (the light green tip of the
  leaf in the logo) on a white section. Text stays navy for contrast.
*/
const boxClass =
  'bg-gradient-to-br from-leaf-100 to-leaf-200 rounded-2xl p-6 sm:p-8 shadow-sm border border-leaf-200 scroll-mt-28';

export default function ValuesCulture() {
  return (
    <section id="values" className="py-14 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold text-primary-900 mb-4">
            Our Values, Culture &amp; Vision
          </h2>
          <p className="text-slate-600 text-lg">
            The principles that guide every site we walk into.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            id="our-values"
            className={boxClass}
          >
            <h3 className="text-xl font-display font-semibold text-primary-900 mb-4">Our Values</h3>
            <ul className="space-y-2 text-primary-900/80">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-leaf-600 flex-shrink-0"></span> Authenticity</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-leaf-600 flex-shrink-0"></span> Transparency</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-leaf-600 flex-shrink-0"></span> Commitment to Deliver</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            id="our-culture"
            className={boxClass}
          >
            <h3 className="text-xl font-display font-semibold text-primary-900 mb-4">Our Culture</h3>
            <p className="text-primary-900/80 leading-relaxed">
              Our culture is built on faith, family and financial responsibility. We believe in doing what is right, treating people with care and respect, and building a sustainable business that creates value for our clients, our team and the community we serve.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            id="vision"
            className={boxClass}
          >
            <h3 className="text-xl font-display font-semibold text-primary-900 mb-4">Vision</h3>
            <p className="text-primary-900/80 leading-relaxed">
              To be known as a trusted cleaning company that delivers with integrity, care and commitment.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
