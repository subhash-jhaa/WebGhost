"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { cn, SectionLabel, CARD, CARD_HOVER, fadeUp } from './Primitives';
import { STEPS } from './Constants';

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-5xl px-4 sm:px-6 py-20">
      <div className="text-center mb-12">
        <SectionLabel>Simple by design</SectionLabel>
        <h2 className="font-mono text-2xl sm:text-3xl font-bold text-zinc-100 tracking-tight">How It Works</h2>
        <p className="mt-3 text-sm text-zinc-500 max-w-xs mx-auto">Three steps from zero to live analytics in your dashboard.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {STEPS.map(({ n, icon: Icon, title, desc }, i) => (
          <motion.div
            key={i}
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={i}
          >
            <div className={cn(CARD, CARD_HOVER, "h-full p-6 flex flex-col gap-5 relative overflow-hidden")}>
              {/* large step number background */}
              <span className="font-mono absolute -top-2 -right-1 text-[5rem] font-bold text-zinc-800/50 select-none leading-none">
                {n}
              </span>
              <div className="p-2.5 rounded-lg bg-zinc-800 border border-zinc-700 w-fit">
                <Icon className="h-5 w-5 text-zinc-300" />
              </div>
              <div>
                <h3 className="font-semibold text-zinc-100 mb-1.5 text-[15px]">{title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
