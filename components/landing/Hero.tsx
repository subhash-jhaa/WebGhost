"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight, Terminal, Copy, Check, Code2,
} from 'lucide-react';
import { Button, cn, CARD, MONO, fadeUp } from './Primitives';
import { VISITORS } from './Constants';

export function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-4 sm:px-6 pt-32 pb-20 text-center flex flex-col items-center justify-center min-h-[60vh]">
      <motion.h1
        initial="hidden" animate="visible" variants={fadeUp} custom={1}
        className="font-mono mx-auto max-w-4xl text-[3.2rem] sm:text-[5rem] font-bold tracking-tight text-zinc-100 leading-[1.05] mb-8"
      >
        See Who&apos;s On Your Site<br />
        <span className="text-zinc-100">Right Now.</span>
      </motion.h1>

      <motion.p
        initial="hidden" animate="visible" variants={fadeUp} custom={2}
        className="mx-auto max-w-xl text-base sm:text-lg text-zinc-500 mb-12 leading-relaxed"
      >
        Privacy-first, zero-cookie analytics built for developers. Know who&apos;s visiting, where they came from, and exactly what they&apos;re doing.
      </motion.p>

      <motion.div
        initial="hidden" animate="visible" variants={fadeUp} custom={3}
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <a href="/auth">
          <Button size="lg" className="w-full sm:w-auto font-semibold px-8 h-14 text-base">
            Start Tracking Free <ArrowRight className="h-4 w-4" />
          </Button>
        </a>
        <a href="#how-it-works">
          <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 h-14 text-base">
            <Code2 className="h-4 w-4" /> See How It Works
          </Button>
        </a>
      </motion.div>
    </section>
  );
}
