"use client"
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn, CARD, MONO, Button } from './Primitives';

export function CTA() {
  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 pb-24">
      <div className={cn(CARD, "p-10 sm:p-16 text-center border-zinc-700")}>
        {/* terminal-style tag */}
        <div className={cn(MONO, "text-xs text-zinc-600 mb-6")}>
          $ webghost init --site=your-domain.com
        </div>
        <h2 className="font-mono text-2xl sm:text-4xl font-bold text-zinc-100 tracking-tight mb-4">
          Start Tracking in Seconds
        </h2>
        <p className="text-zinc-500 text-sm mb-8 max-w-xs mx-auto leading-relaxed">
          Free forever for solo devs. No credit card. No cookie banners. No nonsense.
        </p>
        <a href="/auth">
          <Button size="lg" className="font-semibold">
            Get Started Free <ArrowRight className="h-4 w-4" />
          </Button>
        </a>
        <p className={cn(MONO, "mt-5 text-[11px] text-zinc-700")}>
          trusted by indie hackers, solo devs & small startups
        </p>
      </div>
    </section>
  );
}
