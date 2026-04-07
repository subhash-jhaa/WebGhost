"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { SectionLabel, CARD, CARD_HOVER, fadeUp } from './Primitives';
import { FEATURES } from './Constants';

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-5xl px-4 sm:px-6 py-4 pb-20">
      <div className="text-center mb-12">
        <SectionLabel>Built for developers</SectionLabel>
        <h2 className="font-mono text-2xl sm:text-3xl font-bold text-zinc-100 tracking-tight">Everything You Need</h2>
        <p className="mt-3 text-sm text-zinc-500 max-w-sm mx-auto">
          No bloated dashboards. No enterprise pricing. Fast, clean analytics that stay out of your way.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {FEATURES.map(({ icon: Icon, title, desc }, i) => (
          <motion.div
            key={i}
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={i * 0.4}
          >
            <div className={cn(CARD, CARD_HOVER, "h-full p-5 flex flex-col gap-3 group")}>
              <div className="p-2.5 rounded-lg bg-zinc-800 border border-zinc-700 w-fit group-hover:border-zinc-600 transition-colors">
                <Icon className="h-[18px] w-[18px] text-zinc-300" />
              </div>
              <div>
                <h3 className="font-semibold text-zinc-100 text-[14px] mb-1">{title}</h3>
                <p className="text-[13px] text-zinc-500 leading-relaxed">{desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// Helper for Features
function cn(...c: (string | undefined | false)[]) { return c.filter(Boolean).join(' '); }
