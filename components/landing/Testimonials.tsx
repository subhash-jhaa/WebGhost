"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { cn, SectionLabel, CARD, CARD_HOVER, MONO, fadeUp } from './Primitives';
import { TESTIMONIALS } from './Constants';

export function Testimonials() {
  return (
    <section className="mx-auto max-w-5xl px-4 sm:px-6 pb-20">
      <div className="text-center mb-12">
        <SectionLabel>From the community</SectionLabel>
        <h2 className="font-mono text-2xl sm:text-3xl font-bold text-zinc-100 tracking-tight">Devs Love WebGhost</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {TESTIMONIALS.map(({ quote, name, handle }, i) => (
          <motion.div
            key={i}
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={i}
          >
            <div className={cn(CARD, CARD_HOVER, "h-full p-5 flex flex-col gap-4")}>
              {/* quote mark */}
              <span className="font-mono text-4xl font-bold text-zinc-700 leading-none">&ldquo;</span>
              <p className="text-[13px] text-zinc-400 leading-relaxed flex-1 -mt-4">{quote}</p>
              <div className="flex items-center gap-3 pt-3 border-t border-zinc-800">
                <div className="h-8 w-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-300 font-mono">
                  {name[0]}
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-zinc-200">{name}</div>
                  <div className={cn(MONO, "text-[11px] text-zinc-600")}>{handle}</div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
