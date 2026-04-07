"use client"
import React from 'react';
import { CARD, CARD_HOVER, MONO } from './Primitives';
import { STATS } from './Constants';

function StatsRow() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {STATS.map(({ label, value, icon: Icon, unit }, i) => (
        <div key={i} className={cn(CARD, CARD_HOVER, "p-5 flex items-start gap-4")}>
          <div className="p-2 rounded-lg bg-zinc-800 border border-zinc-700 shrink-0">
            <Icon className="h-4 w-4 text-zinc-400" />
          </div>
          <div>
            <div className={cn(MONO, "text-2xl font-bold text-zinc-100 leading-none mb-1")}>{value}</div>
            <div className="text-sm font-medium text-zinc-300">{label}</div>
            <div className={cn(MONO, "text-[11px] text-zinc-600 mt-0.5")}>{unit}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Helper for StatsRow
function cn(...c: (string | undefined | false)[]) { return c.filter(Boolean).join(' '); }

export function Stats() {
  return (
    <section className="mx-auto max-w-5xl px-4 sm:px-6 py-14">
      <StatsRow />
    </section>
  );
}
