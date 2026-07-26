import React from 'react';
import { motion } from 'motion/react';
import { Smartphone, Activity, MessageCircle, FileBarChart } from 'lucide-react';

const features = [
  { icon: Activity, title: 'Live service tracking', body: 'Each visit logged in real time, so we know exactly what was delivered and when.' },
  { icon: MessageCircle, title: 'Clear communication', body: 'Built-in messaging keeps clients, supervisors and cleaners in sync at every stage.' },
  { icon: FileBarChart, title: 'On-demand reporting', body: 'Daily, weekly and monthly reporting accessible whenever you need it.' },
];

export default function InHouseApp() {
  return (
    <section id="app" className="py-14 lg:py-16 bg-gradient-to-br from-primary-900 via-primary-800 to-slate-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-leaf-300 font-medium text-sm mb-6">
              <Smartphone className="w-4 h-4" />
              Technology
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold mb-6 leading-tight">
              Built to Serve Better: Our In-House App
            </h2>
            <p className="text-primary-200 text-lg leading-relaxed mb-8">
              We created a robust in-house app to streamline operations, track service delivery and support clear communication. With reporting accessible at any time, we can serve our clients with greater reliability, transparency and care.
            </p>
            <div className="space-y-4">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0">
                    <f.icon className="w-5 h-5 text-leaf-300" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">{f.title}</p>
                    <p className="text-white/70 text-sm leading-relaxed">{f.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative flex justify-center"
          >
            <div className="relative w-52 h-[420px] sm:w-64 sm:h-[520px] rounded-[2.5rem] sm:rounded-[3rem] bg-slate-900 border-8 sm:border-[10px] border-slate-800 shadow-2xl overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-6 bg-slate-900 flex justify-center">
                <div className="w-24 h-5 bg-black rounded-b-2xl"></div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-primary-700 via-primary-600 to-leaf-500 mt-6 mx-1 mb-1 rounded-[2.4rem] p-5">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-3 border border-white/20">
                  <p className="text-xs text-white/70 mb-1">Today</p>
                  <p className="font-semibold">12 sites cleaned</p>
                  <div className="mt-3 flex gap-1">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} className="flex-1 h-1.5 rounded-full bg-leaf-300/80"></div>
                    ))}
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-3 border border-white/20">
                  <p className="text-xs text-white/70 mb-1">Active job</p>
                  {/* Generic label: naming a real centre here implies a client
                      relationship that has not been confirmed. */}
                  <p className="font-semibold text-sm">Southport site</p>
                  <p className="text-xs text-white/70 mt-1">Started 06:42</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <p className="text-xs text-white/70 mb-1">Reports</p>
                  <p className="font-semibold text-sm">Ready to view</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
