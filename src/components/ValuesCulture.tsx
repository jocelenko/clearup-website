import React from 'react';
import { motion } from 'motion/react';
import { Heart, Users, Compass } from 'lucide-react';

export default function ValuesCulture() {
  return (
    <section id="values" className="py-20 lg:py-28 bg-leaf-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold text-primary-900 mb-4">
            Our Values, Culture &amp; Vision
          </h2>
          <p className="text-slate-600 text-lg">
            The principles that guide every site we walk into.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Values — square */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 lg:col-span-1"
          >
            <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-5">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-display font-semibold text-primary-900 mb-4">Our Values</h3>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-leaf-500"></span> Authenticity</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-leaf-500"></span> Transparency</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-leaf-500"></span> Commitment to Deliver</li>
            </ul>
          </motion.div>

          {/* Culture — rectangle (wider) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="bg-gradient-to-br from-primary-600 to-leaf-500 rounded-2xl p-8 shadow-lg lg:col-span-2 text-white"
          >
            <div className="w-12 h-12 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center mb-5">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-display font-semibold mb-4">Our Culture</h3>
            <p className="text-white/90 leading-relaxed">
              Our culture is built on faith, family and financial responsibility. We believe in doing what is right, treating people with care and respect, and building a sustainable business that creates value for our clients, our team and the community we serve.
            </p>
          </motion.div>

          {/* Vision — square */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 lg:col-span-1"
          >
            <div className="w-12 h-12 rounded-xl bg-leaf-50 text-leaf-600 flex items-center justify-center mb-5">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-display font-semibold text-primary-900 mb-4">Vision</h3>
            <p className="text-slate-700 leading-relaxed">
              To be known as a trusted cleaning company that delivers with integrity, care and commitment.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
