import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, BadgeCheck, AlertTriangle, Leaf } from 'lucide-react';

const systems = [
  {
    title: 'Work Health & Safety Management System',
    icon: ShieldCheck,
    body: 'We are developing strong health and safety processes to protect our cleaners, clients and the public — through risk assessments, training, PPE and safe work procedures.',
  },
  {
    title: 'Quality Management System',
    icon: BadgeCheck,
    body: 'We are building a quality management system focused on consistent service delivery, clear procedures, client satisfaction and continuous improvement.',
  },
  {
    title: 'Risk Management System',
    icon: AlertTriangle,
    body: 'Our risk management approach helps us identify, assess and control operational, safety, environmental and service risks before they become problems.',
  },
  {
    title: 'Environmental Management System',
    icon: Leaf,
    body: 'Our environmental system supports responsible cleaning practices — including safe chemical management, waste reduction and environmentally conscious operations.',
  },
];

export default function ManagementSystems() {
  return (
    <section id="systems" className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold text-primary-900 mb-4">
            Management Systems
          </h2>
          <p className="text-slate-600 text-lg">
            Clear Up is certified in Safety, Quality and Environmental Management. These certifications represent our professional standing in the cleaning industry, and our ability to provide quality, safe, and structured services.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {systems.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg hover:border-primary-100 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-4">
                <s.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-display font-semibold text-primary-900 mb-2">{s.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
