"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Layout, ArrowRight } from 'lucide-react';
import { cn, SectionLabel, CARD, fadeUp, staggerContainer } from './Primitives';

export function AddProject() {
  return (
    <section id="add-project" className="mx-auto max-w-5xl px-4 sm:px-6 py-20">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
      >
        <motion.div variants={fadeUp} custom={0}>
          <SectionLabel>Scale effortlessly</SectionLabel>
          <h2 className="font-mono text-2xl sm:text-3xl font-bold text-zinc-100 tracking-tight mb-6">
            One Dashboard.<br />Unlimited Projects.
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-8 text-sm sm:text-base">
            Whether you&apos;re managing a single portfolio or a fleet of client websites, 
            Spectr makes it easy. Create a new project in two clicks, get a unique tracking ID, 
            and start seeing data instantly.
          </p>
          
          <div className="space-y-4">
            {[
              { 
                icon: Plus, 
                title: 'Instant Setup', 
                desc: 'Give your project a name and you&apos;re ready to go.' 
              },
              { 
                icon: Layout, 
                title: 'Isolated Data', 
                desc: 'Keep analytics for different domains completely separate.' 
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/50 group hover:border-zinc-700 transition-colors">
                <div className="h-10 w-10 shrink-0 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center group-hover:bg-white group-hover:text-zinc-950 transition-all duration-300">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-zinc-100 text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          variants={fadeUp} 
          custom={1}
          className="relative"
        >
          {/* Mockup UI */}
          <div className={cn(CARD, "p-1 rounded-2xl overflow-hidden shadow-2xl shadow-emerald-500/5")}>
            <div className="bg-zinc-950 rounded-[14px] p-6 border border-zinc-800/50">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-zinc-800" />
                  <div className="w-3 h-3 rounded-full bg-zinc-800" />
                  <div className="w-3 h-3 rounded-full bg-zinc-800" />
                </div>
                <div className="h-4 w-32 bg-zinc-900 rounded-full" />
              </div>

              <div className="space-y-4">
                <div className="text-center py-8 px-4 rounded-xl border border-dashed border-zinc-800 bg-zinc-900/30">
                  <div className="h-12 w-12 rounded-full bg-zinc-800 mx-auto flex items-center justify-center mb-4 text-zinc-500">
                    <Plus className="h-6 w-6" />
                  </div>
                  <h3 className="text-zinc-100 font-semibold mb-1">Create Your First Project</h3>
                  <p className="text-zinc-500 text-xs mb-6">Start tracking visitors in real-time.</p>
                  
                  <div className="max-w-[200px] mx-auto h-10 bg-white rounded-lg flex items-center justify-center gap-2 text-zinc-950 font-bold text-xs">
                    <Plus className="h-3.5 w-3.5" /> Create Project
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 flex items-center justify-between blur-[1px] opacity-50">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded bg-zinc-800" />
                    <div className="space-y-1">
                      <div className="h-3 w-20 bg-zinc-700 rounded" />
                      <div className="h-2 w-12 bg-zinc-800 rounded" />
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-zinc-700" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative glow */}
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-emerald-500/10 blur-[100px] rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
