"use client"
import React from 'react';
import { Check } from 'lucide-react';
import { cn, SectionLabel, CARD } from './Primitives';
import { HeroScript } from './HeroVisuals';

export function Integration() {
  return (
    <section id="code" className="mx-auto max-w-5xl px-4 sm:px-6 py-4 pb-20">
      <div className={cn(CARD, "p-8 sm:p-12")}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <SectionLabel>Zero config</SectionLabel>
            <h2 className="font-mono text-2xl sm:text-3xl font-bold text-zinc-100 tracking-tight mb-4">
              Add Analytics<br />in 5 Seconds
            </h2>
            <p className="text-sm text-zinc-500 leading-relaxed mb-6">
              No npm install. No build step. No configuration file. Paste one script tag anywhere in your HTML and you&apos;re live.
            </p>
            <div className="space-y-3">
              {[
                'Works with React, Vue, Next.js, and plain HTML',
                'GDPR & CCPA compliant by default',
                'Under 2KB — zero impact on Core Web Vitals',
                'Data appears within seconds of install',
              ].map((t, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="h-5 w-5 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center shrink-0">
                    <Check className="h-3 w-3 text-emerald-400" />
                  </div>
                  <span className="text-[13px] text-zinc-400">{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <HeroScript />
          </div>
        </div>
      </div>
    </section>
  );
}
