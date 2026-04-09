"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { cn, SectionLabel, CARD, CARD_HOVER, fadeUp, staggerContainer } from './Primitives';
import { STEPS } from './Constants';

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-5xl px-4 sm:px-6 py-20">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="text-center mb-12"
      >
        <motion.div variants={fadeUp} custom={0}>
          <SectionLabel>Simple by design</SectionLabel>
        </motion.div>
        <motion.h2 variants={fadeUp} custom={1} className="font-mono text-2xl sm:text-3xl font-bold text-zinc-100 tracking-tight">
          How It Works
        </motion.h2>
        <motion.p variants={fadeUp} custom={2} className="mt-3 text-sm text-zinc-500 max-w-xs mx-auto">
          Three steps from zero to live analytics in your dashboard.
        </motion.p>
      </motion.div>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        {STEPS.map(({ n, icon: Icon, title, desc }, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            custom={i}
          >
            <div className={cn(CARD, CARD_HOVER, "h-full p-6 flex flex-col gap-5 relative overflow-hidden group")}>
              {/* large step number background */}
              <motion.span 
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + (i * 0.1), duration: 0.5 }}
                className="font-mono absolute -top-2 -right-1 text-[5rem] font-bold text-zinc-800/30 select-none leading-none group-hover:text-zinc-700/50 transition-colors duration-500"
              >
                {n}
              </motion.span>
              <div className="p-2.5 rounded-lg bg-zinc-800 border border-zinc-700 w-fit group-hover:border-zinc-500 transition-colors">
                <Icon className="h-5 w-5 text-zinc-300" />
              </div>
              <div className="relative z-10">
                <h3 className="font-semibold text-zinc-100 mb-1.5 text-[15px]">{title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
