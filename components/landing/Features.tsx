"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { cn, SectionLabel, CARD, CARD_HOVER, fadeUp } from './Primitives';
import { FEATURES } from './Constants';

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 sm:px-6 py-4 pb-12">
      <div className="text-center mb-10">
        <SectionLabel>Built for developers</SectionLabel>
        <h2 className="font-mono text-2xl sm:text-3xl font-bold text-zinc-100 tracking-tight">Everything You Need</h2>
        <p className="mt-3 text-sm text-zinc-500 max-w-lg mx-auto leading-relaxed">
          No bloated dashboards. No enterprise pricing. Fast, clean analytics that stay out of your way.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-6 gap-3">
        {FEATURES.map((feature, i) => (
          <FeatureCard key={i} feature={feature} index={i} />
        ))}
      </div>
    </section>
  );
}

function FeatureCard({ feature, index }: { feature: any; index: number }) {
  const { icon: Icon, title, desc, variant, span } = feature;

  return (
    <motion.div
      initial="hidden" whileInView="visible" viewport={{ once: true }}
      variants={fadeUp} custom={index * 0.2}
      className={cn(span === 4 ? "lg:col-span-4" : span === 3 ? "lg:col-span-3" : "lg:col-span-2")}
    >
      <div className={cn(CARD, CARD_HOVER, "relative h-full overflow-hidden group p-5 sm:p-6")}>
        {variant === 'realtime' && (
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-zinc-800 border border-zinc-700 group-hover:border-zinc-500 transition-colors">
                <Icon className="h-4 w-4 text-zinc-100" />
              </div>
              <h3 className="font-semibold text-zinc-100 text-base">{title}</h3>
            </div>
            <p className="text-zinc-400 text-[13px] max-w-xs leading-relaxed mb-6">
              {desc}
            </p>
            <div className="mt-auto relative">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-zinc-100 tracking-tighter">100%</span>
                <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">Real-time</span>
              </div>
            </div>
            <div className="absolute right-[-5%] bottom-[-15%] pointer-events-none opacity-20 group-hover:opacity-30 transition-opacity">
               <svg width="300" height="300" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="200" cy="200" r="150" stroke="white" strokeWidth="0.5" strokeDasharray="4 4" />
                <circle cx="200" cy="200" r="100" stroke="white" strokeWidth="0.5" />
                <circle cx="200" cy="200" r="50" stroke="white" strokeWidth="1" />
              </svg>
            </div>
          </div>
        )}

        {variant === 'privacy' && (
          <div className="flex flex-col items-center justify-center text-center h-full">
            <div className="mb-4 relative">
              <div className="relative z-10 p-4 rounded-full bg-zinc-800 border border-zinc-700 shadow-xl group-hover:scale-105 transition-transform duration-500">
                <Icon className="h-6 w-6 text-zinc-100" />
              </div>
              <div className="absolute inset-0 animate-ping opacity-10 bg-zinc-400 rounded-full blur-xl" />
            </div>
            <h3 className="font-semibold text-zinc-100 text-[14px] mb-1">{title}</h3>
            <p className="text-zinc-500 text-[12px] leading-relaxed">
              {desc}
            </p>
          </div>
        )}

        {variant === 'console' && (
          <div className="flex flex-col h-full">
            <div className="p-2 rounded-lg bg-zinc-800 border border-zinc-700 w-fit mb-3 group-hover:border-zinc-500 transition-colors">
              <Icon className="h-4 w-4 text-zinc-100" />
            </div>
            <h3 className="font-semibold text-zinc-100 text-[14px] mb-1">{title}</h3>
            <p className="text-zinc-500 text-[12px] leading-relaxed mb-4">
              {desc}
            </p>
            <div className="mt-auto bg-black/50 border border-zinc-800 rounded-lg p-2 font-mono text-[9px] text-zinc-500 group-hover:border-zinc-700 transition-colors">
              <div className="flex gap-2 mb-1">
                <div className="w-1 h-1 rounded-full bg-red-900/50" />
                <div className="w-1 h-1 rounded-full bg-amber-900/50" />
                <div className="w-1 h-1 rounded-full bg-emerald-900/50" />
              </div>
              <div className="text-zinc-400">$ node webghost.js</div>
              <div className="text-emerald-500/70">✔ Listening on port 3000</div>
            </div>
          </div>
        )}

        {variant === 'script' && (
          <div className={cn("grid grid-cols-1 sm:grid-cols-2 h-full -m-5 sm:-m-6")}>
            <div className="p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <div className="p-2 rounded-lg bg-zinc-800 border border-zinc-700 w-fit mb-4 group-hover:border-zinc-500 transition-colors">
                  <Icon className="h-4 w-4 text-zinc-100" />
                </div>
                <h3 className="font-semibold text-zinc-100 text-base mb-1">{title}</h3>
                <p className="text-zinc-500 text-[13px] leading-relaxed">
                  {desc}
                </p>
              </div>
              <div className="mt-6 rounded-lg border border-zinc-700/50 bg-zinc-800/50 p-2.5 font-mono text-[9px] sm:text-[10px] text-zinc-400 group-hover:border-zinc-500 transition-colors overflow-hidden">
                <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
                  <span className="text-zinc-600">&lt;script</span>
                  <span className="text-amber-500/80">src</span>
                  <span className="text-emerald-500/80 break-all">"https://webghost.vercel.app/g.js"</span>
                  <span className="text-zinc-600">&gt;&lt;/script&gt;</span>
                </div>
              </div>
            </div>
            <div className="relative bg-zinc-800/20 border-l border-zinc-800 overflow-hidden min-h-[140px]">
              <div className="absolute inset-0 flex items-center justify-center">
                 <svg className="w-full h-24 text-zinc-700/30 group-hover:text-zinc-500/40 transition-colors" viewBox="0 0 200 100" preserveAspectRatio="none">
                    <path d="M0,50 Q25,10 50,50 T100,50 T150,50 T200,50" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" className="animate-[pulse_3s_infinite]" />
                    <path d="M0,60 Q25,20 50,60 T100,60 T150,60 T200,60" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
                 </svg>
              </div>
            </div>
          </div>
        )}

        {variant === 'insights' && (
          <div className="flex flex-col h-full">
            <div className="p-2 rounded-lg bg-zinc-800 border border-zinc-700 w-fit mb-3 group-hover:border-zinc-500 transition-colors">
              <Icon className="h-4 w-4 text-zinc-100" />
            </div>
            <h3 className="font-semibold text-zinc-100 text-base mb-1">{title}</h3>
            <p className="text-zinc-500 text-[13px] leading-relaxed mb-4">
              {desc}
            </p>
            <div className="grid grid-cols-2 gap-2 mt-auto">
              {[42, 28, 15, 64].map((v, i) => (
                <div key={i} className="bg-zinc-800/30 border border-zinc-700/30 rounded p-1.5 flex items-end gap-1.5 h-12">
                  <div className="w-full bg-zinc-700/50 rounded-t-sm transition-all duration-700 group-hover:bg-zinc-500" style={{ height: `${v}%` }} />
                </div>
              ))}
            </div>
          </div>
        )}

        {variant === 'api' && (
          <div className="flex flex-col h-full">
            <div className="p-2 rounded-lg bg-zinc-800 border border-zinc-700 w-fit mb-3 group-hover:border-zinc-500 transition-colors">
              <Icon className="h-4 w-4 text-zinc-100" />
            </div>
            <h3 className="font-semibold text-zinc-100 text-base mb-1">{title}</h3>
            <p className="text-zinc-500 text-[13px] leading-relaxed">
              {desc}
            </p>
            <div className="mt-auto overflow-x-auto rounded-lg border border-zinc-800 bg-black/40 p-3 font-mono text-[9px] text-zinc-500 group-hover:border-zinc-700 transition-colors">
              <div className="text-zinc-600 mb-0.5">// GET /api/v1/stats</div>
              <div className="text-zinc-300">{"{"}</div>
              <div className="pl-3">"visitors": <span className="text-emerald-400">1284</span>,</div>
              <div className="pl-3">"active": <span className="text-amber-400">true</span></div>
              <div className="text-zinc-300">{"}"}</div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
