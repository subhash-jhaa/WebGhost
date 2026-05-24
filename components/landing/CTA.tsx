'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';


export function CTA() {
  return (
    <section className="bg-black w-full overflow-hidden relative border-t border-neutral-900">
      
      <div className="max-w-7xl mx-auto min-h-[60vh] md:min-h-[80dvh] flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
        
        {/* ─── Left Side Glowing Laser Line ───────────────────────────────────── */}
        <svg 
          className="absolute hidden lg:block left-0 h-full w-24 pointer-events-none" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 89 568" 
          fill="none"
        >
          <path 
            d="M1 0.23938V207.654L88 285.695C88 285.695 87.5 493.945 88 567.813" 
            stroke="url(#animation_gradient_left)" 
            strokeWidth="2"
          />
          <defs>
            <linearGradient id="animation_gradient_left" x1="1" y1="4.5" x2="88" y2="568" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6F6F6F" stopOpacity="0.1" />
              <stop offset="0.5" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="1" stopColor="#6F6F6F" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>

        {/* ─── Center Content Box ─────────────────────────────────────────────── */}
        <div className="w-full max-w-4xl mx-auto text-center py-16 md:py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <h2 className="inline-block text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-b from-[#4B4B4B] via-white to-[#4B4B4B] bg-clip-text text-transparent px-4 md:px-8 leading-tight tracking-tight">
              Your All-in-One <br className="sm:hidden" /> Analytics Companion
            </h2>
            <p className="max-w-lg text-xs sm:text-sm md:text-base text-neutral-400 mx-auto px-4 leading-relaxed">
              Simplify visitor tracking, event logs, and site analytics with cutting-edge tools designed to be lightweight, privacy-first, and built for developers.
            </p>

            <div className="pt-8">
              <a 
                href="/auth" 
                className="px-8 py-4 relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-flex items-center justify-center gap-2 border border-neutral-700 bg-black hover:bg-zinc-950 text-white shadow-2xl h-12 md:h-14 w-48 md:w-56 rounded-full font-bold text-sm tracking-wide"
                style={{
                  background: 'linear-gradient(0deg,#000000,#000000), linear-gradient(180deg,rgba(0,0,0,0)_66.3%,rgba(255,255,255,0.2)_100%)'
                }}
              >
                <span>Get Started Now</span>
                <ArrowRight className="h-4 w-4 text-white" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* ─── Right Side Glowing Laser Line ──────────────────────────────────── */}
        <svg 
          className="absolute hidden lg:block right-0 h-full w-24 pointer-events-none" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 89 568" 
          fill="none"
        >
          <path 
            d="M88 0.23938V207.654L1 285.695C1 285.695 1.5 493.945 1 567.813" 
            stroke="url(#animation_gradient_right)" 
            strokeWidth="2"
          />
          <defs>
            <linearGradient id="animation_gradient_right" x1="88" y1="4.5" x2="1" y2="568" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6F6F6F" stopOpacity="0.1" />
              <stop offset="0.5" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="1" stopColor="#6F6F6F" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>

      </div>
    </section>
  );
}
export default CTA;
